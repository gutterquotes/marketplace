import React from 'react';

import { NamedLink } from '../../components';
import logoImage from '../../assets/gutter-quotes-logo.png';

import css from './FallbackPage.module.css';

const services = [
  'Seamless gutter installation',
  'Gutter guards',
  'Gutter replacement',
  'Gutter repair',
  'Gutter cleaning',
  'Downspouts and drainage',
];

const markets = ['Charlotte', 'Atlanta', 'Dallas', 'Phoenix', 'Chicago'];

const FallbackPage = () => {
  return (
    <main className={css.root}>
      <section className={css.hero}>
        <div className={css.heroContent}>
          <img src={logoImage} alt="Gutter Quotes" className={css.heroLogo} />
          <p className={css.kicker}>Free quote request · local gutter pros</p>
          <h1>One request. Multiple gutter quotes.</h1>
          <p className={css.lead}>
            Tell us what your home needs and compare responses from gutter professionals without
            calling around or browsing a directory first.
          </p>
          <div className={css.actions}>
            <NamedLink
              name="SignupForUserTypePage"
              params={{ userType: 'customer' }}
              className={css.primaryAction}
            >
              Get free quotes
            </NamedLink>
            <NamedLink
              name="SignupForUserTypePage"
              params={{ userType: 'provider' }}
              className={css.secondaryAction}
            >
              Join as a contractor
            </NamedLink>
          </div>
          <ul className={css.proof}>
            <li>Free request</li>
            <li>Local pros</li>
            <li>No obligation</li>
          </ul>
        </div>
        <aside className={css.quoteCard} aria-label="Example quote request">
          <div className={css.cardHeader}>
            <span>New request</span>
            <strong>28211</strong>
          </div>
          <h2>Gutter guards for a two-story home</h2>
          <dl>
            <div>
              <dt>Timeline</dt>
              <dd>This month</dd>
            </div>
            <div>
              <dt>Property</dt>
              <dd>Single-family home</dd>
            </div>
            <div>
              <dt>Need</dt>
              <dd>Compare installed pricing and warranty options.</dd>
            </div>
          </dl>
          <NamedLink name="SearchPage" className={css.cardAction}>
            View active requests
          </NamedLink>
        </aside>
      </section>

      <section className={css.section}>
        <div className={css.sectionHeading}>
          <p className={css.kicker}>Built for high-intent jobs</p>
          <h2>Start with the services homeowners already search for.</h2>
        </div>
        <div className={css.serviceGrid}>
          {services.map(service => (
            <div key={service} className={css.serviceItem}>
              {service}
            </div>
          ))}
        </div>
      </section>

      <section className={css.splitSection}>
        <div>
          <p className={css.kicker}>For homeowners</p>
          <h2>Post the job once and let qualified pros respond.</h2>
          <p>
            Capture the project type, ZIP code, property type, timeline, and details needed for
            installers to decide whether the lead is a fit.
          </p>
        </div>
        <div>
          <p className={css.kicker}>For contractors</p>
          <h2>Browse project requests instead of chasing cold clicks.</h2>
          <p>
            The launch model is free while we build liquidity, with the product ready for verified
            provider profiles, paid lead access, memberships, and premium placement later.
          </p>
        </div>
      </section>

      <section className={css.launchSection}>
        <div>
          <p className={css.kicker}>Launch supply markets</p>
          <h2>Seed the first provider profiles where demand can be concentrated.</h2>
        </div>
        <ul className={css.marketList}>
          {markets.map(market => (
            <li key={market}>{market}</li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default FallbackPage;
