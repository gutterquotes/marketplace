import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';

import QuoteThankYouPage from './QuoteThankYouPage';
import { useLocation } from 'react-router-dom';
jest.mock('react-router-dom', () => ({ ...jest.requireActual('react-router-dom'), useLocation: jest.fn() }));

const { screen } = testingLibrary;

describe('QuoteThankYouPage', () => {
  beforeEach(() => useLocation.mockReturnValue({ search: '' }));
  it('shows guest confirmation without requiring an account', () => {
    useLocation.mockReturnValue({ search: '?submitted=1' });
    render(<QuoteThankYouPage scrollingDisabled={false} />);
    expect(screen.queryByRole('link', { name: 'Add photos or details' })).not.toBeInTheDocument();
    expect(screen.getByText('QuoteThankYouPage.confirmation')).toBeInTheDocument();
  });
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
    expect(screen.getByRole('heading', { name: 'Gutter guards' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Add photos or details' })).toHaveAttribute(
      'href',
      '/listings'
    );
  });
});
