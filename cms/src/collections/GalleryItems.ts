import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const GalleryItems: CollectionConfig = {
  slug: 'gallery-items',
  labels: {
    singular: 'Gallery Item',
    plural: 'Gallery Items',
  },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'published', 'sortOrder', 'updatedAt'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'tall',
      type: 'checkbox',
      defaultValue: false,
      label: 'Use tall crop',
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
