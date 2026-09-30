import React from 'react';
import '@testing-library/jest-dom';
import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';
import { submitHomeownerQuote } from '../../util/api';
import QuoteStartPage from './QuoteStartPage';

jest.mock('../../util/api', () => ({
  ...jest.requireActual('../../util/api'),
  submitHomeownerQuote: jest.fn(),
}));
const { fireEvent, screen, waitFor } = testingLibrary;
const fill = () => {
  for (const [label, value] of Object.entries({
    'First name': 'Test',
    'Last name': 'Homeowner',
    Email: 'test@example.com',
    Phone: '2025550100',
    'ZIP code': '30301',
  }))
    fireEvent.change(screen.getByLabelText(label), { target: { value } });
  fireEvent.click(screen.getByRole('checkbox'));
};

describe('QuoteStartPage guest intake', () => {
  beforeEach(() => {
    window.matchMedia = () => ({
      matches: false,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
    });
    Object.defineProperty(window.crypto, 'randomUUID', {
      configurable: true,
      value: () => '12345678-1234-4123-8123-123456789abc',
    });
  });

  it('collects contact information without a password or account', async () => {
    submitHomeownerQuote.mockResolvedValue({ ok: true });
    render(<QuoteStartPage scrollingDisabled={false} />);
    expect(screen.queryByLabelText(/Password/)).not.toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
    expect(screen.getByLabelText('ZIP code')).toHaveValue('');
    fill();
    fireEvent.click(screen.getByRole('button', { name: 'Gutter repair' }));
    fireEvent.click(screen.getByRole('button', { name: 'Submit free request' }));
    await waitFor(() => expect(submitHomeownerQuote).toHaveBeenCalledTimes(1));
    expect(submitHomeownerQuote.mock.calls[0][0]).toMatchObject({
      firstName: 'Test',
      email: 'test@example.com',
      zipCode: '30301',
      services: ['installation', 'repair'],
      termsAccepted: true,
    });
    expect(submitHomeownerQuote.mock.calls[0][0]).not.toHaveProperty('password');
  });

  it('preserves information and the request reference when retrying a failure', async () => {
    submitHomeownerQuote.mockRejectedValue(new Error('Network error'));
    render(<QuoteStartPage scrollingDisabled={false} />);
    fill();
    fireEvent.click(screen.getByRole('button', { name: 'Submit free request' }));
    await screen.findByRole('alert');
    expect(screen.getByLabelText('Email')).toHaveValue('test@example.com');
    fireEvent.click(screen.getByRole('button', { name: 'Submit free request' }));
    await waitFor(() => expect(submitHomeownerQuote).toHaveBeenCalledTimes(2));
    expect(submitHomeownerQuote.mock.calls[0][0].requestId).toBe(
      submitHomeownerQuote.mock.calls[1][0].requestId
    );
  });

  it('keeps not sure exclusive and allows multiple services', () => {
    render(<QuoteStartPage scrollingDisabled={false} />);
    fireEvent.click(screen.getByRole('button', { name: 'Gutter guards' }));
    expect(screen.getByRole('button', { name: 'Seamless gutter installation' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    fireEvent.click(screen.getByRole('button', { name: 'Not sure yet' }));
    expect(screen.getByRole('button', { name: 'Gutter guards' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });
});
