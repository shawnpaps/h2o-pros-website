import type { APIRoute } from 'astro';

/**
 * Everything is crawlable — including AI crawlers (GPTBot, ClaudeBot,
 * PerplexityBot, etc.), which matter for answer-engine visibility. A
 * default-allow policy covers them all; llms.txt gives them a curated summary.
 */
export const GET: APIRoute = ({ site, url }) => {
  const base = (site ?? url).origin;

  const body = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
