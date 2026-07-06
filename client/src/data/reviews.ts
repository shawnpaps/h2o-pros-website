export interface Review {
  name: string;
  rating: number;
  text: string;
  location?: string;
  service?: string;
  /** Where the review was posted, e.g. 'Google' */
  source?: string;
  /** Display date, e.g. 'March 2026' */
  date?: string;
}

export const reviews: Review[] = [
  {
    name: 'Melissa R.',
    location: 'Tampa, FL',
    rating: 5,
    text: 'Our water heater died on a Sunday night and they had someone out first thing Monday. Upfront quote, no surprises, and the new tankless unit is fantastic. Couldn’t ask for a better experience.',
    service: 'Water Heater Replacement',
  },
  {
    name: 'James T.',
    location: 'Lakeland, FL',
    rating: 5,
    text: 'They found a slab leak two other companies missed. Explained everything, showed me the readings, and fixed it the same day with barely any mess. These guys are the real deal.',
    service: 'Leak Detection',
  },
  {
    name: 'Dana & Rob K.',
    location: 'Wesley Chapel, FL',
    rating: 5,
    text: 'Night-and-day difference since the whole-home filtration went in. No more chlorine smell, dishes come out spotless, and the install was clean and fast. Highly recommend the free water test.',
    service: 'Whole-Home Filtration',
  },
  {
    name: 'Carlos M.',
    location: 'Clearwater, FL',
    rating: 5,
    text: 'Kitchen drain backed up before a holiday dinner. They hydro-jetted the line, showed me the camera footage before and after, and the price matched the quote to the dollar.',
    service: 'Drain Cleaning',
  },
  {
    name: 'Patricia H.',
    location: 'Ocala, FL',
    rating: 5,
    text: 'Polite, on time, and they wore shoe covers without being asked. Fixed three small issues in one visit and didn’t try to upsell me on anything I didn’t need. My plumber from now on.',
    service: 'General Plumbing',
  },
  {
    name: 'Steve B.',
    location: 'New Port Richey, FL',
    rating: 5,
    text: 'They tracked down a stubborn leak that two other companies missed. Clear quote, clean work, and the water pressure was back to normal before they left.',
    service: 'Leak Detection',
  },
];

export const ratingSummary = {
  average: '5.0',
  count: 170,
  source: 'Google Reviews',
};
