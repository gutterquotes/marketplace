import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';

import GutterLeadPage from './GutterLeadPage';

const { screen } = testingLibrary;

describe('GutterLeadPage', () => {
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

  it('renders the high-intent gutter leads landing page', () => {
    render(<GutterLeadPage scrollingDisabled={false} />);

    expect(
      screen.getByRole('heading', {
        name: 'Exclusive gutter leads in your area.',
      })
    ).toBeInTheDocument();
    expect(screen.getByText('$75 pay as you go')).toBeInTheDocument();
    expect(screen.getByText('Lower effective rates with packages')).toBeInTheDocument();
    expect(screen.getByText('$2,499')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Start getting leads' })).toHaveAttribute(
      'href',
      '/signup/provider'
    );
    expect(screen.getByRole('link', { name: 'Read the case study' })).toHaveAttribute(
      'href',
      '/pros/case-studies/valuefilter'
    );
    expect(screen.getByRole('link', { name: 'View all packages' })).toHaveAttribute(
      'href',
      '/pros/lead-packages'
    );
  });
});
