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
    expect(screen.getByText('Package discounts from $999 to $9,999')).toBeInTheDocument();
    expect(screen.getByText('$2,499')).toBeInTheDocument();
    expect(screen.getByText('$9,999')).toBeInTheDocument();
    expect(screen.getByText('Jobber-ready roadmap')).toBeInTheDocument();
    expect(
      screen.getByText('ValueFilter is now tracking toward $300k+ in monthly revenue from Gutter Quotes leads after exceeding $220k in month four.')
    ).toBeInTheDocument();
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
