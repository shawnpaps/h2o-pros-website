import { locations as fallbackLocations, type Location } from '../data/locations';
import { faqs as fallbackFaqs, type Faq } from '../data/faqs';
import {
  ratingSummary as fallbackRatingSummary,
  reviews as fallbackReviews,
  type Review,
} from '../data/reviews';
import { services as fallbackServices, type Service } from '../data/services';
import {
  counties as fallbackCounties,
  hours as fallbackHours,
  nav as fallbackNav,
  site as fallbackSite,
  socials as fallbackSocials,
} from '../data/site';

export interface RatingSummary {
  average: string;
  count: number;
  source: string;
}

export interface SiteInfo {
  name: string;
  shortName: string;
  tagline: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  license: string;
  serviceArea: string;
  description: string;
}

export interface SiteContent {
  site: SiteInfo;
  hours: Array<{ label: string; value: string }>;
  counties: string[];
  socials: Array<{ label: string; href: string }>;
  nav: Array<{ label: string; href: string }>;
  ratingSummary: RatingSummary;
  logoUrl?: string;
}

export interface GalleryItem {
  label: string;
  tall: boolean;
  imageUrl?: string;
}

export interface SiteSettings {
  homeHeroVideoUrl?: string;
  homeHeroCardLeftUrl?: string;
  homeHeroCardCenterUrl?: string;
  homeHeroCardRightUrl?: string;
  teamPhotoUrl?: string;
  serviceAreaMapUrl?: string;
}

const payloadUrl = (
  import.meta.env.PAYLOAD_URL ||
  import.meta.env.PUBLIC_PAYLOAD_URL ||
  (typeof process !== 'undefined' ? process.env.PAYLOAD_URL : undefined) ||
  ''
).replace(/\/$/, '');

const fallbackGalleryItems: GalleryItem[] = [
  { label: 'Tankless water heater install', tall: false },
  { label: 'Whole-home filtration system', tall: true },
  { label: 'Hydro-jetting in action', tall: false },
  { label: 'Under-sink RO system', tall: false },
  { label: 'Slab leak repair', tall: true },
  { label: 'Repiped laundry room', tall: false },
  { label: 'Water softener install', tall: false },
  { label: 'Sewer camera inspection', tall: false },
  { label: 'Before & after: drain line', tall: true },
];

type PayloadMedia = {
  url?: string;
  sizes?: Record<string, { url?: string }>;
};

const mediaUrl = (media: unknown, preferredSize?: string) => {
  if (!media || typeof media !== 'object') return undefined;
  const item = media as PayloadMedia;
  const url = preferredSize ? item.sizes?.[preferredSize]?.url || item.url : item.url;
  if (!url) return undefined;
  // Payload returns media URLs relative to its own host.
  return url.startsWith('/') ? `${payloadUrl}${url}` : url;
};

export const fetchPayload = async <T>(path: string): Promise<T | undefined> => {
  if (!payloadUrl) return undefined;

  try {
    const response = await fetch(`${payloadUrl}${path}`);
    if (!response.ok) return undefined;
    return (await response.json()) as T;
  } catch {
    return undefined;
  }
};

