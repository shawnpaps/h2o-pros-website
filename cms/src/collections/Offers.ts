import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Offers: CollectionConfig = {
  slug: 'offers',
  labels: {
    singular: 'Offer',
    plural: 'Offers',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'published', 'sortOrder', 'updatedAt'],
    group: 'Website Content',
    description:
      'The deals shown in the "Current offers & savings" section of the About Us page.',
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
      label: 'Offer name',
      admin: {
        description: 'The headline of the deal, for example "$75 Off Any Water Heater Install".',
      },
    },
    {
      name: 'detail',
      type: 'textarea',
      required: true,
      label: 'Details',
      admin: {
        description:
          'A sentence explaining the offer, for example "Tank or tankless — mention this offer when you book."',
      },
    },
    {
      name: 'fine',
      type: 'text',
      label: 'Fine print',
      admin: {
        description:
          'The small text at the bottom of the card, for example "One per household. Cannot combine with other offers."',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show on website',
      admin: {
        description: 'Uncheck to take this offer off the website without deleting it.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 100,
      label: 'Display order',
      admin: {
        position: 'sidebar',
        description: 'Offers with lower numbers appear first on the website.',
      },
    },
  ],
}
