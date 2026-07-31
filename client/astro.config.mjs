// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // Canonical origin for the whole site. Note the "h2o" (letter O) — the
  // "h20" (zero) spelling is a separate, parked domain, and pointing canonical
  // tags/sitemap/JSON-LD at it de-indexed the site in Google Search Console.
  site: 'https://www.yourfriendlyh2opros.com',
  output: 'server',
  adapter: vercel({
    // Pages are rendered on demand, cached, and re-fetched from the CMS
    // after 60 seconds — CMS edits go live without a redeploy.
    isr: {
      expiration: 60,
    },
    imageService: true,
  }),
  integrations: [tailwind()],
});
