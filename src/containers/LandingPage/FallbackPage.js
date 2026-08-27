import React from 'react';

import { NamedLink } from '../../components';
import GutterQuotesFooter from '../FooterContainer/GutterQuotesFooter';
import logoImage from '../../assets/gutter-quotes-logo.png';

import css from './FallbackPage.module.css';

const popularProjects = [
  { title: 'Seamless gutter installation', score: '4.9', detail: 'Matched by roofline, material, and ZIP' },
  { title: 'Gutter guards', score: '4.8', detail: 'Compare guard types, warranties, and install timelines' },
  { title: 'Gutter repair', score: '4.7', detail: 'Leaks, sagging runs, fascia issues, and storm damage' },
  { title: 'Gutter cleaning', score: '4.8', detail: 'Fast seasonal service with downspout clearing' },
  { title: 'Downspout drainage', score: '4.6', detail: 'Move water away from siding, soil, and foundations' },
  { title: 'Commercial gutters', score: '4.7', detail: 'Multifamily, retail, office, and light commercial work' },
];

const intelligenceSignals = [
  'Project scope',
  'Home type',
  'Roofline complexity',
  'Material preference',
  'Timeline',
  'Service area',
];

const steps = [
  {
    label: 'Search the job',
    text: 'Choose a gutter service and ZIP code. The platform starts narrowing the right kind of pro immediately.',
  },
  {
    label: 'Answer smart questions',
    text: 'A guided request captures photos, height, material, urgency, and drainage concerns without wasting your time.',
  },
  {
    label: 'Compare better matches',
    text: 'Review interested pros, ask follow-ups, and move forward with the company that fits the home and budget.',
  },
];

const guides = [
  'How much do seamless gutters cost?',
  'Are gutter guards worth it?',
  'Repair or replace damaged gutters?',
  'How to spot poor drainage early',
];

const FallbackPage = () => {
  return (
    <main className={css.root}>
      <section className={css.hero}>
        <div className={css.topbar}>
          <img src={logoImage} alt="Gutter Quotes" className={css.logo} />
          <nav className={css.nav} aria-label="Main navigation">
            <NamedLink name="SearchPage">Find pros</NamedLink>
            <a href="#projects">Projects</a>
            <a href="#how">How it works</a>
            <NamedLink name="LocationsPage">Service areas</NamedLink>
            <NamedLink name="GutterProPage">
              Join as a pro
            </NamedLink>
          </nav>
        </div>

        <div className={css.heroGrid}>
          <div className={css.heroCopy}>
            <p className={css.kicker}>Next generation gutter services</p>
            <h1>The smartest way to find trusted gutter pros.</h1>
            <p className={css.lead}>
              Gutter Quotes is a focused home service platform for gutter installation, guards,
              repair, cleaning, and drainage. Search once, get guided, and compare pros built for
              the exact work your home needs.
            </p>

            <div className={css.searchConsole} aria-label="Start a gutter project request">
              <label>
                <span>What do you need?</span>
                <input defaultValue="Gutter installation" aria-label="Service needed" />
              </label>
              <label>
                <span>ZIP code</span>
                <input defaultValue="28211" aria-label="ZIP code" inputMode="numeric" />
              </label>
              <NamedLink
                name="QuoteStartPage"
                className={css.searchButton}
              >
                Find gutter pros
              </NamedLink>
            </div>

            <div className={css.trustRow}>
              <span>Free request</span>
              <span>Local specialists</span>
              <span>No obligation</span>
            </div>
          </div>

          <aside className={css.matchCard} aria-label="Gutter Quotes matching preview">
            <div className={css.cardTop}>
              <span>Match engine</span>
              <strong>Live preview</strong>
            </div>
            <div className={css.matchMeter}>
              <span>96%</span>
              <p>fit score for seamless gutters and guards</p>
            </div>
            <div className={css.signalGrid}>
              {intelligenceSignals.map(signal => (
                <span key={signal}>{signal}</span>
              ))}
            </div>
            <div className={css.proPreview}>
              <strong>4 qualified pros</strong>
              <p>can review this request today based on service area, trade focus, and project type.</p>
            </div>
          </aside>
        </div>
      </section>

      <section id="projects" className={css.projectsSection}>
        <div className={css.sectionIntro}>
          <p className={css.kicker}>Popular gutter projects</p>
          <h2>Everything Angi makes broad, Gutter Quotes makes focused.</h2>
          <p>
            Homeowners do not need a giant directory for a specific exterior water problem. They
            need the right gutter company, the right questions, and a clear path to a quote.
          </p>
        </div>
        <div className={css.projectGrid}>
          {popularProjects.map(project => (
            <NamedLink key={project.title} name="SearchPage" className={css.projectCard}>
              <span className={css.rating}>{project.score}</span>
              <h3>{project.title}</h3>
              <p>{project.detail}</p>
            </NamedLink>
          ))}
        </div>
      </section>

      <section id="how" className={css.howSection}>
        <div className={css.sectionIntro}>
          <p className={css.kicker}>How it works</p>
          <h2>A faster quote flow designed around gutter work.</h2>
        </div>
        <div className={css.stepGrid}>
          {steps.map((step, index) => (
            <div key={step.label} className={css.stepCard}>
              <span>{index + 1}</span>
              <h3>{step.label}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={css.platformSection}>
        <div className={css.platformPanel}>
          <p className={css.kicker}>For homeowners</p>
          <h2>From problem to shortlist without the phone-tag marathon.</h2>
          <p>
            Compare interested pros, understand what matters for your roofline, and make the next
            step with more confidence than a generic search result can give you.
          </p>
        </div>
        <div className={css.platformPanelDark}>
          <p className={css.kicker}>For gutter companies</p>
          <h2>Better-fit homeowners, fewer wasted conversations.</h2>
          <p>
            Build a focused profile and receive requests that match your service area, job type,
            install capacity, and specialties.
          </p>
        </div>
      </section>

      <section className={css.guidesSection}>
        <div className={css.sectionIntro}>
          <p className={css.kicker}>Research and plan</p>
          <h2>Cost guidance and decision support before anyone sells.</h2>
        </div>
        <div className={css.guideGrid}>
          {guides.map(guide => (
            <article key={guide} className={css.guideCard}>
              <span>Guide</span>
              <h3>{guide}</h3>
              <p>Clear answers for planning the job, comparing options, and asking better questions.</p>
            </article>
          ))}
        </div>
      </section>

      <section className={css.finalCta}>
        <div>
          <p className={css.kicker}>Gutter Quotes nationwide</p>
          <h2>The category-defining platform for gutter services.</h2>
          <p>
            Built to become the trusted place homeowners start and gutter pros grow.
          </p>
        </div>
        <NamedLink
          name="QuoteStartPage"
          className={css.primaryAction}
        >
          Start a free request
        </NamedLink>
        <NamedLink name="LocationsPage" className={css.secondaryAction}>
          Explore service areas
        </NamedLink>
      </section>
      <GutterQuotesFooter />
    </main>
  );
};

export default FallbackPage;
