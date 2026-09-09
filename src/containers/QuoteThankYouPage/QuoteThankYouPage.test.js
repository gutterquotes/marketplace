import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';

import QuoteThankYouPage from './QuoteThankYouPage';

const { screen } = testingLibrary;

describe('QuoteThankYouPage', () => {
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

  it('renders next steps and roofline add-ons', () => {
    render(<QuoteThankYouPage scrollingDisabled={false} />);

    expect(
      screen.getByRole('heading', { name: 'Your gutter request is in motion.' })
    ).toBeInTheDocument();
    expect(screen.getByText('Permanent under-eave lighting')).toBeInTheDocument();
    expect(screen.getByText('Gutter guards')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Add photos or details' })).toHaveAttribute(
      'href',
      '/listings'
    );
  });
});
