////////////////////////////////////////////////////////////////////
// This file contains configs that add analytics integrations     //
////////////////////////////////////////////////////////////////////

// Note: These come from the analytics asset nowadays by default.
//       To use this built-in configuration, you need to remove the overwrite from configHelper.js (mergeAnalyticsConfig func)

// Optional
// Note that Google Analytics might need advanced opt-out option / cookie consent
// depending on jurisdiction (e.g. EU countries), since it relies on cookies.
export const googleAnalyticsId = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;

// Optional Google Ads conversion ID. This starts with "AW-".
export const googleAdsId = process.env.REACT_APP_GOOGLE_ADS_ID;

// Optional Meta Pixel ID for Facebook and Instagram ad attribution.
export const metaPixelId = process.env.REACT_APP_META_PIXEL_ID;

// Optional
// If you add this Plausible integration, you should first create an account in plausible.io
// This adds data-domains for Plausible script through environment variable: REACT_APP_PLAUSIBLE_DOMAINS
// https://plausible.io/docs/plausible-script#can-i-send-stats-to-multiple-dashboards-at-the-same-time
// You can add multiple domains separated by comma
// E.g. REACT_APP_PLAUSIBLE_DOMAINS=example1.com,example2.com
export const plausibleDomains = process.env.REACT_APP_PLAUSIBLE_DOMAINS;
