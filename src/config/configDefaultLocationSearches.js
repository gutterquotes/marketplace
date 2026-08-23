import { types as sdkTypes } from '../util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
//
// NOTE: these are highly recommended, since they
//       1) help customers to find relevant locations, and
//       2) reduce the cost of using map providers geocoding API
const defaultLocations = [
  {
    id: 'default-united-states',
    predictionPlace: {
      address: 'United States',
      bounds: new LatLngBounds(new LatLng(49.384358, -66.93457), new LatLng(24.396308, -125.0)),
    },
  },
  {
    id: 'default-charlotte',
    predictionPlace: {
      address: 'Charlotte, NC, USA',
      bounds: new LatLngBounds(new LatLng(35.393133, -80.670104), new LatLng(35.013342, -81.009554)),
    },
  },
  {
    id: 'default-atlanta',
    predictionPlace: {
      address: 'Atlanta, GA, USA',
      bounds: new LatLngBounds(new LatLng(33.887617, -84.28939), new LatLng(33.647808, -84.551068)),
    },
  },
  {
    id: 'default-dallas',
    predictionPlace: {
      address: 'Dallas, TX, USA',
      bounds: new LatLngBounds(new LatLng(33.023792, -96.463737), new LatLng(32.617537, -97.000483)),
    },
  },
  {
    id: 'default-phoenix',
    predictionPlace: {
      address: 'Phoenix, AZ, USA',
      bounds: new LatLngBounds(new LatLng(33.92057, -111.926046), new LatLng(33.29026, -112.323914)),
    },
  },
  {
    id: 'default-chicago',
    predictionPlace: {
      address: 'Chicago, IL, USA',
      bounds: new LatLngBounds(new LatLng(42.023131, -87.523984), new LatLng(41.644335, -87.940101)),
    },
  },
];
export default defaultLocations;
