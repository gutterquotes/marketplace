import React, { useState } from 'react';

import { NamedLink, Page, TopbarSimplified } from '../../components';
import { GUTTER_QUOTE_LISTING_TYPE, saveGutterQuoteDraft } from '../../util/gutterQuoteDraft';

import css from './QuoteStartPage.module.css';

const projectTypes = [
  {
    label: 'Seamless gutter installation',
    publicSummary: 'New seamless gutter installation',
    serviceNeeded: 'installation',
    defaultNotes: 'I want to compare options for seamless gutters and gutter guards.',
  },
  {
    label: 'Gutter guards',
    publicSummary: 'Gutter guard installation',
    serviceNeeded: 'guards',
    defaultNotes: 'I want to compare gutter guard options and understand what works for my home.',
  },
  {
    label: 'Gutter repair',
    publicSummary: 'Gutter repair request',
    serviceNeeded: 'repair',
    defaultNotes: 'I have gutter issues and want a pro to inspect repair or replacement options.',
  },
  {
    label: 'Gutter cleaning',
    publicSummary: 'Gutter cleaning request',
    serviceNeeded: 'cleaning',
    defaultNotes: 'I need gutter cleaning and downspout clearing.',
  },
  {
    label: 'Downspouts and drainage',
    publicSummary: 'Downspout and drainage improvement',
    serviceNeeded: 'drainage',
    defaultNotes: 'I want to move water away from the home and improve drainage.',
  },
  {
    label: 'Not sure yet',
    publicSummary: 'Gutter assessment request',
    serviceNeeded: 'installation',
    defaultNotes: 'I am not sure what I need yet and want guidance from a gutter pro.',
  },
];

const notSureProjectLabel = 'Not sure yet';

const propertyTypes = [
  'Single-family home',
  'Townhome',
  'Multifamily property',
  'Commercial building',
];

const homeHeights = ['One story', 'Two stories', 'Three stories or taller'];

const timelines = ['This week', 'This month', 'Planning ahead', 'Emergency repair'];

const timelineToValue = {
  'This week': 'week',
  'This month': 'month',
  'Planning ahead': 'planning',
  'Emergency repair': 'emergency',
};

const propertyTypeToValue = {
  'Single-family home': 'single-family',
  Townhome: 'townhome',
  'Multifamily property': 'multi-family',
  'Commercial building': 'commercial',
};

const trustCues = ['Free for homeowners', 'No obligation', 'Contact details stay private first'];

