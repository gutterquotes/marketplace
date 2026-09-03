import { southeastCities } from '../CityLandingPage/cityData';

const costPages = [
  ['gutter-installation-cost', 'Gutter Installation Cost', 'Plan a gutter installation with clearer pricing expectations before you talk to contractors.', 'roofline length, number of stories, material choice, downspout count, fascia condition, and removal of old gutters'],
  ['seamless-gutter-cost', 'Seamless Gutter Cost', 'Understand what affects seamless gutter pricing and when a custom-fit system is worth comparing.', 'linear footage, aluminum thickness, color finish, corner count, hanger spacing, and onsite fabrication'],
  ['gutter-replacement-cost', 'Gutter Replacement Cost', 'Compare replacement quotes when old gutters are leaking, sagging, rusting, or pulling away from the home.', 'tear-off labor, disposal, fascia repairs, new gutter profile, downspout upgrades, and access around the home'],
  ['gutter-guard-cost', 'Gutter Guard Cost', 'Estimate the variables behind gutter guard pricing before choosing a guard system.', 'guard style, roof pitch, gutter condition, tree coverage, installation method, and warranty coverage'],
  ['gutter-repair-cost', 'Gutter Repair Cost', 'Get a practical view of gutter repair pricing for leaks, bad slope, loose sections, and storm damage.', 'repair scope, leak locations, height, section length, sealant or fastener needs, and downspout work'],
  ['gutter-cleaning-cost', 'Gutter Cleaning Cost', 'Learn what shapes gutter cleaning quotes and when cleaning should turn into a repair conversation.', 'home height, gutter length, debris volume, downspout flushing, roof access, and gutter guard removal'],
  ['underground-downspout-drain-cost', 'Underground Downspout Drain Cost', 'Compare underground downspout drain pricing for moving roof water farther from the foundation.', 'trench length, soil conditions, discharge point, pipe type, catch basins, and landscape restoration'],
];

const nearMePages = [
  ['gutter-installers-near-me', 'Gutter Installers Near Me', 'Find local gutter installers who can review your home details and respond with relevant quote options.', 'installation type, ZIP code, roofline details, project timing, and preferred material'],
  ['gutter-companies-near-me', 'Gutter Companies Near Me', 'Compare gutter companies around your area without calling every contractor one at a time.', 'service area, specialties, availability, project photos, and quote process'],
  ['gutter-repair-near-me', 'Gutter Repair Near Me', 'Connect with gutter repair pros for leaks, sagging runs, bad pitch, loose hangers, and damaged downspouts.', 'issue type, affected areas, home height, urgency, and photos of the problem'],
  ['gutter-cleaning-near-me', 'Gutter Cleaning Near Me', 'Find gutter cleaning help for seasonal debris, clogged downspouts, overflowing gutters, and roofline buildup.', 'cleaning frequency, tree coverage, stories, access, and guard removal needs'],
  ['gutter-guard-installers-near-me', 'Gutter Guard Installers Near Me', 'Compare gutter guard installers for leaf protection, pine needle coverage, and lower-maintenance gutters.', 'guard style, gutter condition, roof type, debris type, and warranty preferences'],
  ['seamless-gutter-contractors-near-me', 'Seamless Gutter Contractors Near Me', 'Find seamless gutter contractors who can fabricate custom-fit gutter runs for your home.', 'linear footage, color, material, downspout layout, and existing gutter removal'],
];

