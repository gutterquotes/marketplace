import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';
import { findCityBySlug } from '../CityLandingPage/cityData';

import ServiceLandingPage, { createServiceSchema } from './ServiceLandingPage';
import { findServiceBySlug } from './serviceData';

const { screen } = testingLibrary;

describe('ServiceLandingPage', () => {
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

  it('renders a service page', () => {
    render(<ServiceLandingPage params={{ serviceSlug: 'gutter-guards' }} scrollingDisabled={false} />);

    expect(screen.getByRole('heading', { name: 'Gutter Guard Installation Near You' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Start a free gutter request' })[0]).toHaveAttribute(
      'href',
      '/quote'
    );
  });

  it('renders a service and city page with optimized local phrase', () => {
    render(
      <ServiceLandingPage
        params={{ serviceSlug: 'underground-downspout-drain', citySlug: 'raleigh-nc' }}
        scrollingDisabled={false}
      />
    );

    expect(
      screen.getByRole('heading', {
        name: 'Underground Downspout Drain Installation Raleigh NC',
      })
    ).toBeInTheDocument();
    expect(screen.getByText('Underground Downspout Drain Installation Charlotte NC')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Get gutter leads' })[0]).toHaveAttribute(
      'href',
      '/pros'
    );
  });

  it('adds service and local area structured data', () => {
    render(
      <ServiceLandingPage
        params={{ serviceSlug: 'gutter-repair', citySlug: 'charlotte-nc' }}
        scrollingDisabled={false}
      />
    );

    const service = findServiceBySlug('gutter-repair');
    const city = findCityBySlug('charlotte-nc');
    const [serviceSchema] = createServiceSchema({
      service,
      city,
      headline: 'Gutter Repair Charlotte NC',
      description: 'Compare local gutter repair pros in Charlotte, NC.',
      marketplaceRootURL: 'https://gutterquotes.com',
    });

    expect(serviceSchema.name).toBe('Gutter Repair Charlotte NC');
    expect(serviceSchema.serviceType).toBe('Gutter Repair');
    expect(serviceSchema.areaServed.address.addressLocality).toBe('Charlotte');
    expect(serviceSchema.areaServed.address.addressRegion).toBe('NC');
  });
});
