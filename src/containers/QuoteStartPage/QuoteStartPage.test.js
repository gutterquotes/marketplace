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

  it('updates the project brief from homeowner inputs', () => {
    render(<QuoteStartPage scrollingDisabled={false} />);

    expect(screen.getByText('Tell us what your home needs.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Gutter repair' }));
    fireEvent.change(screen.getByLabelText('ZIP code'), { target: { value: '30301' } });
    fireEvent.change(screen.getByLabelText('Timeline'), {
      target: { value: 'Emergency repair' },
    });

    expect(
      screen.getByText('Your exact address and contact details stay private until the next step.')
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: 'Continue free request' }));
    const savedDraft = JSON.parse(window.localStorage.getItem('gutterQuotes.requestDraft.v1'));
    expect(savedDraft).toMatchObject({
      title: 'Seamless gutter installation + Gutter repair near 30301',
      listingType: 'post-request',
      publicData: {
        serviceNeeded: 'installation',
        serviceNeededList: ['installation', 'repair'],
        selectedServices: ['Seamless gutter installation', 'Gutter repair'],
        projectZip: '30301',
        timeline: 'emergency',
      },
    });
  });

  it('lets homeowners select multiple gutter services and keep not sure yet exclusive', () => {
    render(<QuoteStartPage scrollingDisabled={false} />);

    const installation = screen.getByRole('button', { name: 'Seamless gutter installation' });
    const guards = screen.getByRole('button', { name: 'Gutter guards' });
    const notSure = screen.getByRole('button', { name: 'Not sure yet' });

    expect(screen.getByText(/Select all that apply/)).toBeInTheDocument();
    expect(installation).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(guards);
    expect(installation).toHaveAttribute('aria-pressed', 'true');
    expect(guards).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(notSure);
    expect(installation).toHaveAttribute('aria-pressed', 'false');
    expect(guards).toHaveAttribute('aria-pressed', 'false');
    expect(notSure).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(guards);
    expect(notSure).toHaveAttribute('aria-pressed', 'false');
    expect(guards).toHaveAttribute('aria-pressed', 'true');
  });

  it('lets homeowners add permanent under-eave lighting to a gutter request', () => {
    render(<QuoteStartPage scrollingDisabled={false} />);

    const lighting = screen.getByRole('button', { name: 'Permanent under-eave lighting' });
    fireEvent.click(lighting);
    fireEvent.click(screen.getByRole('link', { name: 'Continue free request' }));

    const savedDraft = JSON.parse(window.localStorage.getItem('gutterQuotes.requestDraft.v1'));
    expect(savedDraft).toMatchObject({
      title: 'Seamless gutter installation + Permanent under-eave lighting near 28211',
      publicData: {
        serviceNeeded: 'installation',
        serviceNeededList: ['installation', 'under-eave-lighting'],
        selectedServices: ['Seamless gutter installation', 'Permanent under-eave lighting'],
      },
    });
  });
});
