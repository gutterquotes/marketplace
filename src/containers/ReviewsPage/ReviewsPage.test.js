import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';

import ReviewsPage from './ReviewsPage';

const { fireEvent, screen } = testingLibrary;

describe('ReviewsPage', () => {
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

  it('renders curated reviews and filters them by service', () => {
    render(<ReviewsPage scrollingDisabled={false} />);

    expect(screen.getByText('What homeowners noticed after the quote.')).toBeInTheDocument();
    expect(screen.getByText('The leak over our dining room is gone')).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(18);

    fireEvent.click(screen.getByRole('button', { name: 'Gutter guards' }));

    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(screen.getByText('Better flow without a guard upsell')).toBeInTheDocument();
    expect(screen.queryByText('The leak over our dining room is gone')).not.toBeInTheDocument();
  });
});
