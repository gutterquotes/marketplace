import React from 'react';

import { NamedLink, Page, TopbarSimplified } from '../../components';
import GutterQuotesFooter from '../FooterContainer/GutterQuotesFooter';
import logoImage from '../../assets/gutter-quotes-logo.png';

import css from './ValueFilterCaseStudyPage.module.css';

const results = [
  { value: '$100k+', label: 'revenue attributed in month one' },
  { value: '$220k+', label: 'monthly revenue exceeded by month four' },
  { value: '$300k+', label: 'current monthly revenue run-rate target' },
  { value: 'Month 6', label: 'active Gutter Quotes partnership' },
];

const timeline = [
  {
    period: 'Month 1',
    title: '$100k+ in revenue attributed to Gutter Quotes leads',
    text: 'The first launch month proved that focused gutter demand could become real booked revenue when the contractor team moved quickly.',
  },
  {
    period: 'Month 4',
    title: '$220k+ monthly revenue milestone',
    text: 'As the lead flow, follow-up process, and market targeting improved, ValueFilter exceeded $220k in monthly revenue from Gutter Quotes leads.',
  },
  {
    period: 'Month 6',
    title: 'Tracking toward $300k+ monthly revenue',
    text: 'The partnership is now aimed at a $300k+ monthly revenue run rate from Gutter Quotes generated opportunities.',
  },
];

const systemSteps = [
  {
    title: 'Target the right local demand',
    text: 'Gutter Quotes focuses on homeowners with gutter installation, protection, drainage, repair, cleaning, and replacement needs in specific service areas.',
  },
  {
    title: 'Turn intent into a usable lead brief',
    text: 'Each opportunity is organized around service type, market, project details, and follow-up signals so a pro team can act quickly.',
  },
  {
    title: 'Keep improving the feedback loop',
    text: 'Lead quality, territory fit, booked appointments, and closed revenue guide where the next campaigns and markets should expand.',
  },
];

const caseStudyMailto =
  'mailto:mills@gutterquotes.com?subject=ValueFilter%20case%20study%20interest&body=I%20want%20to%20talk%20about%20Gutter%20Quotes%20lead%20flow%20for%20my%20gutter%20company.%20Company%20name%2C%20service%20area%2C%20monthly%20lead%20goal%2C%20and%20phone%3A';

const ValueFilterCaseStudyPage = props => {
  const { scrollingDisabled } = props;

  return (
    <Page
      title="ValueFilter case study | Gutter Quotes Pro"
      description="See how ValueFilter grew from $100k+ in month-one revenue to a $300k+ monthly revenue run-rate target from Gutter Quotes leads."
      scrollingDisabled={scrollingDisabled}
    >
      <TopbarSimplified />
      <main className={css.root}>
        <section className={css.hero}>
          <div className={css.heroTop}>
            <NamedLink name="GutterProPage" className={css.logoLink}>
              <img src={logoImage} alt="Gutter Quotes" className={css.logo} />
            </NamedLink>
            <nav className={css.nav} aria-label="Case study navigation">
              <NamedLink name="GutterProPage">For pros</NamedLink>
              <NamedLink name="GutterLeadPage">Gutter leads</NamedLink>
              <NamedLink name="GutterLeadPackagesPage">Lead packages</NamedLink>
              <a href="#results">Results</a>
            </nav>
          </div>

          <div className={css.heroGrid}>
            <div className={css.heroCopy}>
              <p className={css.kicker}>Gutter Quotes case study</p>
              <h1>
                How ValueFilter grew from $100k in month one to a $300k monthly
                revenue run rate with Gutter Quotes leads.
              </h1>
              <p className={css.lead}>
                ValueFilter is a gutter protection, seamless gutter, drainage, and commercial
                gutter company serving South Carolina, the Charlotte region, and Coastal Georgia.
                Gutter Quotes helped turn homeowner demand into a repeatable lead flow their team
                could work fast.
              </p>
              <div className={css.actions}>
                <a href={caseStudyMailto} className={css.primaryAction}>
                  Talk about my market
                </a>
                <NamedLink name="GutterLeadPackagesPage" className={css.secondaryAction}>
                  View lead packages
                </NamedLink>
              </div>
            </div>

            <aside className={css.resultCard} aria-label="ValueFilter case study summary">
              <span>First client success story</span>
              <strong>ValueFilter</strong>
              <p>
                A focused gutter company used Gutter Quotes generated leads to build measurable
                revenue momentum in its launch markets.
              </p>
              <a href="https://valuefilter.com/" target="_blank" rel="noopener noreferrer">
                Visit ValueFilter
              </a>
            </aside>
          </div>
        </section>

        <section id="results" className={css.results} aria-label="ValueFilter results">
          {results.map(result => (
            <div key={result.value}>
              <strong>{result.value}</strong>
              <span>{result.label}</span>
            </div>
          ))}
        </section>

        <section className={css.storySection}>
          <div className={css.sectionIntro}>
            <p className={css.kicker}>The company</p>
            <h2>A specialist gutter operator with multiple revenue lines.</h2>
            <p>
              ValueFilter sells gutter protection, seamless gutters, downspout drainage, repairs,
              replacements, commercial gutter work, and related water-management services. That mix
              made the company a strong fit for Gutter Quotes because one homeowner need can turn
              into several high-value project paths.
            </p>
          </div>
          <div className={css.storyCard}>
            <h3>The challenge</h3>
            <p>
              ValueFilter needed serious homeowner opportunities in the right service areas, not
              broad shared leads that every contractor chases at the same time. The goal was simple:
              keep the sales team working fresh gutter demand that could become appointments,
              estimates, and installed revenue.
            </p>
          </div>
        </section>

        <section className={css.systemSection}>
          <div className={css.sectionIntro}>
            <p className={css.kicker}>The Gutter Quotes system</p>
            <h2>Build demand, qualify intent, move fast, and measure revenue.</h2>
            <p>
              The operating system is built around high-intent homeowner lead flow, rapid handoff,
              and market feedback. That gives a gutter company a clearer answer to the only
              question that matters: did this source create booked revenue?
            </p>
          </div>
          <div className={css.systemGrid}>
            {systemSteps.map((step, index) => (
              <article key={step.title}>
                <span>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={css.timelineSection}>
          <div className={css.sectionIntro}>
            <p className={css.kicker}>Revenue timeline</p>
            <h2>From first-month proof to a larger monthly revenue target.</h2>
          </div>
          <div className={css.timeline}>
            {timeline.map(item => (
              <article key={item.period}>
                <span>{item.period}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <p className={css.disclaimer}>
            Revenue figures are based on ValueFilter performance attributed to Gutter Quotes lead
            flow. Results vary by market, offer, close rate, follow-up speed, crew capacity, and
            sales execution.
          </p>
        </section>

        <section className={css.ctaPanel}>
          <div>
            <p className={css.kicker}>For growing gutter companies</p>
            <h2>Want this kind of gutter lead flow in your market?</h2>
            <p>
              Gutter Quotes is onboarding select gutter pros with lead packages, pay-as-you-go
              lead access, and market-specific launch planning.
            </p>
          </div>
          <div className={css.ctaActions}>
            <a href={caseStudyMailto} className={css.primaryAction}>
              Talk about my market
            </a>
            <NamedLink name="GutterLeadPackagesPage" className={css.secondaryAction}>
              Compare packages
            </NamedLink>
          </div>
        </section>
      </main>
      <GutterQuotesFooter />
    </Page>
  );
};

export default ValueFilterCaseStudyPage;
