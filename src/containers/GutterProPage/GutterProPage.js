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
  { value: 'Request-led', label: 'homeowners ask, pros respond' },
  { value: 'Nationwide', label: 'built to expand city by city' },
];

const leadRules = [
  {
    title: 'Preview before you buy',
    text: 'See the service type, ZIP area, property type, timeline, and project summary before deciding whether a lead fits.',
  },
  {
    title: 'Private details unlock after access',
    text: 'Homeowner contact info, exact address, full notes, photos, and direct messaging stay protected until the lead access step.',
  },
  {
    title: 'Built for disciplined spend',
    text: 'Use fit signals to avoid broad-directory noise and focus on jobs that match your crew, territory, and revenue goals.',
  },
];

const marketSignals = ['Installation demand', 'Guard interest', 'Repair urgency', 'Cleaning routes', 'Drainage work', 'Commercial jobs'];

const launchPlans = [
  {
    name: 'Pay as you go',
    price: '$75/lead',
    note: 'Best for testing lead quality before buying a package',
    features: [
      'Buy qualified homeowner leads one at a time',
      'No package commitment',
      'Upgrade to volume pricing when ready',
      'Best for validating one market',
    ],
  },
  {
    name: 'Volume lead packages',
    price: '$999+',
    note: 'Best for companies ready to scale in a target market',
    features: [
      '$999, $2,499, $4,999, and $9,999 packages',
      'Discounted effective lead rates with volume',
      'Market planning around your service area',
      'Custom packages available for larger operators',
    ],
  },
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
              <NamedLink name="GutterLeadPackagesPage">Lead packages</NamedLink>
              <NamedLink name="ValueFilterCaseStudyPage">Case study</NamedLink>
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
                Stop fighting over shared leads. Get exclusive, high-intent homeowner gutter leads
                in your service area from people actively asking for installation, guards, repair,
                replacement, cleaning, and drainage quotes.
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
                <NamedLink name="GutterLeadPackagesPage" className={css.secondaryAction}>
                  View lead packages
                </NamedLink>
                <NamedLink name="ValueFilterCaseStudyPage" className={css.secondaryAction}>
                  See ValueFilter results
                </NamedLink>
              </div>
            </div>

            <aside className={css.leadConsole} aria-label="Gutter lead preview">
              <div className={css.consoleHeader}>
                <span>Lead preview</span>
                <strong>Example</strong>
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
                <div>
                  <dt>Access model</dt>
                  <dd>Browse public preview, unlock private details only when the lead fits</dd>
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

        <section className={css.rulesSection}>
          <div className={css.sectionIntro}>
            <p className={css.kicker}>Lead marketplace mechanics</p>
            <h2>Designed so contractors can evaluate fit before spending.</h2>
            <p>
              The marketplace should feel transparent from day one. Homeowners share enough
              project context to attract the right specialists, while sensitive details stay gated.
            </p>
          </div>
          <div className={css.ruleGrid}>
            {leadRules.map(rule => (
              <article key={rule.title}>
                <h3>{rule.title}</h3>
                <p>{rule.text}</p>
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

        <section className={css.marketPanel}>
          <div>
            <p className={css.kicker}>Founding contractor advantage</p>
            <h2>Help open your local market before competitors pile in.</h2>
            <p>
              Early pros can define service areas, watch demand patterns, and prepare fast response
              workflows for the highest-intent gutter categories.
            </p>
          </div>
          <div className={css.marketSignals}>
            {marketSignals.map(signal => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </section>

        <section className={css.pricingSection} aria-label="Gutter pro lead pricing">
          <div className={css.sectionIntro}>
            <p className={css.kicker}>Lead pricing</p>
            <h2>Start at $75 per lead or lower your rate with volume packages.</h2>
            <p>
              Gutter companies can buy qualified homeowner leads one at a time or choose a package
              to reduce the effective cost per opportunity. Standard packages start at $999 and
              scale to $9,999, with custom volume available.
            </p>
            <NamedLink name="GutterLeadPackagesPage" className={css.inlineAction}>
              Compare volume lead packages
            </NamedLink>
            <NamedLink name="ValueFilterCaseStudyPage" className={css.inlineAction}>
              Read the ValueFilter case study
            </NamedLink>
          </div>
          <div className={css.priceGrid}>
            {launchPlans.map(plan => (
              <article key={plan.name} className={css.priceCard}>
                <div>
                  <span>{plan.name}</span>
                  <strong>{plan.price}</strong>
                  <p>{plan.note}</p>
                </div>
                <ul>
                  {plan.features.map(feature => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <a
                  className={css.primaryAction}
                  href={`mailto:mills@gutterquotes.com?subject=${encodeURIComponent(
                    `${plan.name} interest`
                  )}&body=${encodeURIComponent(
                    'I want to discuss Gutter Quotes lead pricing for my gutter company. Company name, service area, monthly lead goal, and phone:'
                  )}`}
                >
                  Discuss lead pricing
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="signup" className={css.signupPanel}>
          <div>
            <p className={css.kicker}>Contractor signup</p>
            <h2>Start with pay-as-you-go or choose a lead package.</h2>
            <p>
              Create your pro account, then email us your company name, service area, and best
              phone number. We will help you choose between $75 pay-as-you-go leads, a discounted
              volume package, or a custom market plan.
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
            <a
              href="mailto:mills@gutterquotes.com?subject=Gutter%20Quotes%20Lead%20Pricing&body=I%20want%20to%20discuss%20Gutter%20Quotes%20lead%20pricing.%20Company%20name%2C%20service%20area%2C%20monthly%20lead%20goal%2C%20and%20phone%3A"
              className={css.secondaryAction}
            >
              Email about lead pricing
            </a>
          </div>
        </section>
      </main>
      <GutterQuotesFooter />
    </Page>
  );
};

export default GutterProPage;
