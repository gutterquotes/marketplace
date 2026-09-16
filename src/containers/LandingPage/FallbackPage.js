import React from 'react';

import { NamedLink } from '../../components';
import GutterReviewCard from '../../components/GutterReviewCard/GutterReviewCard';
import logoImage from '../../assets/gutter-quotes-logo.png';
import { homepageReviews } from '../../data/gutterQuotesReviews';
import GutterQuotesFooter from '../FooterContainer/GutterQuotesFooter';

import css from './FallbackPage.module.css';

const launchTrust = [
  'Free for homeowners',
  'No obligation',
  'Your contact details stay private first',
];

const serviceOptions = [
  'Gutter installation',
  'Gutter guards',
  'Gutter repair',
  'Gutter cleaning',
  'Downspout drainage',
  'Permanent under-eave lighting',
];

const FallbackPage = () => {
  return (
    <main className={css.root}>
      <section className={css.hero}>
        <div className={css.topbar}>
          <img src={logoImage} alt="Gutter Quotes" className={css.logo} />
          <nav className={css.nav} aria-label="Main navigation">
            <NamedLink name="GutterProPage">
              For gutter pros
            </NamedLink>
            <NamedLink name="QuoteStartPage" className={css.navAction}>
              Get quotes
            </NamedLink>
          </nav>
        </div>

        <div className={css.heroGrid}>
          <div className={css.heroCopy}>
            <p className={css.kicker}>Gutter installation, guards, repair, cleaning, and drainage</p>
            <h1>Compare trusted gutter quotes near you.</h1>
            <p className={css.lead}>
              Tell us what your home needs. We help you create one clear request so local gutter
              pros can compete for the job.
            </p>
          </div>

          <div className={css.searchConsole} aria-label="Start a gutter project request">
            <div className={css.fieldGrid}>
              <label>
                <span>What do you need?</span>
                <select defaultValue="Gutter installation" aria-label="Service needed">
                  {serviceOptions.map(service => (
                    <option key={service}>{service}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>ZIP code</span>
                <input placeholder="Enter ZIP" aria-label="ZIP code" inputMode="numeric" />
              </label>
            </div>
            <NamedLink
              name="QuoteStartPage"
              className={css.searchButton}
            >
              Start a free gutter quote
            </NamedLink>

            <div className={css.trustRow}>
              {launchTrust.map(item => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={css.reviewSection}>
        <div className={css.reviewHeading}>
          <div>
            <p className={css.kicker}>Homeowner reviews</p>
            <h2>Less calling around. Better quotes.</h2>
          </div>
          <div className={css.reviewSummary}>
            <strong>4.8 out of 5</strong>
            <span>Homeowners saved time comparing local gutter pros</span>
          </div>
        </div>
        <div className={css.reviewGrid}>
          {homepageReviews.map(review => (
            <GutterReviewCard key={review.id} review={review} compact />
          ))}
        </div>
        <NamedLink name="ReviewsPage" className={css.allReviewsLink}>
          Read all homeowner reviews
        </NamedLink>
      </section>

      <section className={css.proSection}>
        <div>
          <p className={css.kicker}>Gutter pros</p>
          <h2>Need exclusive, high-intent homeowner gutter leads?</h2>
        </div>
        <NamedLink name="GutterProPage" className={css.secondaryAction}>
          Get leads in your area
        </NamedLink>
      </section>
      <GutterQuotesFooter />
    </main>
  );
};

export default FallbackPage;