const problemPages = [
  ['gutters-overflowing', 'Gutters Overflowing', 'Overflowing gutters can point to clogs, undersized gutters, poor slope, or blocked downspouts.', 'where overflow happens, rainfall pattern, debris level, downspout flow, and recent cleaning history'],
  ['gutters-leaking', 'Gutters Leaking', 'Leaking gutters can damage fascia, siding, landscaping, and foundation areas when ignored.', 'leak location, seam condition, holes, loose end caps, slope issues, and gutter age'],
  ['gutters-pulling-away-from-house', 'Gutters Pulling Away From House', 'Gutters pulling away from the fascia need fast attention before the system fails further.', 'loose hangers, rotten fascia, ice or debris weight, water load, and roof edge condition'],
  ['sagging-gutters', 'Sagging Gutters', 'Sagging gutters often mean water is sitting instead of draining toward the downspouts.', 'low spots, hanger spacing, standing water, debris weight, and fascia condition'],
  ['water-pooling-near-foundation', 'Water Pooling Near Foundation', 'Pooling water near the foundation can mean downspouts need extensions, drains, or better routing.', 'downspout discharge, grading, soil saturation, roof runoff volume, and drainage path'],
  ['basement-water-from-gutters', 'Basement Water From Gutters', 'Basement water can start at the roofline when gutters or downspouts are not moving rain away.', 'overflow points, foundation slope, downspout exits, underground drains, and heavy-rain behavior'],
  ['downspout-drainage-problems', 'Downspout Drainage Problems', 'Downspout drainage problems can leave water beside the home even when the gutter run is clear.', 'clogged elbows, short extensions, buried pipe issues, discharge location, and yard slope'],
  ['rainwater-not-draining-away-from-house', 'Rainwater Not Draining Away From House', 'If rainwater is not draining away from the house, the fix may involve gutters, downspouts, grading, or drains.', 'roof runoff, grading, extensions, underground drainage, and low spots in the yard'],
];

const drainagePages = [
  ['yard-drainage-contractors', 'Yard Drainage Contractors', 'Find drainage contractors who can help with standing water, soggy lawns, downspout runoff, and water near the foundation.', 'low spots, soil conditions, roof runoff, grading, discharge route, catch basins, and underground pipe layout'],
  ['yard-drainage-solutions', 'Yard Drainage Solutions', 'Compare yard drainage solutions for soggy lawns, pooling water, poor grading, and runoff that stays too close to the house.', 'standing water location, slope, soil saturation, gutter discharge, drain type, and where water can exit safely'],
  ['underground-downspout-drain-installation', 'Underground Downspout Drain Installation', 'Route downspout water underground so roof runoff moves farther away from the foundation and landscaping.', 'downspout count, trench length, pipe size, pop-up emitters, catch basins, discharge point, and landscape restoration'],
  ['downspout-drainage-systems', 'Downspout Drainage Systems', 'Plan a downspout drainage system that moves roof water away from siding, crawlspaces, basements, landscaping, and foundations.', 'roof size, downspout placement, underground pipe routes, slope, soil type, cleanouts, and outlet location'],
  ['foundation-drainage-solutions', 'Foundation Drainage Solutions', 'Find gutter and drainage pros for water collecting near the foundation after heavy rain.', 'gutter overflow, downspout exits, grading, saturated soil, underground drains, extensions, and foundation risk areas'],
  ['soggy-yard-drainage', 'Soggy Yard Drainage', 'Soggy yards often need better surface drainage, downspout routing, soil evaluation, or underground drain paths.', 'standing water, clay soil, shade, low areas, roof runoff, drainage route, and lawn restoration'],
  ['standing-water-in-yard', 'Standing Water In Yard', 'Standing water after rain can point to grading, compacted soil, blocked drains, or downspouts dumping too close to the home.', 'where water collects, how long it stays, soil type, downspout discharge, yard slope, and outlet options'],
  ['french-drain-vs-underground-downspout-drain', 'French Drain vs Underground Downspout Drain', 'Compare French drains and underground downspout drains before choosing the right drainage fix for your home.', 'water source, soil saturation, trench route, pipe type, gravel, fabric, cleanouts, and discharge point'],
];

