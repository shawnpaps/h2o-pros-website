import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'anchorId', 'featured', 'sortOrder', 'updatedAt'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'anchorId',
      type: 'text',
      required: true,
      unique: true,
      label: 'Anchor ID',
      admin: {
        description: 'Keeps existing URLs stable, for example /our-services#WaterHeater.',
      },
    },
    {
      name: 'blurb',
      type: 'textarea',
      required: true,
    },
    {
      name: 'bullets',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'accent',
      type: 'select',
      required: true,
      defaultValue: 'blue',
      options: [
        { label: 'Blue', value: 'blue' },
        { label: 'Red', value: 'red' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Shows this service in the home-page service showcase.',
      },
    },
    {
      name: 'showcaseBadge',
      type: 'text',
      label: 'Showcase badge',
    },
    {
      name: 'showcaseImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Home showcase image',
    },
    {
      name: 'detailImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Service detail image',
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
