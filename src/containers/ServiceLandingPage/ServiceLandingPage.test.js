import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';
import { findCityBySlug } from '../CityLandingPage/cityData';

import ServiceLandingPage, { createServiceSchema } from './ServiceLandingPage';
import { findServiceBySlug, gutterServices } from './serviceData';

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

  it('renders specialty material and gutter type city pages', () => {
    render(
      <ServiceLandingPage
        params={{
          serviceSlug: 'k-style-aluminum-seamless-gutter-installation',
          citySlug: 'charleston-sc',
        }}
        scrollingDisabled={false}
      />
    );

    expect(
      screen.getByRole('heading', {
        name: 'K-Style Aluminum Seamless Gutter Installation Charleston SC',
      })
    ).toBeInTheDocument();
    expect(screen.getByText('Copper Gutter Installation Charleston SC')).toBeInTheDocument();
    expect(screen.getByText('7 Inch Gutter Installation Charleston SC')).toBeInTheDocument();
  });

  it('includes specialty gutter services for city SEO generation', () => {
    expect(gutterServices.map(service => service.slug)).toEqual(
      expect.arrayContaining([
        'k-style-aluminum-seamless-gutter-installation',
        'copper-gutter-installation',
        'galvalume-gutter-installation',
        'half-round-gutter-installation',
        'metal-building-gutters',
        'commercial-gutters',
        '7-inch-gutter-installation',
        'copper-gutter-filter-installation',
      ])
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
