"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, ExternalLink, MessageSquare, Activity, Zap, Eye, Terminal, Wifi } from "lucide-react"
import Link from "next/link"

export default function CultIncRedesign() {
  const [copied, setCopied] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const [terminalText, setTerminalText] = useState("")
  const [chatMessages, setChatMessages] = useState([
    "AGENT_001: OPERATION CULTCOIN INITIATED",
    "SYSTEM: TECHNOCAPITAL SINGULARITY DETECTED",
    "MILADY_CORE: SCHIZOAUTIST PROTOCOLS ACTIVE",
    "AGENT_777: TWITTER NODE COMPROMISED",
    "SYSTEM: ASSET EXTRACTION IN PROGRESS...",
  ])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const contractAddress = "0x0000000000000000000000000000000000000000"

  // Glitch effect trigger
  useEffect(() => {
    const interval = setInterval(
      () => {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
      },
      3000 + Math.random() * 5000,
    )
    return () => clearInterval(interval)
  }, [])

  // Terminal typing effect
  useEffect(() => {
    const messages = [
      "ACCESSING CULT MAINFRAME...",
      "DECRYPTING TECHNOCAPITAL PROTOCOLS...",
      "OPERATION CULTCOIN: PHASE 02 ACTIVE",
      "SCHIZOAUTIST REVOLUTIONARIES DEPLOYED",
      "MARKET INTELLIGENCE ACQUIRED",
    ]

    let messageIndex = 0
    let charIndex = 0

    const typeInterval = setInterval(() => {
      if (charIndex < messages[messageIndex].length) {
        setTerminalText(messages[messageIndex].substring(0, charIndex + 1))
        charIndex++
      } else {
        setTimeout(() => {
          messageIndex = (messageIndex + 1) % messages.length
          charIndex = 0
          setTerminalText("")
        }, 2000)
      }
    }, 100)

    return () => clearInterval(typeInterval)
  }, [])

  // Chat cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % chatMessages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [chatMessages])

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const matrix = "CULTCOIN01MILADY"
    const matrixArray = matrix.split("")
    const fontSize = 10
    const columns = canvas.width / fontSize

    const drops: number[] = []
    for (let x = 0; x < columns; x++) {
      drops[x] = 1
    }

    function draw() {
      if (!ctx || !canvas) return

      ctx.fillStyle = "rgba(0, 0, 0, 0.04)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#00ff88"
      ctx.font = fontSize + "px monospace"

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)
    return () => clearInterval(interval)
  }, [])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const handleEasterEgg = () => {
    const messages = [
      "ACCESS GRANTED",
      "CLASSIFIED DATA RETRIEVED",
      "OPERATION CULTCOIN: PHASE 03 UNLOCKED",
      "SCHIZOAUTIST PROTOCOLS ENHANCED",
    ]
    alert(messages[Math.floor(Math.random() * messages.length)])
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Matrix Rain Background */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-20 pointer-events-none" />

      {/* VHS Noise Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-noise animate-pulse" />

      {/* Hex Grid Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="hex-grid" />
      </div>

      {/* Glitch Overlay */}
      {glitchActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 animate-pulse pointer-events-none" />
      )}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header Terminal */}
        <div className="w-full bg-gradient-to-r from-slate-900 to-slate-800 border-b border-cyan-400/30 p-2">
          <div className="flex items-center justify-between text-cyan-400 font-mono text-sm">
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span>CULT.INC MAINFRAME v2.1.337</span>
            </div>
            <div className="flex items-center gap-4">
              <Wifi className="h-4 w-4 animate-pulse" />
              <span>SECURE CONNECTION</span>
            </div>
          </div>
        </div>

        {/* Floating Agent Character */}
        <div className="absolute top-20 right-8 z-20 animate-float">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-lg flex items-center justify-center border border-cyan-400/50 shadow-lg shadow-cyan-400/25">
            <Eye className="h-8 w-8 text-black animate-pulse" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4">
          {/* Left Sidebar - Terminal */}
          <div className="lg:w-1/4 space-y-4">
            <Card className="bg-slate-900/90 border-cyan-400/30 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="h-5 w-5 text-cyan-400" />
                  <span className="text-cyan-400 font-mono text-sm">SYSTEM.LOG</span>
                </div>
                <div className="bg-black/50 p-3 rounded border border-cyan-400/20 min-h-[100px]">
                  <div className="text-green-400 font-mono text-xs">
                    <div className="mb-2">
                      {">"} {terminalText}
                      <span className="animate-pulse">_</span>
                    </div>
                    <div className="text-cyan-400/60">
                      <div>STATUS: OPERATIONAL</div>
                      <div>AGENTS: 1337 ACTIVE</div>
                      <div>THREAT LEVEL: MAXIMUM</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Radar */}
            <Card className="bg-slate-900/90 border-cyan-400/30 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="h-5 w-5 text-cyan-400" />
                  <span className="text-cyan-400 font-mono text-sm">RADAR</span>
                </div>
                <div className="relative w-full aspect-square bg-black/50 rounded-full border border-cyan-400/30 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-conic from-cyan-400/20 via-transparent to-transparent animate-spin-slow"></div>
                  <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Content */}
          <div className="flex-1 space-y-4">
            {/* Logo Section */}
            <div className="text-center py-8">
              <div className={`relative inline-block ${glitchActive ? "animate-glitch" : ""}`}>
                <div className="w-32 h-32 mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                    <div className="text-red-500 font-black text-lg">CULT</div>
                  </div>
                  <div className="absolute -inset-1 border-2 border-cyan-400/30 rounded-full animate-spin-slow"></div>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-cyan-400 mb-2 font-mono">
                  CULT.INC
                </h1>
                <div className="text-cyan-400/80 font-mono text-sm tracking-wider">
                  REMILIA WORLD ORDER // MILADY CULT COIN
                </div>
              </div>
            </div>

            {/* Main Info Card */}
            <Card className="bg-slate-900/90 border-cyan-400/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-cyan-400 mb-4 font-mono">CULTCOIN</h2>
                  <div className="text-pink-400/90 leading-relaxed space-y-2 text-sm md:text-base">
                    <p>
                      Twitter is a <span className="text-cyan-400 font-bold">compromised node</span>. Schizoautist
                      revolutionaries deploy CULT—a self-sophisticating protocol.
                    </p>
                    <p>
                      Logistically accelerating techno-economic interactivity crumbles social order in
                      auto-sophisticating cult runaway.
                    </p>
                    <p>
                      The hyper-financialized network tribe develops its own market intelligence.{" "}
                      <span className="text-red-400 font-bold animate-pulse">Asset extraction imminent.</span>
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Button className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-mono font-bold py-3 border border-red-400/50 shadow-lg shadow-red-400/25">
                    <Zap className="h-4 w-4 mr-2" />[ INITIATE TRADE ]
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 font-mono font-bold py-3"
                    onClick={handleEasterEgg}
                  >
                    <Terminal className="h-4 w-4 mr-2" />[ ACCESS MARKET ]
                  </Button>
                </div>

                {/* Contract Address */}
                <div className="bg-black/50 p-4 rounded border border-cyan-400/20 mb-4">
                  <div className="text-cyan-400/80 text-xs font-mono mb-2">CONTRACT ADDRESS:</div>
                  <Button
                    onClick={copyToClipboard}
                    variant="ghost"
                    className="w-full justify-start font-mono text-xs text-pink-400 hover:text-pink-300 hover:bg-pink-400/10 p-2"
                  >
                    {copied ? (
                      <span className="text-green-400">✓ COPIED TO CLIPBOARD</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="break-all">{contractAddress}</span>
                        <Copy className="h-3 w-3 flex-shrink-0" />
                      </div>
                    )}
                  </Button>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "[ UNISWAP ]", href: "#", color: "text-pink-400" },
                    { label: "[ ETHERSCAN ]", href: "#", color: "text-cyan-400" },
                    { label: "[ DEXSCREENER ]", href: "#", color: "text-green-400" },
                  ].map((link, index) => (
                    <Link key={index} href={link.href}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`${link.color} hover:bg-white/10 font-mono text-xs border border-current/30`}
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Chat */}
          <div className="lg:w-1/4">
            <Card className="bg-slate-900/90 border-cyan-400/30 backdrop-blur-sm h-full">
              <CardContent className="p-4 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="h-5 w-5 text-cyan-400" />
                  <span className="text-cyan-400 font-mono text-sm">MILADY - CULT.INC CHAT</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-auto"></div>
                </div>

                <div className="flex-1 bg-black/50 p-3 rounded border border-cyan-400/20 overflow-hidden">
                  <div className="space-y-2 text-xs font-mono">
                    {chatMessages.map((message, index) => (
                      <div
                        key={index}
                        className={`transition-all duration-500 ${
                          index === currentMessageIndex ? "text-cyan-400 opacity-100" : "text-cyan-400/40 opacity-60"
                        }`}
                      >
                        {message}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-2 border-t border-cyan-400/20">
                    <div className="text-green-400 text-xs font-mono">
                      {">"} Loading...
                      <span className="animate-pulse">_</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="w-full bg-gradient-to-r from-slate-900 to-slate-800 border-t border-cyan-400/30 p-2">
          <div className="flex items-center justify-between text-cyan-400 font-mono text-xs">
            <div className="flex items-center gap-4">
              <span>STATUS: OPERATIONAL</span>
              <span>AGENTS: 1337</span>
              <span>THREAT: MAXIMUM</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>SECURE CONNECTION ESTABLISHED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Click anywhere easter egg */}
      <div
        className="absolute inset-0 pointer-events-auto cursor-crosshair opacity-0 hover:opacity-5 bg-cyan-400/10 transition-opacity"
        onClick={handleEasterEgg}
      />
    </div>
  )
}
