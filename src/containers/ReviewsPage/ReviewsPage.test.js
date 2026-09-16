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
    expect(screen.getByText('We could compare the real total')).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(12);

    fireEvent.click(screen.getByRole('button', { name: 'Gutter guards' }));

    expect(screen.queryAllByRole('article')).toHaveLength(0);
    expect(screen.queryByText('We could compare the real total')).not.toBeInTheDocument();
  });
});
