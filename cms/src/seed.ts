import 'dotenv/config'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload, type Payload } from 'payload'
import config from './payload.config'
import { faqs } from '../../client/src/data/faqs'
import { locations } from '../../client/src/data/locations'
import { ratingSummary, reviews } from '../../client/src/data/reviews'
import { services } from '../../client/src/data/services'
import { counties, hours, nav, site, socials } from '../../client/src/data/site'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const root = path.resolve(dirname, '../..')
const clientAssets = path.join(root, 'client/src/assets')

type MediaDoc = {
  id: number
}

type ExistingDoc = {
  id: number
}

const asset = (...segments: string[]) => path.join(clientAssets, ...segments)

const mediaSources = {
  logo: asset('logos/h2o-logo.webp'),
  homeHeroVideo: asset('videos/hero.mp4'),
  teamPhoto: asset('team-photo.jpg'),
  serviceAreaMap: asset('tampa-service-area.jpg'),
  drain: asset('services/samuel-sianipar-scUBcasSvbE-unsplash.jpg'),
  heater: asset('services/waterheater.jpg'),
  filtration: asset('services/timur-shakerzianov-c314Gh8dXAo-unsplash.jpg'),
  leak: asset('services/pan-xiaozhen-IYE0ImQlY90-unsplash.jpg'),
}

const serviceMedia: Record<string, keyof typeof mediaSources> = {
  DrainandSewer: 'drain',
  WaterHeater: 'heater',
  Filtration: 'filtration',
  LeakDetection: 'leak',
}

const showcaseTitles: Record<string, string> = {
  DrainandSewer: 'Drains & Sewer',
  WaterHeater: 'Water Heaters',
  Filtration: 'Filtration',
  LeakDetection: 'Leak Detection',
}

const showcaseBadges: Record<string, string> = {
  DrainandSewer: 'Pipes scoured back to like-new',
  WaterHeater: 'Reliable hot water, guaranteed',
  Filtration: 'Free in-home water testing',
  LeakDetection: 'Hidden leaks, pinpointed fast',
}

const galleryItems = [
  { label: 'Tankless water heater install', tall: false, imageKey: 'heater' },
  { label: 'Whole-home filtration system', tall: true, imageKey: 'filtration' },
  { label: 'Hydro-jetting in action', tall: false, imageKey: 'drain' },
  { label: 'Under-sink RO system', tall: false, imageKey: 'filtration' },
  { label: 'Slab leak repair', tall: true, imageKey: 'leak' },
  { label: 'Repiped laundry room', tall: false, imageKey: 'drain' },
  { label: 'Water softener install', tall: false, imageKey: 'filtration' },
  { label: 'Sewer camera inspection', tall: false, imageKey: 'drain' },
  { label: 'Before & after: drain line', tall: true, imageKey: 'drain' },
] as const

const findOne = async (
  payload: Payload,
  collection: string,
  where: Record<string, unknown>,
) => {
  const result = await payload.find({
    collection: collection as never,
    depth: 0,
    limit: 1,
    where: where as never,
  })

  return result.docs[0] as ExistingDoc | undefined
}

const upsert = async (
  payload: Payload,
  collection: string,
  where: Record<string, unknown>,
  data: Record<string, unknown>,
) => {
  const existing = await findOne(payload, collection, where)

  if (existing) {
    return payload.update({
      collection: collection as never,
      id: existing.id,
      data: data as never,
    })
  }

  return payload.create({
    collection: collection as never,
    data: data as never,
  })
}

const ensureMedia = async (
  payload: Payload,
  key: keyof typeof mediaSources,
  alt: string,
) => {
  const filePath = mediaSources[key]
  const existing = await findOne(payload, 'media', {
    alt: {
      equals: alt,
    },
  })

  if (existing) return existing as MediaDoc

  if (!existsSync(filePath)) {
    console.warn(`Skipping missing media file: ${filePath}`)
    return undefined
  }

  return payload.create({
    collection: 'media',
    data: { alt },
    filePath,
  }) as Promise<MediaDoc>
}

