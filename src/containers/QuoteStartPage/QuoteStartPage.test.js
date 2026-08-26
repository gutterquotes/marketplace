import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';

import QuoteStartPage from './QuoteStartPage';

const { fireEvent, screen } = testingLibrary;

describe('QuoteStartPage', () => {
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

  it('updates the AI project brief from homeowner inputs', () => {
    render(<QuoteStartPage scrollingDisabled={false} />);

    expect(screen.getByText('AI project brief')).toBeInTheDocument();
    expect(
      screen.getByText(/New seamless gutter installation near 28211/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Gutter repair' }));
    fireEvent.change(screen.getByLabelText('ZIP code'), { target: { value: '30301' } });
    fireEvent.change(screen.getByLabelText('Timeline'), {
      target: { value: 'Emergency repair' },
    });

    expect(
      screen.getByText(
        'Gutter repair request near 30301: Single-family home, two stories, emergency repair.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Private until lead access')).toBeInTheDocument();
  });
});
