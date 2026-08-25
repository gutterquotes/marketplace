import React from 'react';

import { NamedLink, Page, TopbarSimplified } from '../../components';
import logoImage from '../../assets/gutter-quotes-logo.png';

import css from './QuoteStartPage.module.css';

const projectTypes = [
  'Seamless gutter installation',
  'Gutter guards',
  'Gutter repair',
  'Gutter cleaning',
  'Downspouts and drainage',
  'Not sure yet',
];

const details = ['Single-family home', 'Two stories', 'Photos help pros quote faster'];

const matchSignals = [
  'Service area',
  'Project type',
  'Roofline complexity',
  'Timeline',
  'Material fit',
  'Response speed',
];

const QuoteStartPage = props => {
  const { scrollingDisabled } = props;

  return (
    <Page
      title="Start a gutter quote request | Gutter Quotes"
      description="Tell Gutter Quotes what your home needs and get matched with trusted local gutter pros."
      scrollingDisabled={scrollingDisabled}
    >
      <TopbarSimplified />
      <main className={css.root}>
        <section className={css.hero}>
          <div className={css.heroCopy}>
            <img src={logoImage} alt="Gutter Quotes" className={css.logo} />
            <p className={css.kicker}>Smart gutter quote intake</p>
            <h1>Tell us what your home needs. We will guide the rest.</h1>
            <p className={css.lead}>
              A better request gets better responses. Start with the basics, add the details pros
              need, and move toward a shortlist without calling around.
            </p>
          </div>

          <aside className={css.matchPanel} aria-label="Quote match preview">
            <div className={css.panelTop}>
              <span>Match readiness</span>
              <strong>96%</strong>
            </div>
            <p>
              Requests with service type, ZIP, timeline, and photos are easier for gutter pros to
              price accurately.
            </p>
            <div className={css.signalGrid}>
              {matchSignals.map(signal => (
                <span key={signal}>{signal}</span>
              ))}
            </div>
          </aside>
        </section>

        <section className={css.flow}>
          <div className={css.formPanel}>
            <div className={css.stepHeader}>
              <span>1</span>
              <div>
                <p className={css.kicker}>Project type</p>
                <h2>What gutter work do you need?</h2>
              </div>
            </div>
            <div className={css.optionGrid}>
              {projectTypes.map(type => (
                <button key={type} type="button" className={css.optionButton}>
                  {type}
                </button>
              ))}
            </div>

            <div className={css.twoColumn}>
              <label>
                <span>ZIP code</span>
                <input defaultValue="28211" inputMode="numeric" aria-label="ZIP code" />
              </label>
              <label>
                <span>Timeline</span>
                <select defaultValue="This month" aria-label="Timeline">
                  <option>This week</option>
                  <option>This month</option>
                  <option>Planning ahead</option>
                  <option>Emergency repair</option>
                </select>
              </label>
            </div>

            <label className={css.messageField}>
              <span>Project notes</span>
              <textarea
                defaultValue="I want to compare options for seamless gutters and guards."
                aria-label="Project notes"
              />
            </label>

            <NamedLink
              name="SignupForUserTypePage"
              params={{ userType: 'customer' }}
              className={css.primaryAction}
            >
              Continue free request
            </NamedLink>
          </div>

          <aside className={css.sidePanel}>
            <p className={css.kicker}>What happens next</p>
            <h2>Better data, better gutter pro matches.</h2>
            <ul>
              {details.map(detail => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            <div className={css.resultCard}>
              <strong>4 local pros</strong>
              <p>can review a complete request like this today.</p>
            </div>
          </aside>
        </section>
      </main>
    </Page>
  );
};

export default QuoteStartPage;
