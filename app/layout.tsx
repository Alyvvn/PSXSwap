import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ConsoleFilter from "@/components/console-filter"
import Script from "next/script"
import dynamic from "next/dynamic"

const ClientPrivyProvider = dynamic(() => import("@/components/ClientPrivyProvider"), { ssr: false })

export const metadata: Metadata = {
  title: "PSX - Please Stop Xisting | Base Network Meme Token",
  description: "PSX (Please Stop Xisting) is a precision-driven meme token on Base Network. Join the stealth mission with deflationary tokenomics, locked liquidity, and community-driven growth. Trade PSX now!",
  keywords: "PSX, Please Stop Xisting, Base Network, meme token, cryptocurrency, DeFi, trading, Base chain, deflationary token, community token",
  generator: "PSX.dev",
  metadataBase: new URL('https://psxonbase.com'),
  alternates: {
    canonical: 'https://psxonbase.com',
  },
  openGraph: {
    title: "PSX - Please Stop Xisting | Base Network Meme Token",
    description: "PSX (Please Stop Xisting) is a precision-driven meme token on Base Network. Join the stealth mission with deflationary tokenomics, locked liquidity, and community-driven growth.",
    url: 'https://psxonbase.com',
    siteName: 'PSX - Please Stop Xisting',
    images: [
      {
        url: '/images/psx-og-image.png',
        width: 1200,
        height: 630,
        alt: 'PSX - Please Stop Xisting Token',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "PSX - Please Stop Xisting | Base Network Meme Token",
    description: "Join the PSX stealth mission on Base Network. Precision. Stealth. Execution.",
    images: ['/images/psx-og-image.png'],
    creator: '@PSXonBase',
    site: '@PSXonBase',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PSX - Please Stop Xisting",
              "url": "https://psxonbase.com",
              "logo": "https://psxonbase.com/images/psx-logo-character.png",
              "description": "PSX (Please Stop Xisting) is a precision-driven meme token on Base Network with deflationary tokenomics and community-driven growth.",
              "foundingDate": "2024",
              "sameAs": [
                "https://x.com/PSXonBase",
                "https://t.me/psxonbase",
                "https://discord.gg/psxonbase",
                "https://www.instagram.com/psxonbase"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "url": "https://t.me/psxonbase"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "PSX - Please Stop Xisting",
              "url": "https://psxonbase.com",
              "description": "Official website for PSX token on Base Network. Trade, play games, and join the community.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://psxonbase.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "PSX Token",
              "description": "PSX (Please Stop Xisting) - A precision-driven meme token on Base Network featuring deflationary tokenomics, locked liquidity, and community governance.",
              "brand": {
                "@type": "Brand",
                "name": "PSX"
              },
              "category": "Cryptocurrency Token",
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "price": "0",
                "priceCurrency": "USD",
                "url": "https://psxonbase.com"
              }
            })
          }}
        />
      </head>
      <body>
        <ConsoleFilter />
        <ClientPrivyProvider>
          {children}
        </ClientPrivyProvider>
      </body>
    </html>
  )
}
