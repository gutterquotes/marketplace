// Run with the same server environment as the web service. Never logs lead contact details.
require('dotenv').config();
const { config, integration, notify } = require('../server/api/homeowner-quotes');
(async () => {
  const c = config();
  if (Object.values(c).some(value => !value)) throw new Error('Intake configuration is incomplete');
  let page = 1;
  let failures = 0;
  do {
    const query = new URLSearchParams({
      authorId: c.authorId,
      states: 'pendingApproval,published,closed',
      page: String(page),
      perPage: '100',
    });
    const result = await integration(c, `listings/query?${query}`);
    for (const listing of result.data || []) {
      if (listing.attributes.privateData?.leadNotification?.status === 'pending') {
        try {
          await notify(c, listing);
          console.log('Notification sent:', listing.id);
        } catch (_) {
          failures++;
          console.error('Notification remains pending:', listing.id);
        }
      }
    }
    if (page >= result.meta.totalPages) break;
    page++;
  } while (true);
  if (failures) process.exitCode = 1;
})().catch(() => {
  console.error('Notification retry failed');
  process.exitCode = 1;
});
