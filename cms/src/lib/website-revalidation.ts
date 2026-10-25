/** Public route refreshes only. No Payload initialization or database access here. */
export type ContentChange = {
  collection: string
  doc?: { slug?: string; county?: string; page?: string; anchorId?: string }
  previousDoc?: { slug?: string; county?: string; page?: string; anchorId?: string }
}

const mainPages: Record<string, string> = {
  'about-us': '/about-us', 'our-services': '/our-services', reviews: '/reviews',
  gallery: '/gallery', contact: '/contact',
}
const countySlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

export function sitemapPaths(xml: string, origin: string): string[] {
  const paths = new Set<string>()
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const url = new URL(match[1].replaceAll('&amp;', '&'), origin)
    // Never send the secret to another host, protocol, query, or internal route.
    if (url.origin !== origin || url.search || url.hash) continue
    const path = url.pathname
    if (path === '/' || Object.values(mainPages).includes(path) ||
      /^\/(locations|counties|services)\/[a-z0-9-]+$/.test(path)) paths.add(path)
  }
  return [...paths]
}

export function pathsForChanges(changes: ContentChange[], inventory: string[]): string[] {
  const paths = new Set<string>()
  const homeSections = inventory.filter(path => path === '/' || /^\/(locations|counties)\//.test(path))
  for (const { collection, doc, previousDoc } of changes) {
    switch (collection) {
      // Global content, navigation, media references, and service cross-links span the site.
      case 'site-settings': case 'locations': case 'media': case 'services':
        inventory.forEach(path => paths.add(path))
        paths.add('/llms.txt')
        break
      case 'faqs':
        homeSections.forEach(path => paths.add(path))
        paths.add('/llms.txt')
        break
      case 'reviews':
        homeSections.forEach(path => paths.add(path))
        inventory.filter(path => path.startsWith('/services/')).forEach(path => paths.add(path))
        paths.add('/reviews')
        break
      case 'offers': paths.add('/about-us'); break
      case 'gallery-items': paths.add('/gallery'); break
      case 'main-page-headlines':
        for (const item of [doc, previousDoc]) {
          if (item?.page && mainPages[item.page]) paths.add(mainPages[item.page])
        }
        break
    }
    // Refresh both addresses on rename/delete, even if the old sitemap was never cached.
    for (const item of [doc, previousDoc]) {
      if (!item) continue
      const slug = item.slug || (collection === 'services' ? item.anchorId?.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() : undefined)
      if (slug && /^[a-z0-9-]+$/.test(slug) && ['locations', 'services'].includes(collection)) {
        paths.add(`/${collection}/${slug}`)
      }
      if (collection === 'locations' && item.county) paths.add(`/counties/${countySlug(item.county)}`)
    }
  }
  return [...paths]
}

export async function refreshWebsite({ origin, secret, changes, fetcher = fetch }: {
  origin: string
  secret: string
  changes: ContentChange[]
  fetcher?: typeof fetch
}): Promise<{ refreshed: number; failed: string[] }> {
  const deadline = Date.now() + 45_000
  const request = async (path: string, refresh: boolean) => {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const remaining = deadline - Date.now()
        if (remaining <= 0) throw new Error('Refresh deadline exceeded')
        const response = await fetcher(new URL(path, origin), {
          method: 'GET', redirect: 'error', cache: 'no-store',
          headers: refresh ? { 'x-prerender-revalidate': secret, 'x-h2o-content-refresh': secret } : {},
          signal: AbortSignal.timeout(Math.min(5000, remaining)),
        })
        // Deleted/renamed pages legitimately regenerate to 404.
        if (response.ok || (path !== '/sitemap.xml' && response.status === 404)) return response
        await response.body?.cancel()
      } catch {
        // Retry once; never include fetch errors/headers in logs (they may contain secrets).
      }
    }
    throw new Error('Page refresh failed')
  }

  // Retain old URLs before updating the sitemap, then discover new/fallback URLs.
  let previous: string[] = []
  try { previous = sitemapPaths(await (await request('/sitemap.xml', false)).text(), origin) } catch { /* fresh inventory still required */ }
  let current: string[]
  try {
    current = sitemapPaths(await (await request('/sitemap.xml', true)).text(), origin)
    if (!current.includes('/')) throw new Error('Invalid sitemap')
  } catch {
    // Do not silently report success with an incomplete route inventory.
    return { refreshed: 0, failed: ['/sitemap.xml'] }
  }
  const inventory = [...new Set([...previous, ...current])]
  const queue = pathsForChanges(changes, inventory)
  let refreshed = 1 // sitemap already refreshed
  const failed: string[] = []
  await Promise.all(Array.from({ length: Math.min(4, queue.length) }, async () => {
    let path: string | undefined
    while ((path = queue.shift())) {
      try {
        const response = await request(path, true)
        await response.body?.cancel()
        refreshed++
      } catch { failed.push(path) }
    }
  }))
  return { refreshed, failed }
}
