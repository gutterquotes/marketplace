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
        name: 'High-intent homeowner gutter leads in your area.',
      })
    ).toBeInTheDocument();
    expect(screen.getByText('Seamless gutter replacement near 28211')).toBeInTheDocument();
    expect(screen.getByText('Every major gutter revenue line, packaged for local demand.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Get gutter leads' })).toHaveAttribute(
      'href',
      '/signup/provider'
    );
    expect(screen.getByRole('link', { name: 'Preview request board' })).toHaveAttribute(
      'href',
      '/s'
    );
    expect(screen.getByRole('link', { name: 'See client results' })).toHaveAttribute(
      'href',
      '/pros/case-studies/valuefilter'
    );
  });
});
