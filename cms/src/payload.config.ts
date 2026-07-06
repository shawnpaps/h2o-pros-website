import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { GalleryItems } from './collections/GalleryItems';
import { Faqs } from './collections/Faqs';
import { Locations } from './collections/Locations';
import { Media } from './collections/Media';
import { Reviews } from './collections/Reviews';
import { Services } from './collections/Services';
import { Users } from './collections/Users';
import { SiteSettings } from './globals/SiteSettings';

const databaseUrl = process.env.DATABASE_URL;
const databaseSslRejectUnauthorized =
  process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'false';
const databaseConnectionString =
  databaseUrl && !databaseSslRejectUnauthorized
    ? databaseUrl.replace(/([?&])sslmode=[^&]+/, '$1sslmode=no-verify')
    : databaseUrl;

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Services, Locations, GalleryItems, Faqs, Reviews],
  globals: [SiteSettings],
  cors: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4321'],
  csrf: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4321'],
  db: postgresAdapter({
    pool: {
      connectionString: databaseConnectionString,
      ssl: databaseSslRejectUnauthorized
        ? undefined
        : { rejectUnauthorized: false },
    },
  }),
  editor: lexicalEditor({}),
  graphQL: {
    schemaOutputFile: 'src/generated-schema.graphql',
  },
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: {
        media: {
          prefix: 'h2o-pros',
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  sharp: sharp as never,
  typescript: {
    outputFile: 'src/payload-types.ts',
  },
});
