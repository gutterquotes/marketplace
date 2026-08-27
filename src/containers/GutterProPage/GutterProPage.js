import React from 'react';

import { NamedLink, Page, TopbarSimplified } from '../../components';
import GutterQuotesFooter from '../FooterContainer/GutterQuotesFooter';
import logoImage from '../../assets/gutter-quotes-logo.png';

import css from './GutterProPage.module.css';

const leadTypes = [
  'Seamless gutter installation',
  'Gutter replacement',
  'Gutter guards',
  'Gutter repair',
  'Gutter cleaning',
  'Downspouts and drainage',
];

const steps = [
  {
    title: 'Homeowners post gutter requests',
    text: 'Structured intake captures service type, ZIP, property details, timeline, notes, and request signals.',
  },
  {
    title: 'You browse limited public previews',
    text: 'See enough to judge fit while homeowner contact details stay private before lead access.',
  },
  {
    title: 'Buy the leads worth pursuing',
    text: 'Focus spend on opportunities that match your crew, service area, calendar, and revenue targets.',
  },
  {
    title: 'Win the job with speed and clarity',
    text: 'Use the project brief to respond faster, ask sharper questions, and submit stronger quotes.',
  },
];

const proofPoints = [
  { value: 'Gutter-only', label: 'no generic home service noise' },
  { value: 'AI-ready', label: 'project briefs from structured intake' },
  { value: 'Reverse', label: 'homeowners request, pros compete' },
  { value: 'Nationwide', label: 'built to expand city by city' },
];

const GutterProPage = props => {
  const { scrollingDisabled } = props;

  return (
    <Page
      title="Get gutter leads and homeowner requests | Gutter Quotes Pro"
      description="Join Gutter Quotes to browse homeowner gutter requests, buy high-intent leads, and grow your gutter installation, repair, guard, cleaning, and drainage business."
      scrollingDisabled={scrollingDisabled}
    >
      <TopbarSimplified />
      <main className={css.root}>
        <section className={css.hero}>
          <div className={css.heroTop}>
            <img src={logoImage} alt="Gutter Quotes" className={css.logo} />
            <nav className={css.nav} aria-label="Gutter pro navigation">
              <NamedLink name="GutterLeadPage">Gutter leads</NamedLink>
              <a href="#how">How it works</a>
              <a href="#lead-types">Lead types</a>
              <a href="#signup">Get started</a>
            </nav>
          </div>

          <div className={css.heroGrid}>
            <div className={css.heroCopy}>
              <p className={css.kicker}>Gutter Quotes for pros</p>
              <h1>Grow your gutter company with quote-ready homeowner requests.</h1>
              <p className={css.lead}>
                Stop fighting inside a giant general contractor directory. Gutter Quotes is the
                focused reverse marketplace where homeowners post gutter projects and qualified
                pros choose the leads that fit.
              </p>
              <div className={css.actions}>
                <NamedLink
                  name="SignupForUserTypePage"
                  params={{ userType: 'provider' }}
                  className={css.primaryAction}
                >
                  Join as a gutter pro
                </NamedLink>
                <NamedLink name="GutterLeadPage" className={css.secondaryAction}>
                  Explore gutter leads
                </NamedLink>
              </div>
            </div>

            <aside className={css.leadConsole} aria-label="Gutter lead preview">
              <div className={css.consoleHeader}>
                <span>Lead preview</span>
                <strong>92% fit</strong>
              </div>
              <h2>Gutter guard installation near 30301</h2>
              <dl>
                <div>
                  <dt>Public</dt>
                  <dd>ZIP, service type, property type, timeline</dd>
                </div>
                <div>
                  <dt>Private</dt>
                  <dd>Name, phone, exact address, full notes, photos</dd>
                </div>
                <div>
                  <dt>Best for</dt>
                  <dd>Guard installers serving Metro Atlanta this month</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section className={css.proofBand} aria-label="Why gutter pros use Gutter Quotes">
          {proofPoints.map(point => (
            <div key={point.value}>
              <strong>{point.value}</strong>
              <span>{point.label}</span>
            </div>
          ))}
        </section>

        <section id="how" className={css.section}>
          <div className={css.sectionIntro}>
            <p className={css.kicker}>How it works</p>
            <h2>Built for speed-to-lead, but with smarter fit.</h2>
            <p>
              Most lead platforms sell volume. Gutter Quotes is designed to make each opportunity
              easier to evaluate before your team spends time chasing it.
            </p>
          </div>
          <div className={css.stepGrid}>
            {steps.map((step, index) => (
              <article key={step.title} className={css.stepCard}>
                <span>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="lead-types" className={css.splitSection}>
          <div>
            <p className={css.kicker}>Lead types</p>
            <h2>One vertical. Every serious gutter revenue line.</h2>
            <p>
              Installation crews, guard specialists, repair teams, cleaning routes, and drainage
              contractors all need different opportunities. The marketplace starts with structured
              request data so the board can become more useful over time.
            </p>
          </div>
          <div className={css.leadTypeGrid}>
            {leadTypes.map(type => (
              <span key={type}>{type}</span>
            ))}
          </div>
        </section>

        <section id="signup" className={css.signupPanel}>
          <div>
            <p className={css.kicker}>Launch partner offer</p>
            <h2>Be early in your market before homeowner demand gets crowded.</h2>
            <p>
              Create your pro account, define your service area, and get ready to buy the first
              homeowner requests that match your gutter business.
            </p>
          </div>
          <div className={css.formCard}>
            <label>
              <span>Primary service</span>
              <select defaultValue="Gutter installation" aria-label="Primary service">
                {leadTypes.map(type => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Service ZIP</span>
              <input defaultValue="30301" inputMode="numeric" aria-label="Service ZIP" />
            </label>
            <NamedLink
              name="SignupForUserTypePage"
              params={{ userType: 'provider' }}
              className={css.primaryAction}
            >
              Start contractor signup
            </NamedLink>
          </div>
        </section>
      </main>
      <GutterQuotesFooter />
    </Page>
  );
};

export default GutterProPage;
