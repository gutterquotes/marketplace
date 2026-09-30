# Password-free homeowner requests

The `/quote` form submits directly to `POST /api/homeowner-quotes`. It does not create
homeowner accounts, sign visitors in, or send them through the listing editor.
Returning homeowners can use an existing email without a sign-in barrier.

Requests are operator-owned `pendingApproval` listings in Sharetribe. Names, email,
phone, free-text notes, consent timestamp, and notification status are in listing
`privateData`. Only the structured project summary and random request reference are
in public fields. Review requests in Console; they are not automatically published.
These intake records do not create a homeowner account or an in-app conversation.

Notifications go only to `leads@gutterquotes.com`. Replies use the homeowner's email.
The implementation uses Resend's HTTP API and adds no dependencies.

## Required configuration before merge or production deployment

In Render, open `gutter-quotes-marketplace` > Environment and set server-only values:

| Variable | Value to supply |
| --- | --- |
| `SHARETRIBE_INTEGRATION_CLIENT_ID` | Live Sharetribe Integration API application ID |
| `SHARETRIBE_INTEGRATION_CLIENT_SECRET` | Its secret (not the Marketplace API secret) |
| `GQ_INTAKE_AUTHOR_ID` | UUID of an active operator-controlled marketplace user that owns intake listings |
| `RESEND_API_KEY` | Resend API key authorized to send from the verified domain |
| `GQ_LEAD_EMAIL_FROM` | A verified sender, for example `Gutter Quotes <quotes@gutterquotes.com>` after that sender/domain is verified |

Keep the existing frontend Marketplace API configuration. Never prefix these secret
variables with `REACT_APP_`, commit secrets, or paste them into a PR. No live credentials
or verified sender were available during implementation. Do not merge this change
until these values and the retry process below are configured and smoke-tested.

## Email recovery

Saving in Sharetribe happens before sending the email. A notification failure does not
lose the lead or ask the homeowner to submit again. It leaves a durable `pending`
notification in private data and writes only the listing ID to server logs.

Configure an authorized scheduler in the same environment to run every five minutes:

```sh
node scripts/retry-lead-notifications.js
```

The command paginates operator listings, sends pending notifications and marks them
sent. It exits nonzero when any notifications remain unsuccessful. Alert on job failures.
A scheduler has not been provisioned by this change; hosting costs/credentials may apply.
Resend idempotency keys suppress repeat sends within its 24-hour retention window.
An email accepted by Resend is not a guarantee of inbox delivery; monitor provider bounces.

## Verification before enabling

1. Confirm the author belongs to the intended Live marketplace and is operator-controlled.
2. Submit one clearly marked test request with an address controlled by the operator.
3. Confirm the pending listing and all private contact/project details in Sharetribe Console.
4. Confirm the notification arrives at `leads@gutterquotes.com` and Reply targets the test address.
5. Retry a request after a simulated network failure: verify the request reference is reused.
6. Exercise email failure/recovery in a test environment and confirm the scheduled retry.

Automated tests mock external services; they do not prove live configuration or email delivery.
Request references allow lookup on retry, and a bounded in-memory lock coordinates requests
within one server process. Sharetribe search plus creation is not an atomic upsert; before
scaling to multiple instances, use a shared durable idempotency store. Search indexing delays
can also affect deduplication across process restarts. Rate limits are per server instance.
