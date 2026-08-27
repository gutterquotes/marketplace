import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';

import GutterProPage from './GutterProPage';

const { screen } = testingLibrary;

describe('GutterProPage', () => {
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

  it('renders the contractor acquisition page with signup and request board CTAs', () => {
    render(<GutterProPage scrollingDisabled={false} />);

    expect(
      screen.getByRole('heading', {
        name: 'Grow your gutter company with quote-ready homeowner requests.',
      })
    ).toBeInTheDocument();
    expect(screen.getByText('Gutter guard installation near 30301')).toBeInTheDocument();
    expect(screen.getByText('One vertical. Every serious gutter revenue line.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Join as a gutter pro' })).toHaveAttribute(
      'href',
      '/signup/provider'
    );
    expect(screen.getByRole('link', { name: 'View request board' })).toHaveAttribute('href', '/s');
  });
});
