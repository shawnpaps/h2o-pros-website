import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

/**
 * One-off backfill: sets showcaseTitle on the featured services without
 * touching any other CMS-managed content (unlike the full seed).
 * Run with: pnpm tsx src/set-showcase-titles.ts
 */
const showcaseTitles: Record<string, string> = {
  DrainandSewer: 'Drains & Sewer',
  WaterHeater: 'Water Heaters',
  Filtration: 'Filtration',
  LeakDetection: 'Leak Detection',
}

const run = async () => {
  const payload = await getPayload({ config })

  for (const [anchorId, showcaseTitle] of Object.entries(showcaseTitles)) {
    const { docs } = await payload.find({
      collection: 'services',
      where: { anchorId: { equals: anchorId } },
      limit: 1,
      depth: 0,
    })

    const doc = docs[0]
    if (!doc) {
      console.warn(`No service found for anchorId ${anchorId}`)
      continue
    }

    await payload.update({
      collection: 'services',
      id: doc.id,
      data: { showcaseTitle },
    })
    console.log(`Set showcaseTitle for ${anchorId}: ${showcaseTitle}`)
  }

  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
