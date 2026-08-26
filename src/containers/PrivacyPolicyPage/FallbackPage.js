import React from 'react';
import loadable from '@loadable/component';

const PageBuilder = loadable(() =>
  import(/* webpackChunkName: "PageBuilder" */ '../PageBuilder/PageBuilder')
);

const fallbackPrivacyPolicy = `
# Privacy Policy

Last updated: August 2026

This Privacy Policy describes how Gutter Quotes may collect, use, and protect information. It is placeholder launch copy and should be reviewed by qualified counsel before production launch.

## Information we may collect
Gutter Quotes may collect account information, contact details, homeowner request details, contractor profile information, service areas, messages, photos, payment-related metadata, device information, analytics data, and support communications.

## How information may be used
We may use information to operate the marketplace, match homeowner requests with relevant contractors, support account creation, manage lead access, improve the service, prevent abuse, send service messages, and comply with legal obligations.

## Public and private request details
Public request previews should show limited project information such as service type, general location, timeline, and property type. Homeowner names, direct contact details, exact addresses, full notes, and photos should only be shared through appropriate account, verification, and access steps.

## Contractors and homeowner information
Contractors who access homeowner information may only use it for the specific request and related gutter service communication. Selling, scraping, reusing, or redistributing homeowner data is not permitted.

## Service providers
Gutter Quotes may rely on vendors for hosting, marketplace infrastructure, payments, analytics, email, support, security, and related operations.

## Choices and requests
Users may be able to update account details, change communication preferences, or request help with privacy questions through marketplace support channels.

## Updates
This policy may be updated as the marketplace, lead-access model, verification rules, and production tooling evolve.
`;

// Create fallback content (array of sections) in page asset format:
export const fallbackSections = {
  sections: [
    {
      sectionType: 'article',
      sectionId: 'privacy',
      appearance: { fieldType: 'customAppearance', backgroundColor: '#ffffff' },
      title: { fieldType: 'heading1', content: 'Privacy Policy' },
      blocks: [
        {
          blockType: 'defaultBlock',
          blockId: 'hero-content',
          text: {
            fieldType: 'markdown',
            content: fallbackPrivacyPolicy,
          },
        },
      ],
    },
  ],
  meta: {
    pageTitle: {
      fieldType: 'metaTitle',
      content: 'Privacy Policy | Gutter Quotes',
    },
    pageDescription: {
      fieldType: 'metaDescription',
      content: 'Privacy Policy for Gutter Quotes homeowners and gutter contractors.',
    },
  },
};

// This is the fallback page, in case there's no Privacy Policy asset defined in Console.
const FallbackPage = props => {
  return <PageBuilder pageAssetsData={fallbackSections} {...props} />;
};

export default FallbackPage;
