# Jobber Private Beta Integration

This is the fastest path for the first paid Gutter Quotes customer that uses Jobber.

## What is built

- `GET /api/jobber/status`
- `GET /api/jobber/connect?setupKey=YOUR_SETUP_KEY`
- `GET /api/jobber/callback`
- `POST /api/jobber/test-lead`

The beta uses one connected Jobber account stored through Render environment variables. This is intentionally simpler than a public multi-account Jobber app because the marketplace does not yet have a database for third-party OAuth token storage.

## Render environment variables

- `JOBBER_CLIENT_ID`
- `JOBBER_CLIENT_SECRET`
- `JOBBER_SETUP_KEY`
- `JOBBER_REDIRECT_URI=https://gutterquotes.com/api/jobber/callback`
- `JOBBER_GRAPHQL_VERSION=2025-04-16`
- `JOBBER_REFRESH_TOKEN`

Set `JOBBER_REFRESH_TOKEN` after completing the OAuth connect flow.

## Jobber Developer Center settings

Use this callback URL:

```text
https://gutterquotes.com/api/jobber/callback
```

Enable the smallest scopes needed to create client leads. If Jobber returns `clientCreate` permission errors, confirm the app has client write permissions.

## First test payload

```bash
curl -X POST https://gutterquotes.com/api/jobber/test-lead \
  -H 'Content-Type: application/json' \
  -H 'x-gq-jobber-setup-key: YOUR_SETUP_KEY' \
  -d '{
    "lead": {
      "firstName": "Test",
      "lastName": "Homeowner",
      "email": "test@example.com",
      "phone": "555-555-1212",
      "service": "Seamless gutter installation",
      "city": "Charlotte",
      "state": "NC",
      "zip": "28211",
      "timeline": "This month",
      "notes": "This is a Gutter Quotes test lead."
    }
  }'
```

## Next production step

After the first client test works, add persistent token storage so each gutter pro can connect their own Jobber account from the Gutter Quotes dashboard.
