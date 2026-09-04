import React from 'react';

import { NamedLink, Page, TopbarSimplified } from '../../components';
import logoImage from '../../assets/gutter-quotes-logo.png';

import css from './GutterLeadPage.module.css';

const proofPoints = [
  'Exclusive homeowner gutter leads',
  '$75 pay as you go',
  'Lower effective rates with packages',
];

const packages = [
  { name: 'Pay as you go', price: '$75', detail: 'per qualified lead' },
  { name: 'Starter package', price: '$999', detail: '15 lead credits' },
  { name: 'Growth package', price: '$2,499', detail: '42 lead credits' },
  { name: 'Scale package', price: '$4,999+', detail: 'volume pricing' },
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
                Get high-intent homeowner requests for gutter installation, guards, replacement,
                repair, cleaning, downspouts, and drainage. Start at $75 per lead or lower your
                rate with a package.
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
              <strong>$220k+</strong>
              <p>
                ValueFilter exceeded $220k in monthly revenue from Gutter Quotes leads by month
                four and is tracking toward $300k+ monthly revenue.
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
            <h2>Buy only the leads you want. Use packages when volume makes sense.</h2>
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

        <section className={css.ctaSection}>
          <div>
            <p className={css.kicker}>Ready to test your market?</p>
            <h2>Tell us your service area and monthly lead goal.</h2>
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
