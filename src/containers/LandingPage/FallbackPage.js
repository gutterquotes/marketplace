import React from 'react';

import { NamedLink } from '../../components';
import logoImage from '../../assets/gutter-quotes-logo.png';

import css from './FallbackPage.module.css';

const services = [
  {
    title: 'Seamless gutters',
    text: 'Compare installers for new aluminum, copper, steel, and custom-fit systems.',
  },
  {
    title: 'Gutter guards',
    text: 'Find guard options that match your roofline, tree coverage, and budget.',
  },
  {
    title: 'Repairs and replacement',
    text: 'Fix leaks, sagging runs, storm damage, fascia issues, and failed sections.',
  },
  {
    title: 'Cleaning and maintenance',
    text: 'Book seasonal cleanouts, downspout clearing, and drainage tune-ups.',
  },
  {
    title: 'Downspouts and drainage',
    text: 'Route water away from foundations with extensions, drains, and smarter flow.',
  },
  {
    title: 'Commercial gutters',
    text: 'Source qualified pros for multifamily, retail, office, and light commercial work.',
  },
];

const steps = [
  {
    label: 'Tell us about the home',
    text: 'Share your ZIP code, project type, timeline, photos, and a few details that matter.',
  },
  {
    label: 'Get matched with gutter pros',
    text: 'Your request reaches local contractors who actually handle that service area and job type.',
  },
  {
    label: 'Compare with confidence',
    text: 'Review responses, ask follow-up questions, and choose the best fit without pressure.',
  },
];

const stats = ['Free to request', 'Verified local pros', 'Installation, guards, repair'];

const FallbackPage = () => {
  return (
    <main className={css.root}>
      <section className={css.hero}>
        <div className={css.heroInner}>
          <div className={css.heroContent}>
            <img src={logoImage} alt="Gutter Quotes" className={css.heroLogo} />
            <p className={css.kicker}>The smarter way to hire gutter pros</p>
            <h1>The future of gutter services starts with one trusted request.</h1>
            <p className={css.lead}>
              Compare local experts for gutter installation, guards, repairs, cleaning, and
              drainage work. Gutter Quotes helps homeowners move from problem to price without
              calling every company in town.
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
                Join as a pro
              </NamedLink>
            </div>
            <ul className={css.proof}>
              {stats.map(stat => (
                <li key={stat}>{stat}</li>
              ))}
            </ul>
          </div>
          <aside className={css.quotePanel} aria-label="Example gutter quote request">
            <div className={css.panelTop}>
              <span>Project request</span>
              <strong>Ready for pros</strong>
            </div>
            <h2>Install seamless gutters and guards before storm season</h2>
            <div className={css.requestMeta}>
              <span>Single-family home</span>
              <span>Two stories</span>
              <span>Photos attached</span>
            </div>
            <div className={css.matchBox}>
              <span className={css.matchScore}>4</span>
              <p>qualified local pros can review this request today.</p>
            </div>
            <NamedLink name="SearchPage" className={css.cardAction}>
              Browse gutter pros
            </NamedLink>
          </aside>
        </div>
      </section>

      <section className={css.section}>
        <div className={css.sectionHeading}>
          <p className={css.kicker}>Built for homeowners</p>
          <h2>Stop guessing who to call. Start with the right gutter specialist.</h2>
          <p>
            Gutter work is too important for a generic directory. We focus the entire experience on
            protecting the roofline, foundation, siding, landscaping, and long-term value of the
            home.
          </p>
        </div>
        <div className={css.stepGrid}>
          {steps.map((step, index) => (
            <div key={step.label} className={css.stepItem}>
              <span>{index + 1}</span>
              <h3>{step.label}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={css.serviceSection}>
        <div className={css.sectionHeading}>
          <p className={css.kicker}>Every gutter need</p>
          <h2>One platform for installation, protection, repair, and maintenance.</h2>
        </div>
        <div className={css.serviceGrid}>
          {services.map(service => (
            <div key={service.title} className={css.serviceItem}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={css.splitSection}>
        <div>
          <p className={css.kicker}>For homeowners</p>
          <h2>Clear choices, better questions, fewer surprises.</h2>
          <p>
            See who is interested, compare fit, and move the conversation forward with the details
            contractors need to price real work. No endless search tabs. No blind phone list.
          </p>
        </div>
        <div>
          <p className={css.kicker}>For gutter companies</p>
          <h2>Meet homeowners who are already planning the project.</h2>
          <p>
            Build a focused profile, receive relevant requests, and spend less time filtering out
            jobs that are outside your service area, trade, or install capacity.
          </p>
        </div>
      </section>

      <section className={css.finalCta}>
        <div>
          <p className={css.kicker}>Gutter Quotes nationwide</p>
          <h2>The home service platform gutters deserved from the beginning.</h2>
          <p>
            A dedicated marketplace can make gutter projects faster to start, easier to compare,
            and better for the homeowners and pros doing the work.
          </p>
        </div>
        <NamedLink
          name="SignupForUserTypePage"
          params={{ userType: 'customer' }}
          className={css.primaryAction}
        >
          Start a free request
        </NamedLink>
      </section>
    </main>
  );
};

export default FallbackPage;
