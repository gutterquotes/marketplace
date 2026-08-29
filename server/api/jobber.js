const axios = require('axios');
const crypto = require('crypto');

const AUTHORIZATION_URL = 'https://api.getjobber.com/api/oauth/authorize';
const TOKEN_URL = 'https://api.getjobber.com/api/oauth/token';
const GRAPHQL_URL = 'https://api.getjobber.com/api/graphql';
const DEFAULT_GRAPHQL_VERSION = '2025-04-16';
const STATE_COOKIE = 'gq_jobber_oauth';

const isProduction = process.env.NODE_ENV === 'production';

const getRootUrl = () => (process.env.REACT_APP_MARKETPLACE_ROOT_URL || '').replace(/\/$/, '');

const getRedirectUri = () =>
  process.env.JOBBER_REDIRECT_URI || `${getRootUrl()}/api/jobber/callback`;

const getConfig = () => ({
  clientId: process.env.JOBBER_CLIENT_ID,
  clientSecret: process.env.JOBBER_CLIENT_SECRET,
  redirectUri: getRedirectUri(),
  graphQLVersion: process.env.JOBBER_GRAPHQL_VERSION || DEFAULT_GRAPHQL_VERSION,
  refreshToken: process.env.JOBBER_REFRESH_TOKEN,
  setupKey: process.env.JOBBER_SETUP_KEY,
});

const base64Url = input =>
  Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');

const randomToken = bytes => base64Url(crypto.randomBytes(bytes));

const sha256 = value => crypto.createHash('sha256').update(value).digest();

const missingConfig = config =>
  ['clientId', 'clientSecret', 'redirectUri'].filter(key => !config[key]);

const cookieOptions = () => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax',
  maxAge: 10 * 60 * 1000,
});

const assertSetupKey = (req, res, config) => {
  if (!config.setupKey) {
    return true;
  }

  const providedKey = req.query.setupKey || req.body?.setupKey || req.get('x-gq-jobber-setup-key');
  if (providedKey === config.setupKey) {
    return true;
  }

  res.status(401).json({ error: 'Invalid or missing Jobber setup key.' });
  return false;
};

const tokenRequest = body => {
  const params = new URLSearchParams(body);

  return axios
    .post(TOKEN_URL, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    .then(response => response.data);
};

const refreshAccessToken = config =>
  tokenRequest({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    grant_type: 'refresh_token',
    refresh_token: config.refreshToken,
  });

const queryJobber = (accessToken, graphQLVersion, query, variables = {}) =>
  axios
    .post(
      GRAPHQL_URL,
      { query, variables },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-JOBBER-GRAPHQL-VERSION': graphQLVersion,
          'Content-Type': 'application/json',
        },
      }
    )
    .then(response => response.data);

const getAccount = (accessToken, graphQLVersion) =>
  queryJobber(
    accessToken,
    graphQLVersion,
    `query GetAccount {
      account {
        id
        name
      }
    }`
  );

const compact = obj =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (value != null && value !== '') {
      acc[key] = value;
    }
    return acc;
  }, {});

const normalizeLead = body => {
  const lead = body?.lead || body || {};
  const nameParts = (lead.name || 'Gutter Quotes Lead').trim().split(/\s+/);
  const firstName = lead.firstName || nameParts[0] || 'Gutter';
  const lastName = lead.lastName || nameParts.slice(1).join(' ') || 'Lead';
  const projectSummary = [
    'Gutter Quotes lead',
    lead.service ? `Service: ${lead.service}` : null,
    lead.city || lead.state || lead.zip
      ? `Location: ${[lead.city, lead.state, lead.zip].filter(Boolean).join(', ')}`
      : null,
    lead.timeline ? `Timeline: ${lead.timeline}` : null,
    lead.notes ? `Notes: ${lead.notes}` : null,
  ]
    .filter(Boolean)
    .join(' | ');

  return {
    firstName,
    lastName,
    companyName: lead.companyName || projectSummary,
    email: lead.email,
    phone: lead.phone,
    address: compact({
      street1: lead.street1 || lead.address,
      city: lead.city,
      province: lead.state,
      postalCode: lead.zip,
      country: lead.country || 'US',
    }),
  };
};

const createClientLead = (accessToken, graphQLVersion, lead) => {
  const input = compact({
    firstName: lead.firstName,
    lastName: lead.lastName,
    companyName: lead.companyName,
  });

  if (lead.email) {
    input.emails = [{ description: 'MAIN', primary: true, address: lead.email }];
  }

  if (lead.phone) {
    input.phones = [{ description: 'MAIN', primary: true, number: lead.phone }];
  }

  if (Object.keys(lead.address).length > 0) {
    input.billingAddress = lead.address;
  }

  return queryJobber(
    accessToken,
    graphQLVersion,
    `mutation CreateGutterQuotesClient($input: ClientCreateAttributes!) {
      clientCreate(input: $input) {
        client {
          id
          firstName
          lastName
          name
          isLead
          jobberWebUri
        }
        userErrors {
          message
          path
        }
      }
    }`,
    { input }
  );
};

