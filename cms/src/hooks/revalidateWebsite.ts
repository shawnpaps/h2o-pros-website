import { after } from 'next/server'
import type { CollectionConfig, GlobalAfterChangeHook, PayloadRequest } from 'payload'
import { refreshWebsite, type ContentChange } from '../lib/website-revalidation'

const pending = new WeakMap<PayloadRequest, ContentChange[]>()

function schedule(req: PayloadRequest, change: ContentChange) {
  // Local dev, preview deploys and one-off scripts must not refresh the production site.
  if (process.env.VERCEL_ENV !== 'production') return
  const secret = process.env.WEBSITE_REVALIDATION_SECRET
  const configuredURL = process.env.WEBSITE_REVALIDATION_URL
  if (!secret || secret.length < 32 || !configuredURL) {
    req.payload.logger.warn('Website refresh is not configured. The website will use its timed refresh fallback.')
    return
  }
  let origin: string
  try {
    const url = new URL(configuredURL)
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/') throw new Error()
    origin = url.origin
  } catch {
    req.payload.logger.error('WEBSITE_REVALIDATION_URL must be an HTTPS website origin with no path or credentials.')
    return
  }
  const batch = pending.get(req)
  if (batch) { batch.push(change); return }
  const changes = [change]
  try {
    // afterChange runs before commit. Next's after keeps the function alive and waits
    // until the HTTP response is finished, after Payload has committed the operation.
    after(async () => {
      try {
        const result = await refreshWebsite({ origin, secret, changes })
        if (result.failed.length) {
          req.payload.logger.error({ msg: 'Website refresh incomplete; timed fallback remains active.', paths: result.failed })
        } else {
          req.payload.logger.info({ msg: 'Website refreshed after CMS edit.', pages: result.refreshed })
        }
      } catch {
        req.payload.logger.error('Website refresh failed; timed fallback remains active.')
      } finally { pending.delete(req) }
    })
    pending.set(req, changes)
  } catch {
    // No Next HTTP request context (e.g. Local API scripts). Never refresh before commit.
    req.payload.logger.warn('Website refresh skipped outside an HTTP request. Timed fallback remains active.')
  }
}

export function withWebsiteRevalidation(collection: CollectionConfig): CollectionConfig {
  return {
    ...collection,
    hooks: {
      ...collection.hooks,
      afterChange: [...(collection.hooks?.afterChange || []), ({ req, doc, previousDoc }) => {
        schedule(req, { collection: collection.slug, doc, previousDoc })
        return doc
      }],
      afterDelete: [...(collection.hooks?.afterDelete || []), ({ req, doc }) => {
        schedule(req, { collection: collection.slug, previousDoc: doc })
        return doc
      }],
    },
  }
}

export const revalidateSiteSettings: GlobalAfterChangeHook = ({ req, doc }) => {
  schedule(req, { collection: 'site-settings' })
  return doc
}
