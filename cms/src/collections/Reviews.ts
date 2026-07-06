import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'rating', 'location', 'service', 'sortOrder'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'text',
      type: 'textarea',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'service',
      type: 'text',
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'Google Reviews',
    },
    {
      name: 'date',
      type: 'text',
      label: 'Display date',
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
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