const status = (req, res) => {
  const config = getConfig();

  res.status(200).json({
    configured: missingConfig(config).length === 0,
    missing: missingConfig(config),
    hasRefreshToken: !!config.refreshToken,
    redirectUri: config.redirectUri,
    graphQLVersion: config.graphQLVersion,
    endpoints: {
      connect: '/api/jobber/connect?setupKey=YOUR_SETUP_KEY',
      callback: '/api/jobber/callback',
      testLead: '/api/jobber/test-lead',
    },
  });
};

const connect = (req, res) => {
  const config = getConfig();
  const missing = missingConfig(config);

  if (missing.length > 0) {
    return res.status(503).json({ error: 'Jobber app credentials are not configured.', missing });
  }

  if (!assertSetupKey(req, res, config)) {
    return null;
  }

  const state = randomToken(24);
  const verifier = randomToken(48);
  const challenge = base64Url(sha256(verifier));

  res.cookie(STATE_COOKIE, JSON.stringify({ state, verifier }), cookieOptions());

  const authorizeUrl = new URL(AUTHORIZATION_URL);
  authorizeUrl.searchParams.set('response_type', 'code');
  authorizeUrl.searchParams.set('client_id', config.clientId);
  authorizeUrl.searchParams.set('redirect_uri', config.redirectUri);
  authorizeUrl.searchParams.set('state', state);
  authorizeUrl.searchParams.set('code_challenge', challenge);
  authorizeUrl.searchParams.set('code_challenge_method', 'S256');

  return res.redirect(authorizeUrl.toString());
};

const callback = (req, res) => {
  const config = getConfig();
  const cookie = req.cookies?.[STATE_COOKIE];
  const missing = missingConfig(config);

  if (missing.length > 0) {
    return res.status(503).send(`Jobber app credentials are not configured: ${missing.join(', ')}`);
  }

  if (!cookie) {
    return res.status(400).send('Missing Jobber OAuth state cookie. Start again from /api/jobber/connect.');
  }

  let stateData = null;
  try {
    stateData = JSON.parse(cookie);
  } catch (e) {
    return res.status(400).send('Invalid Jobber OAuth state cookie. Start again from /api/jobber/connect.');
  }

  if (req.query.state !== stateData.state) {
    return res.status(400).send('Jobber OAuth state mismatch. Start again from /api/jobber/connect.');
  }

  if (req.query.error) {
    return res.status(400).send(`Jobber authorization failed: ${req.query.error}`);
  }

  res.clearCookie(STATE_COOKIE);

  return tokenRequest({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    grant_type: 'authorization_code',
    code: req.query.code,
    redirect_uri: config.redirectUri,
    code_verifier: stateData.verifier,
  })
    .then(tokens => Promise.all([tokens, getAccount(tokens.access_token, config.graphQLVersion)]))
    .then(([tokens, accountResponse]) => {
      const account = accountResponse?.data?.account;
      res.status(200).send(`
        <!doctype html>
        <html>
          <head><title>Jobber connected</title></head>
          <body style="font-family: Inter, Arial, sans-serif; line-height: 1.5; padding: 32px; max-width: 760px;">
            <h1>Jobber connected</h1>
            <p>Connected account: <strong>${account?.name || 'Unknown account'}</strong></p>
            <p>Account ID: <code>${account?.id || 'Unknown'}</code></p>
            <p>Copy this refresh token into Render as <code>JOBBER_REFRESH_TOKEN</code>. Treat it like a password.</p>
            <textarea readonly style="width: 100%; min-height: 120px;">${tokens.refresh_token}</textarea>
            <p>After saving the env var and redeploying, test with <code>POST /api/jobber/test-lead</code>.</p>
          </body>
        </html>
      `);
    })
    .catch(e => {
      const message = e.response?.data || e.message;
      res.status(502).send(`Jobber OAuth token exchange failed: ${JSON.stringify(message)}`);
    });
};

const testLead = (req, res) => {
  const config = getConfig();
  const missing = missingConfig(config);

  if (missing.length > 0) {
    return res.status(503).json({ error: 'Jobber app credentials are not configured.', missing });
  }

  if (!config.refreshToken) {
    return res.status(409).json({
      error: 'JOBBER_REFRESH_TOKEN is not configured. Connect a Jobber account first.',
    });
  }

  if (!assertSetupKey(req, res, config)) {
    return null;
  }

  const lead = normalizeLead(req.body);

  return refreshAccessToken(config)
    .then(tokens => createClientLead(tokens.access_token, config.graphQLVersion, lead))
    .then(jobberResponse => {
      const payload = jobberResponse?.data?.clientCreate;
      const userErrors = payload?.userErrors || [];

      if (jobberResponse.errors || userErrors.length > 0) {
        return res.status(422).json({
          error: 'Jobber rejected the lead payload.',
          jobberErrors: jobberResponse.errors,
          userErrors,
        });
      }

      return res.status(200).json({
        ok: true,
        client: payload.client,
      });
    })
    .catch(e => {
      const statusCode = e.response?.status || 502;
      const detail = e.response?.data || e.message;
      res.status(statusCode).json({ error: 'Jobber lead delivery failed.', detail });
    });
};

module.exports = {
  status,
  connect,
  callback,
  testLead,
};
