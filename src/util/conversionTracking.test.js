import { trackConversionEvent, trackLeadEvent, trackProIntent } from './conversionTracking';

describe('conversionTracking', () => {
  beforeEach(() => {
    window.gtag = jest.fn();
    window.plausible = jest.fn();
    window.fbq = jest.fn();
  });

  afterEach(() => {
    delete window.gtag;
    delete window.plausible;
    delete window.fbq;
  });

  it('sends compacted lead generation events to installed tracking tools', () => {
    trackLeadEvent('homeowner_quote_started', {
      zip_code: '28211',
      empty_value: '',
    });

    expect(window.gtag).toHaveBeenCalledWith('event', 'generate_lead', {
      event_category: 'lead_generation',
      lead_type: 'homeowner_quote_started',
      zip_code: '28211',
    });
    expect(window.plausible).toHaveBeenCalledWith('generate_lead', {
      props: {
        event_category: 'lead_generation',
        lead_type: 'homeowner_quote_started',
        zip_code: '28211',
      },
    });
    expect(window.fbq).toHaveBeenCalledWith('track', 'Lead', {
      event_category: 'lead_generation',
      lead_type: 'homeowner_quote_started',
      zip_code: '28211',
    });
  });

  it('tracks pro intent as a custom event', () => {
    trackProIntent('package_email', { plan: 'Growth Lead Bank' });

    expect(window.gtag).toHaveBeenCalledWith('event', 'pro_intent', {
      event_category: 'lead_generation',
      intent_type: 'package_email',
      plan: 'Growth Lead Bank',
    });
    expect(window.fbq).toHaveBeenCalledWith('trackCustom', 'pro_intent', {
      event_category: 'lead_generation',
      intent_type: 'package_email',
      plan: 'Growth Lead Bank',
    });
  });

  it('does nothing when no event name is provided', () => {
    trackConversionEvent();

    expect(window.gtag).not.toHaveBeenCalled();
    expect(window.plausible).not.toHaveBeenCalled();
    expect(window.fbq).not.toHaveBeenCalled();
  });
});
