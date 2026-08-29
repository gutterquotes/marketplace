import React from 'react';

import { NamedLink, Page, TopbarSimplified } from '../../components';
import GutterQuotesFooter from '../FooterContainer/GutterQuotesFooter';
import logoImage from '../../assets/gutter-quotes-logo.png';

import css from './GutterLeadPackagesPage.module.css';

const packages = [
  {
    name: 'Starter Lead Bank',
    budget: '$999',
    credits: '15 lead credits',
    rate: '$66.60 effective lead rate',
    note: 'Best for testing one service area before scaling spend.',
    features: ['One launch market', 'Qualified gutter project previews', 'Manual account setup'],
  },
  {
    name: 'Growth Lead Bank',
    budget: '$2,499',
    credits: '42 lead credits',
    rate: '$59.50 effective lead rate',
    note: 'Best for companies that want steady weekly opportunity flow.',
    features: ['Priority market activation', 'Service-area targeting', 'Lead quality review'],
  },
  {
    name: 'Market Builder',
    budget: '$4,999',
    credits: '92 lead credits',
    rate: '$54.34 effective lead rate',
    note: 'Best for crews ready to build a local gutter pipeline.',
    features: ['Multi-ZIP planning', 'Priority lead alerts', 'Monthly pipeline review'],
  },
  {
    name: 'Territory Partner',
    budget: '$9,999',
    credits: '200 lead credits',
    rate: '$50 effective lead rate',
    note: 'Best for serious operators pursuing a protected growth market.',
    features: ['Lowest launch package rate', 'Territory planning session', 'Weekly launch support'],
  },
];

const payAsYouGoPlan = {
  name: 'Pay as you go',
  price: '$75 per lead',
  note: 'Best for contractors who want to test lead quality before buying a package.',
  features: [
    'No package commitment',
    'Buy qualified leads one at a time',
    'Upgrade to a package when volume makes sense',
  ],
};

const rules = [
  {
    title: 'Package credit model',
    text: 'Your balance is used for qualified homeowner gutter opportunities. Larger packages earn better effective rates because the market can be planned with more confidence.',
  },
  {
    title: 'Lead quality comes first',
    text: 'Lead value can vary by project type, location, urgency, and verification quality. We will confirm the market plan before taking payment.',
  },
  {
    title: 'Private pro pricing',
    text: 'This page is intentionally not linked from homeowner navigation. It is built for contractor conversations, onboarding, and direct sales.',
  },
];

const marketSignals = ['Installation', 'Replacement', 'Gutter guards', 'Repair', 'Cleaning', 'Drainage'];

const packageMailto = plan =>
  `mailto:mills@gutterquotes.com?subject=${encodeURIComponent(
    `${plan} package interest`
  )}&body=${encodeURIComponent(
    `I want to discuss the ${plan} lead package. Company name, service area, monthly lead goal, and phone:`
  )}`;

