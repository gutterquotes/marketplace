import React from 'react';
import { useIntl } from 'react-intl';

import { NamedLink } from '../../components';
import logoImage from '../../assets/gutter-quotes-logo.png';
import preferredSourceEn from '../../assets/google-preferred-source-en.png';
import preferredSourceDe from '../../assets/google-preferred-source-de.png';
import preferredSourceEs from '../../assets/google-preferred-source-es.png';
import preferredSourceFr from '../../assets/google-preferred-source-fr.png';

import css from './GutterQuotesFooter.module.css';

const footerGroups = [
  {
    title: 'Homeowners',
    links: [
      { label: 'Start a quote request', name: 'QuoteStartPage' },
      { label: 'Gutter quotes near me', name: 'SeoLandingPage', params: { seoSlug: 'gutter-quotes-near-me' } },
      { label: 'Service areas', name: 'LocationsPage' },
      { label: 'Homeowner reviews', name: 'ReviewsPage' },
      { label: 'Seamless gutters', name: 'ServiceLandingPage', params: { serviceSlug: 'seamless-gutter-installation' } },
      { label: 'Gutter installation cost', name: 'SeoLandingPage', params: { seoSlug: 'gutter-installation-cost' } },
    ],
  },
  {
    title: 'Gutter pros',
    links: [
      { label: 'For gutter pros', name: 'GutterProPage' },
      { label: 'Gutter leads', name: 'GutterLeadPage' },
      { label: 'Buy gutter leads', name: 'SeoLandingPage', params: { seoSlug: 'buy-gutter-leads' } },
      { label: 'Contractor signup', name: 'SignupForUserTypePage', params: { userType: 'provider' } },
      { label: 'Contractor request board', name: 'SearchPage' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', name: 'AboutPage' },
      { label: 'Contact', name: 'ContactPage' },
      { label: 'Accessibility', name: 'AccessibilityPage' },
      { label: 'Gutter guards', name: 'ServiceLandingPage', params: { serviceSlug: 'gutter-guards' } },
      { label: 'Are gutter guards worth it', name: 'SeoLandingPage', params: { seoSlug: 'are-gutter-guards-worth-it' } },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms', name: 'TermsOfServicePage' },
      { label: 'Privacy', name: 'PrivacyPolicyPage' },
      { label: 'Cookie policy', name: 'CookiePolicyPage' },
      { label: 'Refund policy', name: 'RefundPolicyPage' },
    ],
  },
];

const GutterQuotesFooter = () => {
  const intl = useIntl();
  const preferredSourceImages = {
    en: preferredSourceEn,
    de: preferredSourceDe,
    es: preferredSourceEs,
    fr: preferredSourceFr,
  };
  const preferredSourceImage = preferredSourceImages[intl.locale.split('-')[0]] || preferredSourceEn;
  const currentYear = new Date().getFullYear();

  return (
    <footer className={css.root}>
      <div className={css.inner}>
        <div className={css.brand}>
          <NamedLink name="LandingPage" className={css.logoLink}>
            <img src={logoImage} alt="Gutter Quotes" className={css.logo} />
          </NamedLink>
          <p>
            The focused home services marketplace for gutter installation, guards, repair,
            cleaning, drainage, and commercial gutter work.
          </p>
          <div className={css.marketLinks} aria-label="Featured service areas">
            <NamedLink name="CityLandingPage" params={{ citySlug: 'charlotte-nc' }}>
              Charlotte
            </NamedLink>
            <NamedLink name="CityLandingPage" params={{ citySlug: 'orlando-fl' }}>
              Orlando
            </NamedLink>
            <NamedLink name="CityLandingPage" params={{ citySlug: 'nashville-tn' }}>
              Nashville
            </NamedLink>
          </div>
          <a
            className={css.preferredSource}
            href="https://www.google.com/preferences/source?q=gutterquotes.com"
          >
            <img
              className={css.preferredSourceImage}
              src={preferredSourceImage}
              alt={intl.formatMessage({
                id: 'GutterQuotesFooter.preferredSource',
                defaultMessage: 'Add as a preferred source on Google',
              })}
            />
          </a>
        </div>

        <nav className={css.nav} aria-label="Footer navigation">
          {footerGroups.map(group => (
            <section key={group.title} className={css.navGroup}>
              <h2>{group.title}</h2>
              <ul>
                {group.links.map(link => (
                  <li key={`${group.title}-${link.label}`}>
                    <NamedLink name={link.name} params={link.params}>
                      {link.label}
                    </NamedLink>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>
      </div>
      <div className={css.bottom}>
        <span>© {currentYear} Gutter Quotes. All rights reserved.</span>
        <span>Built for homeowners and gutter specialists nationwide.</span>
      </div>
    </footer>
  );
};

export default GutterQuotesFooter;
