import React from 'react';

import { NamedLink } from '../../components';
import GutterQuotesFooter from '../FooterContainer/GutterQuotesFooter';
import logoImage from '../../assets/gutter-quotes-logo.png';

import css from './FallbackPage.module.css';

const popularProjects = [
  { title: 'Seamless gutter installation', detail: 'Compare local installers for new aluminum, copper, half-round, and K-style gutters.' },
  { title: 'Gutter guards', detail: 'Find pros who install protection systems built around your roofline and tree coverage.' },
  { title: 'Gutter repair', detail: 'Get help with leaks, sagging runs, fascia issues, overflow, and storm damage.' },
  { title: 'Gutter cleaning', detail: 'Request seasonal gutter cleaning, debris removal, and downspout clearing.' },
  { title: 'Downspout drainage', detail: 'Move water away from siding, soil, landscaping, crawlspaces, and foundations.' },
  { title: 'Commercial gutters', detail: 'Connect with gutter specialists for multifamily, retail, office, and light commercial work.' },
];

const steps = [
  {
    label: 'Start a free request',
    text: 'Choose a gutter service, ZIP code, timeline, and home details in a guided flow built specifically for gutter work.',
  },
  {
    label: 'Protect private details',
    text: 'Your public request preview shows limited project context. Contact info, address, full notes, and photos stay private until the next step.',
  },
  {
    label: 'Compare better-fit pros',
    text: 'Interested gutter specialists can review the project fit and respond with sharper questions, faster timing, and stronger quotes.',
  },
];

const launchTrust = [
  'Free request for homeowners',
  'Focused only on gutters and drainage',
  'Private contact details',
  'Built for local gutter specialists',
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
              Start one free request for gutter installation, guards, repair, cleaning, or
              drainage. We help you organize the right details so local gutter specialists can
              understand the job and compete for your business.
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
              {launchTrust.map(item => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className={css.projectsSection}>
        <div className={css.sectionIntro}>
          <p className={css.kicker}>Popular gutter projects</p>
          <h2>Find the right gutter solution before water becomes a bigger problem.</h2>
          <p>
            Gutter Quotes helps you compare local specialists for installation, guards, repair,
            cleaning, and drainage so you can protect your roofline, siding, and foundation with
            more confidence.
          </p>
        </div>
        <div className={css.projectGrid}>
          {popularProjects.map(project => (
            <NamedLink key={project.title} name="QuoteStartPage" className={css.projectCard}>
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

      <section className={css.proSection}>
        <div>
          <p className={css.kicker}>For gutter companies</p>
          <h2>Want exclusive, high-intent homeowner gutter leads?</h2>
          <p>
            Join Gutter Quotes to reach homeowners looking for installation, guards, repair,
            cleaning, and drainage work in your service area.
          </p>
        </div>
        <NamedLink name="GutterProPage" className={css.secondaryAction}>
          Grow with Gutter Quotes
        </NamedLink>
      </section>

      <section className={css.finalCta}>
        <div>
          <p className={css.kicker}>Gutter Quotes nationwide</p>
          <h2>Start with one free request and compare local gutter pros.</h2>
          <p>
            Tell us what your home needs, then move forward with a clearer project brief and a
            focused network of gutter specialists.
          </p>
        </div>
        <NamedLink
          name="QuoteStartPage"
          className={css.primaryAction}
        >
          Start a free request
        </NamedLink>
        <NamedLink name="GutterProPage" className={css.secondaryAction}>
          Get gutter leads
        </NamedLink>
      </section>
      <GutterQuotesFooter />
    </main>
  );
};

export default FallbackPage;
