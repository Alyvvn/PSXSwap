"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, AlertTriangle, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface PSXGameAuthProps {
  isOpen: boolean
  onClose: () => void
}

export function PSXGameAuth({ isOpen, onClose }: PSXGameAuthProps) {
  const [portalKey, setPortalKey] = useState("")
  const [showKey, setShowKey] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleAuthentication = async () => {
    setIsLoading(true)
    setError("")

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (portalKey === "PSX2024CLASSIFIED") {
      // Success
      sessionStorage.setItem("psx-auth", "authenticated")
      onClose()
      router.push("/game-portal")
    } else {
      // Failed attempt
      setAttempts((prev) => prev + 1)
      setError("Invalid PSX Portal Key. Access denied.")

      if (attempts >= 2) {
        setError("Too many failed attempts. Portal locked for 30 seconds.")
        setTimeout(() => {
          setAttempts(0)
          setError("")
        }, 30000)
      }
    }

    setIsLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && portalKey && !isLoading && attempts < 3) {
      handleAuthentication()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/95 border-cyan-400/30 backdrop-blur-xl max-w-md">
        {/* Background PSX Characters */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <Image
            src="/images/psx-character-main.png"
            alt="PSX Character"
            width={200}
            height={200}
            className="absolute top-0 right-0 animate-float"
          />
          <Image
            src="/images/psx-logo-character.png"
            alt="PSX Logo"
            width={150}
            height={150}
            className="absolute bottom-0 left-0 animate-spin-slow"
          />
        </div>

        <DialogHeader className="text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-cyan-400 animate-pulse" />
            <DialogTitle className="text-2xl font-mono text-white">PSX GAME PORTAL</DialogTitle>
          </div>
          <Badge className="bg-cyan-600/20 text-cyan-400 border-cyan-500/30 mx-auto">
            🔐 CLASSIFIED ACCESS REQUIRED
          </Badge>
        </DialogHeader>

        <div className="space-y-6 relative z-10">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 flex items-center justify-center">
              <Lock className="h-10 w-10 text-cyan-400" />
            </div>
            <p className="text-cyan-300/80 font-mono text-sm">Enter your PSX Portal Key to access exclusive games</p>
          </div>

          <div>
            <label className="text-sm font-medium text-cyan-300 mb-3 block font-mono">🔑 PSX PORTAL KEY</label>
            <div className="relative">
              <Input
                type={showKey ? "text" : "password"}
                value={portalKey}
                onChange={(e) => setPortalKey(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your portal access key..."
                className="bg-gray-900/80 border-cyan-400/30 text-white pr-12 font-mono text-center tracking-wider"
                disabled={attempts >= 3}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400/70 hover:text-cyan-400"
                disabled={attempts >= 3}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm font-mono bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {attempts > 0 && attempts < 3 && (
            <div className="text-yellow-400 text-sm font-mono text-center">⚠️ Failed attempts: {attempts}/3</div>
          )}

          <div className="space-y-3">
            <Button
              onClick={handleAuthentication}
              disabled={!portalKey || isLoading || attempts >= 3}
              className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 font-mono text-lg py-3"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  VERIFYING ACCESS...
                </div>
              ) : attempts >= 3 ? (
                "🔒 PORTAL LOCKED"
              ) : (
                "🚀 ENTER GAME PORTAL"
              )}
            </Button>

            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 font-mono"
              disabled={isLoading}
            >
              Cancel Mission
            </Button>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-4 text-xs text-gray-400 font-mono border border-gray-700/50">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-cyan-400">INTEL BRIEFING</span>
            </div>
            <p>Portal Key Format: PSX + Year + Classification Level</p>
            <p className="mt-1 opacity-70">Contact HQ if you need access credentials</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