export const getServices = async (): Promise<Service[]> => {
  const payload = await fetchPayload<{
    docs: Array<{
      title: string;
      anchorId: string;
      slug?: string;
      blurb: string;
      bullets?: Array<{ text?: string }>;
      accent?: 'red' | 'blue';
      featured?: boolean;
      showcaseTitle?: string;
      showcaseBadge?: string;
      showcaseImage?: unknown;
      detailImage?: unknown;
      heroHeadline?: string;
      signs?: Array<{ text?: string }>;
      steps?: Array<{ title?: string; description?: string }>;
      stats?: Array<{ value?: string; label?: string }>;
      faqs?: Array<{ question?: string; answer?: string }>;
    }>;
  }>('/api/services?sort=sortOrder&limit=100&depth=1');

  if (!payload?.docs?.length) return fallbackServices;

  // Detail-page content falls back per service to the local copy until the
  // CMS entry has its own.
  const fallbackById = new Map(fallbackServices.map((s) => [s.id, s]));

  return payload.docs.map((service) => {
    const fallback = fallbackById.get(service.anchorId);
    const steps =
      service.steps
        ?.map((step) => ({ title: step.title || '', description: step.description || '' }))
        .filter((step) => step.title) ?? [];
    const stats =
      service.stats
        ?.map((stat) => ({ value: stat.value || '', label: stat.label || '' }))
        .filter((stat) => stat.value && stat.label) ?? [];
    const faqs =
      service.faqs
        ?.map((faq) => ({ question: faq.question || '', answer: faq.answer || '' }))
        .filter((faq) => faq.question && faq.answer) ?? [];
    const signs = service.signs?.map((sign) => sign.text || '').filter(Boolean) ?? [];

    return {
    id: service.anchorId,
    slug:
      service.slug ||
      fallback?.slug ||
      service.anchorId.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
    title: service.title,
    blurb: service.blurb,
    bullets: service.bullets?.map((bullet) => bullet.text || '').filter(Boolean) ?? [],
    accent: service.accent || 'blue',
    featured: service.featured,
    showcaseTitle: service.showcaseTitle,
    showcaseBadge: service.showcaseBadge,
    heroHeadline: service.heroHeadline || fallback?.heroHeadline,
    signs: signs.length ? signs : fallback?.signs ?? [],
    steps: steps.length ? steps : fallback?.steps ?? [],
    stats: stats.length ? stats : fallback?.stats ?? [],
    faqs: faqs.length ? faqs : fallback?.faqs ?? [],
    showcaseImageUrl: mediaUrl(service.showcaseImage, 'card'),
    detailImageUrl: mediaUrl(service.detailImage, 'card'),
    };
  });
};

export const getLocations = async (): Promise<Location[]> => {
  const payload = await fetchPayload<{
    docs: Array<{
      slug: string;
      city: string;
      county: string;
      intro: string;
      nearby?: Array<{ area?: string }>;
      metaDescription: string;
      heroImage?: unknown;
    }>;
  }>('/api/locations?sort=sortOrder&limit=100&depth=1');

  if (!payload?.docs?.length) return fallbackLocations;

  return payload.docs.map((location) => ({
    slug: location.slug,
    city: location.city,
    county: location.county,
    intro: location.intro,
    nearby: location.nearby?.map((item) => item.area || '').filter(Boolean) ?? [],
    metaDescription: location.metaDescription,
    heroImageUrl: mediaUrl(location.heroImage, 'hero'),
  }));
};

export const getGalleryItems = async (): Promise<GalleryItem[]> => {
  const payload = await fetchPayload<{
    docs: Array<{
      label: string;
      tall?: boolean;
      image?: unknown;
    }>;
  }>('/api/gallery-items?where[published][equals]=true&sort=sortOrder&limit=100&depth=1');

  if (!payload?.docs?.length) return fallbackGalleryItems;

  return payload.docs.map((item) => ({
    label: item.label,
    tall: Boolean(item.tall),
    imageUrl: mediaUrl(item.image, item.tall ? 'hero' : 'card'),
  }));
};

type PayloadSiteSettings = {
  name?: string;
  shortName?: string;
  tagline?: string;
  phone?: string;
  phoneHref?: string;
  email?: string;
  emailHref?: string;
  license?: string;
  serviceArea?: string;
  description?: string;
  nav?: Array<{ label?: string; href?: string }>;
  hours?: Array<{ label?: string; value?: string }>;
  counties?: Array<{ name?: string }>;
  socials?: Array<{ label?: string; href?: string }>;
  ratingAverage?: string;
  ratingCount?: number;
  ratingSource?: string;
  logo?: unknown;
  homeHeroVideo?: unknown;
  teamPhoto?: unknown;
  serviceAreaMap?: unknown;
};

