// Plausible Analytics Integration for PSX
"use client"

import Script from 'next/script'
import { useEffect } from 'react'

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void
  }
}

interface PlausibleAnalyticsProps {
  domain: string // e.g., "psxonbase.com"
}

export default function PlausibleAnalytics({ domain }: PlausibleAnalyticsProps) {
  useEffect(() => {
    // Custom event tracking functions
    window.psxTrackEvent = (eventName: string, props?: Record<string, any>) => {
      if (window.plausible) {
        window.plausible(eventName, { props })
      }
    }

    // Track wallet-specific events
    window.psxTrackWalletEvent = (action: string, walletType: string, chainType: string) => {
      if (window.plausible) {
        window.plausible('Wallet Action', {
          props: {
            action,
            wallet_type: walletType,
            chain_type: chainType
          }
        })
      }
    }

    // Track conversion events
    window.psxTrackConversion = (conversionType: string, value?: number) => {
      if (window.plausible) {
        window.plausible('Conversion', {
          props: {
            type: conversionType,
            value: value?.toString()
          }
        })
      }
    }
  }, [])

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  )
}

// Extend window object for TypeScript
declare global {
  interface Window {
    psxTrackEvent?: (eventName: string, props?: Record<string, any>) => void
    psxTrackWalletEvent?: (action: string, walletType: string, chainType: string) => void
    psxTrackConversion?: (conversionType: string, value?: number) => void
  }
}
