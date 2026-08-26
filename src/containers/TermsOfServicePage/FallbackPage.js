import React from 'react';
import loadable from '@loadable/component';

const PageBuilder = loadable(() =>
  import(/* webpackChunkName: "PageBuilder" */ '../PageBuilder/PageBuilder')
);

const fallbackTerms = `
# Terms of Service

Last updated: August 2026

These Terms of Service describe the baseline rules for using Gutter Quotes. They are placeholder launch terms and should be reviewed by qualified counsel before production launch.

## Marketplace role
Gutter Quotes is a marketplace platform that helps homeowners post gutter service requests and helps gutter companies discover relevant project opportunities. Gutter Quotes is not itself a gutter contractor, installer, inspector, insurer, or construction professional.

## Homeowner requests
Homeowners are responsible for submitting accurate project details, including the requested service, general location, timeline, property information, photos, and notes. Public request previews may show limited information so contractors can evaluate whether a project may fit their service area and expertise.

## Contractor accounts
Contractors are responsible for maintaining accurate profiles, service areas, business information, licensing information, insurance information, and communications. Gutter Quotes may require account approval, verification, payment, or other access steps before contractors can view full request details or contact homeowners.

## Leads, quotes, and transactions
Any quotes, estimates, appointments, contracts, warranties, workmanship, payments, cancellations, disputes, or services are between the homeowner and the contractor unless Gutter Quotes expressly states otherwise in a written agreement.

## Prohibited use
Users may not submit false information, scrape request data, harass other users, bypass marketplace access controls, misuse homeowner contact information, post spam, or use Gutter Quotes for unlawful or unsafe activity.

## No professional advice
Content on Gutter Quotes is for general marketplace and project-planning purposes only. It is not legal, tax, insurance, engineering, building-code, or construction advice.

## Changes
Gutter Quotes may update these terms as the marketplace, lead-access model, payment rules, and verification standards evolve.
`;

// Create fallback content (array of sections) in page asset format:
export const fallbackSections = {
  sections: [
    {
      sectionType: 'article',
      sectionId: 'terms',
      appearance: { fieldType: 'customAppearance', backgroundColor: '#ffffff' },
      title: { fieldType: 'heading1', content: 'Terms of Service' },
      blocks: [
        {
          blockType: 'defaultBlock',
          blockId: 'hero-content',
          text: {
            fieldType: 'markdown',
            content: fallbackTerms,
          },
        },
      ],
    },
  ],
  meta: {
    pageTitle: {
      fieldType: 'metaTitle',
      content: 'Terms of Service | Gutter Quotes',
    },
    pageDescription: {
      fieldType: 'metaDescription',
      content: 'Terms of Service for Gutter Quotes homeowners and gutter contractors.',
    },
  },
};

// This is the fallback page, in case there's no Terms of Service asset defined in Console.
const FallbackPage = props => {
  return <PageBuilder pageAssetsData={fallbackSections} {...props} />;
};

export default FallbackPage;
