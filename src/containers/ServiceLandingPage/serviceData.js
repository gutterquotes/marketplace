export const gutterServices = [
  {
    slug: 'seamless-gutter-installation',
    phrase: 'Seamless Gutter Installation',
    shortName: 'Seamless gutters',
    homeownerNeed: 'new custom-fit gutters that move water away from the home cleanly',
    details: ['aluminum and metal options', 'roofline measurements', 'downspout placement'],
  },
  {
    slug: 'gutter-replacement',
    phrase: 'Gutter Replacement',
    shortName: 'Gutter replacement',
    homeownerNeed: 'old, leaking, sagging, or storm-damaged gutters replaced with a better system',
    details: ['remove failing gutters', 'match roofline and fascia', 'upgrade drainage performance'],
  },
  {
    slug: 'gutter-guards',
    phrase: 'Gutter Guard Installation',
    shortName: 'Gutter guards',
    homeownerNeed: 'guards that reduce clogs from leaves, pine needles, and roof debris',
    details: ['compare guard styles', 'protect downspouts', 'reduce cleaning frequency'],
  },
  {
    slug: 'gutter-repair',
    phrase: 'Gutter Repair',
    shortName: 'Gutter repair',
    homeownerNeed: 'leaks, loose sections, bad pitch, and damaged downspouts fixed before water spreads',
    details: ['seal leaks', 'correct slope', 'reattach loose runs'],
  },
  {
    slug: 'gutter-cleaning',
    phrase: 'Gutter Cleaning',
    shortName: 'Gutter cleaning',
    homeownerNeed: 'seasonal cleaning that clears debris and keeps rainwater flowing',
    details: ['clear gutters', 'flush downspouts', 'spot early damage'],
  },
  {
    slug: 'underground-downspout-drain',
    phrase: 'Underground Downspout Drain Installation',
    shortName: 'Underground downspout drains',
    homeownerNeed: 'buried downspout drainage that carries water away from the foundation',
    details: ['extend downspouts', 'route discharge safely', 'reduce pooling near the home'],
  },
  {
    slug: 'yard-drainage',
    phrase: 'Yard Drainage Contractors',
    shortName: 'Yard drainage',
    homeownerNeed: 'drainage improvements for pooling water, soggy lawns, and runoff near the house',
    details: ['surface drainage', 'water routing', 'foundation protection'],
  },
  {
    slug: 'commercial-gutters',
    phrase: 'Commercial Gutter Installation',
    shortName: 'Commercial gutters',
    homeownerNeed: 'gutter and drainage help for multifamily, retail, office, and light commercial buildings',
    details: ['larger rooflines', 'commercial downspouts', 'maintenance planning'],
  },
];

export const findServiceBySlug = slug => gutterServices.find(service => service.slug === slug);