const QuoteStartPage = props => {
  const { scrollingDisabled } = props;
  const [selectedProjects, setSelectedProjects] = useState([projectTypes[0]]);
  const [zipCode, setZipCode] = useState('28211');
  const [timeline, setTimeline] = useState('This month');
  const [propertyType, setPropertyType] = useState('Single-family home');
  const [homeHeight, setHomeHeight] = useState('Two stories');
  const [notes, setNotes] = useState(projectTypes[0].defaultNotes);

  const primaryProject = selectedProjects[0] || projectTypes[0];
  const selectedServiceLabels = selectedProjects.map(project => project.label);
  const serviceSummary =
    selectedServiceLabels.length > 1
      ? selectedServiceLabels.join(' + ')
      : primaryProject.publicSummary;

  const publicPreview = `${serviceSummary} near ${zipCode || 'your ZIP'}: ${
    propertyType
  }, ${homeHeight.toLowerCase()}, ${timeline.toLowerCase()}.`;

  const handleProjectToggle = project => {
    setSelectedProjects(currentProjects => {
      const isSelected = currentProjects.some(item => item.label === project.label);
      const isNotSure = project.label === notSureProjectLabel;
      const withoutProject = currentProjects.filter(item => item.label !== project.label);
      const withoutNotSure = currentProjects.filter(item => item.label !== notSureProjectLabel);

      if (isSelected) {
        return withoutProject.length > 0 ? withoutProject : currentProjects;
      }

      return isNotSure ? [project] : [...withoutNotSure, project];
    });

    if (project.label === notSureProjectLabel || selectedProjects.length === 1) {
      setNotes(project.defaultNotes);
    }
  };

  const title = `${serviceSummary} near ${zipCode || 'my area'}`;
  const draftDescription = [
    publicPreview,
    '',
    notes,
    '',
    `Services selected: ${selectedServiceLabels.join(', ')}.`,
    `Property: ${propertyType}. Height: ${homeHeight}. Timeline: ${timeline}.`,
  ]
    .filter(Boolean)
    .join('\n');

  const saveDraft = () => {
    saveGutterQuoteDraft({
      title,
      description: draftDescription,
      listingType: GUTTER_QUOTE_LISTING_TYPE,
      publicData: {
        serviceNeeded: primaryProject.serviceNeeded,
        serviceNeededList: selectedProjects.map(project => project.serviceNeeded),
        selectedServices: selectedServiceLabels,
        projectZip: zipCode,
        homeType: propertyTypeToValue[propertyType],
        timeline: timelineToValue[timeline],
        projectDetails: notes,
        requestQualityStatus: 'Ready for contractor review',
        publicPreview,
      },
      privateData: {
        projectNotes: notes,
        homeHeight,
      },
    });
  };

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
            <p className={css.kicker}>Free gutter quote request</p>
            <h1>Tell us what your home needs.</h1>
            <p className={css.lead}>
              Answer a few questions so local gutter pros can understand the job and compete for
              your business.
            </p>
            <div className={css.trustRow}>
              {trustCues.map(cue => (
                <span key={cue}>{cue}</span>
              ))}
            </div>
          </div>
        </section>

        <section className={css.flow}>
          <div className={css.formPanel}>
            <div className={css.stepHeader}>
              <span>1</span>
              <div>
                <p className={css.kicker}>Project type</p>
                <h2>What gutter work do you need?</h2>
                <p className={css.stepHint}>Select all that apply.</p>
              </div>
            </div>
            <div className={css.optionGrid}>
              {projectTypes.map(project => (
                <button
                  key={project.label}
                  type="button"
                  className={
                    selectedProjects.some(selected => selected.label === project.label)
                      ? `${css.optionButton} ${css.optionButtonActive}`
                      : css.optionButton
                  }
                  aria-pressed={selectedProjects.some(selected => selected.label === project.label)}
                  onClick={() => handleProjectToggle(project)}
                >
                  {project.label}
                </button>
              ))}
            </div>

            <div className={css.twoColumn}>
              <label>
                <span>ZIP code</span>
                <input
                  value={zipCode}
                  onChange={e => setZipCode(e.target.value)}
                  inputMode="numeric"
                  aria-label="ZIP code"
                />
              </label>
              <label>
                <span>Timeline</span>
                <select
                  value={timeline}
                  onChange={e => setTimeline(e.target.value)}
                  aria-label="Timeline"
                >
                  {timelines.map(option => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className={css.twoColumn}>
              <label>
                <span>Property type</span>
                <select
                  value={propertyType}
                  onChange={e => setPropertyType(e.target.value)}
                  aria-label="Property type"
                >
                  {propertyTypes.map(option => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Home height</span>
                <select
                  value={homeHeight}
                  onChange={e => setHomeHeight(e.target.value)}
                  aria-label="Home height"
                >
                  {homeHeights.map(option => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className={css.messageField}>
              <span>Project notes</span>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                aria-label="Project notes"
              />
            </label>

            <div className={css.briefPanel} aria-label="Project brief preview">
              <div>
                <p className={css.kicker}>Your request preview</p>
                <h3>{publicPreview}</h3>
              </div>
              <p>
                Your exact address and contact details stay private until the next step.
              </p>
            </div>

            <a
              href={`/l/new?listingType=${GUTTER_QUOTE_LISTING_TYPE}`}
              onClick={saveDraft}
              className={css.primaryAction}
            >
              Continue free request
            </a>
            <p className={css.microcopy}>
              Next: create your account and publish when you are ready.
            </p>
          </div>

          <aside className={css.sidePanel}>
            <p className={css.kicker}>What stays private</p>
            <h2>Your contact details are not shown in the public preview.</h2>
            <ul>
              {[
                'Name and phone number',
                'Exact street address',
                'Photos and full notes',
              ].map(detail => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </aside>
        </section>
      </main>
      <footer className={css.footer}>
        <span>© 2026 Gutter Quotes</span>
        <nav aria-label="Footer">
          <NamedLink name="TermsOfServicePage">Terms</NamedLink>
          <NamedLink name="PrivacyPolicyPage">Privacy</NamedLink>
          <NamedLink name="ContactPage">Contact</NamedLink>
        </nav>
      </footer>
    </Page>
  );
};

export default QuoteStartPage;
