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
    'Licensed, insured & bonded plumbing and water filtration pros serving the greater Tampa Bay area. Upfront pricing, 24/7 emergency service, and water you can trust.',
} as const;

export const hours = [
  { label: 'Monday – Friday', value: '8:00am – 5:00pm' },
  { label: 'Saturday – Sunday', value: 'Closed' },
  { label: 'Emergencies', value: '24/7' },
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
