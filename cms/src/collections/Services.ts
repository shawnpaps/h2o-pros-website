import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featured', 'sortOrder', 'updatedAt'],
    group: 'Website Content',
    description:
      'The plumbing services shown on the Our Services page, the home page showcase, and each service’s own detail page.',
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
      name: 'title',
      type: 'text',
      required: true,
      label: 'Service name',
      admin: {
        description: 'For example "Water Heaters" or "Drain & Sewer".',
      },
    },
    {
      name: 'anchorId',
      type: 'text',
      required: true,
      unique: true,
      label: 'Technical ID',
      admin: {
        position: 'sidebar',
        description:
          'Keeps existing links to this service working. Please don’t change this without checking with your web developer.',
      },
    },
    {
      name: 'blurb',
      type: 'textarea',
      required: true,
      label: 'Short description',
      admin: {
        description: 'One or two sentences shown on this service’s card.',
      },
    },
    {
      name: 'bullets',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Bullet points',
      labels: {
        singular: 'Bullet point',
        plural: 'Bullet points',
      },
      admin: {
        description: 'Short selling points listed under the description, for example "Same-day service".',
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
      name: 'accent',
      type: 'select',
      required: true,
      defaultValue: 'blue',
      label: 'Accent color',
      options: [
        { label: 'Blue', value: 'blue' },
        { label: 'Red', value: 'red' },
      ],
      admin: {
        description: 'The highlight color used on this service’s card.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show in home page showcase',
      admin: {
        description: 'Check this to feature this service in the big showcase on the home page.',
      },
    },
    {
      name: 'showcaseTitle',
      type: 'text',
      label: 'Showcase display name',
      admin: {
        description:
          'A short, punchy name for the home page showcase, for example "Drains & Sewer". If left blank, the service name is used.',
      },
    },
    {
      name: 'showcaseBadge',
      type: 'text',
      label: 'Showcase badge',
      admin: {
        description: 'A small label shown on the showcase image, for example "Most popular".',
      },
    },
    {
      name: 'showcaseImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Showcase photo',
      admin: {
        description: 'The photo shown for this service in the home page showcase.',
      },
    },
    {
      name: 'detailImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Detail page photo',
      admin: {
        description: 'The photo shown on this service’s own page.',
      },
    },
    {
      type: 'collapsible',
      label: 'Service detail page',
      admin: {
        initCollapsed: true,
        description:
          'The content of this service’s own page on the website. Anything left blank falls back to pre-written copy.',
      },
      fields: [
        {
          name: 'slug',
          type: 'text',
          unique: true,
          label: 'Web address',
          admin: {
            description:
              'The last part of this page’s address, for example "water-heaters" makes the page yoursite.com/services/water-heaters. Use lowercase letters and dashes.',
          },
        },
        {
          name: 'heroHeadline',
          type: 'text',
          label: 'Headline',
          admin: {
            description:
              'The big first line at the top of the page, for example "Hot water, without the drama."',
          },
        },
        {
          name: 'signs',
          type: 'array',
          label: '"Sound familiar?" checklist',
          labels: {
            singular: 'Sign',
            plural: 'Signs',
          },
          admin: {
            description:
              'Problems a homeowner might recognize, for example "Hot water runs out faster than it used to".',
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
          labels: {
            singular: 'Step',
            plural: 'Steps',
          },
          admin: {
            description: 'The steps of the job, in order, for example "1. We inspect" → "2. We quote".',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Step title',
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              label: 'Step description',
            },
          ],
        },
        {
          name: 'stats',
          type: 'array',
          label: 'Impressive numbers',
          labels: {
            singular: 'Number',
            plural: 'Numbers',
          },
          admin: {
            description:
              'Big number + short caption pairs, for example "4000 PSI" with "Hydro-jetting scours pipes to like-new".',
          },
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              label: 'The number',
              admin: {
                description: 'For example "4000 PSI" or "24/7".',
              },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Caption',
              admin: {
                description: 'What the number means.',
              },
            },
          ],
        },
        {
          name: 'faqs',
          type: 'array',
          label: 'Common questions',
          labels: {
            singular: 'Question',
            plural: 'Questions',
          },
          admin: {
            description: 'Questions and answers specific to this service.',
          },
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
      label: 'Display order',
      admin: {
        position: 'sidebar',
        description: 'Services with lower numbers appear first on the website.',
      },
    },
  ],
}
