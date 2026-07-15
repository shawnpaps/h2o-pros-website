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
  ],
}
