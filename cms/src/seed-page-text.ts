// One-off, idempotent seed for the Main Page Headlines and Offers collections
// added in feat/cms-editable-text. Creates each entry only if it doesn't exist
// yet, so it's safe to re-run. Run from cms/: npx tsx src/seed-page-text.ts
import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'
import { offers } from '../../client/src/data/offers'

const headlines = [
  {
    page: 'our-services',
    eyebrow: 'Our services',
    title: 'Everything plumbing. Everything water.',
    description:
      'Eight ways we keep Tampa Bay homes flowing — every one backed by upfront pricing and our workmanship guarantee.',
  },
  {
    page: 'about-us',
    eyebrow: 'About us',
    title: 'A family owned plumbing company that cares.',
    description: 'Built on trust, quality, and 20+ years of experience in the area.',
  },
  {
    page: 'reviews',
    eyebrow: 'Reviews',
    title: "Don't take our word for it.",
    description:
      'Real reviews from real neighbors across Hillsborough, Polk, Pasco, Pinellas, and Marion counties. Spin through them below.',
  },
  {
    page: 'contact',
    eyebrow: 'Contact',
    title: "Let's get your water sorted.",
    description:
      "Fill out the form and we'll get right back to you — or skip the typing and call during business hours.",
  },
  {
    page: 'gallery',
    eyebrow: 'Gallery',
    title: "Work we're proud of.",
    description:
      'Installs, repairs, and before-and-afters from around the neighborhood — spread out on the floor. Grab a photo and dig through the pile.',
  },
] as const

const run = async () => {
  const payload = await getPayload({ config })

  for (const headline of headlines) {
    const existing = await payload.find({
      collection: 'main-page-headlines',
      where: { page: { equals: headline.page } },
      limit: 1,
    })
    if (existing.docs.length) {
      console.log(`headline already exists, skipping: ${headline.page}`)
      continue
    }
    await payload.create({ collection: 'main-page-headlines', data: headline })
    console.log(`created headline: ${headline.page}`)
  }

  for (const [index, offer] of offers.entries()) {
    const existing = await payload.find({
      collection: 'offers',
      where: { title: { equals: offer.title } },
      limit: 1,
    })
    if (existing.docs.length) {
      console.log(`offer already exists, skipping: ${offer.title}`)
      continue
    }
    await payload.create({
      collection: 'offers',
      data: { ...offer, published: true, sortOrder: (index + 1) * 10 },
    })
    console.log(`created offer: ${offer.title}`)
  }

  console.log('done')
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
