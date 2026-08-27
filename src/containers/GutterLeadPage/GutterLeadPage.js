import React from 'react';

import { NamedLink, Page, TopbarSimplified } from '../../components';
import GutterQuotesFooter from '../FooterContainer/GutterQuotesFooter';
import logoImage from '../../assets/gutter-quotes-logo.png';

import css from './GutterLeadPage.module.css';

const leadSignals = [
  'Project type',
  'ZIP code',
  'Timeline',
  'Property type',
  'Lead access status',
  'AI project brief',
];

const steps = [
  {
    title: 'A homeowner starts a gutter request',
    text: 'They choose installation, replacement, guards, repair, cleaning, downspouts, or drainage and share the details needed to quote.',
  },
  {
    title: 'The request is structured for your market',
    text: 'Gutter Quotes organizes the request by service, location, urgency, and project signals so it can be evaluated fast.',
  },
  {
    title: 'You review limited public details',
    text: 'Pros can see enough to understand fit before private homeowner contact information is unlocked.',
  },
  {
    title: 'You buy the lead and move quickly',
    text: 'When the project fits your crew, service area, and calendar, you can take action while intent is still fresh.',
  },
];

const serviceLines = [
  'Seamless gutter installation leads',
  'Gutter replacement leads',
  'Gutter guard leads',
  'Gutter repair leads',
  'Gutter cleaning leads',
  'Downspout and drainage leads',
  'Commercial gutter leads',
  'Storm damage gutter leads',
];

const metrics = [
  { value: 'Gutter-only', label: 'built for one high-value exterior trade' },
  { value: 'Real-time', label: 'new homeowner requests flow to the board' },
  { value: 'Local', label: 'filter by the ZIPs and markets you serve' },
  { value: 'Selective', label: 'choose which leads are worth buying' },
];

const GutterLeadPage = props => {
  const { scrollingDisabled } = props;

  return (
    <Page
      title="High-intent homeowner gutter leads in your area | Gutter Quotes"
      description="Get high-intent homeowner gutter leads for installation, guards, replacement, repair, cleaning, downspouts, and drainage projects in your service area."
      scrollingDisabled={scrollingDisabled}
    >
      <TopbarSimplified />
      <main className={css.root}>
        <section className={css.hero}>
          <div className={css.heroTop}>
            <NamedLink name="LandingPage" className={css.logoLink}>
              <img src={logoImage} alt="Gutter Quotes" className={css.logo} />
            </NamedLink>
            <nav className={css.nav} aria-label="Gutter lead navigation">
              <NamedLink name="GutterProPage">For pros</NamedLink>
              <a href="#how">How leads work</a>
              <a href="#lead-form">Get leads</a>
            </nav>
          </div>

          <div className={css.heroGrid}>
            <div className={css.heroCopy}>
              <p className={css.kicker}>Gutter lead generation</p>
              <h1>High-intent homeowner gutter leads in your area.</h1>
              <p className={css.lead}>
                Reach homeowners who are actively requesting gutter installation, guards,
                replacement, repair, cleaning, and drainage quotes. Gutter Quotes turns broad
                demand into structured local opportunities your team can act on fast.
              </p>
              <div className={css.actions}>
                <NamedLink
                  name="SignupForUserTypePage"
                  params={{ userType: 'provider' }}
                  className={css.primaryAction}
                >
                  Get gutter leads
                </NamedLink>
                <NamedLink name="SearchPage" className={css.secondaryAction}>
                  Preview request board
                </NamedLink>
              </div>
            </div>

            <aside className={css.leadCard} aria-label="Example gutter lead">
              <div className={css.cardHeader}>
                <span>New homeowner request</span>
                <strong>Ready now</strong>
              </div>
              <h2>Seamless gutter replacement near 28211</h2>
              <div className={css.signalGrid}>
                {leadSignals.map(signal => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>
              <div className={css.deliveryPanel}>
                <strong>Best-fit pro alert</strong>
                <p>Two-story home, replacement timeline under 30 days, gutter guards considered.</p>
              </div>
            </aside>
          </div>
        </section>

        <section className={css.metrics} aria-label="Gutter leads platform advantages">
          {metrics.map(metric => (
            <div key={metric.value}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </section>

        <section id="how" className={css.section}>
          <div className={css.sectionIntro}>
            <p className={css.kicker}>How gutter leads work</p>
            <h2>Built for contractors who care about speed, fit, and ROI.</h2>
            <p>
              Generic lead platforms make gutters compete with every other home service category.
              This page is built around the work your crews actually sell, schedule, and install.
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

        <section className={css.splitSection}>
          <div>
            <p className={css.kicker}>Lead categories</p>
            <h2>Every major gutter revenue line, packaged for local demand.</h2>
            <p>
              The goal is not more noise. The goal is a focused pipeline of homeowners who have a
              specific gutter problem and enough intent to request quotes.
            </p>
          </div>
          <div className={css.serviceGrid}>
            {serviceLines.map(service => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </section>

        <section id="lead-form" className={css.leadFormSection}>
          <div>
            <p className={css.kicker}>Get leads in your area</p>
            <h2>Start with your trade, ZIP, and service radius.</h2>
            <p>
              Create a contractor account now. As the marketplace opens market by market, your
              profile can be ready to receive and buy matching homeowner requests.
            </p>
          </div>
          <form className={css.formCard}>
            <label>
              <span>Primary trade</span>
              <select defaultValue="Gutters" aria-label="Primary trade">
                <option>Gutters</option>
              </select>
            </label>
            <label>
              <span>Company ZIP</span>
              <input defaultValue="28211" inputMode="numeric" aria-label="Company ZIP" />
            </label>
            <label>
              <span>Monthly lead goal</span>
              <select defaultValue="25-50" aria-label="Monthly lead goal">
                <option>10-25</option>
                <option>25-50</option>
                <option>50-100</option>
                <option>100+</option>
              </select>
            </label>
            <NamedLink
              name="SignupForUserTypePage"
              params={{ userType: 'provider' }}
              className={css.primaryAction}
            >
              Start getting leads
            </NamedLink>
          </form>
        </section>
      </main>
      <GutterQuotesFooter />
    </Page>
  );
};

export default GutterLeadPage;
