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
      name: 'showcaseTitle',
      type: 'text',
      label: 'Showcase display name',
      admin: {
        description:
          'Short punchy name shown as the giant title in the home-page showcase, for example "Drains & Sewer". Falls back to the service title.',
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
      type: 'collapsible',
      label: 'Detail page (/services/…)',
      admin: {
        initCollapsed: true,
        description:
          'Content for the immersive service detail page. Anything left empty falls back to the built-in copy for this service.',
      },
      fields: [
        {
          name: 'slug',
          type: 'text',
          unique: true,
          label: 'URL slug',
          admin: {
            description: 'Page lives at /services/<slug>, for example "water-heaters".',
          },
        },
        {
          name: 'heroHeadline',
          type: 'text',
          label: 'Hero headline',
          admin: {
            description: 'Punchy first line of the detail hero, for example "Hot water, without the drama."',
          },
        },
        {
          name: 'signs',
          type: 'array',
          label: '"Sound familiar?" signs',
          admin: {
            description: 'Symptoms a homeowner can check off, for example "Hot water runs out faster than it used to".',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'steps',
          type: 'array',
          label: '"How it works" steps',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
          ],
        },
        {
          name: 'stats',
          type: 'array',
          label: 'Proof stats',
          admin: {
            description: 'Short value + label pairs, for example "4000 PSI" / "Hydro-jetting scours pipes to like-new".',
          },
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'faqs',
          type: 'array',
          label: 'Service FAQs',
          fields: [
            {
              name: 'question',
              type: 'text',
              required: true,
            },
            {
              name: 'answer',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
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
