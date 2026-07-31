import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const MainPageHeadlines: CollectionConfig = {
  slug: 'main-page-headlines',
  labels: {
    singular: 'Main Page Headline',
    plural: 'Main Page Headlines',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['page', 'title', 'updatedAt'],
    group: 'Website Content',
    description:
      'The heading at the top of each main page — the small label, the big headline, and the sentence under it. Add one entry per page; pages without an entry keep their built-in wording.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'page',
      type: 'select',
      required: true,
      unique: true,
      label: 'Which page',
      options: [
        { label: 'Our Services', value: 'our-services' },
        { label: 'About Us', value: 'about-us' },
        { label: 'Reviews', value: 'reviews' },
        { label: 'Contact', value: 'contact' },
        { label: 'Gallery', value: 'gallery' },
      ],
      admin: {
        description: 'The page this headline appears on. Each page can only have one entry.',
      },
    },
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      label: 'Small label',
      admin: {
        description: 'The short red label above the headline, for example "About us".',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Headline',
      admin: {
        description:
          'The big heading at the top of the page, for example "A family owned plumbing company that cares."',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Supporting sentence',
      admin: {
        description:
          'The sentence shown under the headline, for example "Built on trust, quality, and 20+ years of experience in the area." Leave empty to show nothing.',
      },
    },
    {
      type: 'collapsible',
      label: 'Red banner at the bottom of this page',
      admin: {
        initCollapsed: true,
        description:
          'Overrides the site-wide Call-to-Action Band from Site Settings, for this page only. Leave any field empty to keep the wording the page already uses. (The Contact page has no red banner, so these do nothing there.)',
      },
      fields: [
        {
          name: 'ctaTitle',
          type: 'text',
          label: 'Banner heading',
          admin: {
            description:
              'The big bold line in the red banner, for example "Ready to become our next 5-star review?".',
          },
        },
        {
          name: 'ctaDescription',
          type: 'text',
          label: 'Banner subheading',
          admin: {
            description:
              'The smaller line under it, for example "Book online or give us a call — we\'ll earn it.".',
          },
        },
        {
          name: 'ctaBookLabel',
          type: 'text',
          label: 'Booking button text',
          admin: {
            description:
              'Wording on the white button that opens online booking. Defaults to "Book Online".',
          },
        },
        {
          name: 'ctaCallLabel',
          type: 'text',
          label: 'Call button text',
          admin: {
            description:
              'Wording on the outlined call button. Defaults to "Call" followed by your phone number — if you change it, type the number in yourself if you still want it shown.',
          },
        },
      ],
    },
  ],
}
