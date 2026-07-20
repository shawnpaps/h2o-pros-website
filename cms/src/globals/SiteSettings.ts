import type { FieldHook, GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'

// Builds a tel: link from the display phone number so editors never have to
// touch the technical field. "(941) 555-0123" -> "tel:+19415550123".
const derivePhoneHref: FieldHook = ({ siblingData, value }) => {
  const phone = typeof siblingData?.phone === 'string' ? siblingData.phone : ''
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return `tel:+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `tel:+${digits}`
  return value
}

const deriveEmailHref: FieldHook = ({ siblingData, value }) => {
  const email = typeof siblingData?.email === 'string' ? siblingData.email : ''
  return email ? `mailto:${email}` : value
}

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Website Content',
    description:
      'Business info, contact details, and site-wide photos. Changes here show up across the whole website.',
  },
  access: {
    read: anyone,
    update: authenticated,
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
              label: 'Business name',
              admin: {
                description: 'The full business name, for example "H2O Pros Plumbing".',
              },
            },
            {
              name: 'shortName',
              type: 'text',
              required: true,
              label: 'Short name',
              admin: {
                description: 'A shorter version used where space is tight, for example "H2O Pros".',
              },
            },
            {
              name: 'tagline',
              type: 'text',
              label: 'Tagline',
              admin: {
                description: 'A short slogan shown alongside the business name.',
              },
            },
            {
              name: 'phone',
              type: 'text',
              required: true,
              label: 'Phone number',
              admin: {
                description:
                  'Shown on the website exactly as typed, for example "(941) 555-0123". The click-to-call link is created automatically.',
              },
            },
            {
              name: 'phoneHref',
              type: 'text',
              required: true,
              hooks: {
                beforeValidate: [derivePhoneHref],
              },
              admin: {
                hidden: true,
              },
            },
            {
              name: 'email',
              type: 'email',
              required: true,
              label: 'Email address',
              admin: {
                description: 'Where website visitors can email you. The email link is created automatically.',
              },
            },
            {
              name: 'emailHref',
              type: 'text',
              required: true,
              hooks: {
                beforeValidate: [deriveEmailHref],
              },
              admin: {
                hidden: true,
              },
            },
            {
              name: 'license',
              type: 'text',
              required: true,
              label: 'License number',
              admin: {
                description: 'Shown in the website footer, for example "CFC1428968".',
              },
            },
            {
              name: 'serviceArea',
              type: 'text',
              required: true,
              label: 'Service area',
              admin: {
                description:
                  'A short phrase describing where you work, for example "Sarasota & Manatee Counties".',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              label: 'About the business',
              admin: {
                description:
                  'One or two sentences about the business. Used in the footer and shown to search engines like Google.',
              },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo',
              admin: {
                description: 'The main logo, shown in the header and on the home page.',
              },
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
              label: 'Menu links',
              labels: {
                singular: 'Menu link',
                plural: 'Menu links',
              },
              admin: {
                description: 'The links in the menu at the top of every page. Drag to reorder.',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Link text',
                  admin: {
                    description: 'What the link says, for example "Our Services".',
                  },
                },
                {
                  name: 'href',
                  type: 'text',
                  required: true,
                  label: 'Link destination',
                  admin: {
                    description: 'The page the link goes to, for example "/our-services".',
                  },
                },
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
              label: 'Business hours',
              labels: {
                singular: 'Hours row',
                plural: 'Hours rows',
              },
              admin: {
                description:
                  'Each row is one line of the hours list, for example "Mon–Fri" and "8am – 6pm".',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Days',
                  admin: {
                    description: 'For example "Mon–Fri" or "Emergencies".',
                  },
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  label: 'Hours',
                  admin: {
                    description: 'For example "8am – 6pm" or "24/7".',
                  },
                },
              ],
            },
            {
              name: 'counties',
              type: 'array',
              required: true,
              label: 'Counties served',
              labels: {
                singular: 'County',
                plural: 'Counties',
              },
              admin: {
                description: 'The counties listed on the website, for example "Sarasota County".',
              },
              fields: [{ name: 'name', type: 'text', required: true, label: 'County name' }],
            },
          ],
        },
        {
          label: 'Review Rating',
          fields: [
            {
              name: 'ratingAverage',
              type: 'text',
              required: true,
              defaultValue: '5.0',
              label: 'Average star rating',
              admin: {
                description: 'Shown next to the stars across the site, for example "5.0".',
              },
            },
            {
              name: 'ratingCount',
              type: 'number',
              required: true,
              defaultValue: 0,
              label: 'Number of reviews',
              admin: {
                description: 'The total review count, for example 127. Update this as new reviews come in.',
              },
            },
            {
              name: 'ratingSource',
              type: 'text',
              required: true,
              defaultValue: 'Google Reviews',
              label: 'Where the reviews are from',
              admin: {
                description: 'For example "Google Reviews".',
              },
            },
          ],
        },
        {
          label: 'Socials',
          fields: [
            {
              name: 'socials',
              type: 'array',
              label: 'Social media links',
              labels: {
                singular: 'Social link',
                plural: 'Social links',
              },
              admin: {
                description: 'Links to your social media pages, shown in the footer.',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Name',
                  admin: {
                    description: 'For example "Facebook" or "Instagram".',
                  },
                },
                {
                  name: 'href',
                  type: 'text',
                  required: true,
                  label: 'Link',
                  admin: {
                    description: 'The full web address, for example "https://facebook.com/h2opros".',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Home Page Hero',
          description:
            'The big section at the top of the home page: a background video, three photos, the phrases beside them, and the scrolling list of services.',
          fields: [
            {
              type: 'collapsible',
              label: 'Wording',
              fields: [
                {
                  name: 'homeHeroHeadline',
                  type: 'text',
                  label: 'Headline for search engines',
                  admin: {
                    description:
                      'Not visible on the page — read by Google and screen readers. For example "We are your friendly, neighborhood plumbing experts".',
                  },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'homeHeroLeftLine1',
                      type: 'text',
                      label: 'Left phrase — bold line',
                      admin: {
                        description: 'For example "Friendly plumbers."',
                      },
                    },
                    {
                      name: 'homeHeroLeftLine2',
                      type: 'text',
                      label: 'Left phrase — light line',
                      admin: {
                        description: 'For example "Honest pricing."',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'homeHeroRightLine1',
                      type: 'text',
                      label: 'Right phrase — light line',
                      admin: {
                        description: 'For example "Quality workmanship."',
                      },
                    },
                    {
                      name: 'homeHeroRightLine2',
                      type: 'text',
                      label: 'Right phrase — bold line',
                      admin: {
                        description: 'For example "Proven results."',
                      },
                    },
                  ],
                },
                {
                  name: 'homeHeroTicker',
                  type: 'array',
                  label: 'Scrolling service list',
                  labels: {
                    singular: 'Service name',
                    plural: 'Service names',
                  },
                  admin: {
                    description:
                      'The service names that scroll across the bottom of the hero, for example "Water Heaters". Drag to reorder.',
                  },
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      required: true,
                      label: 'Service name',
                    },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Video & photos',
              fields: [
                {
                  name: 'homeHeroVideo',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Background video',
                  admin: {
                    description:
                      'The video that plays behind the home page hero. MP4 format works best; keep it under ~10 MB so the page loads fast.',
                  },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'homeHeroCardLeft',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Left photo',
                      admin: {
                        description: 'The smaller, tilted photo on the left.',
                      },
                    },
                    {
                      name: 'homeHeroCardCenter',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Center photo',
                      admin: {
                        description: 'The large photo in the middle.',
                      },
                    },
                    {
                      name: 'homeHeroCardRight',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Right photo',
                      admin: {
                        description: 'The smaller, tilted photo on the right.',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Call-to-Action Band',
          description:
            'The red "Ready for water you can trust?" strip near the bottom of most pages, with the Book Online and Call buttons. The buttons update automatically from your phone number and booking settings — only the wording is edited here.',
          fields: [
            {
              name: 'ctaTitle',
              type: 'text',
              label: 'Heading',
              admin: {
                description:
                  'The big bold line, for example "Ready for water you can trust?".',
              },
            },
            {
              name: 'ctaDescription',
              type: 'text',
              label: 'Subheading',
              admin: {
                description:
                  'The smaller line under the heading, for example "Book online in 60 seconds or call during business hours.".',
              },
            },
          ],
        },
        {
          label: 'Photos',
          fields: [
            {
              name: 'teamPhoto',
              type: 'upload',
              relationTo: 'media',
              label: 'Team photo',
              admin: {
                description: 'Shown on the About Us page.',
              },
            },
            {
              name: 'serviceAreaMap',
              type: 'upload',
              relationTo: 'media',
              label: 'Service area map',
              admin: {
                description: 'The map image showing your coverage area.',
              },
            },
          ],
        },
      ],
    },
  ],
}
