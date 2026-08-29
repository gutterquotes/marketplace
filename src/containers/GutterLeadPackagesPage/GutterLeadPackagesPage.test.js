import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';

import GutterLeadPackagesPage from './GutterLeadPackagesPage';

const { screen } = testingLibrary;

describe('GutterLeadPackagesPage', () => {
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

  it('renders the private pro lead package page', () => {
    render(<GutterLeadPackagesPage scrollingDisabled={false} />);

    expect(
      screen.getByRole('heading', {
        name: 'Buy high-intent gutter leads in packages and lower your cost per opportunity.',
      })
    ).toBeInTheDocument();
    expect(screen.getByText('Starter Lead Bank')).toBeInTheDocument();
    expect(screen.getByText('Territory Partner')).toBeInTheDocument();
    expect(screen.getAllByText('Private pro pricing')).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'See how leads work' })).toHaveAttribute(
      'href',
      '/pros/gutter-leads'
    );
  });
});
