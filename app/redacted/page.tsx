"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, Shield, Lock, AlertTriangle, ArrowLeft } from "lucide-react"

export default function RedactedPage() {
  const [isDecrypting, setIsDecrypting] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [glitchText, setGlitchText] = useState("ACCESSING...")

  const glitchTexts = ["ACCESSING...", "DECRYPTING...", "AUTHENTICATING...", "LOADING..."]

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchText(glitchTexts[Math.floor(Math.random() * glitchTexts.length)])
    }, 200)

    const timer = setTimeout(() => {
      setIsDecrypting(false)
      setShowContent(true)
      clearInterval(glitchInterval)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearInterval(glitchInterval)
    }
  }, [])

  if (isDecrypting) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Matrix-style background */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 font-mono text-xs animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {Math.random().toString(36).substring(7)}
            </div>
          ))}
        </div>

        <div className="text-center z-10">
          <div className="text-red-500 text-6xl font-mono font-bold mb-8 animate-pulse">[CLASSIFIED]</div>
          <div className="text-green-400 text-2xl font-mono animate-glitch">{glitchText}</div>
          <div className="mt-4 flex justify-center">
            <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-green-400 animate-pulse" style={{ width: "100%" }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Scanlines effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/5 to-transparent animate-pulse" />
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="absolute w-full h-px bg-green-400/20" style={{ top: `${i * 5}%` }} />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Shield className="h-12 w-12 text-red-500 animate-pulse" />
            <div className="text-4xl font-bold text-red-500">[REDACTED]</div>
            <Shield className="h-12 w-12 text-red-500 animate-pulse" />
          </div>

          <div className="text-sm text-gray-400 mb-4">CLASSIFICATION LEVEL: TOP SECRET // EYES ONLY</div>

          <div className="text-xs text-gray-500">AUTHORIZED PERSONNEL ONLY - UNAUTHORIZED ACCESS IS PROHIBITED</div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <Card className="bg-black/80 border-green-400/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="h-6 w-6 text-yellow-400 animate-pulse" />
                <h2 className="text-xl font-bold text-yellow-400">OPERATION STATUS</h2>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Mission Codename:</span>
                  <span className="text-green-400">PROJECT GLIZZY</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Deployment Status:</span>
                  <span className="text-green-400">ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Network:</span>
                  <span className="text-green-400">BASE MAINNET</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Security Level:</span>
                  <span className="text-red-400">MAXIMUM</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-green-400/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="h-6 w-6 text-green-400" />
                <h2 className="text-xl font-bold text-green-400">MISSION BRIEFING</h2>
              </div>

              <div className="space-y-4 text-sm text-gray-300">
                <p>
                  The requested intelligence has been <span className="text-red-400 font-bold">[REDACTED]</span>
                  by order of the PSX Operations Command.
                </p>

                <p>
                  All documentation regarding <span className="text-red-400 font-bold">[CLASSIFIED]</span>
                  activities has been transferred to secure channels.
                </p>

                <p>
                  For authorized access to operational data, personnel must return to the main terminal and follow
                  proper authentication protocols.
                </p>

                <div className="mt-6 p-4 bg-red-900/20 border border-red-400/30 rounded">
                  <div className="flex items-center gap-2 text-red-400 font-bold mb-2">
                    <Eye className="h-4 w-4" />
                    SECURITY NOTICE
                  </div>
                  <p className="text-xs text-red-300">
                    This session is being monitored. All access attempts are logged and reviewed by PSX Security
                    Division.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-green-400/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <EyeOff className="h-6 w-6 text-cyan-400" />
                <h2 className="text-xl font-bold text-cyan-400">AVAILABLE ACTIONS</h2>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-gray-400 mb-4">Select your next course of action:</div>

                <Link href="/">
                  <Button className="w-full bg-green-900/50 hover:bg-green-800/50 border border-green-400/50 text-green-400 font-mono text-left justify-start">
                    <ArrowLeft className="h-4 w-4 mr-3" />
                    [01] RETURN TO MAIN TERMINAL
                  </Button>
                </Link>

                <Button
                  disabled
                  className="w-full bg-red-900/20 border border-red-400/30 text-red-400/50 font-mono text-left justify-start cursor-not-allowed"
                >
                  <Lock className="h-4 w-4 mr-3" />
                  [02] ACCESS CLASSIFIED FILES - REQUIRES CLEARANCE
                </Button>

                <Button
                  disabled
                  className="w-full bg-yellow-900/20 border border-yellow-400/30 text-yellow-400/50 font-mono text-left justify-start cursor-not-allowed"
                >
                  <Shield className="h-4 w-4 mr-3" />
                  [03] CONTACT OPERATIONS COMMAND - OFFLINE
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-xs text-gray-500">
          <div className="mb-2">PSX.AGENCY // CLASSIFIED OPERATIONS DIVISION</div>
          <div>"PRECISION. STEALTH. EXECUTION."</div>
        </div>
      </div>
    </div>
  )
}
