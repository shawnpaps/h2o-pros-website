# H2O Pros Website

Monorepo for the H2O Pros public website and Payload CMS.

## Apps

- `client/` — Astro + Tailwind marketing site.
- `cms/` — Payload CMS on Next.js, intended for Vercel.

## Root Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Run the Astro client |
| `npm run build` | Build the Astro client |
| `npm run preview` | Preview the Astro build |
| `npm run cms:dev` | Run Payload CMS locally |
| `npm run cms:build` | Build the Payload CMS app |

During scaffolding, install dependencies per app:

- `cd client && npm install`
- `cd cms && npm install`

Set `PAYLOAD_URL` or `PUBLIC_PAYLOAD_URL` when building the Astro client to pull content from the CMS. Without it, the site uses static fallback content in `client/src/data`.
