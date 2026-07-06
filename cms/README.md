# H2O Pros CMS

Payload CMS scaffold for editable site services, locations, gallery images, and shared site media.

## Local setup

1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL` to a Postgres database.
3. Set `PAYLOAD_SECRET` to a long random value.
4. Run `npm install` from this `cms/` directory.
5. Run `npm run dev` and open `http://localhost:3000/admin`.

## Vercel

Payload runs on Next.js, so this app can deploy to Vercel as a separate project with the root directory set to `cms`.

Required environment variables:

- `DATABASE_URL` for Postgres.
- `PAYLOAD_SECRET` for auth/session signing.
- `NEXT_PUBLIC_SITE_URL`, usually the Astro site URL.
- `BLOB_READ_WRITE_TOKEN` after Vercel Blob is added to the project.

Uploads use `@payloadcms/storage-vercel-blob` when `BLOB_READ_WRITE_TOKEN` is present. Without it, uploads work locally only.
