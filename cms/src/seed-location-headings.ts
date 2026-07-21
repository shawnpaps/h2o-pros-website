// One-off, idempotent seed for the city/county page heading fields added in
// feat/cms-header-and-county-links. Fills them with the wording the site was
// already using so the editor sees real text instead of an empty box; leaves
// anything already filled in alone. Run from cms/: npx tsx src/seed-location-headings.ts
import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

const headings = {
  cityPageHeadline: 'Plumbing & Filtration in {city}, FL',
  countyPageHeadline: 'Plumbing & Water Filtration in {county} County, FL',
} as const

const run = async () => {
  const payload = await getPayload({ config })
  const current = await payload.findGlobal({ slug: 'site-settings' })

  const data: Record<string, string> = {}
  for (const [field, value] of Object.entries(headings)) {
    if (current[field as keyof typeof current]) {
      console.log(`already set, skipping: ${field}`)
      continue
    }
    data[field] = value
  }

  if (Object.keys(data).length) {
    await payload.updateGlobal({ slug: 'site-settings', data })
    console.log(`set: ${Object.keys(data).join(', ')}`)
  }

  console.log('done')
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
