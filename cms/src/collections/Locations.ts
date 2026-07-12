import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'city',
    defaultColumns: ['city', 'county', 'sortOrder', 'updatedAt'],
    group: 'Website Content',
    description: 'The city pages on the website — one page for each area you serve.',
  },
  defaultSort: 'sortOrder',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'city',
      type: 'text',
      required: true,
      label: 'City',
      admin: {
        description: 'For example "Sarasota" or "North Port".',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Web address',
      admin: {
        description:
          'The last part of this page’s address, for example "north-port" makes the page yoursite.com/locations/north-port. Use lowercase letters and dashes, and avoid changing it once the page is live.',
      },
    },
    {
      name: 'county',
      type: 'text',
      required: true,
      label: 'County',
      admin: {
        description: 'For example "Sarasota" — no need to include the word "County".',
      },
    },
    {
      name: 'intro',
      type: 'textarea',
      required: true,
      label: 'Intro paragraph',
      admin: {
        description: 'The welcome paragraph at the top of this city’s page.',
      },
    },
    {
      name: 'nearby',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Nearby neighborhoods & areas',
      labels: {
        singular: 'Area',
        plural: 'Areas',
      },
      admin: {
        description: 'Neighborhoods or communities near this city that you also serve.',
      },
      fields: [
        {
          name: 'area',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      required: true,
      label: 'Search engine description',
      admin: {
        description:
          'The one-or-two-sentence summary Google may show under this page in search results. Mention the city and your key services.',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Page photo',
      admin: {
        description: 'The large photo at the top of this city’s page.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 100,
      label: 'Display order',
      admin: {
        position: 'sidebar',
        description: 'Cities with lower numbers appear first on the website.',
      },
    },
  ],
}
