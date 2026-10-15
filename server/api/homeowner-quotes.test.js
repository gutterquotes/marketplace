const lead = {
  firstName: 'Test',
  lastName: 'Homeowner',
  email: 'test@example.com',
  phone: '2025550100',
  zipCode: '30301',
  notes: 'Call my private number',
  timeline: 'This month',
  propertyType: 'Single-family home',
  homeHeight: 'Two stories',
  services: ['installation'],
  requestId: '12345678-1234-4123-8123-123456789abc',
  termsAccepted: true,
};
const reply = body => ({ ok: true, json: async () => body });
let handler, res;
beforeEach(() => {
  jest.resetModules();
  Object.assign(process.env, {
    SHARETRIBE_INTEGRATION_CLIENT_ID: 'id',
    SHARETRIBE_INTEGRATION_CLIENT_SECRET: 'secret',
    GQ_INTAKE_AUTHOR_ID: 'operator',
    RESEND_API_KEY: 'email-key',
    GQ_LEAD_EMAIL_FROM: 'quotes@example.com',
  });
  handler = require('./homeowner-quotes');
  res = { set: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };
  global.fetch = jest.fn();
});
afterEach(() => {
  delete global.fetch;
});

function upstream({ emailFails = false } = {}) {
  let saved;
  fetch.mockImplementation(async (url, options) => {
    if (url.endsWith('/auth/token')) return reply({ access_token: 'token', expires_in: 3600 });
    if (url.includes('listings/query')) return reply({ data: saved ? [saved] : [] });
    if (url.includes('listings/create')) {
      saved = { id: 'listing-id', attributes: JSON.parse(options.body) };
      return reply({ data: saved });
    }
    if (url.includes('api.resend.com')) {
      if (emailFails) return { ok: false, status: 503 };
      return reply({ id: 'email-id' });
    }
    if (url.includes('listings/update')) {
      Object.assign(saved.attributes.privateData, JSON.parse(options.body).privateData);
      return reply({ data: saved });
    }
    throw new Error('Unexpected request');
  });
  return () => saved;
}

it('saves a private Sharetribe request and notifies only the configured leads inbox', async () => {
  const saved = upstream();
  await handler({ body: lead, ip: 'test' }, res);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(saved().attributes.state).toBe('pendingApproval');
  expect(saved().attributes.privateData.homeowner.email).toBe(lead.email);
  const publicFields = JSON.stringify([
    saved().attributes.publicData,
    saved().attributes.description,
  ]);
  expect(publicFields).not.toContain(lead.email);
  expect(publicFields).not.toContain(lead.phone);
  expect(publicFields).not.toContain(lead.notes);
  const email = fetch.mock.calls.find(([url]) => url.includes('api.resend.com'));
  expect(JSON.parse(email[1].body).to).toEqual(['leads@gutterquotes.com']);
  expect(JSON.parse(email[1].body).reply_to).toBe(lead.email);
});

it('rejects incomplete requests before contacting any service', async () => {
  await handler({ body: { ...lead, email: 'invalid', termsAccepted: false }, ip: 'test' }, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(fetch).not.toHaveBeenCalled();
});

it('fails closed when notification credentials are missing', async () => {
  delete process.env.RESEND_API_KEY;
  await handler({ body: lead, ip: 'test' }, res);
  expect(res.status).toHaveBeenCalledWith(503);
  expect(fetch).not.toHaveBeenCalled();
});

it('keeps the saved lead pending when email fails and does not duplicate it on retry', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  const saved = upstream({ emailFails: true });
  await handler({ body: lead, ip: 'test' }, res);
  await handler({ body: lead, ip: 'test' }, res);
  expect(res.json).toHaveBeenCalledWith({ ok: true });
  expect(saved().attributes.privateData.leadNotification.status).toBe('pending');
  expect(fetch.mock.calls.filter(([url]) => url.includes('listings/create'))).toHaveLength(1);
  console.error.mockRestore();
});

it('does not claim success or send email when Sharetribe rejects saving', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  fetch.mockResolvedValue({ ok: false, status: 503 });
  await handler({ body: lead, ip: 'test' }, res);
  expect(res.status).toHaveBeenCalledWith(502);
  expect(fetch.mock.calls.some(([url]) => url.includes('api.resend.com'))).toBe(false);
  console.error.mockRestore();
});
