import React from 'react';

import { NamedLink } from '../../components';
import logoImage from '../../assets/gutter-quotes-logo.png';

import css from './GutterQuotesFooter.module.css';

const footerGroups = [
  {
    title: 'Homeowners',
    links: [
      { label: 'Start a quote request', name: 'QuoteStartPage' },
      { label: 'Browse active requests', name: 'SearchPage' },
      { label: 'Service areas', name: 'LocationsPage' },
      { label: 'Trust and safety', name: 'TrustSafetyPage' },
    ],
  },
  {
    title: 'Gutter pros',
    links: [
      { label: 'For gutter pros', name: 'GutterProPage' },
      { label: 'Gutter leads', name: 'GutterLeadPage' },
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
      { label: 'Atlanta gutters', name: 'CityLandingPage', params: { citySlug: 'atlanta-ga' } },
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
