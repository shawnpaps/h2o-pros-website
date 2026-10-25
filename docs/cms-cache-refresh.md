# CMS-triggered website updates

Production can keep pages cached for a day and refresh them when CMS content changes, without rebuilding the website. Until configured, the current 60-second ISR expiration remains active.

## Production activation

1. Generate one private random secret of at least 32 characters, for example with `openssl rand -hex 32`. Do not commit it or use a PUBLIC_ prefix.
2. Set WEBSITE_REVALIDATION_SECRET to the identical value on both Vercel projects, scoped to **Production**. The website needs it at **build and runtime**; the CMS needs it at runtime.
3. Set CMS Production WEBSITE_REVALIDATION_URL to `https://www.yourfriendlyh2opros.com` (canonical HTTPS origin, no path, query or redirects).
4. Deploy the CMS hooks first, then the website with the matching secret. Early CMS refresh attempts against the old website build may fail; the old 60-second policy remains in force until the website build changes. Do not activate the website secret before configuring the CMS.
5. Verify an ordinary, intentional content edit updates affected pages and produces the CMS log `Website refreshed after CMS edit.` No temporary production records are needed.

No hosted environment values or deployments were changed while implementing this branch. Merely merging the code does not activate the day-long cache without the production website build secret. Preview/local hooks never refresh production: they require VERCEL_ENV=production. Do not set that flag in local development against the shared database.

## Execution and dependencies

Collection/global hooks schedule a batched callback using Next.js `after()`. Payload commits before returning its save response; the callback runs afterward, so public REST requests see committed edits. Do not make these refresh requests synchronously inside an afterChange hook, which runs before commit.

The callback reads the old sitemap, revalidates it and discovers current routes. It sends Vercel's private x-prerender-revalidate header to affected public paths. Sitemap paths are restricted to the configured origin and known public route shapes. Redirects are rejected; no editor session/cookies are forwarded.

| Edit | Pages refreshed |
| --- | --- |
| Site Settings, locations, services, media | All sitemap pages and llms.txt; shared navigation, sections, cross-links and photos can span the site |
| FAQs | Home, city and county pages, llms.txt |
| Reviews | Reviews, home, city, county and service pages |
| Offers | About |
| Gallery | Gallery |
| Page headline/CTA | Selected page, plus previous page on reassignment |

Every edit refreshes sitemap.xml for discovery. Renames/deletions explicitly include old and new city/service/county URLs, even if the old sitemap was not cached. Deleted pages can return 404. Review source priority is unchanged: Housecall Pro first, CMS fallback. Review/rating promises are now request-scoped, so warm instances cannot preserve old fallback content after revalidation.

## Failures and freshness

Each request has a five-second timeout and one retry. At most four run concurrently, with a 45-second overall deadline. The CMS REST route reserves 60 seconds for response and post-response work. There is no cron, DB polling timer or unawaited fire-and-forget task.

Failures log fixed messages/public paths without secrets or raw fetch errors. A successful save is not rolled back by a refresh failure. Invalid or failed sitemap discovery is reported as failure, not partial success. Off-request Local API scripts cannot use Next's HTTP after lifecycle; they log a skipped refresh. After deliberate scripts, use a normal HTTP edit or wait for expiration.

A second private header, x-h2o-content-refresh, enables strict CMS reads during authenticated refreshes. CMS HTTP/transport/JSON failures then fail the render rather than replacing good cached content with local fallback text. Ordinary visitor fallbacks remain unchanged. Successful empty collections still use this project's existing static fallbacks: deleting every CMS record does not remove those fallback sections.

The day-long expiration is a recovery backstop, not a durable queue. If notifications fail or a function is interrupted, an edit can wait until a request after expiration and regeneration. Check refresh-error logs rather than repeatedly saving. SEO endpoints no longer send a one-hour browser max-age that could mask successful server refreshes; Vercel ISR manages server caching.

This reduces expiration-driven activity, not CMS admin use, uncached paths, direct API/media requests, bots, or all database wake-ups. Compare Neon active hours and CU-hours over equivalent traffic periods.

## Validation and rollback

Local mocked tests never initialize Payload or connect to Neon. CMS TypeScript and Astro builds verify wiring. Actual Vercel cache replacement requires a deployment smoke check:

- Repeated ordinary visits become cache hits without corresponding CMS renders.
- One intentional edit updates affected pages without redeployment; new routes appear in the sitemap.
- In an isolated deployment/dataset, test deletion/rename and confirm old cached pages actually become 404. Test CMS outages and confirm refresh failures preserve cached pages.
- Check post-response success/failure logs and confirm preview/local activity causes no production refreshes.
- Inspect only expiration and token presence in the generated private `_isr.prerender-config.json`: configured production should have expiration=86400 and a bypassToken; unconfigured builds should have expiration=60 and none. Never print the token.

Rollback: remove the website's Production WEBSITE_REVALIDATION_SECRET and **redeploy** to restore 60-second expiration. Also disable the CMS secret to stop failed refresh attempts. Runtime-only removal does not change generated ISR configuration. Preserve push=false and production migrations; no schema migration is needed for these hooks.

References: [Astro ISR](https://docs.astro.build/en/guides/integrations-guide/vercel/), [Vercel on-demand ISR](https://vercel.com/docs/build-output-api/features#on-demand-incremental-static-regeneration-isr), [Next.js after](https://nextjs.org/docs/app/api-reference/functions/after), [Payload transactions](https://payloadcms.com/docs/database/transactions).

## Branch validation

- 12 mocked tests passed: `node --test client/tests/*.test.mjs` and `node cms/node_modules/tsx/dist/cli.mjs --test cms/tests/unit/website-revalidation.test.ts`.
- CMS TypeScript check passed: `node node_modules/typescript/bin/tsc --noEmit --incremental false` from cms.
- Astro production builds passed both configured (using a fake local test token) and unconfigured. Generated ISR artifacts confirmed 86400/token-present and 60/token-absent respectively; no token was printed.
- `git diff --check` passed. The local investigation report is ignored by Git.
- Targeted ESLint could not start: existing `cms/eslint.config.mjs` imports missing `@eslint/eslintrc`. No dependencies were changed to work around that unrelated setup issue.
- No CMS startup, live database writes, hosted configuration changes, commits or deployment were performed. Vercel smoke validation remains a deployment step.
