"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { usePrivy } from "@privy-io/react-auth"
import { useAnalytics } from "@/hooks/useAnalytics"

export default function GameAuth() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { ready, authenticated, user, login, logout } = usePrivy()
  const { trackEvent, trackGameAccess } = useAnalytics()

  useEffect(() => {
    if (ready && authenticated && user) {
      // If wallet is connected and authenticated, create backend session
      handleWalletAuth()
    }
  }, [ready, authenticated, user, router])

  const handleWalletAuth = async () => {
    if (!user?.wallet?.address) return
    
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress: user.wallet.address }),
      })

      const data = await response.json()

      if (data.success) {
        // Track successful game access
        trackGameAccess()
        trackEvent({
          event: 'auth_success',
          properties: { method: 'wallet', wallet_address: user.wallet.address }
        })
        router.push("/game")
      } else {
        setError("Wallet authentication failed. Please try again.")
        trackEvent({
          event: 'auth_failed',
          properties: { method: 'wallet', error: 'backend_auth_failed' }
        })
      }
    } catch (error) {
      setError("Network error during wallet authentication.")
    }
  }

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        setError("")
        router.push("/game")
      } else {
        setError(data.error || "ACCESS DENIED. INCORRECT PROTOCOL KEY.")
      }
    } catch (error) {
      setError("NETWORK ERROR. PLEASE TRY AGAIN.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black py-12 text-white">
      <Link href="/">
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 mb-6">
          <ArrowRight className="h-4 w-4 rotate-180 mr-2" />
          Back to PSX HOMEPAGE
        </Button>
      </Link>
      <Card className="w-full max-w-md bg-black/70 border-red-500/30 backdrop-blur-xl shadow-red-500/20">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-red-400">PSX GAME PORTAL</CardTitle>
          <p className="text-red-300/80 text-sm mt-2">CLASSIFIED ACCESS REQUIRED</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 p-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-pink-600 text-white shadow-lg">
            <Lock className="h-10 w-10" />
          </div>
          <p className="text-center text-gray-300">Authenticate with your wallet or enter your protocol key to access the PSX Game Portal.</p>

          {/* Wallet Connect Section */}
          <div className="w-full flex flex-col items-center gap-2">
            <Button
              onClick={() => login()}
              disabled={!ready}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-lg py-4 font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/30 hover:from-cyan-700 hover:to-blue-700"
            >
              {!ready ? "Loading..." : "Connect Wallet"}
            </Button>
            <span className="text-gray-400 text-xs mt-1">Connect your wallet for instant access</span>
          </div>

          {/* Divider */}
          <div className="flex items-center w-full my-4">
            <div className="flex-grow border-t border-gray-700" />
            <span className="mx-2 text-gray-500 text-xs">OR</span>
            <div className="flex-grow border-t border-gray-700" />
          </div>

          {/* Password Login Section */}
          <Input
            type="password"
            placeholder="PROTOCOL KEY"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/50 border-red-500/50 text-white placeholder:text-red-300/70 focus:border-red-400"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleLogin()
              }
            }}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white text-lg py-6 font-bold uppercase tracking-wider shadow-lg shadow-red-500/30 hover:from-red-700 hover:to-pink-700"
          >
            <ArrowRight className="h-5 w-5 mr-2" />
            ACCESS PSX GAME PORTAL
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
