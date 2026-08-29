import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';

import ValueFilterCaseStudyPage from './ValueFilterCaseStudyPage';

const { screen } = testingLibrary;

describe('ValueFilterCaseStudyPage', () => {
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

  it('renders the ValueFilter pro case study with proof and package links', () => {
    render(<ValueFilterCaseStudyPage scrollingDisabled={false} />);

    expect(
      screen.getByRole('heading', {
        name:
          'How ValueFilter grew from $100k in month one to a $300k monthly revenue run rate with Gutter Quotes leads.',
      })
    ).toBeInTheDocument();
    expect(screen.getByText('ValueFilter')).toBeInTheDocument();
    expect(screen.getByText('$100k+')).toBeInTheDocument();
    expect(screen.getByText('$220k+')).toBeInTheDocument();
    expect(screen.getByText('$300k+')).toBeInTheDocument();
    expect(screen.getByText('Revenue timeline')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'View lead packages' })[0]).toHaveAttribute(
      'href',
      '/pros/lead-packages'
    );
    expect(screen.getByRole('link', { name: 'Visit ValueFilter' })).toHaveAttribute(
      'href',
      'https://valuefilter.com/'
    );
  });
});
