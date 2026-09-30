/** Public intake: operator-owned Sharetribe requests, with private contact details. */
const crypto = require('crypto');
const API = 'https://flex-integ-api.sharetribe.com/v1/integration_api';
const AUTH = 'https://flex-api.sharetribe.com/v1/auth/token';
const recipient = 'leads@gutterquotes.com';
const services = [
  'installation',
  'guards',
  'repair',
  'cleaning',
  'drainage',
  'under-eave-lighting',
];
const flights = new Map();
const limits = new Map();
let token;

const config = () => ({
  clientId: process.env.SHARETRIBE_INTEGRATION_CLIENT_ID,
  clientSecret: process.env.SHARETRIBE_INTEGRATION_CLIENT_SECRET,
  authorId: process.env.GQ_INTAKE_AUTHOR_ID,
  emailKey: process.env.RESEND_API_KEY,
  from: process.env.GQ_LEAD_EMAIL_FROM,
});

async function jsonRequest(url, options) {
  const response = await fetch(url, { ...options, signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`Upstream returned ${response.status}`);
  return response.json();
}

async function accessToken(c) {
  if (token?.expires > Date.now()) return token.value;
  const data = await jsonRequest(AUTH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: c.clientId,
      client_secret: c.clientSecret,
      grant_type: 'client_credentials',
      scope: 'integ',
    }).toString(),
  });
  token = { value: data.access_token, expires: Date.now() + (data.expires_in - 60) * 1000 };
  return token.value;
}

async function integration(c, path, body) {
  const bearer = await accessToken(c);
  return jsonRequest(`${API}/${path}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${bearer}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}

function validate(body) {
  if (!body || typeof body !== 'object') return null;
  const text = (key, max, optional = false) => {
    const value = body[key];
    return typeof value === 'string' &&
      value.trim().length <= max &&
      (optional || value.trim().length > 0)
      ? value.trim()
      : null;
  };
  const lead = {
    firstName: text('firstName', 100),
    lastName: text('lastName', 100),
    email: text('email', 254),
    phone: text('phone', 40),
    zipCode: text('zipCode', 10),
    notes: text('notes', 3000, true),
    timeline: text('timeline', 60),
    propertyType: text('propertyType', 60),
    homeHeight: text('homeHeight', 60),
    requestId: text('requestId', 36),
    services: body.services,
  };
  if (
    Object.values(lead).some(value => value == null) ||
    body.termsAccepted !== true ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      lead.requestId
    ) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) ||
    !/^\d{5}(-\d{4})?$/.test(lead.zipCode) ||
    lead.phone.replace(/\D/g, '').length < 10 ||
    !Array.isArray(lead.services) ||
    !lead.services.length ||
    lead.services.length > 6 ||
    !lead.services.every(service => services.includes(service)) ||
    !['This week', 'This month', 'Planning ahead', 'Emergency repair'].includes(lead.timeline) ||
    !['Single-family home', 'Townhome', 'Multifamily property', 'Commercial building'].includes(
      lead.propertyType
    ) ||
    !['One story', 'Two stories', 'Three stories or taller'].includes(lead.homeHeight)
  )
    return null;
  return lead;
}

async function notify(c, listing) {
  const lead = listing.attributes.privateData.homeowner;
  const text = [
    `New Gutter Quotes homeowner request`,
    `Sharetribe listing: ${listing.id}`,
    `Name: ${lead.firstName} ${lead.lastName}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `ZIP: ${lead.zipCode}`,
    `Services: ${lead.services.join(', ')}`,
    `Timeline: ${lead.timeline}`,
    `Property: ${lead.propertyType}`,
    `Height: ${lead.homeHeight}`,
    `Notes: ${lead.notes || '(none)'}`,
  ].join('\n');
  const result = await jsonRequest('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${c.emailKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `homeowner-quote/${listing.id}`,
    },
    body: JSON.stringify({
      from: c.from,
      to: [recipient],
      reply_to: lead.email,
      subject: `New gutter quote request — ${lead.zipCode}`,
      text,
    }),
  });
  if (!result.id) throw new Error('Email was not accepted');
  await integration(c, 'listings/update', {
    id: listing.id,
    privateData: {
      leadNotification: { status: 'sent', emailId: result.id, sentAt: new Date().toISOString() },
    },
  });
}

