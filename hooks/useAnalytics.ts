// Simple Privy-focused analytics hook for PSX
import { useEffect, useCallback } from 'react'
import { usePrivy } from '@privy-io/react-auth'

interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
}

export const useAnalytics = () => {
  const { ready, authenticated, user } = usePrivy()

  // Track events to console and external services
  const trackEvent = useCallback((eventData: AnalyticsEvent) => {
    if (!ready || !authenticated) return

    // Log to console for development
    console.log('PSX Analytics Event:', {
      timestamp: new Date().toISOString(),
      user_id: user?.id,
      wallet_address: user?.wallet?.address,
      wallet_type: user?.wallet?.walletClientType,
      ...eventData
    })

    // Privy automatically tracks authentication events
    // Additional custom events logged to console for development

    // Send to your backend API (optional)
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user?.id,
          wallet_address: user?.wallet?.address,
          ...eventData,
          timestamp: new Date().toISOString()
        })
      }).catch(console.error)
    }
  }, [ready, authenticated, user])

  // Track user login/connection
  useEffect(() => {
    if (ready && authenticated && user) {
      trackEvent({
        event: 'wallet_connected',
        properties: {
          wallet_type: user.wallet?.walletClientType,
          has_email: !!user.email?.address,
          linked_accounts: user.linkedAccounts?.length || 0
        }
      })
    }
  }, [ready, authenticated, user, trackEvent])

  // Convenience functions
  const trackPageView = useCallback((page: string) => {
    trackEvent({
      event: 'page_view',
      properties: { page, url: window.location.href }
    })
  }, [trackEvent])

  const trackGameAccess = useCallback(() => {
    trackEvent({
      event: 'game_access',
      properties: { source: 'wallet_auth' }
    })
  }, [trackEvent])

  const trackClick = useCallback((element: string, location?: string) => {
    trackEvent({
      event: 'click',
      properties: { element, location }
    })
  }, [trackEvent])

  return {
    trackEvent,
    trackPageView,
    trackGameAccess,
    trackClick,
    isReady: ready && authenticated,
    user: user
  }
}

// Privy-only analytics - no external dependencies needed
