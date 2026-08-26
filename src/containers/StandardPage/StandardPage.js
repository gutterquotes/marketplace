import React from 'react';

import { NamedLink, NamedRedirect, Page, TopbarSimplified } from '../../components';
import logoImage from '../../assets/gutter-quotes-logo.png';

import { legalNotice, standardPages } from './standardPageData';
import css from './StandardPage.module.css';

const StandardPage = props => {
  const { params = {}, scrollingDisabled } = props;
  const page = standardPages[params.pageId];

  if (!page) {
    return <NamedRedirect name="LandingPage" />;
  }

  const isLegalPage = ['cookie-policy', 'lead-policy', 'refund-policy'].includes(params.pageId);

  return (
    <Page title={`${page.title} | Gutter Quotes`} description={page.description} scrollingDisabled={scrollingDisabled}>
      <TopbarSimplified />
      <main className={css.root}>
        <section className={css.hero}>
          <div>
            <img src={logoImage} alt="Gutter Quotes" className={css.logo} />
            <p className={css.kicker}>{page.eyebrow}</p>
            <h1>{page.hero}</h1>
            <p className={css.lead}>{page.description}</p>
          </div>
          <aside className={css.actionPanel}>
            <strong>Ready to start?</strong>
            <p>Post a homeowner request or join as a gutter pro.</p>
            <NamedLink name="QuoteStartPage" className={css.primaryAction}>
              Start a quote request
            </NamedLink>
            <NamedLink
              name="SignupForUserTypePage"
              params={{ userType: 'provider' }}
              className={css.secondaryAction}
            >
              Join as a pro
            </NamedLink>
          </aside>
        </section>

        <section className={css.content}>
          {page.sections.map(section => (
            <article key={section.title} className={css.section}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </article>
          ))}
          {isLegalPage ? <p className={css.notice}>{legalNotice}</p> : null}
        </section>
      </main>
    </Page>
  );
};

export default StandardPage;
