import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'rating', 'location', 'published', 'sortOrder'],
    group: 'Website Content',
    description:
      'Customer reviews shown on the Reviews page and the home page. Tip: also update the overall rating numbers under Site Settings → Review Rating.',
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
      name: 'name',
      type: 'text',
      required: true,
      label: 'Customer name',
      admin: {
        description: 'For example "Mike R." — first name and last initial is a nice touch.',
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
      label: 'Star rating',
      admin: {
        description: 'From 1 to 5 stars.',
      },
    },
    {
      name: 'text',
      type: 'textarea',
      required: true,
      label: 'Review text',
      admin: {
        description: 'The customer’s words. Feel free to trim long reviews to the best part.',
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Customer location',
      admin: {
        description: 'Shown under the name, for example "Sarasota, FL". Optional.',
      },
    },
    {
      name: 'service',
      type: 'text',
      label: 'Service performed',
      admin: {
        description: 'For example "Water heater install". Optional.',
      },
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'Google Reviews',
      label: 'Where the review came from',
      admin: {
        description: 'For example "Google Reviews" or "Facebook".',
      },
    },
    {
      name: 'date',
      type: 'text',
      label: 'Display date',
      admin: {
        description: 'Shown with the review, in any format you like — for example "March 2026". Optional.',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show on website',
      admin: {
        description: 'Uncheck to hide this review from the website without deleting it.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 100,
      label: 'Display order',
      admin: {
        position: 'sidebar',
        description: 'Reviews with lower numbers appear first on the website.',
      },
    },
  ],
}
