# Sharetribe Console Setup

Use this checklist in the Gutter Quotes developer environment:

- Console: https://console.sharetribe.com/o/gutterquotes/m/gutterquotes-dev/welcome
- Public marketplace URL: pending Console setup

## General

- Marketplace name: `Gutter Quotes`
- Currency: `USD`
- Launch market posture: nationwide
- Homeowner launch price: free
- Installer launch price: free during controlled launch
- Local `.env`: fill the client ID, optional client secret, Stripe publishable test key, and map token from the `gutterquotes-dev` Console project.

## Listing Type

Keep the local code and Console aligned with this request-first negotiation listing type:

| Field | Value |
|---|---|
| Listing type ID | `post-request` |
| Label | `Post a request` |
| Transaction process | `default-negotiation` |
| Process alias | `default-negotiation/release-1` |
| Unit type | `request` |
| Price field | disabled |
| Location field | disabled for launch; use ZIP/project fields |
| Messaging attachments | enabled |
| Customer counter-offer | enabled |
| Provider update offer | enabled |

## Listing Fields

Create public listing fields matching `src/config/configListing.js`. These fields describe homeowner project requests so providers can browse and filter qualified opportunities.

| Key | Type | Purpose |
|---|---|---|
| `serviceNeeded` | enum | Requested gutter service |
| `projectZip` | text | ZIP code for matching |
| `homeType` | enum | Property type |
| `timeline` | enum | Urgency and scheduling |
| `projectDetails` | text | Homeowner description |

Add search schemas for:

- `listingType` as enum
- `serviceNeeded` as enum
- `projectZip` as text, if ZIP filtering is needed in Console/API queries

## Transaction Fields

The `default-negotiation` process already supports requests, offers, counter-offers, provider offer updates, messaging, and reviews. Keep project data on the request listing at launch. Add transaction fields later only for structured provider quote metadata that should live on the transaction.

Recommended later provider quote fields:

| Key | Type | Purpose |
|---|---|---|
| `estimatedStartWindow` | enum | Provider availability |
| `warrantyIncluded` | text | Quote warranty summary |
| `scopeNotes` | text | Provider scope assumptions |

## User Fields

Create or verify user fields matching `src/config/configUser.js`.

| Key | Type | Scope | Applies to |
|---|---|---|---|
| `userType` | enum | public | all users |
| `companyName` | text | public | `provider` users |
| `providerType` | enum | public | `provider` users |
| `licenseAndInsurance` | boolean | public | `provider` users |
| `serviceStates` | text | public | `provider` users |
| `serviceRadiusMiles` | long | public | `provider` users |
| `homeZip` | text | protected | `customer` users |

## Seed Data

Before inviting real users, create sample installer profiles in:

- Charlotte, NC
- Atlanta, GA
- Dallas, TX
- Phoenix, AZ
- Chicago, IL

Each profile should include services, materials, service area, a minimum job size, warranty, and several project images.
