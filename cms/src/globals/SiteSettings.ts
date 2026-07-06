import type { GlobalConfig } from 'payload';

const adminOnly = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: adminOnly,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Business',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'shortName',
              type: 'text',
              required: true,
            },
            {
              name: 'tagline',
              type: 'text',
            },
            {
              name: 'phone',
              type: 'text',
              required: true,
            },
            {
              name: 'phoneHref',
              type: 'text',
              required: true,
            },
            {
              name: 'email',
              type: 'email',
              required: true,
            },
            {
              name: 'emailHref',
              type: 'text',
              required: true,
            },
            {
              name: 'license',
              type: 'text',
              required: true,
            },
            {
              name: 'serviceArea',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'nav',
              type: 'array',
              required: true,
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Hours & Areas',
          fields: [
            {
              name: 'hours',
              type: 'array',
              required: true,
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'value', type: 'text', required: true },
              ],
            },
            {
              name: 'counties',
              type: 'array',
              required: true,
              fields: [{ name: 'name', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'Reviews',
          fields: [
            {
              name: 'ratingAverage',
              type: 'text',
              required: true,
              defaultValue: '5.0',
            },
            {
              name: 'ratingCount',
              type: 'number',
              required: true,
              defaultValue: 0,
            },
            {
              name: 'ratingSource',
              type: 'text',
              required: true,
              defaultValue: 'Google Reviews',
            },
          ],
        },
        {
          label: 'Socials',
          fields: [
            {
              name: 'socials',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Images',
          fields: [
            {
              name: 'homeHeroVideo',
              type: 'upload',
              relationTo: 'media',
              label: 'Home hero video',
            },
            {
              name: 'teamPhoto',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'serviceAreaMap',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
};
