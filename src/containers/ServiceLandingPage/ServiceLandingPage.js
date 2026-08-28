import React from 'react';

import { NamedLink, NamedRedirect, Page, TopbarSimplified } from '../../components';
import { useConfiguration } from '../../context/configurationContext';
import { findCityBySlug, southeastCities } from '../CityLandingPage/cityData';
import GutterQuotesFooter from '../FooterContainer/GutterQuotesFooter';
import logoImage from '../../assets/gutter-quotes-logo.png';

import { findServiceBySlug, gutterServices } from './serviceData';
import css from './ServiceLandingPage.module.css';

const getHeadline = (service, city) =>
  city ? `${service.phrase} ${city.city} ${city.stateAbbr}` : `${service.phrase} Near You`;

const getDescription = (service, city) =>
  city
    ? `Compare local pros for ${service.phrase.toLowerCase()} in ${city.city}, ${city.stateAbbr}. Start one free gutter request and get matched with specialists who serve ${city.region}.`
    : `Compare local pros for ${service.phrase.toLowerCase()}. Start one free gutter request and find specialists for ${service.homeownerNeed}.`;

const getStateAreas = () => {
  const stateMap = southeastCities.reduce((states, city) => {
    return states.includes(city.stateAbbr) ? states : [...states, city.stateAbbr];
  }, []);

  return stateMap.map(state => ({
    '@type': 'AdministrativeArea',
    name: state,
    address: {
      '@type': 'PostalAddress',
      addressRegion: state,
      addressCountry: 'US',
    },
  }));
};

export const createServiceSchema = ({ service, city, headline, description, marketplaceRootURL }) => {
  const rootURL = marketplaceRootURL || 'https://gutterquotes.com';
  const pagePath = city ? `/services/${service.slug}/${city.slug}` : `/services/${service.slug}`;
  const pageURL = `${rootURL}${pagePath}`;
  const cityArea = city
    ? {
        '@type': 'City',
        name: `${city.city}, ${city.stateAbbr}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: city.city,
          addressRegion: city.stateAbbr,
          addressCountry: 'US',
        },
      }
    : null;

  return [
    {
      '@type': 'Service',
      '@id': `${pageURL}#service`,
      name: headline,
      description,
      serviceType: service.phrase,
      category: 'Gutter services',
      url: pageURL,
      provider: {
        '@id': `${rootURL}#organization`,
        name: 'Gutter Quotes',
      },
      areaServed: cityArea || getStateAreas(),
      audience: [
        {
          '@type': 'Audience',
          audienceType: 'Homeowners comparing gutter quotes',
        },
        {
          '@type': 'Audience',
          audienceType: 'Gutter contractors looking for local leads',
        },
      ],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${rootURL}/quote`,
        description: 'Homeowners can start a free gutter request and compare interested local pros.',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageURL}#breadcrumbs`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Gutter Quotes',
          item: rootURL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: service.phrase,
          item: `${rootURL}/services/${service.slug}`,
        },
        ...(city
          ? [
              {
                '@type': 'ListItem',
                position: 3,
                name: `${service.phrase} ${city.city} ${city.stateAbbr}`,
                item: pageURL,
              },
            ]
          : []),
      ],
    },
  ];
};