const drainageCityKeywords = [
  {
    slug: 'yard-drainage-contractors',
    phrase: 'Yard Drainage Contractors',
    summary: city =>
      `Compare yard drainage contractors in ${city.city}, ${city.stateAbbr} for standing water, soggy lawns, poor grading, and runoff near the home.`,
    factors:
      'standing water location, yard slope, soil saturation, downspout runoff, drain route, outlet options, and landscape repair',
  },
  {
    slug: 'yard-drainage-solutions',
    phrase: 'Yard Drainage Solutions',
    summary: city =>
      `Find yard drainage solutions in ${city.city}, ${city.stateAbbr} for pooling water, saturated soil, low areas, and drainage paths that protect the foundation.`,
    factors:
      'low spots, soil type, grading, catch basins, channel drains, underground pipe, discharge location, and lawn restoration',
  },
  {
    slug: 'underground-downspout-drains',
    phrase: 'Underground Downspout Drains',
    summary: city =>
      `Compare underground downspout drain pros in ${city.city}, ${city.stateAbbr} who can move roof water away from the foundation.`,
    factors:
      'downspout count, trench length, pipe size, slope, cleanouts, pop-up emitters, discharge point, and landscaping',
  },
  {
    slug: 'downspout-drainage-systems',
    phrase: 'Downspout Drainage Systems',
    summary: city =>
      `Plan a downspout drainage system in ${city.city}, ${city.stateAbbr} for roof runoff, foundation protection, and better water routing after storms.`,
    factors:
      'roof runoff volume, gutter capacity, downspout placement, buried pipe routes, outlet location, soil conditions, and maintenance access',
  },
  {
    slug: 'foundation-drainage',
    phrase: 'Foundation Drainage',
    summary: city =>
      `Find foundation drainage help in ${city.city}, ${city.stateAbbr} when rainwater collects near the home, crawlspace, basement, or landscaping.`,
    factors:
      'water near the foundation, gutter overflow, downspout discharge, grading, soil saturation, drain design, and safe outlet points',
  },
];

const drainageCityPages = southeastCities.flatMap(city =>
  drainageCityKeywords.map(keyword => [
    `${keyword.slug}-${city.slug}`,
    `${keyword.phrase} ${city.city} ${city.stateAbbr}`,
    keyword.summary(city),
    keyword.factors,
  ])
);

const comparisonPages = [
  ['seamless-gutters-vs-regular-gutters', 'Seamless Gutters vs Regular Gutters', 'Compare seamless and sectional gutter systems before deciding what belongs on your home.', 'leak risk, installation method, material options, repairability, appearance, and long-term maintenance'],
  ['gutter-guards-vs-gutter-cleaning', 'Gutter Guards vs Gutter Cleaning', 'Compare ongoing cleaning with gutter guard installation so you can choose the right maintenance path.', 'tree coverage, cleaning frequency, guard cost, roof access, and clog risk'],
  ['are-gutter-guards-worth-it', 'Are Gutter Guards Worth It', 'Decide whether gutter guards make sense for your home, trees, roofline, and maintenance goals.', 'debris type, gutter condition, installation quality, cleaning savings, and guard design'],
  ['best-gutter-guards', 'Best Gutter Guards', 'Understand the main gutter guard styles and what to ask before hiring an installer.', 'mesh, micro-mesh, screen, reverse-curve, brush, foam, and warranty details'],
  ['leaffilter-alternatives', 'LeafFilter Alternatives', 'Compare LeafFilter alternatives by focusing on fit, installation quality, service terms, and local availability.', 'guard design, contractor reputation, service coverage, warranty terms, and quote transparency'],
  ['aluminum-vs-vinyl-gutters', 'Aluminum vs Vinyl Gutters', 'Compare aluminum and vinyl gutters for durability, appearance, cost, and climate fit.', 'material strength, expansion, color options, leak risk, and repair options'],
  ['5-inch-vs-6-inch-gutters', '5 Inch vs 6 Inch Gutters', 'Learn when larger 6 inch gutters may be a better fit than standard 5 inch gutters.', 'roof size, pitch, rainfall intensity, downspout capacity, and overflow history'],
];

