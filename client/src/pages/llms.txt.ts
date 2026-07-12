import type { APIRoute } from 'astro';
import {
  getFaqs,
  getLocations,
  getServices,
  getSiteContent,
} from '../lib/cms';

/**
 * llms.txt — a curated, markdown summary of the business for AI assistants
 * and answer engines (https://llmstxt.org). Generated from the CMS at request
 * time so it always matches the live site.
 */
export const GET: APIRoute = async ({ site, url }) => {
  const base = (site ?? url).origin;
  const [content, services, locations, faqs] = await Promise.all([
    getSiteContent(),
    getServices(),
    getLocations(),
    getFaqs(),
  ]);
  const { site: business, hours, counties, ratingSummary } = content;

  const lines = [
    `# ${business.name}`,
    '',
    `> ${business.description}`,
    '',
    `${business.shortName} is a licensed, insured & bonded plumbing and water filtration company serving ${business.serviceArea}. Florida license ${business.license}.`,
    '',
    '## Key facts',
    '',
    `- Phone: ${business.phone}`,
    `- Email: ${business.email}`,
    `- Service area: ${counties.map((c) => (c.includes('County') ? c : `${c} County`)).join(', ')} (Florida)`,
    ...hours.map((row) => `- Hours (${row.label}): ${row.value}`),
    `- Rating: ${ratingSummary.average} stars from ${ratingSummary.count} reviews on ${ratingSummary.source}`,
    `- Online booking and reviews: ${base}/contact`,
    '',
    '## Services',
    '',
    ...services.map(
      (service) =>
        `- [${service.title}](${base}/services/${service.slug}): ${service.blurb}`,
    ),
    '',
    '## Service areas',
    '',
    ...locations.map(
      (location) =>
        `- [${location.city}, FL](${base}/locations/${location.slug}): ${location.county} County`,
    ),
    '',
    '## Frequently asked questions',
    '',
    ...faqs.flatMap((faq) => [`### ${faq.question}`, '', faq.answer, '']),
    '## Pages',
    '',
    `- [Home](${base}/)`,
    `- [Our Services](${base}/our-services)`,
    `- [About Us](${base}/about-us)`,
    `- [Reviews](${base}/reviews)`,
    `- [Gallery](${base}/gallery)`,
    `- [Contact](${base}/contact)`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
