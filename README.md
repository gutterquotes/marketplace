# Gutter Quotes Marketplace

Gutter Quotes is a nationwide two-sided marketplace for homeowners who need gutter services and verified gutter companies or independent installers who want qualified project opportunities.

This repository starts from the current Sharetribe Web Template and customizes it for a request-first, Angi-style gutter marketplace.

## Marketplace URLs

- Sharetribe Console: https://console.sharetribe.com/o/gutterquotes/m/gutterquotes-dev/welcome
- Sharetribe public dev marketplace: pending Console setup
- GitHub repository: https://github.com/gutterquotes/marketplace

## Product Model

The first version uses Sharetribe's hosted marketplace backend and a custom React frontend.

- Homeowners post gutter project requests with service type, ZIP code, home type, timeline, details, and message attachments.
- Installers browse qualified project requests, ask questions, and submit offers through Sharetribe's negotiation flow.
- The initial monetization mode is free controlled launch, with the data model prepared for qualified lead fees, installer memberships, and optional transaction commissions later.

## Local Setup

Install dependencies:

```sh
yarn install
```

Create local environment configuration:

```sh
yarn run config
```

Use the Sharetribe Console application values for:

- `REACT_APP_SHARETRIBE_SDK_CLIENT_ID`
- `SHARETRIBE_SDK_CLIENT_SECRET`
- `REACT_APP_STRIPE_PUBLISHABLE_KEY`, when payments are enabled
- `REACT_APP_MAPBOX_ACCESS_TOKEN` or `REACT_APP_GOOGLE_MAPS_API_KEY`

Do not reuse credentials from another Sharetribe marketplace. The local `.env` file should be
filled from the `gutterquotes-dev` Console project.

Start development:

```sh
yarn run dev
```

## Current Customization

- Marketplace name defaults to `Gutter Quotes`.
- Branding color and placeholder SVG assets are set for the Gutter Quotes brand.
- Listing type is `post-request`, using Sharetribe's `default-negotiation` process for launch.
- Search is constrained to valid listing types.
- Nationwide default location suggestions are configured.
- User fields distinguish `homeowner` and `installer` accounts.

## Sharetribe Console Setup

Mirror the configuration in [docs/sharetribe-console-setup.md](docs/sharetribe-console-setup.md) before testing end-to-end flows.

## MVP Roadmap

1. Configure Sharetribe Console assets and test API application.
2. Create sample installer profiles in at least five metro areas.
3. Replace generic template copy on landing, search, listing, and inquiry screens.
4. Build a dedicated homeowner quote-request flow that can match up to five providers.
5. Add provider lead inbox states: new lead, accepted, quoted, won, lost.
6. Add verification workflow for license, insurance, reviews, and marketplace badges.
7. Enable Stripe only after the free launch flow is validated.
