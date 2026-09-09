const isBrowser = typeof window !== 'undefined';

const compactParams = params =>
  Object.keys(params || {}).reduce((acc, key) => {
    const value = params[key];
    return value === undefined || value === null || value === '' ? acc : { ...acc, [key]: value };
  }, {});

export const trackConversionEvent = (eventName, params = {}) => {
  if (!isBrowser || !eventName) {
    return;
  }

  const eventParams = compactParams({
    event_category: 'lead_generation',
    ...params,
  });

  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }

  if (window.plausible) {
    window.plausible(eventName, { props: eventParams });
  }

  if (window.fbq) {
    if (eventName === 'generate_lead') {
      window.fbq('track', 'Lead', eventParams);
    } else {
      window.fbq('trackCustom', eventName, eventParams);
    }
  }
};

export const trackLeadEvent = (leadType, params = {}) => {
  trackConversionEvent('generate_lead', {
    lead_type: leadType,
    ...params,
  });
};

export const trackProIntent = (intentType, params = {}) => {
  trackConversionEvent('pro_intent', {
    intent_type: intentType,
    ...params,
  });
};
