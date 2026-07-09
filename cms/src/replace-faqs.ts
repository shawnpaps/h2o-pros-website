import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'
import { faqs } from '../../client/src/data/faqs'

const run = async () => {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'faqs',
    depth: 0,
    limit: 100,
    pagination: false,
  })

  for (const doc of existing.docs) {
    await payload.delete({ collection: 'faqs', id: doc.id })
  }

  console.log(`Deleted ${existing.docs.length} existing FAQs.`)

  for (const [index, faq] of faqs.entries()) {
    await payload.create({
      collection: 'faqs',
      data: {
        ...faq,
        sortOrder: index + 1,
      },
    })
  }

  console.log(`Created ${faqs.length} new FAQs.`)
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
