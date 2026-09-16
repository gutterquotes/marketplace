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

    expect(screen.getByText('One request. Less time calling around.')).toBeInTheDocument();
    expect(screen.getByText('A repair instead of a full replacement')).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(18);

    fireEvent.click(screen.getByRole('button', { name: 'Gutter guards' }));

    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(screen.getByText('We skipped the expensive guard package')).toBeInTheDocument();
    expect(screen.queryByText('A repair instead of a full replacement')).not.toBeInTheDocument();
  });
});
