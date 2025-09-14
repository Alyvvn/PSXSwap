"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Copy,
  ExternalLink,
  Twitter,
  MessageCircle,
  BarChart3,
  DiscIcon as Discord,
  Menu,
  X,
  Wifi,
  Zap,
  TrendingUp,
  Shield,
  Activity,
  Target,
  RefreshCw,
  ChevronDown,
  Flame,
  Gamepad2,
  Instagram,
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useTokenData } from "@/hooks/use-token-data"

// In your main page file
const SwapWidget = dynamic(() => import("@/components/swap-widget"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-md p-8 text-center text-cyan-400 rounded-xl bg-black/50 border border-cyan-400/20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-4"></div>
      Loading trading terminal...
    </div>
  ),
})

const intelReports = [
  {
    id: "INTEL-001",
    timestamp: "2024-12-17 14:23:07",
    classification: "TOP SECRET",
    title: "Operation Glizzy World Deployment",
    content: "Casino infrastructure successfully deployed on Base network. Agent recruitment protocols active.",
    status: "COMPLETED",
    priority: "HIGH",
  },
]

// Enhanced meme images from meme-backgrounds folder - only existing ones
const memeImages = [
  "/images/psx-meme.png",
  "/images/psx-character-main.png",
  "/images/psx-graffiti.png",
  "/images/psx-please-stop-xisting.png",
  "/images/meme-backgrounds/psx_1.png",
  "/images/meme-backgrounds/psx_2.png",
  "/images/meme-backgrounds/psx_3.png",
  "/images/meme-backgrounds/psx_4.png",
  "/images/meme-backgrounds/psx_8.png",
  "/images/meme-backgrounds/psx_9.png",
]

