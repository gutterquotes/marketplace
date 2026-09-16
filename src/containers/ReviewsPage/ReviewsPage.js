import React, { useMemo, useState } from 'react';

import { NamedLink, Page, TopbarSimplified } from '../../components';
import GutterReviewCard from '../../components/GutterReviewCard/GutterReviewCard';
import { gutterQuotesReviews } from '../../data/gutterQuotesReviews';
import GutterQuotesFooter from '../FooterContainer/GutterQuotesFooter';

import css from './ReviewsPage.module.css';

const serviceFilters = [
  'All services',
  'Gutter installation',
  'Gutter repair',
  'Gutter guards',
  'Drainage',
];

const ReviewsPage = ({ scrollingDisabled }) => {
  const [activeFilter, setActiveFilter] = useState(serviceFilters[0]);
  const visibleReviews = useMemo(
    () =>
      activeFilter === serviceFilters[0]
        ? gutterQuotesReviews
        : gutterQuotesReviews.filter(review => review.services.includes(activeFilter)),
    [activeFilter]
  );

  return (
    <Page
      title="Homeowner gutter reviews | Gutter Quotes"
      description="Read homeowner experiences with gutter installation, repair, guards, and drainage pros found through Gutter Quotes."
      scrollingDisabled={scrollingDisabled}
    >
      <TopbarSimplified />
      <main className={css.root}>
        <section className={css.hero}>
          <div>
            <p className={css.kicker}>Homeowner reviews</p>
            <h1>What homeowners noticed after the quote.</h1>
            <p className={css.lead}>
              Real project details matter more than perfect praise. Read what homeowners said about
              the estimate, the crew, the cleanup, and how the gutters performed afterward.
            </p>
          </div>
          <aside className={css.summary}>
            <strong>4.8 out of 5</strong>
            <span aria-label="4.8 out of 5 stars">★★★★★</span>
            <p>Based on the homeowner stories shown on this page.</p>
            <NamedLink name="QuoteStartPage">Start a free request</NamedLink>
          </aside>
        </section>

        <section className={css.reviewSection}>
          <div className={css.sectionHeading}>
            <div>
              <p className={css.kicker}>Project experiences</p>
              <h2>Filter by the work you need.</h2>
            </div>
            <div className={css.filters} aria-label="Filter reviews by service">
              {serviceFilters.map(filter => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={filter === activeFilter}
                  className={filter === activeFilter ? css.filterActive : css.filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className={css.reviewGrid}>
            {visibleReviews.map(review => (
              <GutterReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>

        <section className={css.cta}>
          <div>
            <p className={css.kicker}>Your project</p>
            <h2>Tell local pros what your home needs.</h2>
          </div>
          <NamedLink name="QuoteStartPage">Start a free gutter request</NamedLink>
        </section>
      </main>
      <GutterQuotesFooter />
    </Page>
  );
};

export default ReviewsPage;
