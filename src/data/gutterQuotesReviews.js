export const gutterQuotesReviews = [
  {
    id: 1,
    name: 'Margaret E.',
    city: 'Charleston',
    state: 'SC',
    rating: 5,
    title: 'Three quotes from one request',
    review:
      "I didn't want to spend a week calling gutter companies. I filled out the request once and had three quotes to compare. We went with Half Round Guttering because they could do the older style we wanted without taking the price way beyond our budget.",
    services: ['Gutter installation', 'Drainage'],
    pro: 'Half Round Guttering',
  },
  {
    id: 2,
    name: 'Whitaker B.',
    city: 'Beaufort',
    state: 'SC',
    rating: 5,
    title: 'Much easier than calling around',
    review:
      "Honestly, the best part was not having to chase people down. I sent the details once, compared the replies, and picked the quote that made sense. The crew finished before our family came into town, which was the deadline I cared about.",
    services: ['Gutter installation', 'Drainage'],
    pro: 'Half Round Guttering',
  },
  {
    id: 9,
    name: 'Adelaide Q.',
    city: 'New Bern',
    state: 'NC',
    rating: 4,
    title: 'They came back the next morning',
    review:
      "One downspout was too close to our walkway. I called and they moved it the next morning, no argument and no extra bill. Four stars only because I want to see how everything does through hurricane season. So far, so good.",
    services: ['Gutter installation', 'Drainage'],
    pro: 'Half Round Guttering',
  },
  {
    id: 11,
    name: 'Victoria L.',
    city: 'Charleston',
    state: 'SC',
    rating: 5,
    title: 'We could compare the real total',
    review:
      "The cheapest estimate left out several things that showed up in the other two. Having them side by side made that obvious. We chose the more complete quote and didn't get hit with extras halfway through the job. That was worth a lot to us.",
    services: ['Gutter installation', 'Drainage'],
    pro: 'Guttering Inc.',
  },
  {
    id: 17,
    name: 'Helena B.',
    city: 'Atlanta',
    state: 'GA',
    rating: 4,
    title: 'Good result, but allow extra time',
    review:
      "The copper work looks great, but the job took a few days longer than we were first told. A part had to be remade. They did keep us posted, and the final price stayed where it was supposed to. I'd use them again, just not on a tight deadline.",
    services: ['Gutter installation'],
    pro: 'Guttering Inc.',
  },
  {
    id: 18,
    name: 'Nathaniel P.',
    city: 'Mount Pleasant',
    state: 'SC',
    rating: 5,
    title: 'One form and the problem was handled',
    review:
      "I posted the job during lunch and didn't have to keep calling companies after work. We chose a quote that covered the downspouts and drainage together. The old rattling is gone, and water isn't dumping beside the foundation anymore.",
    services: ['Gutter installation', 'Drainage'],
    pro: 'Guttering Inc.',
  },
  {
    id: 23,
    name: 'Dana W.',
    city: 'Atlanta',
    state: 'GA',
    rating: 5,
    title: 'Fixed the small problem before it got expensive',
    review:
      "They found one soft fascia board before hanging the new gutters. It was a small repair now instead of a bigger one later. I also liked that I could compare everything in one place instead of trying to remember what each company told me on the phone.",
    services: ['Gutter installation', 'Gutter repair'],
    pro: 'ValueFilter Gutter',
  },
  {
    id: 27,
    name: 'Tess H.',
    city: 'Summerville',
    state: 'SC',
    rating: 4,
    title: 'No hassle when I asked for a fix',
    review:
      "One corner didn't look right to me. The installer agreed and redid it that afternoon. No debate and no change order. I'm giving four stars until we've had a full summer of storms, but the first few rains have been fine.",
    services: ['Gutter installation', 'Gutter repair'],
    pro: 'ValueFilter Gutter',
  },
  {
    id: 30,
    name: 'Liam O.',
    city: 'Roswell',
    state: 'GA',
    rating: 5,
    title: 'One job instead of hiring twice',
    review:
      "We needed gutters and a way to get the water away from the crawl space. One of the quotes covered both, so we didn't have to find a second company for drainage. Fewer appointments, one schedule, and one bill. Much simpler.",
    services: ['Gutter installation', 'Drainage'],
    pro: 'ValueFilter Gutter',
  },
  {
    id: 31,
    name: 'Jonah B.',
    city: 'Charleston',
    state: 'SC',
    rating: 5,
    title: 'Booked without days of callbacks',
    review:
      "Our downtown alley makes contractor work a pain. I put the access details in the request, so the companies quoting the job knew about it up front. We picked one, booked it, and didn't spend days explaining the same problem over and over.",
    services: ['Gutter installation', 'Gutter repair'],
    pro: 'Charleston Guttering',
  },
  {
    id: 32,
    name: 'Sadie F.',
    city: 'Charleston',
    state: 'SC',
    rating: 5,
    title: 'Solved the gutter and drainage issue together',
    review:
      "I liked being able to ask for gutter repair and drainage in the same request. The quote we chose covered both, and the work took two days. After the last few storms, the back rooms don't have that damp smell anymore.",
    services: ['Gutter installation', 'Gutter repair', 'Drainage'],
    pro: 'Charleston Guttering',
  },
  {
    id: 33,
    name: 'Ellis P.',
    city: 'James Island',
    state: 'SC',
    rating: 5,
    title: 'Quick quote, clean yard',
    review:
      "Getting the quotes was faster than I expected. The crew we hired also tightened a loose soffit while they were up there and ran a magnet through the grass before leaving. With kids in the yard, I noticed that.",
    services: ['Gutter installation', 'Gutter repair'],
    pro: 'Charleston Guttering',
  },
];

export const homepageReviewIds = [1, 2, 11, 18, 30, 33];

export const homepageReviews = homepageReviewIds.map(id =>
  gutterQuotesReviews.find(review => review.id === id)
);
