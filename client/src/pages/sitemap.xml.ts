import type { APIRoute } from 'astro';
import { getLocations, getServices } from '../lib/cms';

const STATIC_PATHS = [
  '/',
  '/about-us',
  '/our-services',
  '/reviews',
  '/gallery',
  '/contact',
];

/**
 * Server-rendered sitemap: services and locations come from the CMS at
 * request time, so new pages show up here without a redeploy.
 */
export const GET: APIRoute = async ({ site, url }) => {
  const base = (site ?? url).origin;
  const [services, locations] = await Promise.all([
    getServices(),
    getLocations(),
  ]);

  const paths = [
    ...STATIC_PATHS,
    ...services.map((service) => `/services/${service.slug}`),
    ...locations.map((location) => `/locations/${location.slug}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${base}${path === '/' ? '' : path}</loc></url>`).join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
