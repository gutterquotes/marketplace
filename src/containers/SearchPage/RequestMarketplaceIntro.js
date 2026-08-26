import React from 'react';

import { NamedLink } from '../../components';

import css from './SearchPage.module.css';

const RequestMarketplaceIntro = props => {
  const { totalItems, searchInProgress } = props;
  const requestCount = searchInProgress ? '...' : totalItems;

  return (
    <section className={css.requestIntro}>
      <div className={css.requestIntroCopy}>
        <p className={css.requestKicker}>Contractor opportunity board</p>
        <h1>Active gutter requests from homeowners ready to compare quotes.</h1>
        <p>
          Browse installation, guard, repair, cleaning, and drainage jobs. Use filters to find the
          requests that match your service area, crew capacity, and specialties.
        </p>
        <div className={css.requestActions}>
          <NamedLink name="SignupForUserTypePage" params={{ userType: 'provider' }}>
            Join as a gutter pro
          </NamedLink>
          <NamedLink name="QuoteStartPage">Post a homeowner request</NamedLink>
        </div>
      </div>
      <aside className={css.requestMetrics} aria-label="Request marketplace summary">
        <div>
          <strong>{requestCount}</strong>
          <span>open requests</span>
        </div>
        <div>
          <strong>6</strong>
          <span>gutter service types</span>
        </div>
        <div>
          <strong>Reverse</strong>
          <span>providers submit quotes</span>
        </div>
      </aside>
    </section>
  );
};

export default RequestMarketplaceIntro;