const seedAdminUser = async (payload: Payload) => {
  const email = process.env.PAYLOAD_ADMIN_EMAIL
  const password = process.env.PAYLOAD_ADMIN_PASSWORD
  if (!email || !password) return

  const existing = await findOne(payload, 'users', {
    email: {
      equals: email,
    },
  })

  if (existing) return

  await payload.create({
    collection: 'users',
    data: { email, password },
  })
}

const run = async () => {
  const payload = await getPayload({ config })

  await seedAdminUser(payload)

  const media = {
    logo: await ensureMedia(payload, 'logo', 'H2O Pros logo'),
    homeHeroVideo: await ensureMedia(payload, 'homeHeroVideo', 'Home hero video'),
    teamPhoto: await ensureMedia(payload, 'teamPhoto', 'H2O Pros team photo'),
    serviceAreaMap: await ensureMedia(payload, 'serviceAreaMap', 'Tampa service area map'),
    drain: await ensureMedia(payload, 'drain', 'Drain cleaning and hydro-jetting'),
    heater: await ensureMedia(payload, 'heater', 'Water heater services'),
    filtration: await ensureMedia(payload, 'filtration', 'Whole-home water filtration'),
    leak: await ensureMedia(payload, 'leak', 'Leak detection and pipe repair'),
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      ...site,
      nav: nav.map((item) => ({ label: item.label, href: item.href })),
      hours: hours.map((item) => ({ label: item.label, value: item.value })),
      counties: counties.map((name) => ({ name })),
      socials: socials.map((item) => ({ label: item.label, href: item.href })),
      ratingAverage: ratingSummary.average,
      ratingCount: ratingSummary.count,
      ratingSource: ratingSummary.source,
      logo: media.logo?.id,
      homeHeroVideo: media.homeHeroVideo?.id,
      serviceAreaMap: media.serviceAreaMap?.id,
      teamPhoto: media.teamPhoto?.id,
    },
  })

  for (const [index, service] of services.entries()) {
    const mediaKey = serviceMedia[service.id]
    const image = mediaKey ? media[mediaKey] : undefined

    await upsert(
      payload,
      'services',
      {
        anchorId: {
          equals: service.id,
        },
      },
      {
        title: service.title,
        anchorId: service.id,
        blurb: service.blurb,
        bullets: service.bullets.map((text) => ({ text })),
        accent: service.accent,
        featured: Boolean(service.featured),
        sortOrder: index + 1,
        showcaseTitle: showcaseTitles[service.id],
        showcaseBadge: showcaseBadges[service.id],
        showcaseImage: image?.id,
        detailImage: image?.id,
      },
    )
  }

  for (const [index, location] of locations.entries()) {
    await upsert(
      payload,
      'locations',
      {
        slug: {
          equals: location.slug,
        },
      },
      {
        ...location,
        nearby: location.nearby.map((area) => ({ area })),
        heroImage: media.filtration?.id,
        sortOrder: index + 1,
      },
    )
  }

  for (const [index, faq] of faqs.entries()) {
    await upsert(
      payload,
      'faqs',
      {
        question: {
          equals: faq.question,
        },
      },
      {
        ...faq,
        sortOrder: index + 1,
      },
    )
  }

  for (const [index, review] of reviews.entries()) {
    await upsert(
      payload,
      'reviews',
      {
        name: {
          equals: review.name,
        },
      },
      {
        ...review,
        source: review.source || ratingSummary.source,
        published: true,
        sortOrder: index + 1,
      },
    )
  }

  for (const [index, item] of galleryItems.entries()) {
    await upsert(
      payload,
      'gallery-items',
      {
        label: {
          equals: item.label,
        },
      },
      {
        label: item.label,
        tall: item.tall,
        image: media[item.imageKey]?.id,
        published: true,
        sortOrder: index + 1,
      },
    )
  }

  console.log('Seeded Payload with client fallback content.')
  console.log(
    `Services: ${services.length}, locations: ${locations.length}, FAQs: ${faqs.length}, reviews: ${reviews.length}, gallery items: ${galleryItems.length}.`,
  )
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
