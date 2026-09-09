import React from 'react';

import { NamedLink, Page, TopbarSimplified } from '../../components';
import { trackConversionEvent } from '../../util/conversionTracking';

import css from './QuoteThankYouPage.module.css';

const nextSteps = [
  'Your request details help local gutter pros understand the job before they respond.',
  'Keep an eye on your email and account for contractor interest and next-step messages.',
  'Add photos or extra notes if they help explain access, roofline height, drainage, or damage.',
];

const addOns = [
  {
    title: 'Gutter guards',
    text: 'Ask about leaf protection while contractors are already reviewing the gutter system.',
  },
  {
    title: 'Downspout drainage',
    text: 'Move roof water farther from the foundation, landscaping, crawlspace, or basement.',
  },
  {
    title: 'Permanent under-eave lighting',
    text: 'Upgrade the roofline with discreet year-round accent, holiday, and security lighting.',
  },
];

const QuoteThankYouPage = props => {
  const { scrollingDisabled } = props;

  const handleAddDetailsClick = () => {
    trackConversionEvent('quote_thank_you_action', {
      action: 'add_details',
      page_path: '/quote/thank-you',
    });
  };

  return (
    <Page
      title="Your gutter quote request is started | Gutter Quotes"
      description="Your Gutter Quotes request is started. See what happens next and add details that help local gutter pros understand your project."
      scrollingDisabled={scrollingDisabled}
    >
      <TopbarSimplified />
      <main className={css.root}>
        <section className={css.hero}>
          <p className={css.kicker}>Request started</p>
          <h1>Your gutter request is in motion.</h1>
          <p className={css.lead}>
            You have taken the important first step. The clearer your request is, the easier it is
            for the right gutter pros to understand the job and respond with useful next steps.
          </p>
          <div className={css.actions}>
            <NamedLink name="ManageListingsPage" className={css.primaryAction} onClick={handleAddDetailsClick}>
              Add photos or details
            </NamedLink>
            <NamedLink name="LandingPage" className={css.secondaryAction}>
              Back to home
            </NamedLink>
          </div>
        </section>

        <section className={css.nextSteps} aria-label="What happens next">
          {nextSteps.map((step, index) => (
            <article key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </article>
          ))}
        </section>

        <section className={css.addOns}>
          <div>
            <p className={css.kicker}>Smart roofline upgrades</p>
            <h2>Worth asking about while pros are reviewing your home.</h2>
          </div>
          <div className={css.addOnGrid}>
            {addOns.map(addOn => (
              <article key={addOn.title}>
                <h3>{addOn.title}</h3>
                <p>{addOn.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </Page>
  );
};

export default QuoteThankYouPage;
