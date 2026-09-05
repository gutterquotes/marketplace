import React from 'react';

import { NamedLink, Page, TopbarSimplified } from '../../components';
import logoImage from '../../assets/gutter-quotes-logo.png';

import css from './GutterLeadPage.module.css';

const proofPoints = [
  'Exclusive homeowner gutter leads',
  '$75 pay as you go',
  'Package discounts from $999 to $9,999',
];

const packages = [
  { name: 'Pay as you go', price: '$75', detail: 'per exclusive qualified lead' },
  { name: 'Starter', price: '$999', detail: '15 lead credits, about $66.60/lead' },
  { name: 'Growth', price: '$2,499', detail: '42 lead credits, about $59.50/lead' },
  { name: 'Scale', price: '$4,999', detail: '92 lead credits, about $54.34/lead' },
  { name: 'Territory', price: '$9,999', detail: '200 lead credits, about $50/lead' },
];

const revenueProof = [
  { value: '$100k+', label: 'ValueFilter month-one revenue from Gutter Quotes leads' },
  { value: '$220k+', label: 'monthly revenue exceeded by month four' },
  { value: '$300k+', label: 'current monthly revenue track from Gutter Quotes leads' },
];

const processSteps = [
  {
    title: 'Choose your market',
    text: 'Tell us the ZIP codes, cities, and gutter services you want to grow.',
  },
  {
    title: 'We create demand',
    text: 'Gutter Quotes activates homeowner lead flow in your area and screens for project intent.',
  },
  {
    title: 'You receive exclusive leads',
    text: 'Buy one at a time or use package credits. The same lead is not sold as a shared race.',
  },
  {
    title: 'Follow up fast',
    text: 'Leads can move into your sales process, with Jobber delivery planned for qualified clients.',
  },
];

const leadTypes = [
  'Seamless gutter installation',
  'Gutter replacement',
  'Gutter guards',
  'Gutter repair',
  'Gutter cleaning',
  'Downspout drainage',
  'Commercial gutters',
  'Copper and specialty gutters',
];

const packageMailto =
  'mailto:mills@gutterquotes.com?subject=Gutter%20Lead%20Pricing&body=I%20want%20to%20discuss%20Gutter%20Quotes%20lead%20pricing.%20Company%20name%2C%20service%20area%2C%20monthly%20lead%20goal%2C%20and%20phone%3A';

const GutterLeadPage = props => {
  const { scrollingDisabled } = props;

  return (
    <Page
      title="High-intent homeowner gutter leads in your area | Gutter Quotes"
      description="Get exclusive homeowner gutter leads for installation, guards, replacement, repair, cleaning, downspouts, and drainage projects in your service area."
      scrollingDisabled={scrollingDisabled}
    >
      <TopbarSimplified />
      <main className={css.root}>
        <section className={css.hero}>
          <header className={css.heroTop}>
            <NamedLink name="LandingPage" className={css.logoLink}>
              <img src={logoImage} alt="Gutter Quotes" className={css.logo} />
            </NamedLink>
            <nav className={css.nav} aria-label="Gutter lead navigation">
              <NamedLink name="GutterLeadPackagesPage">Packages</NamedLink>
              <NamedLink name="ValueFilterCaseStudyPage">Case study</NamedLink>
            </nav>
          </header>

          <div className={css.heroGrid}>
            <div className={css.heroCopy}>
              <p className={css.kicker}>Gutter leads for contractors</p>
              <h1>Exclusive gutter leads in your area.</h1>
              <p className={css.lead}>
                Stop fighting over shared leads. Get exclusive, high-intent homeowner requests for
                gutter installation, guards, replacement, repair, cleaning, downspouts, drainage,
                and specialty gutter projects. Start at $75 per lead or lower your effective rate
                with a package.
              </p>
              <div className={css.actions}>
                <NamedLink
                  name="SignupForUserTypePage"
                  params={{ userType: 'provider' }}
                  className={css.primaryAction}
                >
                  Start getting leads
                </NamedLink>
                <a href={packageMailto} className={css.secondaryAction}>
                  Discuss pricing
                </a>
              </div>
            </div>

            <aside className={css.proofCard} aria-label="Gutter Quotes proof">
              <span>Client proof</span>
              <strong>$300k+</strong>
              <p>
                ValueFilter is now tracking toward $300k+ in monthly revenue from Gutter Quotes
                leads after exceeding $220k in month four.
              </p>
              <NamedLink name="ValueFilterCaseStudyPage">Read the case study</NamedLink>
            </aside>
          </div>
        </section>

        <section className={css.trustBand} aria-label="Gutter lead advantages">
          {proofPoints.map(point => (
            <span key={point}>{point}</span>
          ))}
        </section>

        <section className={css.pricingSection}>
          <div className={css.sectionIntro}>
            <p className={css.kicker}>Simple lead pricing</p>
            <h2>Pay per lead or pre-buy volume at a better rate.</h2>
            <p>
              No confusing subscription pitch. Contractors can start with $75 pay-as-you-go leads,
              then move into discounted lead banks when the market is ready to scale.
            </p>
          </div>
          <div className={css.packageGrid}>
            {packages.map(plan => (
              <article key={plan.name} className={css.packageCard}>
                <span>{plan.name}</span>
                <strong>{plan.price}</strong>
                <p>{plan.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={css.proofSection} aria-label="Gutter lead revenue proof">
          <div className={css.sectionIntro}>
            <p className={css.kicker}>Why pros answer the call</p>
            <h2>Real revenue proof beats another generic lead marketplace promise.</h2>
            <p>
              Gutter Quotes is being built from an actual gutter lead business, not a theory. The
              first case study gives sales calls a clear reason to keep moving.
            </p>
          </div>
          <div className={css.revenueGrid}>
            {revenueProof.map(item => (
              <article key={item.value}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className={css.processSection}>
          <div className={css.sectionIntro}>
            <p className={css.kicker}>How lead flow works</p>
            <h2>Designed for fast launch markets and disciplined contractor spend.</h2>
          </div>
          <div className={css.stepGrid}>
            {processSteps.map((step, index) => (
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
            <h2>Focused only on gutter revenue lines.</h2>
            <p>
              Gutter companies do not need a broad contractor directory. They need homeowners and
              property managers asking for the gutter work they actually sell.
            </p>
          </div>
          <div className={css.leadTypeGrid}>
            {leadTypes.map(type => (
              <span key={type}>{type}</span>
            ))}
          </div>
        </section>

        <section className={css.jobberSection}>
          <div>
            <p className={css.kicker}>Jobber-ready roadmap</p>
            <h2>Lead delivery should fit the contractor workflow.</h2>
            <p>
              For Jobber users, the next platform advantage is pushing qualified Gutter Quotes
              opportunities into their CRM so new homeowner demand is easier to contact, schedule,
              and track.
            </p>
          </div>
          <a href={packageMailto} className={css.secondaryAction}>
            Ask about Jobber delivery
          </a>
        </section>

        <section className={css.ctaSection}>
          <div>
            <p className={css.kicker}>Claim your launch conversation</p>
            <h2>Tell us your service area, monthly lead goal, and how fast your team can respond.</h2>
          </div>
          <div className={css.ctaActions}>
            <NamedLink
              name="SignupForUserTypePage"
              params={{ userType: 'provider' }}
              className={css.primaryAction}
            >
              Create pro account
            </NamedLink>
            <NamedLink name="GutterLeadPackagesPage" className={css.secondaryAction}>
              View all packages
            </NamedLink>
          </div>
        </section>
      </main>
    </Page>
  );
};

export default GutterLeadPage;
