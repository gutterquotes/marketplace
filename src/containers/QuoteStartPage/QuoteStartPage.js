import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { NamedLink, Page, TopbarSimplified } from '../../components';
import { signup } from '../../ducks/auth.duck';
import { isSignupEmailTakenError } from '../../util/errors';
import GutterQuotesFooter from '../FooterContainer/GutterQuotesFooter';
import { trackConversionEvent, trackLeadEvent } from '../../util/conversionTracking';
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

const QuoteStartPage = props => {
  const { scrollingDisabled } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector(state => state.auth?.isAuthenticated);
  const signupInProgress = useSelector(state => state.auth?.signupInProgress);
  const signupError = useSelector(state => state.auth?.signupError);
  const [selectedProjects, setSelectedProjects] = useState([projectTypes[0]]);
  const [zipCode, setZipCode] = useState('28211');
  const [timeline, setTimeline] = useState('This month');
  const [propertyType, setPropertyType] = useState('Single-family home');
  const [homeHeight, setHomeHeight] = useState('Two stories');
  const [notes, setNotes] = useState(projectTypes[0].defaultNotes);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

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
    trackLeadEvent('homeowner_quote_started', {
      service: primaryProject.serviceNeeded,
      services: selectedServiceLabels.join(', '),
      service_count: selectedServiceLabels.length,
      zip_code: zipCode,
      timeline: timelineToValue[timeline],
      property_type: propertyTypeToValue[propertyType],
      home_height: homeHeight,
      page_path: '/quote',
    });

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

  const handleSubmit = async event => {
    event.preventDefault();
    saveDraft();

    if (!isAuthenticated) {
      try {
        await dispatch(
          signup({
            email: email.trim(),
            password,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            publicData: { userType: 'customer' },
            privateData: { homeZip: zipCode.trim() },
            protectedData: { phoneNumber: phone.trim() },
          })
        );
      } catch (e) {
        return;
      }
    }

    history.push(`/l/new?listingType=${GUTTER_QUOTE_LISTING_TYPE}`);
  };

  const accountFieldsComplete =
    isAuthenticated ||
    (firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      phone.trim() &&
      password.length >= 8 &&
      termsAccepted);
  const canSubmit = /^\d{5}(?:-\d{4})?$/.test(zipCode.trim()) && accountFieldsComplete;
  const signupErrorMessage = signupError
    ? isSignupEmailTakenError(signupError)
      ? 'An account already uses this email. Sign in, then return to your saved request.'
      : 'We could not create your account. Check your information and try again.'
    : null;

  return (
    <Page
      title="Start a gutter quote request | Gutter Quotes"
      description="Tell Gutter Quotes what your home needs and get matched with trusted local gutter pros."
      scrollingDisabled={scrollingDisabled}
    >
      <TopbarSimplified />
      <main className={css.root}>
        <section className={css.formShell}>
          <form className={css.formPanel} onSubmit={handleSubmit}>
            <div className={css.formHeader}>
            <p className={css.kicker}>Free gutter quote request</p>
            <h1>Tell us what your home needs.</h1>
            <p className={css.lead}>
              Answer a few questions so local gutter pros can understand the job and compete for
              your business.
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

            {!isAuthenticated ? (
              <section className={css.accountSection}>
                <div className={css.fieldGroup}>
                  <h2>Your contact information</h2>
                  <p className={css.stepHint}>
                    We create your free homeowner account when you submit this request.
                  </p>
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
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      autoComplete="tel"
                      required
                    />
                  </label>
                </div>
                <label className={css.passwordField}>
                  <span>Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="new-password"
                    minLength="8"
                    required
                  />
                  <small>At least 8 characters. Use this to check responses from pros.</small>
                </label>
                <label className={css.consentField}>
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={e => setTermsAccepted(e.target.checked)}
                    required
                  />
                  <span>
                    I agree to the <NamedLink name="TermsOfServicePage">Terms of Service</NamedLink>{' '}
                    and <NamedLink name="PrivacyPolicyPage">Privacy Policy</NamedLink>.
                  </span>
                </label>
                {signupErrorMessage ? <p className={css.error}>{signupErrorMessage}</p> : null}
                <p className={css.existingAccount}>
                  Already have an account? <NamedLink name="LoginPage">Sign in</NamedLink>
                </p>
              </section>
            ) : null}

            <button
              type="submit"
              className={css.primaryAction}
              disabled={!canSubmit || signupInProgress}
            >
              {signupInProgress ? 'Creating your request...' : 'Submit free request'}
            </button>
            <p className={css.microcopy}>
              Your contact details stay private and are never shown publicly.
            </p>
          </form>
        </section>
      </main>
      <GutterQuotesFooter />
    </Page>
  );
};

export default QuoteStartPage;
