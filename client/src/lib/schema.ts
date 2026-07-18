/**
 * JSON-LD structured data builders for SEO/AEO. Every builder returns a plain
 * object; BaseLayout serializes them into <script type="application/ld+json">.
 * All content comes from the CMS (with the usual static fallbacks) so schema
 * stays in sync with what's on the page.
 */
import type { County, RatingSummary, SiteContent, SiteInfo } from './cms';
import type { Service } from '../data/services';
import type { Location } from '../data/locations';
import type { Faq } from '../data/faqs';

const BUSINESS_ID = '#business';

const absolute = (siteUrl: string, path: string) =>
  new URL(path, siteUrl).href;

/** Plumber (a LocalBusiness subtype) — emitted on every page. */
export const buildBusinessSchema = (
  siteUrl: string,
  content: SiteContent,
  ratingSummary: RatingSummary,
) => {
  const { site, counties, socials, logoUrl } = content;

  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    '@id': absolute(siteUrl, `/${BUSINESS_ID}`),
    name: site.name,
    alternateName: site.shortName,
    slogan: site.tagline || undefined,
    description: site.description,
    url: siteUrl,
    telephone: site.phone,
    email: site.email,
    image: logoUrl || absolute(siteUrl, '/og-default.jpg'),
    logo: logoUrl || undefined,
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: `Florida Plumbing License ${site.license}`,
    },
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    areaServed: counties.map((name) => ({
      '@type': 'AdministrativeArea',
      name: name.includes('County') ? name : `${name} County`,
    })),
    sameAs: socials.length ? socials.map((social) => social.href) : undefined,
    aggregateRating:
      ratingSummary.count > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: ratingSummary.average,
            reviewCount: ratingSummary.count,
            bestRating: '5',
          }
        : undefined,
  };
};

export const buildWebSiteSchema = (siteUrl: string, site: SiteInfo) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: siteUrl,
  publisher: { '@id': absolute(siteUrl, `/${BUSINESS_ID}`) },
});

export const buildServiceSchema = (
  siteUrl: string,
  service: Service,
  counties: string[],
) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: service.title,
  name: service.title,
  description: service.blurb,
  url: absolute(siteUrl, `/services/${service.slug}`),
  provider: { '@id': absolute(siteUrl, `/${BUSINESS_ID}`) },
  areaServed: counties.map((name) => ({
    '@type': 'AdministrativeArea',
    name: name.includes('County') ? name : `${name} County`,
  })),
});

/** Location pages: the business's service offering scoped to one city. */
export const buildLocationServiceSchema = (
  siteUrl: string,
  location: Location,
) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Plumbing and water filtration',
  name: `Plumber in ${location.city}, FL`,
  description: location.metaDescription,
  url: absolute(siteUrl, `/locations/${location.slug}`),
  provider: { '@id': absolute(siteUrl, `/${BUSINESS_ID}`) },
  areaServed: {
    '@type': 'City',
    name: location.city,
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: `${location.county} County`,
    },
  },
});

/** County pages: the business's service offering scoped to one county. */
export const buildCountyServiceSchema = (siteUrl: string, county: County) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Plumbing and water filtration',
  name: `Plumber in ${county.name} County, FL`,
  description: `Licensed plumbing and water filtration service across ${county.name} County, Florida, including ${county.locations
    .map((location) => location.city)
    .join(', ')}.`,
  url: absolute(siteUrl, `/counties/${county.slug}`),
  provider: { '@id': absolute(siteUrl, `/${BUSINESS_ID}`) },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: `${county.name} County`,
    containsPlace: county.locations.map((location) => ({
      '@type': 'City',
      name: location.city,
    })),
  },
});

export const buildFaqSchema = (
  faqs: Array<Pick<Faq, 'question' | 'answer'>>,
) =>
  faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }
    : undefined;

export const buildBreadcrumbSchema = (
  siteUrl: string,
  crumbs: Array<{ name: string; path: string }>,
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: absolute(siteUrl, crumb.path),
  })),
});

export const buildServiceListSchema = (siteUrl: string, services: Service[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: services.map((service, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: service.title,
    url: absolute(siteUrl, `/services/${service.slug}`),
  })),
});
