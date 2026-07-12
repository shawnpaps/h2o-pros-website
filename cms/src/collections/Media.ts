import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Photo / Video',
    plural: 'Photo & Video Library',
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'filename', 'updatedAt'],
    group: 'Website Content',
    description:
      'Every photo and video used on the website lives here. Upload once, then pick it wherever you need it.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    mimeTypes: ['image/*', 'video/mp4', 'video/webm'],
    imageSizes: [
      {
        name: 'card',
        width: 768,
        height: 576,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Description',
      admin: {
        description:
          'A short description of what’s in the photo, for example "Technician installing a tankless water heater". This helps Google find your site and helps visitors using screen readers.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
      admin: {
        description: 'Optional note for your own reference.',
      },
    },
  ],
}
