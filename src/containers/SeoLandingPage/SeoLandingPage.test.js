import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';

import SeoLandingPage, { createSeoGuideSchema } from './SeoLandingPage';
import { findSeoPageBySlug, seoPages } from './seoPageData';

const { screen } = testingLibrary;

describe('SeoLandingPage', () => {
  beforeAll(() => {
    window.matchMedia =
      window.matchMedia ||
      function matchMedia() {
        return {
          matches: false,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
        };
      };
  });

  it('renders a cost guide page', () => {
    render(<SeoLandingPage params={{ seoSlug: 'gutter-installation-cost' }} scrollingDisabled={false} />);

    expect(screen.getByRole('heading', { name: 'Gutter Installation Cost' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Start a free gutter request' })[0]).toHaveAttribute(
      'href',
      '/quote'
    );
  });

  it('includes all planned guide pages', () => {
    expect(seoPages).toHaveLength(42);
    expect(findSeoPageBySlug('gutter-guard-installers-near-me').title).toBe(
      'Gutter Guard Installers Near Me'
    );
    expect(findSeoPageBySlug('pay-per-lead-gutter-marketing').title).toBe(
      'Pay Per Lead Gutter Marketing'
    );
  });

  it('creates article, FAQ, and breadcrumb structured data', () => {
    const page = findSeoPageBySlug('are-gutter-guards-worth-it');
    const schema = createSeoGuideSchema({
      page,
      marketplaceRootURL: 'https://gutterquotes.com',
    });

    expect(schema.map(item => item['@type'])).toEqual(['Article', 'FAQPage', 'BreadcrumbList']);
    expect(schema[0].headline).toBe('Are Gutter Guards Worth It');
    expect(schema[1].mainEntity[1].name).toBe(
      'Can Gutter Quotes help with are gutter guards worth it?'
    );
  });
});
