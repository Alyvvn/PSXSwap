"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Maximize, Minimize, ExternalLink, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAnalytics } from "@/hooks/useAnalytics"

export default function GamePage() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { trackEvent, trackClick } = useAnalytics()

  const handleLogout = async () => {
    trackEvent({
      event: 'game_logout',
      properties: { source: 'game_page' }
    })
    try {
      await fetch('/api/auth', {
        method: 'DELETE',
      })
      router.push("/game-auth")
    } catch (error) {
      console.error('Logout error:', error)
      router.push("/game-auth")
    }
  }

  useEffect(() => {
    // Check authentication by making a request to verify the cookie
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
        })
        
        if (!response.ok) {
          router.push('/game-auth')
          return
        }
      } catch (error) {
        router.push('/game-auth')
        return
      }

      // Simulate loading time
      const timer = setTimeout(() => setIsLoading(false), 2000)
      return () => clearTimeout(timer)
    }

    checkAuth()
  }, [router])

  // Helper function to get the correct fullscreen API for the browser
  const getFullscreenAPI = () => {
    const iframe = document.getElementById("game-iframe") as HTMLIFrameElement
    if (!iframe) return null

    if (iframe.requestFullscreen) {
      return {
        request: () => iframe.requestFullscreen(),
        exit: () => document.exitFullscreen(),
        change: 'fullscreenchange'
      }
    } else if ((iframe as any).webkitRequestFullscreen) {
      return {
        request: () => (iframe as any).webkitRequestFullscreen(),
        exit: () => (document as any).webkitExitFullscreen(),
        change: 'webkitfullscreenchange'
      }
    } else if ((iframe as any).mozRequestFullScreen) {
      return {
        request: () => (iframe as any).mozRequestFullScreen(),
        exit: () => (document as any).mozCancelFullScreen(),
        change: 'mozfullscreenchange'
      }
    } else if ((iframe as any).msRequestFullscreen) {
      return {
        request: () => (iframe as any).msRequestFullscreen(),
        exit: () => (document as any).msExitFullscreen(),
        change: 'MSFullscreenChange'
      }
    }
    return null
  }

  // Helper function to check if element is fullscreen
  const isElementFullscreen = () => {
    return !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    )
  }

  const toggleFullscreen = async () => {
    trackClick('fullscreen_toggle', 'game_page')
    
    const iframe = document.getElementById("game-iframe") as HTMLIFrameElement
    if (!iframe) return

    const fullscreenAPI = getFullscreenAPI()
    
    if (!fullscreenAPI) {
      // Fallback: try to open in new tab for mobile
      if (window.innerWidth <= 768) {
        trackEvent({
          event: 'game_open_new_tab',
          properties: { reason: 'fullscreen_not_supported', device: 'mobile' }
        })
        window.open('/game/index.html', '_blank')
        return
      }
      alert('Fullscreen not supported in this browser')
      return
    }

    try {
      if (!isElementFullscreen()) {
        await fullscreenAPI.request()
        setIsFullscreen(true)
        trackEvent({
          event: 'game_fullscreen_enter',
          properties: { success: true }
        })
      } else {
        await fullscreenAPI.exit()
        setIsFullscreen(false)
        trackEvent({
          event: 'game_fullscreen_exit',
          properties: { success: true }
        })
      }
    } catch (error) {
      console.error('Fullscreen error:', error)
      trackEvent({
        event: 'game_fullscreen_error',
        properties: { error: String(error) }
      })
      // Fallback for mobile: open in new tab
      if (window.innerWidth <= 768) {
        window.open('/game/index.html', '_blank')
      } else {
        alert('Fullscreen failed. Please try opening in a new tab.')
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(isElementFullscreen())
    }

    const fullscreenAPI = getFullscreenAPI()
    if (fullscreenAPI) {
      document.addEventListener(fullscreenAPI.change, handleFullscreenChange)
      return () => document.removeEventListener(fullscreenAPI.change, handleFullscreenChange)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-black/90 backdrop-blur-md border-b border-cyan-400/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to PSX
              </Button>
            </Link>
            <h1 className="text-xl font-mono font-bold text-cyan-400">PSX GAME PORTAL</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={toggleFullscreen}
              variant="outline"
              className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>

            <Link href="/game/index.html" target="_blank">
              <Button variant="outline" className="border-purple-400/30 text-purple-400 hover:bg-purple-400/10">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in New Tab
              </Button>
            </Link>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-400/30 text-red-400 hover:bg-red-400/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Game Container */}
      <main className="pt-20 h-screen">
        {isLoading && (
          <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-40">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-cyan-400 font-mono">Loading PSX Game...</p>
              <p className="text-cyan-400/60 text-sm mt-2">Initializing game engine...</p>
            </div>
          </div>
        )}

        <iframe
          id="game-iframe"
          src="/api/game?path=index.html"
          className="w-full h-full border-0"
          title="PSX Game"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          onLoad={() => {
            console.log('Game iframe loaded successfully');
            setIsLoading(false);
          }}
          style={{ height: "calc(100vh - 80px)" }}
          onError={(e) => {
            console.error('Iframe error:', e);
            // Fallback to direct path if API fails
            const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
            if (iframe) {
              iframe.src = '/game/index.html';
            } else {
              setIsLoading(false);
              alert('Failed to load the game. Please try again or contact support.');
            }
          }}
        />
      </main>
    </div>
  )
}
