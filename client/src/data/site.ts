export const site = {
  name: 'Your Friendly Neighborhood H2O Pros',
  shortName: 'H2O Pros',
  tagline: 'Plumbing & Filtration',
  phone: '(813) 702-1118',
  phoneHref: 'tel:+18137021118',
  email: 'Support@yourfriendlyh20pros.com',
  emailHref: 'mailto:Support@yourfriendlyh20pros.com',
  license: 'CFC1434503',
  serviceArea: 'Tampa Bay, Florida',
  description:
    'Licensed, insured & bonded plumbing and water filtration pros serving the greater Tampa Bay area. Upfront pricing, tidy workmanship, and water you can trust.',
} as const;

/** Default wording for the site-wide call-to-action band (CtaBand). */
export const cta = {
  title: 'Ready for water you can trust?',
  description: 'Book online in 60 seconds or call during business hours.',
} as const;

/**
 * Default headings for the city and county landing pages. `{city}` / `{county}`
 * are replaced with the place name; everything from the placeholder onward is
 * rendered in the light-blue accent.
 */
export const locationHeadings = {
  city: 'Plumbing & Filtration in {city}, FL',
  county: 'Plumbing & Water Filtration in {county} County, FL',
} as const;

/** Housecall Pro online booking widget credentials. */
export const booking = {
  token: '961c3db58034464aab709dba3edd7cd2',
  orgName: 'Your-Friendly-H2O-Pros-Plumbing-and-Filtration',
} as const;

export const hours = [
  { label: 'Monday – Friday', value: '8:00am – 5:00pm' },
  { label: 'Saturday – Sunday', value: 'Closed' },
] as const;

export const counties = [
  'Hillsborough',
  'Polk',
  'Pasco',
  'Pinellas',
  'Marion',
] as const;

export const socials = [
  { label: 'TikTok', href: 'https://www.tiktok.com/' },
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'Facebook', href: 'https://www.facebook.com/' },
  { label: 'Google', href: 'https://www.google.com/maps' },
] as const;

export const nav = [
  { label: 'Services', href: '/our-services' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'About', href: '/about-us' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
] as const;
