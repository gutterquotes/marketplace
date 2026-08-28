import React from 'react';
import { FormattedMessage } from '../../../util/reactIntl';
import { NamedLink } from '../../../components';

import css from './NoSearchResultsMaybe.module.css';

const NoSearchResultsMaybe = props => {
  const { listingsAreLoaded, totalItems, location, resetAll, showCreateListingsLink } = props;
  const hasNoResult = listingsAreLoaded && totalItems === 0;
  const hasSearchParams = location.search?.length > 0;

  const createListingLinkMaybe = showCreateListingsLink ? (
    <NamedLink className={css.createListingLink} name="NewListingPage">
      <FormattedMessage id="SearchPage.createListing" />
    </NamedLink>
  ) : null;

  return hasNoResult ? (
    <div className={css.noSearchResults}>
      <strong>This market is opening for gutter requests.</strong>
      <span>
        We are onboarding homeowners and gutter pros city by city. Start a request to bring local
        pros into your ZIP, or join as a contractor to be ready when new installation, guard,
        repair, cleaning, and drainage jobs arrive.
      </span>
      <div className={css.actionRow}>
        <NamedLink className={css.primaryLink} name="QuoteStartPage">
          Start a homeowner request
        </NamedLink>
        <NamedLink className={css.secondaryLink} name="GutterProPage">
          Join as a gutter pro
        </NamedLink>
      </div>
      {hasSearchParams ? (
        <button className={css.resetAllFiltersButton} onClick={e => resetAll(e)}>
          <FormattedMessage id={'SearchPage.resetAllFilters'} />
        </button>
      ) : null}
      <p>{createListingLinkMaybe}</p>
    </div>
  ) : null;
};

export default NoSearchResultsMaybe;
