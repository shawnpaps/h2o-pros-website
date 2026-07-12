import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'sortOrder', 'updatedAt'],
    group: 'Website Content',
    description:
      'General questions and answers shown on the website. For questions about one specific service, edit that service instead — each service has its own "Common questions" section.',
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
      name: 'question',
      type: 'text',
      required: true,
      unique: true,
      label: 'Question',
      admin: {
        description: 'Written the way a customer would ask it, for example "Do you offer free estimates?"',
      },
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      label: 'Answer',
      admin: {
        description: 'Keep it friendly and to the point — a few sentences is plenty.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 100,
      label: 'Display order',
      admin: {
        position: 'sidebar',
        description: 'Questions with lower numbers appear first on the website.',
      },
    },
  ],
}
