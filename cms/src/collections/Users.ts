import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
    description: 'The people who can log in and edit this website’s content.',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
