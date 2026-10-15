import React, { useRef, useState } from 'react';
import { Form as FinalForm } from 'react-final-form';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { NamedLink, Page, TopbarSimplified } from '../../components';
import { submitHomeownerQuote } from '../../util/api';
import GutterQuotesFooter from '../FooterContainer/GutterQuotesFooter';
import { trackConversionEvent, trackLeadEvent } from '../../util/conversionTracking';

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
    label: 'Permanent under-eave lighting',
    publicSummary: 'Permanent under-eave lighting installation',
    serviceNeeded: 'under-eave-lighting',
    defaultNotes:
      'I am interested in permanent under-eave lighting for year-round accent, holiday, or security lighting.',
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

const QuoteStartPage = props => {
  const { scrollingDisabled } = props;
  const history = useHistory();
  const intl = useIntl();
  const m = key => intl.formatMessage({ id: `QuoteStartPage.${key}` });
  const submission = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [selectedProjects, setSelectedProjects] = useState([projectTypes[0]]);
  const [zipCode, setZipCode] = useState('');
  const [timeline, setTimeline] = useState('This month');
  const [propertyType, setPropertyType] = useState('Single-family home');
  const [homeHeight, setHomeHeight] = useState('Two stories');
  const [notes, setNotes] = useState(projectTypes[0].defaultNotes);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const primaryProject = selectedProjects[0] || projectTypes[0];
  const handleProjectToggle = project => {
    trackConversionEvent('service_selected', {
      lead_type: 'homeowner_quote',
      service: project.serviceNeeded,
      service_label: project.label,
      page_path: '/quote',
    });

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

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    const body = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      zipCode: zipCode.trim(),
      timeline,
      propertyType,
      homeHeight,
      notes: notes.trim(),
      services: selectedProjects.map(project => project.serviceNeeded),
      termsAccepted,
    };
    const fingerprint = JSON.stringify(body);
    if (submission.current?.fingerprint !== fingerprint) {
      submission.current = { fingerprint, requestId: window.crypto.randomUUID() };
    }
    try {
      const result = await submitHomeownerQuote({
        ...body,
        requestId: submission.current.requestId,
      });
      if (!result?.ok) throw new Error('Request was not saved');
      trackLeadEvent('homeowner_quote_submitted', {
        service: primaryProject.serviceNeeded,
        service_count: selectedProjects.length,
        page_path: '/quote',
      });
      history.push('/quote/thank-you?submitted=1');
    } catch (e) {
      setSubmitError(m('submitError'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Page
      title="Start a gutter quote request | Gutter Quotes"
      description="Tell Gutter Quotes what your home needs and get matched with trusted local gutter pros."
      scrollingDisabled={scrollingDisabled}
    >
      <TopbarSimplified />
      <main className={css.root}>
        <section className={css.formShell}>
          <FinalForm
            onSubmit={handleSubmit}
            render={({ handleSubmit: submitForm }) => (
              <form className={css.formPanel} onSubmit={submitForm}>
                <div className={css.formHeader}>
                  <p className={css.kicker}>Free gutter quote request</p>
                  <h1>Tell us what your home needs.</h1>
                  <p className={css.lead}>
                    Answer a few questions so local gutter pros can understand the job and compete
                    for your business.
                  </p>
                  <p className={css.trustLine}>
                    Free for homeowners. No obligation. Contact details stay private first.
                  </p>
                </div>

                <div className={css.fieldGroup}>
                  <h2>What gutter work do you need?</h2>
                  <p className={css.stepHint}>
                    Select all that apply. You can also add permanent under-eave lighting while pros
                    are looking at the roofline.
                  </p>
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
                      aria-pressed={selectedProjects.some(
                        selected => selected.label === project.label
                      )}
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
                      required
                      pattern="[0-9]{5}(-[0-9]{4})?"
                      autoComplete="postal-code"
                      placeholder="ZIP code"
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
                    maxLength={3000}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    aria-label="Project notes"
                  />
                </label>

                <section className={css.accountSection}>
                  <div className={css.fieldGroup}>
                    <h2>Your contact information</h2>
                    <p className={css.stepHint}>{m('contactHint')}</p>
                  </div>
                  <div className={css.twoColumn}>
                    <label>
                      <span>First name</span>
                      <input
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        autoComplete="given-name"
                        required
                      />
                    </label>
                    <label>
                      <span>Last name</span>
                      <input
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        autoComplete="family-name"
                        required
                      />
                    </label>
                  </div>
                  <div className={css.twoColumn}>
                    <label>
                      <span>Email</span>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                      />
                    </label>
                    <label>
                      <span>Phone</span>
                      <input
                        type="tel"
                        minLength={10}
                        maxLength={40}
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        autoComplete="tel"
                        required
                      />
                    </label>
                  </div>
                  <label className={css.consentField}>
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={e => setTermsAccepted(e.target.checked)}
                      required
                    />
                    <span>
                      I agree to the{' '}
                      <NamedLink name="TermsOfServicePage">Terms of Service</NamedLink> and{' '}
                      <NamedLink name="PrivacyPolicyPage">Privacy Policy</NamedLink>.
                    </span>
                  </label>
                </section>

                {submitError ? (
                  <p className={css.error} role="alert">
                    {submitError}
                  </p>
                ) : null}
                <button type="submit" className={css.primaryAction} disabled={submitting}>
                  {submitting ? m('submitting') : 'Submit free request'}
                </button>
                <p className={css.microcopy}>
                  Your contact details stay private and are never shown publicly.
                </p>
              </form>
            )}
          />
        </section>
      </main>
      <GutterQuotesFooter />
    </Page>
  );
};

export default QuoteStartPage;
