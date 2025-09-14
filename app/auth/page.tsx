"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, EyeOff, Lock, AlertTriangle, CheckCircle, Wifi, Activity } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AuthPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockoutTime, setLockoutTime] = useState(0)
  const [scanlinePosition, setScanlinePosition] = useState(0)
  const router = useRouter()

  // Animated scanline effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScanlinePosition((prev) => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Lockout timer
  useEffect(() => {
    if (isLocked && lockoutTime > 0) {
      const timer = setTimeout(() => {
        setLockoutTime(lockoutTime - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (isLocked && lockoutTime === 0) {
      setIsLocked(false)
      setAttempts(0)
    }
  }, [isLocked, lockoutTime])

  const handleAuthentication = async () => {
    if (isLocked) return

    setIsLoading(true)

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (username.toUpperCase() === "AGENT" && password === "PSX2024CLASSIFIED") {
      // Success
      sessionStorage.setItem("psx-auth", "authenticated")
      router.push("/game-portal")
    } else {
      // Failed attempt
      const newAttempts = attempts + 1
      setAttempts(newAttempts)

      if (newAttempts >= 3) {
        setIsLocked(true)
        setLockoutTime(30) // 30 second lockout
      }
    }

    setIsLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLocked && username && password) {
      handleAuthentication()
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.03)_1px,transparent_1px)] bg-[length:40px_40px]" />

        {/* Animated scanline */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/20 to-transparent h-2 transition-all duration-75"
          style={{ top: `${scanlinePosition}%` }}
        />

        {/* Glowing dots */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-500 rounded-full animate-ping" />
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
      </div>

      {/* PSX Character Images */}
      <Image
        src="/images/psx-character-main.png"
        alt="PSX Agent"
        width={300}
        height={300}
        className="absolute top-20 right-10 opacity-20 animate-float z-0 hidden lg:block"
      />

      <Image
        src="/images/psx-glitch-face.png"
        alt="PSX Glitch"
        width={150}
        height={150}
        className="absolute bottom-20 left-10 opacity-30 animate-glitch z-0 hidden md:block"
      />

      <Image
        src="/images/psx-logo-character.png"
        alt="PSX Logo"
        width={200}
        height={200}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 opacity-10 animate-spin-slow z-0 hidden xl:block"
      />

      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 text-xs font-mono text-red-400">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: "0.2s" }} />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
          <span className="hidden sm:block opacity-80">PSX.SECURITY // AUTHENTICATION TERMINAL v3.7.1</span>
          <span className="sm:hidden opacity-80">PSX.SECURITY</span>
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1 opacity-70">
              <Wifi className="h-3 w-3 animate-pulse" /> ENCRYPTED
            </span>
            <span className="flex items-center gap-1 text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" /> SECURE
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center px-4 pt-20 relative z-10">
        <div className="w-full max-w-md">
          {/* Security Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-black/80 border border-red-500/30 rounded-full backdrop-blur-sm">
              <Shield className="h-6 w-6 text-red-400" />
              <span className="text-red-400 font-mono font-bold">CLEARANCE LEVEL: TOP SECRET</span>
            </div>
          </div>

          <Card className="bg-black/80 border-red-500/30 backdrop-blur-sm shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Lock className="h-8 w-8 text-red-400" />
                <div>
                  <CardTitle className="text-2xl font-mono font-bold text-white">PSX GAME PORTAL</CardTitle>
                  <Badge className="mt-2 bg-red-600/20 text-red-400 border-red-500/30">BETA ACCESS</Badge>
                </div>
              </div>
              <p className="text-gray-400 text-sm font-mono">Restricted access. Agent credentials required.</p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Status Indicators */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                  <Activity className="h-5 w-5 text-green-400 mx-auto mb-1" />
                  <div className="text-xs text-green-400 font-mono">SYSTEM ONLINE</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                  <Shield className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                  <div className="text-xs text-blue-400 font-mono">SECURE CHANNEL</div>
                </div>
              </div>

              {/* Login Form */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block font-mono">AGENT ID</label>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter agent identifier..."
                    className="bg-gray-900 border-gray-600 text-white font-mono"
                    disabled={isLocked}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block font-mono">SECURITY CODE</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter classified code..."
                      className="bg-gray-900 border-gray-600 text-white pr-10 font-mono"
                      disabled={isLocked}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      disabled={isLocked}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Hints */}
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <h4 className="text-white font-semibold mb-2 text-sm font-mono">AUTHENTICATION HINTS:</h4>
                  <ul className="text-xs text-gray-400 space-y-1 font-mono">
                    <li>• Agent ID: Standard operative designation</li>
                    <li>• Security Code: PSX + Year + Classification</li>
                    <li>• All credentials are case-sensitive</li>
                  </ul>
                </div>

                {/* Error/Status Messages */}
                {attempts > 0 && !isLocked && (
                  <div className="flex items-center gap-2 text-yellow-400 text-sm font-mono">
                    <AlertTriangle className="h-4 w-4" />
                    Access denied. Attempts: {attempts}/3
                  </div>
                )}

                {isLocked && (
                  <div className="flex items-center gap-2 text-red-400 text-sm font-mono">
                    <Lock className="h-4 w-4" />
                    Security lockout active. Retry in {lockoutTime}s
                  </div>
                )}

                {/* Authentication Button */}
                <Button
                  onClick={handleAuthentication}
                  disabled={isLocked || !username || !password || isLoading}
                  className="w-full bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:from-red-700 hover:via-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl border border-red-500/30 font-mono"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      VERIFYING CREDENTIALS...
                    </div>
                  ) : isLocked ? (
                    "🔒 SYSTEM LOCKED"
                  ) : (
                    "🔓 INITIATE AUTHENTICATION"
                  )}
                </Button>
              </div>

              {/* Beta Info */}
              <div className="border-t border-gray-700 pt-6">
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <h4 className="text-blue-400 font-semibold font-mono">BETA ACCESS FEATURES</h4>
                  </div>
                  <ul className="text-sm text-blue-300 space-y-1 font-mono">
                    <li>• Exclusive PSX-themed casino games</li>
                    <li>• Real-time multiplayer tournaments</li>
                    <li>• Advanced agent leaderboards</li>
                    <li>• Classified mission rewards</li>
                  </ul>
                </div>
              </div>

              {/* Back Link */}
              <div className="text-center pt-4">
                <Link href="/" className="text-gray-400 hover:text-white text-sm font-mono transition">
                  ← Return to PSX Mainframe
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional PSX Characters */}
      <Image
        src="/images/psx-glitch-body.png"
        alt="PSX Glitch Body"
        width={180}
        height={180}
        className="absolute bottom-10 right-20 opacity-20 animate-glitch z-0 hidden lg:block"
      />
    </div>
  )
}
