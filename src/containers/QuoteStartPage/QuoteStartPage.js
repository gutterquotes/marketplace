import React, { useMemo, useState } from 'react';

import { Page, TopbarSimplified } from '../../components';
import GutterQuotesFooter from '../FooterContainer/GutterQuotesFooter';
import { GUTTER_QUOTE_LISTING_TYPE, saveGutterQuoteDraft } from '../../util/gutterQuoteDraft';
import logoImage from '../../assets/gutter-quotes-logo.png';

import css from './QuoteStartPage.module.css';

const projectTypes = [
  {
    label: 'Seamless gutter installation',
    publicSummary: 'New seamless gutter installation',
    serviceNeeded: 'installation',
    proSignal: 'Installation crew, material options, measurements, and warranty fit',
    defaultNotes: 'I want to compare options for seamless gutters and gutter guards.',
  },
  {
    label: 'Gutter guards',
    publicSummary: 'Gutter guard installation',
    serviceNeeded: 'guards',
    proSignal: 'Guard type, roof pitch, tree coverage, and existing gutter condition',
    defaultNotes: 'I want to compare gutter guard options and understand what works for my home.',
  },
  {
    label: 'Gutter repair',
    publicSummary: 'Gutter repair request',
    serviceNeeded: 'repair',
    proSignal: 'Leak location, sagging runs, fascia condition, and urgency',
    defaultNotes: 'I have gutter issues and want a pro to inspect repair or replacement options.',
  },
  {
    label: 'Gutter cleaning',
    publicSummary: 'Gutter cleaning request',
    serviceNeeded: 'cleaning',
    proSignal: 'Home height, debris level, downspout clearing, and seasonal availability',
    defaultNotes: 'I need gutter cleaning and downspout clearing.',
  },
  {
    label: 'Downspouts and drainage',
    publicSummary: 'Downspout and drainage improvement',
    serviceNeeded: 'drainage',
    proSignal: 'Water discharge point, soil slope, foundation concerns, and extensions',
    defaultNotes: 'I want to move water away from the home and improve drainage.',
  },
  {
    label: 'Not sure yet',
    publicSummary: 'Gutter assessment request',
    serviceNeeded: 'installation',
    proSignal: 'Diagnostic visit, photos, roofline, and homeowner goals',
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

const exampleRequests = [
  {
    title: 'Seamless gutter install',
    location: 'Charlotte, NC',
    details: 'Two-story home, this month, interested in guards',
  },
  {
    title: 'Overflowing gutter repair',
    location: 'Atlanta, GA',
    details: 'Heavy rain overflow near front porch and downspout',
  },
  {
    title: 'Underground downspout drain',
    location: 'Raleigh, NC',
    details: 'Move water farther from foundation and low side yard',
  },
];

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

  const requestQuality = useMemo(() => {
    const checks = [
      { label: 'ZIP code', complete: zipCode.trim().length >= 5 },
      { label: 'Service type', complete: selectedProjects.length > 0 },
      { label: 'Timeline', complete: !!timeline },
      { label: 'Property type', complete: !!propertyType },
      { label: 'Home height', complete: !!homeHeight },
      { label: 'Project notes', complete: notes.trim().length >= 30 },
    ];
    const completedCount = checks.filter(check => check.complete).length;
    const status =
      completedCount >= 6 ? 'Ready for contractor review' : 'Add a few details for better replies';

    return { checks, completedCount, status };
  }, [zipCode, selectedProjects, timeline, propertyType, homeHeight, notes]);

  const publicPreview = `${serviceSummary} near ${zipCode || 'your ZIP'}: ${
    propertyType
  }, ${homeHeight.toLowerCase()}, ${timeline.toLowerCase()}.`;

  const privatePreview = [
    'Name and contact info',
    'Exact street address',
    'Full notes and photos',
    'Direct messaging details',
  ];

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
        requestQualityStatus: requestQuality.status,
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
            <img src={logoImage} alt="Gutter Quotes" className={css.logo} />
            <p className={css.kicker}>Smart gutter quote intake</p>
            <h1>Tell us what your home needs. We will guide the rest.</h1>
            <p className={css.lead}>
              Start a free, no-obligation gutter request in about two minutes. We turn your notes
              into a clear project brief so interested local gutter pros can understand the job
              before they respond.
            </p>
            <div className={css.trustRow}>
              {trustCues.map(cue => (
                <span key={cue}>{cue}</span>
              ))}
            </div>
          </div>

          <aside className={css.matchPanel} aria-label="Quote match preview">
            <div className={css.panelTop}>
              <span>Request quality</span>
              <strong>
                {requestQuality.completedCount}/{requestQuality.checks.length}
              </strong>
            </div>
            <p>
              {requestQuality.status}. Contractors can respond better when they know the service,
              ZIP code, timeline, property type, home height, and project notes.
            </p>
            <div className={css.checkGrid}>
              {requestQuality.checks.map(check => (
                <span key={check.label} className={check.complete ? css.checkComplete : ''}>
                  {check.label}
                </span>
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

            <div className={css.briefPanel} aria-label="AI project brief preview">
              <div>
                <p className={css.kicker}>AI project brief</p>
                <h3>{publicPreview}</h3>
              </div>
              <p>
                Contractor signal: {selectedProjects.map(project => project.proSignal).join('; ')}.
                Your exact address and contact details stay private until account and lead access
                steps are complete.
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
              Next: create your account, add photos if you have them, and publish the request when
              you are ready.
            </p>
          </div>

          <aside className={css.sidePanel}>
            <p className={css.kicker}>Quote-ready request</p>
            <h2>Post once. Let qualified gutter pros compete for the work.</h2>
            <ul>
              {[
                selectedServiceLabels.join(', '),
                propertyType,
                homeHeight,
                requestQuality.status,
              ].map(detail => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            <div className={css.visibilityPanel}>
              <strong>Private until lead access</strong>
              {privatePreview.map(item => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className={css.resultCard}>
              <strong>Now onboarding local pros</strong>
              <p>
                If your ZIP is early in the network, your request helps open the market and gives
                nearby gutter companies a reason to join.
              </p>
            </div>
            <div className={css.examplePanel}>
              <strong>Example homeowner requests</strong>
              {exampleRequests.map(request => (
                <article key={`${request.title}-${request.location}`}>
                  <span>{request.location}</span>
                  <h3>{request.title}</h3>
                  <p>{request.details}</p>
                </article>
              ))}
            </div>
          </aside>
        </section>
      </main>
      <GutterQuotesFooter />
    </Page>
  );
};

export default QuoteStartPage;
