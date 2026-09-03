import React from 'react';

import { NamedLink, NamedRedirect, Page, TopbarSimplified } from '../../components';
import { useConfiguration } from '../../context/configurationContext';
import GutterQuotesFooter from '../FooterContainer/GutterQuotesFooter';
import logoImage from '../../assets/gutter-quotes-logo.png';

import { findSeoPageBySlug, seoPageGroups, seoPages } from './seoPageData';
import css from './SeoLandingPage.module.css';

const quoteQuestions = {
  cost: 'What should I include when comparing gutter cost quotes?',
  'near-me': 'How do I find the right gutter pro near me?',
  problems: 'When should I call a gutter contractor?',
  drainage: 'What should I compare before hiring a drainage contractor?',
  compare: 'How should I compare gutter options?',
  materials: 'Which gutter material is best for my home?',
  pros: 'What makes a gutter lead worth pursuing?',
};

const defaultAnswers = {
  cost:
    'Compare the same scope across each quote: service type, home height, linear footage, downspouts, materials, removal, repairs, and warranty details.',
  'near-me':
    'Start with a clear project request, then compare contractors by service area, gutter specialty, responsiveness, photos, and quote detail.',
  problems:
    'Call a pro when water is overflowing, leaking, pooling near the foundation, damaging fascia, or not moving away from the house.',
  drainage:
    'Compare the source of the water, yard slope, soil conditions, downspout discharge, drain route, outlet location, and how the yard will be restored after installation.',
  compare:
    'Compare the tradeoffs that matter for your home: performance, maintenance, durability, appearance, installer quality, and long-term value.',
  materials:
    'The best material depends on budget, roofline, climate, appearance, and maintenance expectations. A local gutter specialist can compare options on-site.',
  pros:
    'A strong gutter lead has clear service intent, location, timeline, homeowner details, and enough scope information for a fast response.',
};

const pageTitle = page => `${page.title} | Gutter Quotes`;

const pageDescription = page =>
  `${page.summary} Compare gutter pros, understand project factors, and start one free request with Gutter Quotes.`;

const createPagePath = slug => `/guides/${slug}`;

export const createSeoGuideSchema = ({ page, marketplaceRootURL }) => {
  const rootURL = marketplaceRootURL || 'https://gutterquotes.com';
  const pageURL = `${rootURL}${createPagePath(page.slug)}`;
  const description = pageDescription(page);

  return [
    {
      '@type': 'Article',
      '@id': `${pageURL}#article`,
      headline: page.title,
      name: page.title,
      description,
      url: pageURL,
      author: {
        '@id': `${rootURL}#organization`,
        name: 'Gutter Quotes',
      },
      publisher: {
        '@id': `${rootURL}#organization`,
        name: 'Gutter Quotes',
      },
      mainEntityOfPage: pageURL,
      articleSection: page.groupLabel,
      about: [
        'Gutter installation',
        'Gutter guards',
        'Gutter repair',
        'Gutter cleaning',
        'Yard drainage',
        'Underground downspout drains',
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${pageURL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: quoteQuestions[page.groupSlug],
          acceptedAnswer: {
            '@type': 'Answer',
            text: defaultAnswers[page.groupSlug],
          },
        },
        {
          '@type': 'Question',
          name: `Can Gutter Quotes help with ${page.title.toLowerCase()}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'Yes. Homeowners can post one free gutter request and use Gutter Quotes to connect with contractors who focus on gutter and drainage work.',
          },
        },
      ],
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
          name: page.title,
          item: pageURL,
        },
      ],
    },
  ];
};

const SeoLandingPage = props => {
  const { params = {}, scrollingDisabled } = props;
  const config = useConfiguration();
  const page = findSeoPageBySlug(params.seoSlug);

  if (!page) {
    return <NamedRedirect name="LandingPage" />;
  }

  const relatedPages = seoPages
    .filter(item => item.groupSlug === page.groupSlug && item.slug !== page.slug)
    .slice(0, 6);
  const crossLinks = seoPageGroups
    .filter(group => group.slug !== page.groupSlug)
    .map(group => group.pages[0])
    .slice(0, 5);
  const schema = createSeoGuideSchema({ page, marketplaceRootURL: config.marketplaceRootURL });

  return (
    <Page
      title={pageTitle(page)}
      description={pageDescription(page)}
      schema={schema}
      scrollingDisabled={scrollingDisabled}
    >
      <TopbarSimplified />
      <main className={css.root}>
        <section className={css.hero}>
          <NamedLink name="LandingPage" className={css.logoLink}>
            <img src={logoImage} alt="Gutter Quotes" className={css.logo} />
          </NamedLink>
          <p className={css.kicker}>{page.intent}</p>
          <h1>{page.title}</h1>
          <p className={css.lead}>{page.summary}</p>
          <div className={css.actions}>
            <NamedLink name="QuoteStartPage" className={css.primaryAction}>
              Start a free gutter request
            </NamedLink>
            <NamedLink name="GutterLeadPage" className={css.secondaryAction}>
              Get gutter leads
            </NamedLink>
          </div>
        </section>

        <section className={css.contentGrid}>
          <article>
            <p className={css.kicker}>What affects the project</p>
            <h2>Key factors to compare before you choose a gutter pro.</h2>
            <p>
              For {page.title.toLowerCase()}, the right quote depends on {page.factors}. A clear
              request helps contractors respond with better scope, better timing, and fewer
              assumptions.
            </p>
          </article>
          <article>
            <p className={css.kicker}>Homeowner next step</p>
            <h2>Turn research into a quote-ready request.</h2>
            <p>
              Gutter Quotes is built around focused gutter work. Share the service, ZIP code, home
              details, photos, notes, and timing once so interested local specialists can respond.
            </p>
          </article>
          <article>
            <p className={css.kicker}>Pro opportunity</p>
            <h2>Contractors can meet homeowners at the moment of intent.</h2>
            <p>
              Gutter companies can join to reach people researching installation, guards, repair,
              replacement, cleaning, downspout drainage, and related gutter services.
            </p>
          </article>
        </section>

        <section className={css.guideSection}>
          <div>
            <p className={css.kicker}>{page.groupLabel}</p>
            <h2>Questions to ask before you hire.</h2>
          </div>
          <ul>
            <li>What exact gutter service is included in the quote?</li>
            <li>Are downspouts, removal, cleanup, materials, and warranties included?</li>
            <li>Can the contractor explain the cause of the issue or the reason for the recommendation?</li>
            <li>Does the quote match your home height, roofline, drainage path, and timing?</li>
          </ul>
        </section>

        <section className={css.linkSection}>
          <div>
            <p className={css.kicker}>Related searches</p>
            <h2>More {page.groupLabel.toLowerCase()}.</h2>
          </div>
          <ul>
            {relatedPages.map(item => (
              <li key={item.slug}>
                <NamedLink name="SeoLandingPage" params={{ seoSlug: item.slug }}>
                  {item.title}
                </NamedLink>
              </li>
            ))}
          </ul>
        </section>

        <section className={css.linkSection}>
          <div>
            <p className={css.kicker}>Build the full picture</p>
            <h2>Explore adjacent gutter topics.</h2>
          </div>
          <ul>
            {crossLinks.map(item => (
              <li key={item.slug}>
                <NamedLink name="SeoLandingPage" params={{ seoSlug: item.slug }}>
                  {item.title}
                </NamedLink>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <GutterQuotesFooter />
    </Page>
  );
};

export default SeoLandingPage;
