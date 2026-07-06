import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'city',
    defaultColumns: ['city', 'county', 'slug', 'sortOrder', 'updatedAt'],
  },
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
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug under /locations/.',
      },
    },
    {
      name: 'county',
      type: 'text',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      required: true,
      label: 'Hero intro copy',
    },
    {
      name: 'nearby',
      type: 'array',
      required: true,
      minRows: 1,
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
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Location hero image',
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 100,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