const getRawSiteSettings = async () =>
  fetchPayload<PayloadSiteSettings>('/api/globals/site-settings?depth=1');

export const getSiteContent = async (): Promise<SiteContent> => {
  const settings = await getRawSiteSettings();

  if (!settings?.name) {
    return {
      site: fallbackSite,
      hours: [...fallbackHours],
      counties: [...fallbackCounties],
      socials: [...fallbackSocials],
      nav: [...fallbackNav],
      ratingSummary: fallbackRatingSummary,
    };
  }

  return {
    site: {
      name: settings.name || fallbackSite.name,
      shortName: settings.shortName || fallbackSite.shortName,
      tagline: settings.tagline || fallbackSite.tagline,
      phone: settings.phone || fallbackSite.phone,
      phoneHref: settings.phoneHref || fallbackSite.phoneHref,
      email: settings.email || fallbackSite.email,
      emailHref: settings.emailHref || fallbackSite.emailHref,
      license: settings.license || fallbackSite.license,
      serviceArea: settings.serviceArea || fallbackSite.serviceArea,
      description: settings.description || fallbackSite.description,
    },
    hours:
      settings.hours?.map((item) => ({
        label: item.label || '',
        value: item.value || '',
      })).filter((item) => item.label && item.value) || [...fallbackHours],
    counties:
      settings.counties?.map((item) => item.name || '').filter(Boolean) || [
        ...fallbackCounties,
      ],
    socials:
      settings.socials?.map((item) => ({
        label: item.label || '',
        href: item.href || '',
      })).filter((item) => item.label && item.href) || [...fallbackSocials],
    nav:
      settings.nav?.map((item) => ({
        label: item.label || '',
        href: item.href || '',
      })).filter((item) => item.label && item.href) || [...fallbackNav],
    ratingSummary: {
      average: settings.ratingAverage || fallbackRatingSummary.average,
      count: settings.ratingCount ?? fallbackRatingSummary.count,
      source: settings.ratingSource || fallbackRatingSummary.source,
    },
    logoUrl: mediaUrl(settings.logo, 'card'),
  };
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
  const settings = await fetchPayload<{
    homeHeroVideo?: unknown;
    homeHeroCardLeft?: unknown;
    homeHeroCardCenter?: unknown;
    homeHeroCardRight?: unknown;
    teamPhoto?: unknown;
    serviceAreaMap?: unknown;
  }>('/api/globals/site-settings?depth=1');

  if (!settings) return {};

  return {
    homeHeroVideoUrl: mediaUrl(settings.homeHeroVideo),
    homeHeroCardLeftUrl: mediaUrl(settings.homeHeroCardLeft, 'card'),
    homeHeroCardCenterUrl: mediaUrl(settings.homeHeroCardCenter, 'card'),
    homeHeroCardRightUrl: mediaUrl(settings.homeHeroCardRight, 'card'),
    teamPhotoUrl: mediaUrl(settings.teamPhoto, 'card'),
    serviceAreaMapUrl: mediaUrl(settings.serviceAreaMap, 'card'),
  };
};

export const getFaqs = async (): Promise<Faq[]> => {
  const payload = await fetchPayload<{
    docs: Array<{
      question: string;
      answer: string;
    }>;
  }>('/api/faqs?sort=sortOrder&limit=100');

  if (!payload?.docs?.length) return fallbackFaqs;

  return payload.docs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));
};

export const getCmsReviews = async (): Promise<Review[] | undefined> => {
  const payload = await fetchPayload<{
    docs: Array<Review>;
  }>('/api/reviews?where[published][equals]=true&sort=sortOrder&limit=100');

  return payload?.docs?.length ? payload.docs : undefined;
};

export const getCmsRatingSummary = async (): Promise<RatingSummary | undefined> => {
  const content = await getSiteContent();
  return content.ratingSummary;
};

export const getFallbackReviews = () => fallbackReviews;
