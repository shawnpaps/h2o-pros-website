# AGENTS.md — H2O Pros Website

Guidance for AI agents (and new developers) working in this repo. Read this before
touching the CMS schema — there is one production-critical rule here that has already
caused an outage once.

## What this project is

Marketing website + CMS for **H2O Pros**, a plumbing company serving the
Sarasota / Manatee County, FL area. The site owner edits content through the CMS;
**the end user of the CMS admin is not technical** — every schema change should keep
labels and descriptions in plain, friendly English with concrete examples
(see any collection in `cms/src/collections/` for the house style).

Two independent apps, each with its own `package.json` and lockfile (**pnpm** for both;
the root README's "root commands" table is stale — there is no root `package.json`):

| Directory | Stack | Deployed at |
| --- | --- | --- |
| `client/` | Astro 7 + Tailwind CSS 3, static output | the public website (Vercel) |
| `cms/` | Payload CMS 3 on Next.js | https://h2o-pros-website-23g2.vercel.app (Vercel) |

## ⚠️ The one rule that matters: database schema changes

**Local dev and production share the SAME Neon Postgres database** (`POSTGRES_URL` in
`cms/.env`, provisioned through Vercel). There is no separate dev database.

Payload's dev-mode "push" auto-sync is **deliberately disabled** (`push: false` in
`cms/src/payload.config.ts`). All schema changes go through migrations:

```bash
cd cms
pnpm migrate:create <short-name>   # generate a migration after changing collections/globals
pnpm migrate                       # apply it (this hits the live shared DB — additive changes only)
pnpm generate:types                # regenerate src/payload-types.ts
pnpm migrate:status                # see what's applied
```

Migrations also run automatically on production cold start via `prodMigrations` in
`payload.config.ts` (they're imported from `src/migrations/index.ts`, so commit all
three generated files: the `.ts`, the `.json` snapshot, and the updated `index.ts`).

**Never re-enable push mode.** In July 2026, a schema change was committed without the
DB being synced; production's Services collection 500'd and the admin list went blank.
Because the DB is shared and live:

- Keep migrations **additive** whenever possible (new columns/tables). Renaming or
  removing a field drops real production data.
- Existing field *names* should not change — change the `label` instead (labels are
  display-only; names map to DB columns).
- Applying a migration locally takes effect in production **immediately** (same DB),
  even before the code deploys. Additive changes are safe; destructive ones are not.

## Architecture: how content flows

```
cms (Payload, Vercel) ──REST──▶ client/src/lib/cms.ts ──▶ Astro pages (static build)
        │                              │
   Neon Postgres                fallback: client/src/data/*.ts
   Vercel Blob (media)
```

- `client/src/lib/cms.ts` is the **only** place the client talks to the CMS. It reads
  `PAYLOAD_URL` (see `client/.env`) and fetches the public REST API at build time.
- **Every fetch has a silent fallback** to static content in `client/src/data/*.ts`
  (services, locations, reviews, faqs, site info). If the CMS is unreachable or a
  collection is empty, the site builds with fallback content and *no error*. When
  debugging "my CMS change isn't showing", check whether the fallback is being served.
- The client is statically built — **content changes in the CMS require a client
  rebuild/redeploy to appear on the site.**
- Media files live in Vercel Blob (`@payloadcms/storage-vercel-blob`). `mediaUrl()` in
  `cms.ts` resolves relative URLs against `PAYLOAD_URL` and picks a named size
  (`card` 768×576 or `hero` 1920×1080, defined in `cms/src/collections/Media.ts`).
- Reviews have a second source: a Housecall Pro widget API (`client/src/lib/reviews.ts`).

## CMS layout (`cms/src/`)

- `collections/` — Users, Media, Services, Locations, Reviews, Faqs, GalleryItems,
  MainPageHeadlines (per-page heading text), Offers (About-page deals).
  All are grouped in the admin sidebar under "Website Content" (Users under "Admin")
  and default-sorted by their `sortOrder` field.
- `globals/SiteSettings.ts` — business info, nav, hours, rating summary, socials, and
  site-wide photos (logo, home hero video + three hero photos, team photo, map).
  - `phoneHref` / `emailHref` are **hidden, auto-derived fields** (beforeValidate hooks
    build `tel:`/`mailto:` links from `phone`/`email`). Don't surface them; don't ask
    editors for them.
