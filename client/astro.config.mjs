// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// Set only on the production deployment, with the same secret in the CMS.
const refreshSecret = process.env.VERCEL_ENV === 'production'
  ? process.env.WEBSITE_REVALIDATION_SECRET
  : undefined;
const editDrivenRefresh = Boolean(refreshSecret && refreshSecret.length >= 32);

export default defineConfig({
  // Canonical origin for the whole site. Note the "h2o" (letter O) — the
  // "h20" (zero) spelling is a separate, parked domain, and pointing canonical
  // tags/sitemap/JSON-LD at it de-indexed the site in Google Search Console.
  site: 'https://www.yourfriendlyh2opros.com',
  output: 'server',
  adapter: vercel({
    // CMS saves refresh affected routes on demand. A daily expiration recovers
    // missed notifications; unconfigured deployments retain the 60-second policy.
    isr: {
      expiration: editDrivenRefresh ? 60 * 60 * 24 : 60,
      bypassToken: editDrivenRefresh ? refreshSecret : undefined,
    },
    imageService: true,
  }),
  integrations: [tailwind()],
});
