import React, { useMemo, useState } from 'react';

import { NamedLink, Page, TopbarSimplified } from '../../components';
import GutterQuotesFooter from '../FooterContainer/GutterQuotesFooter';
import logoImage from '../../assets/gutter-quotes-logo.png';

import css from './QuoteStartPage.module.css';

const projectTypes = [
  {
    label: 'Seamless gutter installation',
    publicSummary: 'New seamless gutter installation',
    proSignal: 'Installation crew, material options, measurements, and warranty fit',
    defaultNotes: 'I want to compare options for seamless gutters and gutter guards.',
  },
  {
    label: 'Gutter guards',
    publicSummary: 'Gutter guard installation',
    proSignal: 'Guard type, roof pitch, tree coverage, and existing gutter condition',
    defaultNotes: 'I want to compare gutter guard options and understand what works for my home.',
  },
  {
    label: 'Gutter repair',
    publicSummary: 'Gutter repair request',
    proSignal: 'Leak location, sagging runs, fascia condition, and urgency',
    defaultNotes: 'I have gutter issues and want a pro to inspect repair or replacement options.',
  },
  {
    label: 'Gutter cleaning',
    publicSummary: 'Gutter cleaning request',
    proSignal: 'Home height, debris level, downspout clearing, and seasonal availability',
    defaultNotes: 'I need gutter cleaning and downspout clearing.',
  },
  {
    label: 'Downspouts and drainage',
    publicSummary: 'Downspout and drainage improvement',
    proSignal: 'Water discharge point, soil slope, foundation concerns, and extensions',
    defaultNotes: 'I want to move water away from the home and improve drainage.',
  },
  {
    label: 'Not sure yet',
    publicSummary: 'Gutter assessment request',
    proSignal: 'Diagnostic visit, photos, roofline, and homeowner goals',
    defaultNotes: 'I am not sure what I need yet and want guidance from a gutter pro.',
  },
];

const propertyTypes = [
  'Single-family home',
  'Townhome',
  'Multifamily property',
  'Commercial building',
];

const homeHeights = ['One story', 'Two stories', 'Three stories or taller'];

const timelines = ['This week', 'This month', 'Planning ahead', 'Emergency repair'];

const detailBoosts = [
  { key: 'photos', label: 'Photos ready', points: 7 },
  { key: 'material', label: 'Material preference', points: 5 },
  { key: 'access', label: 'Easy exterior access', points: 4 },
];

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
  const [selectedProject, setSelectedProject] = useState(projectTypes[0]);
  const [zipCode, setZipCode] = useState('28211');
  const [timeline, setTimeline] = useState('This month');
  const [propertyType, setPropertyType] = useState('Single-family home');
  const [homeHeight, setHomeHeight] = useState('Two stories');
  const [selectedDetails, setSelectedDetails] = useState(['photos']);
  const [notes, setNotes] = useState(projectTypes[0].defaultNotes);

  const readinessScore = useMemo(() => {
    const zipPoints = zipCode.trim().length >= 5 ? 12 : 0;
    const timelinePoints = timeline === 'Emergency repair' ? 14 : 10;
    const detailPoints = selectedDetails.reduce((sum, key) => {
      const detail = detailBoosts.find(item => item.key === key);
      return sum + (detail?.points || 0);
    }, 0);
    const notesPoints = notes.trim().length > 40 ? 9 : 3;
    return Math.min(99, 52 + zipPoints + timelinePoints + detailPoints + notesPoints);
  }, [zipCode, timeline, selectedDetails, notes]);

  const publicPreview = `${selectedProject.publicSummary} near ${zipCode || 'your ZIP'}: ${
    propertyType
  }, ${homeHeight.toLowerCase()}, ${timeline.toLowerCase()}.`;

  const privatePreview = [
    'Name and contact info',
    'Exact street address',
    'Full notes and photos',
    'Direct messaging details',
  ];

  const toggleDetail = key => {
    setSelectedDetails(current =>
      current.includes(key) ? current.filter(item => item !== key) : [...current, key]
    );
  };

  const handleProjectSelect = project => {
    setSelectedProject(project);
    setNotes(project.defaultNotes);
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
              A better request gets better responses. Start with the basics, add the details pros
              need, and move toward a shortlist without calling around.
            </p>
          </div>

          <aside className={css.matchPanel} aria-label="Quote match preview">
            <div className={css.panelTop}>
              <span>Match readiness</span>
              <strong>{readinessScore}%</strong>
            </div>
            <p>
              The AI-ready brief improves as you add ZIP, timeline, property details, photos, and
              project notes.
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
              {projectTypes.map(project => (
                <button
                  key={project.label}
                  type="button"
                  className={
                    selectedProject.label === project.label
                      ? `${css.optionButton} ${css.optionButtonActive}`
                      : css.optionButton
                  }
                  aria-pressed={selectedProject.label === project.label}
                  onClick={() => handleProjectSelect(project)}
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

            <div className={css.detailGrid} aria-label="Helpful project details">
              {detailBoosts.map(detail => (
                <button
                  key={detail.key}
                  type="button"
                  className={
                    selectedDetails.includes(detail.key)
                      ? `${css.detailButton} ${css.detailButtonActive}`
                      : css.detailButton
                  }
                  aria-pressed={selectedDetails.includes(detail.key)}
                  onClick={() => toggleDetail(detail.key)}
                >
                  <span>{detail.label}</span>
                  <strong>+{detail.points}</strong>
                </button>
              ))}
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
                Contractor signal: {selectedProject.proSignal}. Your exact address and contact
                details stay private until account and lead access steps are complete.
              </p>
            </div>

            <NamedLink
              name="SignupForUserTypePage"
              params={{ userType: 'customer' }}
              className={css.primaryAction}
            >
              Continue free request
            </NamedLink>
          </div>

          <aside className={css.sidePanel}>
            <p className={css.kicker}>Reverse marketplace model</p>
            <h2>Post once. Let qualified gutter pros compete for the work.</h2>
            <ul>
              {[
                selectedProject.label,
                propertyType,
                homeHeight,
                `${readinessScore}% request readiness`,
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
              <strong>4 local pros</strong>
              <p>can review a complete request like this today.</p>
            </div>
          </aside>
        </section>
      </main>
      <GutterQuotesFooter />
    </Page>
  );
};

export default QuoteStartPage;