- `access/` — `anyone` (public read) / `authenticated` helpers. Content is world-readable
  by design; writes require login.
- `seed.ts`, `replace-faqs.ts`, `set-showcase-titles.ts` — one-off `tsx` scripts that
  write to the live DB via the Payload local API. Run deliberately, not casually.
- Payload admin UI customizations live in `components/` (logo, icon, welcome banner, and
  the editor-facing How-To Guide at `/admin/guide` — a custom view registered in
  `payload.config.ts`; keep it current when adding editor-facing collections/fields).

### Adding a CMS-editable field, end to end

1. Add the field in `cms/src/collections/...` or `globals/SiteSettings.ts` with a
   friendly `label` and `admin.description` (with an example value).
2. `pnpm migrate:create <name> && pnpm migrate && pnpm generate:types` in `cms/`.
3. Add it to the relevant fetch + interface in `client/src/lib/cms.ts` (keep the
   fallback pattern: CMS value → local fallback).
4. Consume it in the Astro component/page.
5. CMS fields that nothing in `client/` reads are traps for the editor — if you add a
   field, wire it up (the old `homeHeroVideo` field sat unused for a while; wired now).

## Client layout (`client/src/`)

- `pages/` — file-based routes; `locations/[slug]` and `services/[slug]` are generated
  from CMS collections (with static fallbacks).
- `components/` — Astro components; `HomeHero.astro`, `ServicesShowcase.astro`,
  `ReviewsSpotlight.astro`, `HomeSections.astro` make up the home page.
- `data/` — the static fallback content. When adding a CMS field with per-item
  fallbacks (see services in `cms.ts`), items are matched by `anchorId`.
- `assets/` — local images/videos used as fallbacks and for Astro `<Image>` optimization.
  Remote (CMS) images are rendered with plain `<img>`; local ones with `astro:assets`.

## Commands

```bash
# CMS (cd cms)
pnpm dev              # Next dev on :3000 (admin at /admin) — does NOT sync schema
pnpm build            # production build
pnpm migrate / migrate:create / migrate:status / generate:types

# Client (cd client)
pnpm dev              # Astro dev on :4321
pnpm build            # static build to dist/ (set PAYLOAD_URL to pull CMS content)
pnpm preview
```

Env files: `cms/.env` (`POSTGRES_URL`, `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN`),
`client/.env` (`PAYLOAD_URL`). Both exist locally and are gitignored.

## SEO / AEO infrastructure

- `client/src/layouts/BaseLayout.astro` owns the whole `<head>`: Google Tag Manager
  (`GTM-5CG7SGGB`, script in head + noscript after `<body>` — every page must keep
  going through BaseLayout), canonical URLs, Open Graph/Twitter meta, and site-wide
  JSON-LD (`Plumber` business schema + `WebSite`). Pages pass extra schemas via the
  `schemas` prop and a share image via `ogImage`.
- Schema builders live in `client/src/lib/schema.ts` — Service, FAQPage,
  BreadcrumbList, ItemList — all fed from CMS content.
- `sitemap.xml`, `robots.txt`, and `llms.txt` are **server-rendered endpoints** in
  `client/src/pages/` that pull services/locations/FAQs from the CMS at request time —
  new CMS content appears in them automatically; don't add static versions in `public/`.
- The canonical domain is set in `astro.config.mjs` (`site:`); `og-default.jpg` in
  `client/public/` is the fallback share image (1200×630).

## Workflow & conventions

- Branch off `main` (`fix/...`, `feat/...`), push, merge via GitHub PR. Both Vercel
  projects deploy from `main`.
- Verify against the running apps, not just types: boot `cms` dev and hit
  `http://localhost:3000/api/<collection>`, boot `client` dev and eyeball the page.
  Production API spot-check: `https://h2o-pros-website-23g2.vercel.app/api/services?limit=1`.
- The public site and CMS admin are live for a real business — treat the shared DB
  and Blob store as production at all times (no test writes you wouldn't want a
  customer to see; clean up anything temporary).