const GutterLeadPackagesPage = props => {
  const { scrollingDisabled } = props;

  return (
    <Page
      title="Gutter lead packages for contractors | Gutter Quotes Pro"
      description="Private Gutter Quotes lead packages for gutter companies buying high-intent homeowner gutter leads in volume."
      scrollingDisabled={scrollingDisabled}
    >
      <TopbarSimplified />
      <main className={css.root}>
        <section className={css.hero}>
          <div className={css.heroTop}>
            <NamedLink name="GutterProPage" className={css.logoLink}>
              <img src={logoImage} alt="Gutter Quotes" className={css.logo} />
            </NamedLink>
            <nav className={css.nav} aria-label="Gutter pro package navigation">
              <NamedLink name="GutterProPage">For pros</NamedLink>
              <NamedLink name="GutterLeadPage">Gutter leads</NamedLink>
              <a href="#packages">Packages</a>
              <a href="#custom">Custom</a>
            </nav>
          </div>

          <div className={css.heroGrid}>
            <div className={css.heroCopy}>
              <p className={css.kicker}>Private pro pricing</p>
              <h1>Buy high-intent gutter leads in packages and lower your cost per opportunity.</h1>
              <p className={css.lead}>
                Choose a launch budget, target the markets you want to grow, and use lead credits
                toward qualified homeowner gutter requests. Higher-volume packages receive better
                effective pricing while your team stays focused on jobs worth pursuing.
              </p>
              <div className={css.actions}>
                <a className={css.primaryAction} href={packageMailto('Growth Lead Bank')}>
                  Discuss a package
                </a>
                <a className={css.secondaryAction} href={packageMailto('Pay as you go')}>
                  Start at $75/lead
                </a>
                <NamedLink name="GutterLeadPage" className={css.secondaryAction}>
                  See how leads work
                </NamedLink>
              </div>
            </div>

            <aside className={css.summaryCard} aria-label="Gutter lead package summary">
              <span>Launch pricing range</span>
              <strong>$999 to $9,999</strong>
              <p>
                Standard individual gutter leads commonly land around $50-$80 depending on lead
                quality. Packages reward volume with better effective rates and more intentional
                market planning.
              </p>
              <div className={css.signalGrid}>
                {marketSignals.map(signal => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section id="packages" className={css.packageSection}>
          <div className={css.sectionIntro}>
            <p className={css.kicker}>Lead packages</p>
            <h2>Start with a clear budget. Scale when the market responds.</h2>
            <p>
              These packages are built for gutter companies that want exclusive, high-intent
              homeowner opportunities without competing over the same shared lead.
            </p>
          </div>

          <article className={css.payGoCard}>
            <div>
              <p className={css.kicker}>{payAsYouGoPlan.name}</p>
              <h3>{payAsYouGoPlan.price}</h3>
              <p>{payAsYouGoPlan.note}</p>
            </div>
            <ul>
              {payAsYouGoPlan.features.map(feature => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <a className={css.primaryAction} href={packageMailto(payAsYouGoPlan.name)}>
              Request pay as you go
            </a>
          </article>

          <div className={css.packageGrid}>
            {packages.map(plan => (
              <article key={plan.name} className={css.packageCard}>
                <div>
                  <span>{plan.name}</span>
                  <strong>{plan.budget}</strong>
                  <p>{plan.note}</p>
                </div>
                <div className={css.rateBox}>
                  <b>{plan.credits}</b>
                  <small>{plan.rate}</small>
                </div>
                <ul>
                  {plan.features.map(feature => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <a className={css.primaryAction} href={packageMailto(plan.name)}>
                  Request this package
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className={css.rulesSection}>
          {rules.map(rule => (
            <article key={rule.title}>
              <h2>{rule.title}</h2>
              <p>{rule.text}</p>
            </article>
          ))}
        </section>

        <section className={css.integrationPanel}>
          <div>
            <p className={css.kicker}>Jobber delivery</p>
            <h2>Lead delivery into the CRM gutter companies already use.</h2>
            <p>
              The next major platform advantage is sending qualified Gutter Quotes opportunities
              directly into a contractor&apos;s Jobber account, so the lead becomes part of their
              normal sales workflow instead of another inbox to monitor.
            </p>
          </div>
          <div className={css.integrationSteps}>
            <span>Private beta with first Jobber client</span>
            <span>OAuth connection through the contractor account</span>
            <span>Create customer, request, or lead record in Jobber</span>
            <span>Track delivery status inside Gutter Quotes</span>
          </div>
        </section>

        <section id="custom" className={css.customPanel}>
          <div>
            <p className={css.kicker}>Custom volume</p>
            <h2>Need a territory, multi-market rollout, or custom lead volume?</h2>
            <p>
              We can build a package around your service radius, preferred gutter categories,
              appointment capacity, and growth target. This is the best fit for operators entering
              multiple cities or defending a high-value territory.
            </p>
          </div>
          <div className={css.customCard}>
            <strong>Custom package</strong>
            <span>Volume-based rate</span>
            <a className={css.primaryAction} href={packageMailto('Custom volume')}>
              Build a custom plan
            </a>
          </div>
        </section>
      </main>
      <GutterQuotesFooter />
    </Page>
  );
};

export default GutterLeadPackagesPage;
