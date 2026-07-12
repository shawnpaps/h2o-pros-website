import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Faqs } from './collections/Faqs'
import { GalleryItems } from './collections/GalleryItems'
import { Locations } from './collections/Locations'
import { Media } from './collections/Media'
import { Reviews } from './collections/Reviews'
import { Services } from './collections/Services'
import { Users } from './collections/Users'
import { SiteSettings } from './globals/SiteSettings'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '/components/Logo#Logo',
        Icon: '/components/Icon#Icon',
      },
      beforeDashboard: ['/components/WelcomeBanner#WelcomeBanner'],
    },
    meta: {
      titleSuffix: ' · H2O Pros CMS',
      icons: [
        {
          rel: 'icon',
          type: 'image/webp',
          url: '/h2o-logo.webp',
        },
      ],
    },
  },
  collections: [Users, Media, Services, Locations, Reviews, Faqs, GalleryItems],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
    // Dev and production share the same Neon database, so schema changes must
    // always go through migrations (pnpm migrate:create && pnpm migrate).
    // Push mode silently drifts the schema and breaks the deployed CMS.
    push: false,
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
