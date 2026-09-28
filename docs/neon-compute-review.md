# Neon compute review — 2026-09-28

Baseline: `cc4b2f0` on main. Findings recorded before implementation.

## Findings

1. **The public site is SSR with ISR, not static.** `client/astro.config.mjs` sets `output: 'server'` and Vercel ISR expiration to 60 seconds. No page opts into prerendering. Requests to expired or uncached routes can render the page and fetch Payload, waking Neon. Expiration does not itself schedule a query every minute. Different URLs have separate cache lifetimes. This is a plausible cost driver, not attribution of the $13 bill: production request logs, cache headers, and Neon usage were not available.
2. **Repeated CMS reads within each render are confirmed.** `getSiteContent()` is called by layouts, pages, header, footer, logo, and other components; `getSiteSettings()` requests the same global URL. Header requests locations directly and via `getCounties()`; sitemap does the same. `fetchPayload()` performs a fresh fetch every time. These duplicate reads increase query volume per cache miss, although removing them does not necessarily eliminate the initial wake-up.
3. **The CMS example `/my-route` initializes Payload solely to return a fixed message.** That can establish a database connection and run production migration checks unnecessarily. There is no evidence the route actually receives traffic.
4. **No repository-defined cron, health-check loop, or job autorun found.** External uptime checks, Vercel dashboard schedules, bots, open admin sessions, and direct CMS API traffic remain unverified. REST/GraphQL/admin routes legitimately initialize Payload. Media URL resolution may target the CMS when Payload returns relative URLs; actual stored media URLs and requests were not inspected.
5. **Pooling is already delegated to the Vercel Postgres adapter.** `cms/src/payload.config.ts` passes POSTGRES_URL to its pool. Deployed URL, pooled-host selection, connection counts, and Neon settings were not verified. No evidence supports changing pool limits or timeouts. Pooling alone does not prevent queries from waking Neon.
6. **Production migrations are configured at Payload startup.** Keep this mechanism and `push: false`; local and production share the live database according to AGENTS.md. Do not run CMS development, integration tests, or migration commands as casual validation.
7. **Housecall Pro reviews use process-lifetime promises.** This limits requests but can retain stale results/fallbacks for a warm instance. It is a separate freshness concern, not an excessive-wake-up cause.
8. **Documentation is stale.** AGENTS.md says static/build-only reads and rebuild-required publishing, conflicting with the current implementation. robots.txt has no CMS reads; sitemap and llms.txt do.

## Selected changes

- Deduplicate identical Payload reads within a single Astro request using request-local storage. Include concurrent and sequential calls; discard the cache after the request. Preserve content freshness, fallback behavior, URL/query distinctions, and isolation between visitors. This reduces repeated reads without adding a cross-request cache or timers.
- Remove unused Payload initialization from `/my-route`, preserving its response.
- Prerender robots.txt because it uses the configured canonical site and no CMS content.
- Correct architecture guidance.

## Deferred decisions / production verification

The largest potential savings require a publishing tradeoff: increase ISR expiration (for example to 15–60 minutes), or switch to static builds triggered by CMS publish webhooks. Neither is applied because the present config explicitly promises automatic updates after 60 seconds. Longer per-route caches still do not guarantee long database sleep periods across many routes. Request-local deduplication primarily reduces query volume, not wake-up frequency.

After deploying an approved branch, compare equivalent traffic periods: Vercel function invocations and cache HIT/MISS/STALE by path, CMS REST/admin/media requests, and Neon active CU-hours/wake-ups. Check external monitors and schedules. Verify the deployed POSTGRES_URL uses the intended Neon pooler without exposing credentials; inspect min/max compute and autosuspend settings. Do not infer exact savings from this code review.

References: https://v6.docs.astro.build/en/guides/integrations-guide/vercel/ (ISR model; verify installed adapter at build), https://neon.com/docs/introduction/scale-to-zero (idle compute behavior).

## Validation and delivery

- `node --test tests/payload-request-cache.test.mjs`: 3 tests passed, covering concurrent/sequential deduplication, distinct query URLs, overlapping request isolation, fresh subsequent requests, failure recovery, and uncached calls outside middleware.
- `pnpm build` in client: passed with the locked Astro 7.0.6 / Vercel adapter 11.0.2 dependencies. Generated ISR expiration remains 60; robots.txt is prerendered. Adapter implementation confirms expiration is emitted to Vercel's prerender config.
- Build warning: local Node 25 is unsupported by Vercel; adapter selected Node 24. Use Node 24 for deployment parity.
- `git diff --check`: passed. No dependencies or lockfiles changed.
- No production credentials copied, CMS server started, migrations applied, or production database accessed. Full CMS build and live endpoint checks were not performed because the documented shared database and startup migrations make them inappropriate for this isolated review. No deployment or production savings measurement performed.
- Changes are on `fix/neon-compute-review` in an isolated worktree; original main checkout remains unchanged.
