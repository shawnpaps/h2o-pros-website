// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
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
