import type { CollectionConfig } from 'payload';

const adminOnly = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'anchorId', 'featured', 'sortOrder', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
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
        description:
          'Keeps existing URLs stable, for example /our-services#WaterHeater.',
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
      name: 'sortOrder',
      type: 'number',
      defaultValue: 100,
      admin: {
        position: 'sidebar',
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
  ],
};
