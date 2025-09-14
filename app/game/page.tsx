"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAnalytics } from "@/hooks/useAnalytics"
import Head from "next/head"

export default function GamePage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { trackEvent } = useAnalytics()

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

  // Handle fullscreen toggle for the iframe
  const toggleFullscreen = async () => {
    const iframe = document.getElementById("game-iframe") as HTMLIFrameElement;
    if (!iframe) return;

    try {
      if (!document.fullscreenElement) {
        await iframe.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
      // Fallback to opening in new tab
      window.open('/game', '_blank');
    }
  };

  return (
    <>
      <Head>
        <title>PSX Game Portal</title>
        <meta name="description" content="Play PSX games in your browser" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Cross-Origin-Embedder-Policy" content="require-corp" />
        <meta httpEquiv="Cross-Origin-Opener-Policy" content="same-origin" />
      </Head>
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
                <ExternalLink className="h-4 w-4 mr-2" />
                Fullscreen
              </Button>

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
            src="/game/index.html"
            className="w-full h-full border-0"
            title="PSX Game"
            allowFullScreen
            allow="gamepad; fullscreen; microphone; camera; midi; geolocation; payment"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
            onLoad={() => {
              console.log('Game iframe loaded successfully');
              setIsLoading(false);
            }}
            style={{ height: "calc(100vh - 80px)" }}
            onError={(e) => {
              console.error('Iframe error:', e);
              // Fallback to direct path if the route fails
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
    </>
  )
}
