import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

const liveSiteURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yourfriendlyh20pros.com'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="home">
      <div className="content">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Your Friendly Neighborhood H2O Pros"
          className="logo"
          height={180}
          src="/h2o-logo.webp"
          width={180}
        />
        {!user && <h1>Welcome, H2O Pros Team!</h1>}
        {user && <h1>Welcome back, {user.email}</h1>}
        <p className="tagline">
          This is the content hub for your website. Head to the admin panel to update services,
          reviews, FAQs, photos, and more.
        </p>
        <div className="links">
          <a className="admin" href={payloadConfig.routes.admin} rel="noopener noreferrer">
            Go to admin panel
          </a>
          <a className="site" href={liveSiteURL} rel="noopener noreferrer" target="_blank">
            View live website
          </a>
        </div>
      </div>
      <div className="footer">
        <p>Your Friendly Neighborhood H2O Pros · Plumbing &amp; Filtration</p>
        <a href="mailto:Support@yourfriendlyh20pros.com">Support@yourfriendlyh20pros.com</a>
      </div>
    </div>
  )
}