const ServiceLandingPage = props => {
  const { params = {}, scrollingDisabled } = props;
  const config = useConfiguration();
  const service = findServiceBySlug(params.serviceSlug);
  const city = params.citySlug ? findCityBySlug(params.citySlug) : null;

  if (!service || (params.citySlug && !city)) {
    return <NamedRedirect name="LandingPage" />;
  }

  const headline = getHeadline(service, city);
  const description = getDescription(service, city);
  const localLabel = city ? `${city.city}, ${city.stateAbbr}` : 'your area';
  const relatedCities = southeastCities.filter(item => item.slug !== city?.slug).slice(0, 8);
  const relatedServices = gutterServices.filter(item => item.slug !== service.slug);
  const schema = createServiceSchema({
    service,
    city,
    headline,
    description,
    marketplaceRootURL: config.marketplaceRootURL,
  });

  return (
    <Page
      title={`${headline} | Gutter Quotes`}
      description={description}
      schema={schema}
      scrollingDisabled={scrollingDisabled}
    >
      <TopbarSimplified />
      <main className={css.root}>
        <section className={css.hero}>
          <div>
            <NamedLink name="LandingPage" className={css.logoLink}>
              <img src={logoImage} alt="Gutter Quotes" className={css.logo} />
            </NamedLink>
            <p className={css.kicker}>{city ? `${city.region} gutter pros` : 'Gutter services'}</p>
            <h1>{headline}</h1>
            <p className={css.lead}>
              {city
                ? `Find contractors for ${service.homeownerNeed} in ${city.city}, ${city.state}.`
                : `Find contractors for ${service.homeownerNeed}.`}
            </p>
            <div className={css.actions}>
              <NamedLink name="QuoteStartPage" className={css.primaryAction}>
                Start a free gutter request
              </NamedLink>
              <NamedLink name="GutterProPage" className={css.secondaryAction}>
                Get gutter leads
              </NamedLink>
            </div>
          </div>

          <aside className={css.intentPanel}>
            <strong>What homeowners compare</strong>
            <p>
              Share the service, ZIP code, home details, timeline, and notes once so interested
              gutter pros can review the project and respond.
            </p>
            <ul>
              {service.details.map(detail => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </aside>
        </section>

        <section className={css.contentGrid}>
          <article className={css.contentCard}>
            <p className={css.kicker}>For homeowners</p>
            <h2>Get a clearer path to the right gutter quote.</h2>
            <p>
              A good gutter project starts with the right questions. Gutter Quotes helps organize
              the details contractors need so you can compare specialists with less back-and-forth.
            </p>
          </article>
          <article className={css.contentCard}>
            <p className={css.kicker}>For gutter pros</p>
            <h2>Reach homeowners searching for {service.shortName.toLowerCase()}.</h2>
            <p>
              Contractors can build a pro profile, define service areas, and prepare to review
              quote-ready homeowner requests in {localLabel}.
            </p>
          </article>
          <article className={css.contentCard}>
            <p className={css.kicker}>Local fit</p>
            <h2>Focused on gutter work, not every home project.</h2>
            <p>
              These pages are built around real gutter services: installation, guards, repair,
              cleaning, downspouts, drainage, and commercial gutter systems.
            </p>
          </article>
        </section>

        <section className={css.linkSection}>
          <div>
            <p className={css.kicker}>{city ? 'Related services' : 'Service pages'}</p>
            <h2>{city ? `More gutter services in ${city.city}` : 'Explore gutter services.'}</h2>
          </div>
          <ul>
            {relatedServices.map(item => (
              <li key={item.slug}>
                <NamedLink
                  name={city ? 'ServiceCityLandingPage' : 'ServiceLandingPage'}
                  params={city ? { serviceSlug: item.slug, citySlug: city.slug } : { serviceSlug: item.slug }}
                >
                  {city ? `${item.phrase} ${city.city} ${city.stateAbbr}` : item.phrase}
                </NamedLink>
              </li>
            ))}
          </ul>
        </section>

        <section className={css.linkSection}>
          <div>
            <p className={css.kicker}>{service.shortName}</p>
            <h2>{city ? 'Nearby city pages.' : 'Popular Southeast markets.'}</h2>
          </div>
          <ul>
            {(city ? relatedCities : southeastCities.slice(0, 12)).map(item => (
              <li key={item.slug}>
                <NamedLink
                  name="ServiceCityLandingPage"
                  params={{ serviceSlug: service.slug, citySlug: item.slug }}
                >
                  {service.phrase} {item.city} {item.stateAbbr}
                </NamedLink>
              </li>
            ))}
          </ul>
        </section>

        <section className={css.finalCta}>
          <div>
            <p className={css.kicker}>Ready when you are</p>
            <h2>Post one request and compare gutter specialists.</h2>
            <p>
              Homeowners can start free. Gutter companies can join to reach high-intent local
              requests as the marketplace grows.
            </p>
          </div>
          <div className={css.finalActions}>
            <NamedLink name="QuoteStartPage" className={css.primaryAction}>
              Start a free gutter request
            </NamedLink>
            <NamedLink name="GutterLeadPage" className={css.secondaryAction}>
              Get gutter leads
            </NamedLink>
          </div>
        </section>
      </main>
      <GutterQuotesFooter />
    </Page>
  );
};

export default ServiceLandingPage;
