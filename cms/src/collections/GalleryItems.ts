import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const GalleryItems: CollectionConfig = {
  slug: 'gallery-items',
  labels: {
    singular: 'Gallery Photo',
    plural: 'Gallery Photos',
  },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'published', 'sortOrder', 'updatedAt'],
    group: 'Website Content',
    description: 'The photos shown in the Gallery page grid — great for before-and-afters and finished jobs.',
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
      name: 'label',
      type: 'text',
      required: true,
      label: 'Caption',
      admin: {
        description: 'A short caption shown with the photo, for example "Tankless water heater install".',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Photo',
    },
    {
      name: 'tall',
      type: 'checkbox',
      defaultValue: false,
      label: 'Tall photo',
      admin: {
        description:
          'Check this for portrait-shaped photos — they get a taller spot in the gallery grid.',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show on website',
      admin: {
        description: 'Uncheck to hide this photo from the gallery without deleting it.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 100,
      label: 'Display order',
      admin: {
        position: 'sidebar',
        description: 'Photos with lower numbers appear first in the gallery.',
      },
    },
  ],
}