async function save(c, lead) {
  const fingerprint = crypto
    .createHash('sha256')
    .update(JSON.stringify(lead))
    .digest('hex');
  // Request references in descriptions let retries find a saved record without a custom search schema.
  const query = new URLSearchParams({
    authorId: c.authorId,
    keywords: lead.requestId,
    states: 'pendingApproval,published,closed',
    perPage: '100',
  });
  const existing = await integration(c, `listings/query?${query}`);
  let listing = existing.data?.find(
    item => item.attributes?.privateData?.requestId === lead.requestId
  );
  if (listing && listing.attributes.privateData.fingerprint !== fingerprint) {
    throw new Error('Request reference was reused with different information');
  }
  if (!listing) {
    const created = await integration(c, 'listings/create?expand=true', {
      authorId: c.authorId,
      state: 'pendingApproval',
      title: `Gutter request near ${lead.zipCode}: ${lead.services.join(', ')}`,
      description: `${lead.services.join(', ')}; ${lead.propertyType}; ${lead.homeHeight}; ${
        lead.timeline
      }.\nRequest reference: ${lead.requestId}`,
      publicData: {
        listingType: 'post-request',
        serviceNeeded: lead.services[0],
        serviceNeededList: lead.services,
        projectZip: lead.zipCode,
      },
      privateData: {
        homeowner: lead,
        requestId: lead.requestId,
        fingerprint,
        consent: { termsAccepted: true, receivedAt: new Date().toISOString() },
        leadNotification: { status: 'pending', to: recipient },
      },
    });
    listing = created.data;
    if (!listing?.id) throw new Error('Request was not saved');
  }
  if (listing.attributes.privateData.leadNotification?.status !== 'sent') {
    try {
      await notify(c, listing);
    } catch (_) {
      // The durable pending marker supports operator retries without losing the saved lead.
      console.error('homeowner-quote-notification-pending', listing.id);
    }
  }
  return { ok: true };
}

async function homeownerQuotes(req, res) {
  res.set('Cache-Control', 'no-store');
  const lead = validate(req.body);
  if (!lead)
    return res.status(400).json({ error: 'Please check your contact and project details.' });
  const c = config();
  if (Object.values(c).some(value => !value)) {
    return res
      .status(503)
      .json({ error: 'Quote requests are temporarily unavailable. Please try again later.' });
  }
  // Bounded per-instance rate limiting. No CAPTCHA or homeowner sign-in.
  const now = Date.now();
  for (const [key, value] of limits) if (value.until < now) limits.delete(key);
  const key = req.ip || 'unknown';
  const limit = limits.get(key) || { count: 0, until: now + 600000 };
  if (limit.count >= 10 || (!limits.has(key) && limits.size >= 10000)) {
    return res.status(429).json({ error: 'Please wait a few minutes before trying again.' });
  }
  limit.count += 1;
  limits.set(key, limit);
  // A single instance shares concurrent retries; saved references also survive restarts.
  const flightKey = crypto
    .createHash('sha256')
    .update(JSON.stringify(lead))
    .digest('hex');
  for (const [key, entry] of flights) {
    if (entry.expires < now) flights.delete(key);
  }
  let entry = flights.get(flightKey);
  if (!entry) {
    if (flights.size >= 1000) return res.status(429).json({ error: 'Please try again shortly.' });
    entry = { promise: save(c, lead), expires: now + 15 * 60 * 1000 };
    flights.set(flightKey, entry);
  }
  try {
    return res.status(200).json(await entry.promise);
  } catch (_) {
    flights.delete(flightKey);
    console.error('homeowner-quote-save-failed');
    return res.status(502).json({ error: 'We could not confirm your request. Please try again.' });
  }
}

module.exports = homeownerQuotes;
module.exports.notify = notify;
module.exports.integration = integration;
module.exports.config = config;
module.exports.validate = validate;
