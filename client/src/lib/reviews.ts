import {
  reviews as fallbackReviews,
  ratingSummary as fallbackSummary,
  type Review,
} from '../data/reviews';
import { getCmsRatingSummary, getCmsReviews } from './cms';

export interface RatingSummary {
  average: string;
  count: number;
  source: string;
}

// Public, keyless API that powers Housecall Pro's embeddable review widget.
// The id is the widget/organization id from the client's HCP reviews embed.
const HCP_BASE = 'https://app.housecallpro.com/website_builder/api/reviews';
const HCP_WIDGET_ID =
  import.meta.env.HOUSECALL_REVIEWS_ID ||
  '697b9a5a-d869-4878-8294-75253aecc66a';

const SOURCE_LABELS: Record<string, string> = {
  google: 'Google',
  housecall_pro: 'Housecall Pro',
  facebook: 'Facebook',
};

type HcpReview = {
  source?: string;
  created_at?: string;
  rating?: number;
  comments?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  city?: string | null;
  state?: string | null;
};

const fetchJson = async <T>(url: string): Promise<T | undefined> => {
  try {
    const response = await fetch(url);
    if (!response.ok) return undefined;
    return (await response.json()) as T;
  } catch {
    return undefined;
  }
};

const toReview = (review: HcpReview): Review => ({
  name:
    [review.first_name, review.last_name].filter(Boolean).join(' ') ||
    'Verified customer',
  rating: review.rating ?? 5,
  text: (review.comments || '').trim(),
  location:
    review.city && review.state
      ? `${review.city}, ${review.state}`
      : undefined,
  source: SOURCE_LABELS[review.source || ''],
  date: review.created_at
    ? new Date(review.created_at).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : undefined,
});

let reviewsPromise: Promise<Review[]> | undefined;

/** Every customer review with text, newest first. */
export const getReviews = (): Promise<Review[]> => {
  reviewsPromise ??= (async () => {
    const pageSize = 100;
    type Page = { total_pages_count?: number; data?: HcpReview[] };
    const first = await fetchJson<Page>(
      `${HCP_BASE}/${HCP_WIDGET_ID}?page=1&count=${pageSize}`
    );
    if (!first?.data?.length) return (await getCmsReviews()) ?? fallbackReviews;

    const rest = await Promise.all(
      Array.from({ length: (first.total_pages_count ?? 1) - 1 }, (_, i) =>
        fetchJson<Page>(
          `${HCP_BASE}/${HCP_WIDGET_ID}?page=${i + 2}&count=${pageSize}`
        )
      )
    );

    return [...first.data, ...rest.flatMap((page) => page?.data ?? [])]
      .map(toReview)
      .filter((review) => review.text);
  })();
  return reviewsPromise;
};

let summaryPromise: Promise<RatingSummary> | undefined;

/** The business's live Google rating, with a static fallback. */
export const getRatingSummary = (): Promise<RatingSummary> => {
  summaryPromise ??= (async () => {
    const ratings = await fetchJson<
      Array<{ overall_rating?: number; total_ratings?: number; source?: string }>
    >(`${HCP_BASE}/ratings/${HCP_WIDGET_ID}`);

    const google = ratings?.find((entry) => entry.source === 'google');
    if (!google?.total_ratings) return (await getCmsRatingSummary()) ?? fallbackSummary;

    return {
      average: (google.overall_rating ?? 5).toFixed(1),
      count: google.total_ratings,
      source: 'Google Reviews',
    };
  })();
  return summaryPromise;
};