const materialPages = [
  ['aluminum-gutters', 'Aluminum Gutters', 'Aluminum gutters are a common choice for custom seamless systems and broad color options.', 'gauge, finish, hanger system, downspout size, and installer workmanship'],
  ['copper-gutters', 'Copper Gutters', 'Copper gutters create a premium look and long-lasting system when installed by skilled pros.', 'profile, patina, soldered details, hangers, historic-home fit, and budget'],
  ['vinyl-gutters', 'Vinyl Gutters', 'Vinyl gutters can work for some projects but should be compared carefully against aluminum options.', 'climate, sun exposure, section joints, support spacing, and expected lifespan'],
  ['k-style-gutters', 'K Style Gutters', 'K style gutters are popular because they combine capacity, clean lines, and broad installer availability.', 'gutter size, fascia fit, material, color, and downspout layout'],
  ['half-round-gutters', 'Half Round Gutters', 'Half round gutters can fit historic, premium, and design-forward homes with the right installer.', 'bracket style, material, roof edge, downspout pairing, and visual goals'],
  ['6-inch-gutters', '6 Inch Gutters', '6 inch gutters can help homes with larger roofs, steep pitches, or heavy rain manage runoff better.', 'roof area, pitch, rainfall, downspout size, and overflow points'],
  ['box-gutters', 'Box Gutters', 'Box gutters require careful diagnosis because they are often tied into roof and building details.', 'leaks, lining, roof integration, drainage capacity, access, and repair scope'],
];

const proPages = [
  ['gutter-leads', 'Gutter Leads', 'Gutter Quotes helps contractors prepare to reach homeowners actively looking for gutter help.', 'service area, project type, homeowner intent, lead details, and response timing'],
  ['gutter-installation-leads', 'Gutter Installation Leads', 'Reach homeowners planning gutter installation, seamless gutter upgrades, and replacement projects.', 'ZIP code, project timeline, home details, scope, and installation type'],
  ['gutter-guard-leads', 'Gutter Guard Leads', 'Find homeowner demand for gutter guards, leaf protection, and lower-maintenance gutter systems.', 'tree coverage, gutter condition, roof access, guard interest, and timing'],
  ['exclusive-gutter-leads', 'Exclusive Gutter Leads', 'Build toward better lead quality by focusing on homeowners with specific gutter project intent.', 'service match, location, homeowner details, project urgency, and clear next step'],
  ['buy-gutter-leads', 'Buy Gutter Leads', 'Evaluate gutter leads based on intent, project fit, territory, and speed to contact.', 'lead source, service category, geography, contact workflow, and close-rate tracking'],
  ['pay-per-lead-gutter-marketing', 'Pay Per Lead Gutter Marketing', 'Compare pay-per-lead gutter marketing with SEO, ads, referrals, and local partnerships.', 'lead cost, quality, exclusivity, close rate, crew capacity, and seasonality'],
  ['gutter-contractor-marketing', 'Gutter Contractor Marketing', 'Grow a gutter company with focused marketing that reaches homeowners before they choose a contractor.', 'local SEO, quote requests, reviews, referral systems, landing pages, and follow-up speed'],
];

const pageGroups = [
  ['cost', 'Cost guides', 'Money questions', costPages],
  ['near-me', 'Near me pages', 'Ready-to-hire searches', nearMePages],
  ['problems', 'Problem guides', 'Homeowner problem searches', problemPages],
  ['drainage', 'Drainage pages', 'Drainage and water problem searches', [...drainagePages, ...drainageCityPages]],
  ['compare', 'Comparison guides', 'Decision searches', comparisonPages],
  ['materials', 'Material guides', 'Product research', materialPages],
  ['pros', 'Pro growth pages', 'Contractor acquisition', proPages],
];

const toPage = ([slug, title, summary, factors], groupSlug, groupLabel, intent) => ({
  slug,
  title,
  groupSlug,
  groupLabel,
  intent,
  summary,
  factors,
});

export const seoPageGroups = pageGroups.map(([slug, label, intent, pages]) => ({
  slug,
  label,
  intent,
  pages: pages.map(page => toPage(page, slug, label, intent)),
}));

export const seoPages = seoPageGroups.flatMap(group => group.pages);

export const seoPageSlugs = seoPages.map(page => page.slug);

export const findSeoPageBySlug = slug => seoPages.find(page => page.slug === slug);
