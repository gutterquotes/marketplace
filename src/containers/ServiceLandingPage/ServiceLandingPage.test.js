import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';

import ServiceLandingPage from './ServiceLandingPage';

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
});
