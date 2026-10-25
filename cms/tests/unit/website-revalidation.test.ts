import assert from 'node:assert/strict'
import { test } from 'node:test'
import { pathsForChanges, refreshWebsite, sitemapPaths } from '../../src/lib/website-revalidation'

const origin = 'https://www.yourfriendlyh2opros.com'
const inventory = ['/', '/about-us', '/gallery', '/contact', '/reviews', '/our-services', '/locations/sarasota', '/counties/sarasota', '/services/drains']
const xml = (paths: string[]) => `<urlset>${paths.map(path => `<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>`

test('sitemap discovery accepts only public routes on the configured origin', () => {
  assert.deepEqual(sitemapPaths(xml(['/','/admin','/locations/sarasota','/locations/a?token=x']) + '<loc>https://evil.example/</loc>', origin), ['/', '/locations/sarasota'])
})

test('shared content refreshes all pages, old/new city and county URLs, and llms', () => {
  const paths = pathsForChanges([{ collection: 'locations', doc: { slug: 'new-city', county: 'New County' }, previousDoc: { slug: 'old-city', county: 'Old County' } }], inventory)
  for (const path of [...inventory, '/llms.txt', '/locations/old-city', '/locations/new-city', '/counties/old-county', '/counties/new-county']) assert.ok(paths.includes(path), path)
  assert.ok(pathsForChanges([{ collection: 'services', previousDoc: { slug: 'deleted-service' } }], inventory).includes('/services/deleted-service'))
})

test('page-specific edits do not rebuild unrelated pages; FAQ affects shared home sections', () => {
  assert.deepEqual(pathsForChanges([{ collection: 'offers' }, { collection: 'gallery-items' }], inventory), ['/about-us', '/gallery'])
  assert.deepEqual(pathsForChanges([{ collection: 'main-page-headlines', doc: { page: 'contact' }, previousDoc: { page: 'gallery' } }], inventory), ['/contact', '/gallery'])
  assert.deepEqual(pathsForChanges([{ collection: 'faqs' }], inventory), ['/', '/locations/sarasota', '/counties/sarasota', '/llms.txt'])
})

test('refresh retains previous URLs, discovers new routes, retries failures and bounds concurrency', async () => {
  const seen: { path: string; refresh: boolean }[] = []
  let active = 0, peak = 0, tries = 0
  const fetcher: typeof fetch = async (input, init) => {
    const path = new URL(String(input)).pathname
    const refresh = new Headers(init?.headers).get('x-prerender-revalidate') === 'test-secret'
    assert.equal(init?.redirect, 'error')
    seen.push({ path, refresh })
    if (path === '/sitemap.xml') return new Response(xml(refresh ? inventory : [...inventory, '/locations/deleted']))
    active++; peak = Math.max(peak, active)
    await new Promise(resolve => setTimeout(resolve, 1))
    active--
    if (path === '/gallery' && tries++ === 0) return new Response('', { status: 503 })
    return new Response('', { status: path === '/locations/deleted' ? 404 : 200 })
  }
  const result = await refreshWebsite({ origin, secret: 'test-secret', changes: [{ collection: 'site-settings' }], fetcher })
  assert.deepEqual(result.failed, [])
  assert.ok(seen.some(item => item.path === '/locations/deleted' && item.refresh))
  assert.equal(seen.filter(item => item.path === '/gallery').length, 2)
  assert.ok(peak <= 4)
  assert.ok(seen.filter(item => item.path !== '/sitemap.xml').every(item => item.refresh))
})

test('failed or malformed fresh inventory reports failure instead of partial success', async () => {
  for (const response of [() => new Response('', { status: 500 }), () => new Response('<html>login</html>')]) {
    const result = await refreshWebsite({ origin, secret: 'test-secret', changes: [{ collection: 'site-settings' }], fetcher: async () => response() })
    assert.deepEqual(result, { refreshed: 0, failed: ['/sitemap.xml'] })
  }
})

test('persistent route failure is reported after bounded retries', async () => {
  let calls = 0
  const result = await refreshWebsite({ origin, secret: 'test-secret', changes: [{ collection: 'offers' }], fetcher: async input => {
    if (new URL(String(input)).pathname === '/sitemap.xml') return new Response(xml(inventory))
    calls++; return new Response('', { status: 500 })
  } })
  assert.deepEqual(result, { refreshed: 1, failed: ['/about-us'] })
  assert.equal(calls, 2)
})
