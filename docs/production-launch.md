# Production Launch

Use this checklist to deploy the custom Gutter Quotes Sharetribe Web Template to a public production URL.

## Current Status

- Code is pushed to `main` at https://github.com/gutterquotes/marketplace.
- Local production build passes.
- Sharetribe Console `gutterquotes-dev` is configured for local development.
- Live Sharetribe activation is blocked until the marketplace subscribes to the Extend plan.

## Sharetribe Live Environment

The custom-code frontend needs a Live Sharetribe environment on the Extend plan before real users can launch on the production marketplace.

1. In Sharetribe Console, click `Go live`.
2. Select the `Extend` plan for custom-code hosting.
3. Use the Dev environment as the source if prompted.
4. Switch the Live environment to custom code mode under `Build -> Advanced -> Hosting mode`.
5. Copy the Live environment values into the production host:
   - `REACT_APP_SHARETRIBE_SDK_CLIENT_ID`
   - `SHARETRIBE_SDK_CLIENT_SECRET`

Keep the client secret only in the hosting provider environment settings. Do not commit it to Git.

## Render Deployment

This repository includes `render.yaml`, so Render can create the production web service from the GitHub repo.

1. Connect Render to `https://github.com/gutterquotes/marketplace`.
2. Create a Blueprint or Web Service from this repo.
3. Use branch `main`.
4. Confirm:
   - Build command: `yarn install --frozen-lockfile && yarn build`
   - Start command: `yarn start`
   - Node version: `22.22.0`
5. Set the required secret/environment values:
   - `REACT_APP_MARKETPLACE_ROOT_URL=https://www.gutterquotes.com`
   - `REACT_APP_SHARETRIBE_SDK_CLIENT_ID=<live-client-id>`
   - `SHARETRIBE_SDK_CLIENT_SECRET=<live-client-secret>`
   - `REACT_APP_MAPBOX_ACCESS_TOKEN=<map-token>`
   - `REACT_APP_STRIPE_PUBLISHABLE_KEY=<stripe-publishable-key>`, when payments are enabled

For a pre-launch smoke test, use Render's temporary `*.onrender.com` URL as `REACT_APP_MARKETPLACE_ROOT_URL`, deploy, and update the value to the real domain after DNS is ready.

## Domain

Recommended launch domain:

- Primary: `https://www.gutterquotes.com`
- Redirect/apex: `https://gutterquotes.com`

After Render provides DNS targets:

1. Add `www.gutterquotes.com` as a custom domain in Render.
2. Add the CNAME record Render gives you at the DNS provider.
3. Add `gutterquotes.com` as an apex domain if Render supports it for the service.
4. Add the A or ALIAS/ANAME records Render provides for the apex.
5. Update `REACT_APP_MARKETPLACE_ROOT_URL` to `https://www.gutterquotes.com`.
6. Redeploy the service.
7. Verify:
   - `https://www.gutterquotes.com`
   - `https://www.gutterquotes.com/signup/customer`
   - `https://www.gutterquotes.com/signup/provider`
   - `https://www.gutterquotes.com/s`

## Launch Blockers

- Sharetribe Live environment must be activated on Extend before production can use real users and live Marketplace API access.
- DNS access for `gutterquotes.com` is required to connect the real domain.
- If the current marketing site at `gutterquotes.com` must stay live, deploy the marketplace first at `app.gutterquotes.com` instead.