export default function PSXLanding() {
  const [copied, setCopied] = useState(false)
  const [activeNav, setActiveNav] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentIntel, setCurrentIntel] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [showSwapWidget, setShowSwapWidget] = useState(false)
  
  // FOMO numbers that are generated once on page load
  const [fomoPeople, setFomoPeople] = useState(0)
  const [fomoMinutes, setFomoMinutes] = useState(0)

  // Use the token data hook
  const tokenData = useTokenData()

  const homeRef = useRef<HTMLDivElement>(null)
  const swapRef = useRef<HTMLDivElement>(null)
  const tokenomicsRef = useRef<HTMLDivElement>(null)

  const contractAddress = "0x4444489570Afd4261d616df00DE1668dAd5F8ceE"
  const displayAddress = contractAddress

  const navItems = [
    { id: "home", label: "Home", ref: homeRef },
    { id: "game", label: "Play Game", href: "/game-auth" },
    { id: "buy-psx", label: "Buy PSX", ref: swapRef },
    { id: "tokenomics", label: "Tokenomics", ref: tokenomicsRef },
    { id: "roadmap", label: "Roadmap", href: "/roadmap" },
    { id: "meme-forge", label: "Meme Forge", href: "/meme-generator" },
    { id: "pfp-maker", label: "PFP Maker", href: "/redacted", beta: true },
  ]

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setCurrentIntel((p) => (p + 1) % intelReports.length), 5000)
    return () => clearInterval(id)
  }, [])

  // Generate FOMO numbers once on page load
  useEffect(() => {
    setFomoPeople(Math.floor(Math.random() * 15) + 1)
    setFomoMinutes(Math.floor(Math.random() * 10) + 1)
  }, [])

  // Delay swap widget rendering to prevent scroll jump

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Clipboard copy failed", err)
    }
  }

  const scrollToSection = (section: React.RefObject<HTMLDivElement>) => {
    section.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleNavClick = (item: any) => {
    if (item.ref) {
      scrollToSection(item.ref)
    }
    setActiveNav(item.id)
  }

  const scrollToAcquire = () => {
    swapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  // Generate responsive meme scatter positions
  const generateMemeScatter = () => {
    const positions = []
    const memeCount = 30 // Increased for better coverage

    for (let i = 0; i < memeCount; i++) {
      // Create scattered positions avoiding center area
      const angle = (i / memeCount) * Math.PI * 2
      const distance = Math.random() * 0.45 + 0.25 // Distance from center
      const x = 50 + Math.cos(angle) * distance * 50
      const y = 50 + Math.sin(angle) * distance * 50

      // Ensure memes don't overlap center content area
      const centerBuffer = 20 // Reduced buffer
      const adjustedX = x < 50 - centerBuffer ? x : x > 50 + centerBuffer ? x : x + centerBuffer
      const adjustedY = y < 50 - centerBuffer ? y : y > 50 + centerBuffer ? y : y + centerBuffer

      positions.push({
        id: i,
        x: Math.max(2, Math.min(98, adjustedX)), // Keep within bounds
        y: Math.max(2, Math.min(98, adjustedY)),
        image: memeImages[Math.floor(Math.random() * memeImages.length)],
        size: Math.random() * 80 + 60, // 60-140px - increased size
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.5 + 0.3, // 0.3-0.8 - increased opacity
        delay: Math.random() * 3,
        scale: Math.random() * 0.4 + 0.8, // 0.8-1.2
      })
    }
    return positions
  }

  const memeScatterPositions = generateMemeScatter()

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Header/Terminal bar */}
      <header className="fixed top-0 inset-x-0 z-50 bg-black/90 backdrop-blur-md border-b border-cyan-400/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 text-xs font-mono text-cyan-400">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: "0.2s" }} />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
          <span className="hidden sm:block opacity-80">PSX.AGENCY // MAINFRAME v2.1.337</span>
          <span className="sm:hidden opacity-80">PSX.AGENCY</span>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden sm:flex items-center gap-1 opacity-70">
              <Wifi className="h-3 w-3 animate-pulse" /> SECURE
            </span>
            <span className="flex items-center gap-1 text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> ONLINE
            </span>
          </div>
        </div>
      </header>

      {/* Navigation - Responsive */}
      <nav className="fixed top-12 left-1/2 -translate-x-1/2 z-40 w-full max-w-6xl px-4">
        <div
          className="bg-black/60 backdrop-blur-md border border-cyan-400/20 rounded-full shadow-2xl shadow-cyan-400/10 transition-all duration-700"
          style={{
            transform: `translateY(${Math.min(scrollY * 0.05, 10)}px)`,
            opacity: Math.max(0.9, 1 - scrollY * 0.0005),
          }}
        >
          {/* Desktop nav */}
          <div className="hidden lg:flex items-center justify-center px-6 xl:px-8 py-2">
            <div className="flex gap-1 xl:gap-2">
              {navItems.map((n) => (
                <div key={n.id}>
                  {n.href ? (
                    <Link href={n.href} passHref>
                      <Button
                        onClick={() => setActiveNav(n.id)}
                        className={`relative px-4 xl:px-6 py-3 rounded-full text-sm font-mono transition-all ${
                          activeNav === n.id
                            ? "bg-cyan-400/25 text-cyan-100 shadow-lg shadow-cyan-400/25"
                            : "text-cyan-400/90 hover:bg-cyan-400/15 hover:text-cyan-100"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {n.label}
                          {n.beta && (
                            <span className="px-1.5 py-0.5 text-xs bg-orange-500/20 text-orange-400 border border-orange-400/30 rounded-md font-bold">
                              BETA
                            </span>
                          )}
                        </span>
                        {activeNav === n.id && (
                          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 animate-pulse" />
                        )}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      onClick={() => handleNavClick(n)}
                      className={`relative px-4 xl:px-6 py-3 rounded-full text-sm font-mono transition-all ${
                        activeNav === n.id
                          ? "bg-cyan-400/25 text-cyan-100 shadow-lg shadow-cyan-400/25"
                          : "text-cyan-400/90 hover:bg-cyan-400/15 hover:text-cyan-100"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {n.label}
                        {n.beta && (
                          <span className="px-1.5 py-0.5 text-xs bg-orange-500/20 text-orange-400 border border-orange-400/30 rounded-md font-bold">
                            BETA
                          </span>
                        )}
                      </span>
                      {activeNav === n.id && (
                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 animate-pulse" />
                      )}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile nav button */}
          <div className="lg:hidden flex items-center justify-between px-6 py-2">
            <span className="text-xl font-mono font-bold text-cyan-400">PSX</span>
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="p-3 text-cyan-400 hover:bg-cyan-400/15 rounded-full transition"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-black/85 border border-cyan-400/30 rounded-2xl backdrop-blur-3xl p-4 space-y-4">
            {navItems.map((n) => (
              <div key={n.id}>
                {n.href ? (
                  <Link href={n.href} passHref>
                    <Button
                      onClick={() => {
                        setActiveNav(n.id)
                        setMobileMenuOpen(false)
                      }}
                      className={`w-full text-left px-6 py-4 rounded-xl text-sm font-mono transition ${
                        activeNav === n.id
                          ? "bg-cyan-400/25 text-cyan-100 border border-cyan-400/40"
                          : "text-cyan-400/90 hover:bg-cyan-400/15 hover:text-cyan-100"
                      }`}
                    >
                      <span className="flex items-center justify-between w-full">
                        {n.label}
                        {n.beta && (
                          <span className="px-1.5 py-0.5 text-xs bg-orange-500/20 text-orange-400 border border-orange-400/30 rounded-md font-bold">
                            BETA
                          </span>
                        )}
                      </span>
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={() => {
                      handleNavClick(n)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full text-left px-6 py-4 rounded-xl text-sm font-mono transition ${
                      activeNav === n.id
                        ? "bg-cyan-400/25 text-cyan-100 border border-cyan-400/40"
                        : "text-cyan-400/90 hover:bg-cyan-400/15 hover:text-cyan-100"
                    }`}
                  >
                    <span className="flex items-center justify-between w-full">
                      {n.label}
                      {n.beta && (
                        <span className="px-1.5 py-0.5 text-xs bg-orange-500/20 text-orange-400 border border-orange-400/30 rounded-md font-bold">
                          BETA
                        </span>
                      )}
                    </span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* Hero section with enhanced meme scatter background */}
      <section
        ref={homeRef}
        className="min-h-screen flex flex-col justify-center items-center pt-32 pb-24 px-4 text-center relative overflow-hidden"
      >
        {/* Responsive Meme Scatter Background */}
        <div className="absolute inset-0 z-0">
          {memeScatterPositions.map((meme) => (
            <div
              key={meme.id}
              className="absolute animate-float"
              style={{
                left: `${meme.x}%`,
                top: `${meme.y}%`,
                transform: `rotate(${meme.rotation}deg) scale(${meme.scale})`,
                animationDelay: `${meme.delay}s`,
              }}
            >
              <Image
                src={meme.image || "/placeholder.svg"}
                alt="PSX Meme"
                width={meme.size}
                height={meme.size}
                className="object-cover rounded-lg transition-all duration-300 border border-cyan-400/10"
                style={{
                  opacity: meme.opacity,
                  maxWidth: "100%",
                  height: "auto",
                }}
                onError={(e) => {
                  console.log(`Failed to load image: ${meme.image}`)
                  e.currentTarget.style.display = "none"
                }}
              />
            </div>
          ))}
        </div>

        {/* Enhanced responsive overlay system */}
        <div className="absolute inset-0 z-5">
          {/* Base dark overlay - reduced opacity */}
          <div className="absolute inset-0 bg-black/50" />
          {/* Responsive radial gradient overlay - reduced opacity */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black/70" />
          {/* Directional gradients - reduced opacity */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
          {/* Center focus overlay - reduced opacity */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.4)_70%)]" />
        </div>

        {/* Smooth transition overlay to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 z-10 bg-gradient-to-t from-black via-black/95 to-transparent" />

        {/* PSX Logo Character as accent - responsive */}
        <Image
          src="/images/psx-logo-character.png"
          alt="PSX Logo with Character"
          width={400}
          height={400}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 animate-spin-slow z-8 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[400px] xl:h-[400px]"
        />

        {/* Main content - fully responsive and centered */}
        <div className="relative z-20 w-full max-w-6xl mx-auto">
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-600 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
            PSX
          </h1>
          <p className="mt-4 sm:mt-6 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-mono text-cyan-300 drop-shadow-lg">
            PLEASE STOP XISTING.
          </p>
          <p className="mt-2 text-xs sm:text-sm md:text-base font-mono text-cyan-400/70 uppercase tracking-wider drop-shadow-lg px-4">
            PRECISION. STEALTH. EXECUTION. // Base Network Protocol
          </p>

          {/* Contract address - responsive and centered */}
          <div className="mt-12 sm:mt-16 flex justify-center px-4">
            <div className="bg-gradient-to-r from-black via-cyan-900 to-blue-900 border border-cyan-400/60 rounded-3xl p-1.5 backdrop-blur-sm shadow-2xl">
              <Button
                onClick={copyToClipboard}
                className={`bg-gradient-to-r from-black via-cyan-900 to-blue-900 border border-cyan-400/60 text-cyan-200 font-mono transition-all duration-300 transform hover:scale-105 hover:brightness-125 hover:shadow-[0_0_32px_8px_rgba(34,211,238,0.25)] focus:ring-4 focus:ring-cyan-400/40 min-w-[280px] sm:min-w-[360px] px-6 py-3 rounded-2xl text-xs sm:text-sm`}
              >
                {copied ? (
                  <span className="text-green-400 font-bold">✓ COPIED TO CLIPBOARD</span>
                ) : (
                  <span className="flex items-center gap-2 sm:gap-3 text-cyan-300">
                    <span className="text-xs sm:text-sm opacity-70 font-bold">CA:</span>
                    <span className="tracking-tight font-mono text-xs sm:text-sm">
                      {displayAddress.slice(0, 8)}...{displayAddress.slice(-8)}
                    </span>
                    <Copy className="h-3 w-3 sm:h-4 sm:w-4 opacity-70 transition-transform group-hover:scale-110" />
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Triple CTAs - Enhanced gradients and effects */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
            <Button
              onClick={scrollToAcquire}
              className="group relative bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-400 text-white font-bold text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:brightness-110 hover:shadow-[0_0_32px_8px_rgba(34,211,238,0.25)] focus:ring-4 focus:ring-cyan-400/40"
            >
              <Flame className="h-5 w-5 sm:h-6 sm:w-6 mr-3" />
              Acquire PSX
            </Button>

            <Link href="/game-auth">
              <Button className="group relative bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 text-white font-bold text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:brightness-110 hover:shadow-[0_0_32px_8px_rgba(236,72,153,0.25)] focus:ring-4 focus:ring-pink-400/40">
                <Gamepad2 className="h-5 w-5 sm:h-6 sm:w-6 mr-3" />
                Play Game
              </Button>
            </Link>

            <a
              href="https://zealy.io/cw/psxpleasestopxisting/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button className="group relative bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-400 text-white font-bold text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:brightness-110 hover:shadow-[0_0_32px_8px_rgba(34,211,238,0.25)] focus:ring-4 focus:ring-cyan-400/40">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 mr-3" />
                PSX Z
              </Button>
            </a>
          </div>

          {/* Scroll Cue */}
          <div className="mt-16 sm:mt-20 flex flex-col items-center">
            <button
              onClick={scrollToAcquire}
              className="group flex flex-col items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
            >
              <span className="text-sm font-mono mb-2 opacity-70 group-hover:opacity-100">↓ Begin Mission</span>
              <ChevronDown className="h-6 w-6 animate-bounce group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Social icons - responsive */}
          <div className="mt-16 sm:mt-20 flex gap-4 sm:gap-6 lg:gap-8 justify-center flex-wrap">
            {[
              { href: "https://t.me/psxonbase", icon: MessageCircle, label: "Telegram" },
              { href: "https://x.com/PSXonBase", icon: Twitter, label: "Twitter" },
              { href: "https://www.instagram.com/psxonbase", icon: Instagram, label: "Instagram" },
              {
                href: "https://dexscreener.com/base/0x4444489570Afd4261d616df00DE1668dAd5F8ceE",
                icon: BarChart3,
                label: "Chart",
              },
              { href: "https://discord.gg/psxonbase", icon: Discord, label: "Discord" },
              {
                href: "https://basescan.org/address/0x4444489570Afd4261d616df00DE1668dAd5F8ceE",
                icon: ExternalLink,
                label: "Explorer",
              },
            ].map(({ href, icon: Icon, label }) => (
              <Link key={label} href={href} target="_blank" rel="noopener noreferrer">
                <span className="group relative block">
                  <span className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center rounded-2xl bg-black/80 border border-cyan-400/30 text-cyan-400 transition-all duration-300 group-hover:bg-cyan-400/25 group-hover:-translate-y-2 group-hover:scale-110 backdrop-blur-sm group-hover:shadow-lg group-hover:shadow-cyan-400/20">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110" />
                  </span>
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 text-xs font-mono text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {label}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Acquire PSX Section - Simplified with   widget */}
      <section
        ref={swapRef}
        className="py-16 sm:py-24 lg:py-32 px-4 bg-gradient-to-b from-black via-black/80 to-black relative"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,136,0.15)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15)_0%,transparent_50%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <header className="text-center mb-16 sm:mb-20 lg:mb-24">
            <span className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border border-cyan-400/20 rounded-full bg-black/60 backdrop-blur-3xl text-sm font-mono text-cyan-400 shadow-2xl">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" /> TRADING TERMINAL ACTIVE
            </span>
            <h2 className="mt-8 sm:mt-12 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-mono font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              ACQUIRE PSX
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-cyan-300/70 max-w-3xl mx-auto px-4">
              Access our streamlined trading platform for seamless PSX token acquisition
            </p>
          </header>

          {/* Responsive three column grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12">
            {/* Left column - stats/info */}
            <div className="space-y-6 sm:space-y-8 order-2 xl:order-1">
              {/* Live market data */}
              <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl hover:bg-black/80 transition">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 animate-pulse" />
                    <h3 className="text-lg sm:text-xl font-mono font-bold text-cyan-400">LIVE MARKET DATA</h3>
                    {tokenData.isLoading && <RefreshCw className="h-4 w-4 text-cyan-400 animate-spin" />}
                  </div>
                  <div className="space-y-4 sm:space-y-6">
                    {[
                      ["Price", tokenData.price],
                      ["Market Cap", tokenData.marketCap],
                      ["24h Volume", tokenData.volume24h],
                      ["Liquidity", tokenData.liquidity],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-sm text-cyan-300/70">{label}</span>
                        <span
                          className={`font-mono font-bold text-sm sm:text-base ${
                            value === "Loading..." || value === "N/A" ? "text-cyan-400" : "text-green-400"
                          }`}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-cyan-400/20 flex items-center gap-2 text-xs font-mono text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    {tokenData.isLoading ? "UPDATING..." : "LIVE DATA"}
                  </div>
                  {tokenData.error && <div className="mt-2 text-xs text-red-400">{tokenData.error}</div>}
                </CardContent>
              </Card>

              {/* Security */}
              <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl hover:bg-black/80 transition">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                    <h3 className="text-lg sm:text-xl font-mono font-bold text-cyan-400">SECURITY PROTOCOL</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Audited Smart Contracts",
                      "Liquidity Locked",
                      "Renounced Ownership",
                      "Base Network Verified",
                    ].map((t) => (
                      <div key={t} className="flex items-center gap-3 text-sm text-cyan-300/80">
                        <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                        {t}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center order-1 xl:order-2">
              <div className="w-full max-w-md">
                <SwapWidget />
              </div>
            </div>

            {/* Right column - guide/status */}
            <div className="space-y-6 sm:space-y-8 order-3">
              {/* Steps */}
              <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl hover:bg-black/80 transition">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                    <h3 className="text-lg sm:text-xl font-mono font-bold text-cyan-400">MISSION PROTOCOL</h3>
                  </div>
                  {[
                    ["01", "Connect Wallet", "🔗"],
                    ["02", "Select Amount", "💰"],
                    ["03", "Review & Confirm", "✅"],
                    ["04", "Mission Complete", "🎯"],
                  ].map(([step, title, icon]) => (
                    <div key={step} className="flex items-start gap-4 mb-4">
                      <span className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-800/60 to-purple-800/60 font-mono font-bold border border-cyan-400/30 text-cyan-100 text-sm flex-shrink-0">
                        {step}
                      </span>
                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-mono text-cyan-400">
                          <span>{icon}</span> {title}
                        </h4>
                      </div>
                    </div>
                  ))}

                  {/* FOMO Element */}
                  <div className="mt-6 p-4 bg-red-900/20 border border-red-400/30 rounded-lg">
                    <div className="flex items-center gap-2 text-red-400 text-sm font-mono">
                      <Flame className="h-4 w-4 animate-pulse" />
                      <span>🔥 {fomoPeople} people bought PSX in the last {fomoMinutes} minutes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick actions */}
              <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl hover:bg-black/80 transition">
                <CardContent className="p-6 sm:p-8 space-y-4">
                  <h3 className="text-lg sm:text-xl font-mono font-bold text-cyan-400 mb-4">QUICK ACTIONS</h3>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-mono text-sm sm:text-base"
                  >
                    <Link
                      href="https://dexscreener.com/base/0x4444489570Afd4261d616df00DE1668dAd5F8ceE"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" /> VIEW CHART
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-white font-mono text-sm sm:text-base"
                  >
                    <Link
                      href="https://app.uniswap.org/#/swap?outputCurrency=0x4444489570Afd4261d616df00DE1668dAd5F8ceE&chain=base"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" /> UNISWAP
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-mono text-sm sm:text-base"
                  >
                    <Link
                      href="https://www.dextools.io/app/en/base/pair-explorer/0x4444489570Afd4261d616df00DE1668dAd5F8ceE"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" /> DEXTOOLS
                    </Link>
                  </Button>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="w-full border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 font-mono text-sm sm:text-base bg-transparent"
                  >
                    <Copy className="h-4 w-4 mr-2" /> COPY CONTRACT
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics section - responsive */}
      <section
        ref={tokenomicsRef}
        className="py-16 sm:py-24 lg:py-32 px-4 bg-gradient-to-b from-black via-black/80 to-black relative"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.15)_0%,transparent_50%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <header className="text-center mb-16 sm:mb-20 lg:mb-24">
            <span className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border border-cyan-400/20 rounded-full bg-black/60 backdrop-blur-3xl text-sm font-mono text-cyan-400 shadow-2xl">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" /> TOKENOMICS ANALYSIS
            </span>
            <h2 className="mt-8 sm:mt-12 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-mono font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-600 bg-clip-text text-transparent">
              PSX METRICS
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-cyan-300/70 max-w-3xl mx-auto px-4">
              Comprehensive breakdown of PSX token distribution and economics
            </p>
          </header>

          {/* Responsive tokenomics content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Chart */}
            <div className="flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-md lg:max-w-lg">
                <Image
                  src="/images/psx-chart.png"
                  alt="PSX Tokenomics Chart"
                  width={500}
                  height={500}
                  className="w-full h-auto rounded-2xl border border-cyan-400/20 shadow-2xl shadow-cyan-400/10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl" />
              </div>
            </div>

            {/* Right side - Stats */}
            <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
              <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-mono font-bold text-cyan-400 mb-6">TOKEN DISTRIBUTION</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Liquidity Pool", value: "40%", color: "text-blue-400" },
                      { label: "Team/Treasury", value: "15%", color: "text-purple-400" },
                      { label: "Staking Provision", value: "10%", color: "text-green-400" },
                      { label: "CEX Provision", value: "10%", color: "text-cyan-400" },
                      { label: "Partnerships", value: "10%", color: "text-yellow-400" },
                      { label: "Airdrops", value: "5%", color: "text-pink-400" },
                      { label: "MM/Chart Support", value: "10%", color: "text-orange-400" },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-cyan-300/70 text-sm sm:text-base">{label}</span>
                        <span className={`font-mono font-bold ${color} text-sm sm:text-base`}>{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-mono font-bold text-cyan-400 mb-6">KEY FEATURES</h3>
                  <div className="space-y-4">
                    {[
                      "🔒 Liquidity Locked",
                      "🚫 No Team Tokens",
                      "⚡ Low Transaction Fees",
                      "🎯 Community Driven",
                      "🔥 Deflationary Mechanics",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <span className="text-lg">{feature.split(" ")[0]}</span>
                        <span className="text-cyan-300/80 text-sm sm:text-base">{feature.substring(2)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-xl sm:text-2xl font-mono font-bold text-cyan-400">LIVE TOKEN INFO</h3>
                    {tokenData.isLoading && <RefreshCw className="h-4 w-4 text-cyan-400 animate-spin" />}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Total Supply", value: tokenData.totalSupply },
                      { label: "Decimals", value: tokenData.decimals.toString() },
                      { label: "Network", value: "Base" },
                      { label: "Standard", value: "ERC-20" },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="text-center p-3 sm:p-4 bg-black/40 rounded-lg border border-cyan-400/10"
                      >
                        <div className="text-base sm:text-lg font-mono font-bold text-green-400">{value}</div>
                        <div className="text-xs text-cyan-300/60">{label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - responsive with REDACTED links */}
      <footer className="bg-black/80 backdrop-blur-sm border-t border-cyan-400/10 py-16 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-2xl sm:text-3xl font-mono font-bold text-cyan-400 mb-4">PSX.AGENCY</h3>
            <p className="text-cyan-300/70">The People's Token on Base</p>
            <p className="mt-3 text-sm text-cyan-400/50">Classified Operations Division</p>
          </div>

          {[
            {
              title: "Quick Access",
              links: [
                { label: "Meme Forge", href: "/meme-generator" },
                // { label: "PFP Maker", href: "/pfp-maker" },
                { label: "Roadmap", href: "/roadmap" },
                { label: "Game Portal", href: "/game-auth" },
              ],
            },
            {
              title: "Communications",
              links: [
                { label: "Discord HQ", href: "https://discord.gg/psxonbase" },
                { label: "Telegram Channel", href: "https://t.me/psxonbase" },
                { label: "Twitter/X", href: "https://x.com/PSXonBase" },
                { label: "Instagram", href: "https://www.instagram.com/psxonbase" },
                { label: "BaseScan", href: `https://basescan.org/address/${contractAddress}` },
              ],
            },
            {
              title: "Operations",
              links: [
                { label: "Live Chart", href: `https://dexscreener.com/base/${contractAddress}` },
                { label: "Audit Reports", href: "/redacted" },
                { label: "Whitepaper", href: "/redacted" },
                { label: "Legal Docs", href: "/redacted" },
              ],
            },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-lg sm:text-xl font-mono font-semibold text-cyan-400 mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href!}
                      target={item.href!.startsWith("http") ? "_blank" : undefined}
                      className="text-cyan-300/70 hover:text-cyan-400 font-mono text-sm sm:text-base transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-cyan-400/20 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="text-center md:text-left">
            <p className="font-mono font-bold text-base sm:text-lg text-cyan-400">
              BUILT BY DEGENERATES, POWERED BY GLIZZIES
            </p>
            <p className="text-sm text-cyan-400/60 mt-1">
              © 2024 PSX.AGENCY • All operations classified • Not financial advice • DYOR
            </p>
          </div>

          <div className="flex gap-4 sm:gap-6 items-center">
            {[
              { href: "https://t.me/psxonbase", icon: MessageCircle },
              { href: "https://x.com/PSXonBase", icon: Twitter },
              { href: "https://www.instagram.com/psxonbase", icon: Instagram },
              { href: "https://discord.gg/psxonbase", icon: Discord },
            ].map(({ href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-black/60 border border-cyan-400/20 text-cyan-400 hover:bg-cyan-400/20 transition"
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
