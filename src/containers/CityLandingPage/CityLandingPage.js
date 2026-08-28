import React from 'react';

import { NamedLink, NamedRedirect, Page, TopbarSimplified } from '../../components';
import logoImage from '../../assets/gutter-quotes-logo.png';

import { findCityBySlug, southeastCities } from './cityData';
import { gutterServices } from '../ServiceLandingPage/serviceData';
import css from './CityLandingPage.module.css';

const services = [
  'Seamless gutter installation',
  'Gutter guards',
  'Gutter repair',
  'Gutter cleaning',
  'Downspouts and drainage',
  'Commercial gutters',
];

const CityLandingPage = props => {
  const { params = {}, scrollingDisabled } = props;
  const city = findCityBySlug(params.citySlug);

  if (!params.citySlug) {
    return (
      <Page
        title="Gutter Quotes service areas | Southeast city pages"
        description="Explore Gutter Quotes city pages for major Southeast markets."
        scrollingDisabled={scrollingDisabled}
      >
        <TopbarSimplified />
        <main className={css.root}>
          <section className={css.hero}>
            <div>
              <img src={logoImage} alt="Gutter Quotes" className={css.logo} />
              <p className={css.kicker}>Service areas</p>
              <h1>Gutter Quotes city pages across the Southeast.</h1>
              <p className={css.lead}>
                Explore local pages for gutter installation, guards, repair, cleaning, downspouts,
                drainage, and commercial gutter work.
              </p>
            </div>
          </section>
          <section className={css.cityLinks}>
            <div>
              <p className={css.kicker}>Major markets</p>
              <h2>Find your city.</h2>
            </div>
            <ul>
              {southeastCities.map(item => (
                <li key={item.slug}>
                  <NamedLink name="CityLandingPage" params={{ citySlug: item.slug }}>
                    {item.city}, {item.state}
                  </NamedLink>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </Page>
    );
  }

  if (!city) {
    return <NamedRedirect name="LandingPage" />;
  }

  const title = `Gutter Quotes in ${city.city}, ${city.state} | Compare local gutter pros`;
  const description = `Post a gutter request in ${city.city}, ${city.state} and compare local pros for installation, gutter guards, repair, cleaning, downspouts, and drainage.`;

  return (
    <Page title={title} description={description} scrollingDisabled={scrollingDisabled}>
      <TopbarSimplified />
      <main className={css.root}>
        <section className={css.hero}>
          <div>
            <img src={logoImage} alt="Gutter Quotes" className={css.logo} />
            <p className={css.kicker}>{city.region}</p>
            <h1>Compare gutter quotes in {city.city}, {city.state}.</h1>
            <p className={css.lead}>
              Start one request for gutter installation, guards, repair, cleaning, or drainage work
              and connect with local gutter pros who serve the {city.city} area.
            </p>
            <div className={css.actions}>
              <NamedLink name="QuoteStartPage" className={css.primaryAction}>
                Start a free request
              </NamedLink>
              <NamedLink name="SearchPage" className={css.secondaryAction}>
                Browse active requests
              </NamedLink>
              <NamedLink name="GutterProPage" className={css.secondaryAction}>
                Get gutter leads
              </NamedLink>
            </div>
          </div>
          <aside className={css.localPanel}>
            <strong>{city.city} gutter project match</strong>
            <p>
              Share project type, ZIP code, timeline, property details, and notes so contractors
              can decide whether the request fits.
            </p>
            <ul>
              <li>Public previews protect homeowner privacy</li>
              <li>Contractors browse request opportunities</li>
              <li>Quotes start from better project details</li>
            </ul>
          </aside>
        </section>

        <section className={css.serviceSection}>
          <div className={css.sectionHeading}>
            <p className={css.kicker}>Services in {city.city}</p>
            <h2>One focused platform for gutter work across {city.region}.</h2>
          </div>
          <div className={css.serviceGrid}>
            {services.map(service => (
              <article key={service} className={css.serviceCard}>
                <h3>{service}</h3>
                <p>
                  Find local help for {service.toLowerCase()} in and around {city.city}.
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className={css.serviceLinks}>
          <div>
            <p className={css.kicker}>Search by service</p>
            <h2>Popular gutter searches in {city.city}.</h2>
          </div>
          <ul>
            {gutterServices.map(service => (
              <li key={service.slug}>
                <NamedLink
                  name="ServiceCityLandingPage"
                  params={{ serviceSlug: service.slug, citySlug: city.slug }}
                >
                  {service.phrase} {city.city} {city.stateAbbr}
                </NamedLink>
              </li>
            ))}
          </ul>
        </section>

        <section className={css.cityLinks}>
          <div>
            <p className={css.kicker}>Southeast markets</p>
            <h2>Explore other Gutter Quotes city pages.</h2>
          </div>
          <ul>
            {southeastCities
              .filter(item => item.slug !== city.slug)
              .slice(0, 10)
              .map(item => (
                <li key={item.slug}>
                  <NamedLink name="CityLandingPage" params={{ citySlug: item.slug }}>
                    {item.city}, {item.state}
                  </NamedLink>
                </li>
              ))}
          </ul>
        </section>
      </main>
    </Page>
  );
};

export default CityLandingPage;
