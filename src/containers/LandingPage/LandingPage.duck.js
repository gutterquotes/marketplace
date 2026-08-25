import { fetchPageAssets } from '../../ducks/hostedAssets.duck';
export const ASSET_NAME = 'landing-page';

export const loadData = (params, search) => dispatch => {
  if (process.env.REACT_APP_GQ_FORCE_LOCAL_PREVIEW === 'true') {
    return Promise.resolve();
  }

  const pageAsset = { landingPage: `content/pages/${ASSET_NAME}.json` };
  return dispatch(fetchPageAssets(pageAsset, true));
};
