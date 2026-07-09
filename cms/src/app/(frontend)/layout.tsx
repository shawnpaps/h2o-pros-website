import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Content management for the Your Friendly Neighborhood H2O Pros website.',
  title: 'H2O Pros CMS',
  icons: [{ rel: 'icon', type: 'image/webp', url: '/h2o-logo.webp' }],
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
