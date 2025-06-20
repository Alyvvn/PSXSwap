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
  Lock,
  Zap,
  ArrowRight,
  Shield,
  Activity,
  Target,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { SwapWidget } from "@/components/swap-widget"

const intelReports = [
  {
    id: "INTEL-001",
    timestamp: "2024.12.17 14:23:07",
    classification: "TOP SECRET",
    title: "Operation Glizzy World Deployment",
    content: "Casino infrastructure successfully deployed on Base network. Agent recruitment protocols active.",
    status: "COMPLETED",
    priority: "HIGH",
  },
  {
    id: "INTEL-002",
    timestamp: "2024.12.17 09:15:42",
    classification: "CLASSIFIED",
    title: "Market Infiltration Analysis",
    content: "PSX token showing strong community adoption. Meme warfare tactics proving effective.",
    status: "ONGOING",
    priority: "MEDIUM",
  },
  {
    id: "INTEL-003",
    timestamp: "2024.12.16 22:08:19",
    classification: "CONFIDENTIAL",
    title: "Agent Network Expansion",
    content: "Discord recruitment successful. 1,337 verified agents now active in the field.",
    status: "COMPLETED",
    priority: "HIGH",
  },
  {
    id: "INTEL-004",
    timestamp: "2024.12.16 16:45:33",
    classification: "SECRET",
    title: "Blockchain Security Assessment",
    content: "Base network integration secure. Smart contract audits passed. Ready for phase 2.",
    status: "VERIFIED",
    priority: "CRITICAL",
  },
]

export default function PSXLanding() {
  const [copied, setCopied] = useState(false)
  const [activeNav, setActiveNav] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentIntel, setCurrentIntel] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  // Refs for scroll sections
  const homeRef = useRef<HTMLDivElement>(null)
  const swapRef = useRef<HTMLDivElement>(null)
  const intelRef = useRef<HTMLDivElement>(null)

  const contractAddress = "0x4444489570Afd4261d616df00DE1668dAd5F8ceE"

  /

  // Smooth scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Intel reports cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIntel((prev) => (prev + 1) % intelReports.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [intelReports.length])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const navItems = [
    { id: "home", label: "Home", ref: homeRef },
    { id: "swap", label: "Trade", ref: swapRef },
    { id: "intel", label: "Intel", ref: intelRef },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return "text-red-400"
      case "HIGH":
        return "text-orange-400"
      case "MEDIUM":
        return "text-yellow-400"
      default:
        return "text-cyan-400"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "text-green-400"
      case "VERIFIED":
        return "text-blue-400"
      case "ONGOING":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-purple-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,136,0.03)_1px,transparent_1px)] bg-[length:60px_60px]"></div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        ></div>
      </div>

      {/* Ultra-sleek Header Terminal */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full bg-black/90 backdrop-blur-3xl border-b border-cyan-400/20 transition-all duration-700 ease-out">
        <div className="flex items-center justify-between text-cyan-400 font-mono text-xs max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
              <div
                className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
            <span className="hidden sm:block opacity-80 transition-opacity duration-300 hover:opacity-100">
              PSX.AGENCY // MAINFRAME v2.1.337
            </span>
            <span className="sm:hidden opacity-80">PSX.AGENCY</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 opacity-70 transition-opacity duration-300 hover:opacity-100">
              <Wifi className="h-3 w-3 animate-pulse" />
              <span className="text-xs">SECURE</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs">ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ultra-sleek Navigation Bar - Redesigned */}
      <nav className="fixed top-12 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-5xl px-4 transition-all duration-1000 ease-out">
        <div
          className="bg-black/50 backdrop-blur-3xl rounded-full border border-cyan-400/30 shadow-2xl shadow-cyan-400/10 transition-all duration-1000 ease-out"
          style={{
            transform: `translateY(${Math.min(scrollY * 0.05, 10)}px)`,
            opacity: Math.max(0.85, 1 - scrollY * 0.0005),
          }}
        >
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between px-8 py-2">
            {" "}
            {/* Reduced py */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400/90 to-purple-500/90 rounded-full flex items-center justify-center shadow-lg shadow-cyan-400/20 transition-all duration-500 hover:scale-110">
                <Image
                  src="/images/character-hero.png"
                  alt="PSX Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-cyan-400 font-bold text-xl font-mono tracking-wider">PSX</span>
            </div>
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id)
                    scrollToSection(item.ref)
                  }}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-500 text-sm font-mono relative overflow-hidden group ${
                    activeNav === item.id
                      ? "bg-cyan-400/25 text-cyan-100 shadow-lg shadow-cyan-400/25 scale-105"
                      : "text-cyan-400/90 hover:bg-cyan-400/15 hover:text-cyan-100 hover:scale-105"
                  }`}
                >
                  <span className="relative z-10 transition-all duration-300">{item.label}</span>
                  {activeNav === item.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Link href="/meme-generator">
                <button className="px-6 py-3 rounded-full font-medium transition-all duration-500 text-sm text-cyan-400/90 hover:bg-cyan-400/15 hover:text-cyan-100 font-mono hover:scale-105">
                  MEMES
                </button>
              </Link>
              <Link href="/pfp-generator">
                <button className="px-6 py-3 rounded-full font-medium transition-all duration-500 text-sm text-cyan-400/90 hover:bg-cyan-400/15 hover:text-cyan-100 font-mono hover:scale-105">
                  PFP
                </button>
              </Link>
              <Link href="/roadmap">
                <button className="px-6 py-3 rounded-full font-medium transition-all duration-500 text-sm text-cyan-400/90 hover:bg-cyan-400/15 hover:text-cyan-100 font-mono hover:scale-105">
                  ROADMAP
                </button>
              </Link>
              <Link href="/game-portal">
                <button className="px-6 py-3 rounded-full font-medium transition-all duration-500 text-sm text-cyan-400/90 hover:bg-cyan-400/15 hover:text-cyan-100 font-mono hover:scale-105">
                  GAMES
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center justify-between px-6 py-2">
            {" "}
            {/* Reduced py */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400/90 to-purple-500/90 rounded-full flex items-center justify-center shadow-lg shadow-cyan-400/20">
                <Image
                  src="/images/character-hero.png"
                  alt="PSX Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-cyan-400 font-bold text-xl font-mono">PSX</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-cyan-400 p-3 hover:bg-cyan-400/15 rounded-full transition-all duration-500 hover:scale-110"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Enhanced */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-black/85 backdrop-blur-3xl rounded-2xl border border-cyan-400/30 shadow-2xl animate-in slide-in-from-top-5 duration-700 ease-out">
            <div className="p-4 space-y-4">
              {" "}
              {/* Reduced p */}
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id)
                    scrollToSection(item.ref)
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full px-6 py-4 rounded-xl font-medium transition-all duration-500 text-sm font-mono text-left ${
                    activeNav === item.id
                      ? "bg-cyan-400/25 text-cyan-100 border border-cyan-400/40 shadow-lg"
                      : "text-cyan-400/90 hover:bg-cyan-400/15 hover:text-cyan-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-cyan-400/30 space-y-4">
                <Link href="/meme-generator" className="block">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full px-6 py-4 rounded-xl font-medium transition-all duration-500 text-sm text-cyan-400/90 hover:bg-cyan-400/15 hover:text-cyan-100 font-mono text-left"
                  >
                    MEMES
                  </button>
                </Link>
                <Link href="/pfp-generator" className="block">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full px-6 py-4 rounded-xl font-medium transition-all duration-500 text-sm text-cyan-400/90 hover:bg-cyan-400/15 hover:text-cyan-100 font-mono text-left"
                  >
                    PFP
                  </button>
                </Link>
                <Link href="/roadmap" className="block">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full px-6 py-4 rounded-xl font-medium transition-all duration-500 text-sm text-cyan-400/90 hover:bg-cyan-400/15 hover:text-cyan-100 font-mono text-left"
                  >
                    ROADMAP
                  </button>
                </Link>
                <Link href="/game-portal" className="block">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full px-6 py-4 rounded-xl font-medium transition-all duration-500 text-sm text-cyan-400/90 hover:bg-cyan-400/15 hover:text-cyan-100 font-mono text-left"
                  >
                    GAMES
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Enhanced */}
      <section
        ref={homeRef}
        className="min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-20 relative"
      >
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* Main Title - Enhanced */}
          <div className="mb-16 animate-in fade-in-50 duration-1000">
            <h1 className="text-8xl md:text-[12rem] font-black text-white mb-8 tracking-tight transition-all duration-1000 ease-out">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-600 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)] animate-pulse">
                PSX
              </span>
            </h1>
            <div>
              <p className="text-2xl md:text-4xl text-cyan-300 font-light tracking-wide font-mono mt-6 animate-in slide-in-from-bottom-5 duration-1000 delay-500">
                PRECISION. STEALTH. EXECUTION.
              </p>
              <div className="text-cyan-400/70 font-mono text-sm tracking-wider mt-4 uppercase animate-in slide-in-from-bottom-5 duration-1000 delay-700">
                PLEASE STOP XISTING. // Base Network Protocol
              </div>
            </div>
          </div>

          {/* Enhanced Contract Address */}
          <div className="mb-20 flex justify-center animate-in slide-in-from-bottom-5 duration-1000 delay-1000">
            <div className="bg-black/70 border border-cyan-400/30 backdrop-blur-3xl rounded-3xl p-1.5 shadow-2xl">
              <Button
                onClick={copyToClipboard}
                className={`bg-black/70 hover:bg-cyan-400/15 text-cyan-400 font-mono text-base px-8 py-5 rounded-3xl shadow-xl transition-all duration-700 transform hover:scale-[1.02] border border-cyan-400/30 backdrop-blur-sm group ${
                  copied ? "min-w-[300px]" : "min-w-[380px]"
                }`}
              >
                {copied ? (
                  <span className="text-green-400 font-medium animate-in zoom-in-50 duration-300">
                    ✓ COPIED TO CLIPBOARD
                  </span>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400/70 text-sm">CONTRACT:</span>
                    <span className="text-cyan-300 group-hover:text-cyan-100 transition-colors duration-300">
                      {contractAddress.slice(0, 12)}...{contractAddress.slice(-12)}
                    </span>
                    <Copy className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Enhanced Social Links */}
          <div className="flex justify-center space-x-8 mb-24 animate-in slide-in-from-bottom-5 duration-1000 delay-1200">
            {[
              { href: "https://t.me/psxonbase", icon: MessageCircle, label: "Telegram" },
              { href: "https://x.com/PSXonBase", icon: Twitter, label: "Twitter" },
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
            ].map((social, index) => (
              <Link key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="group relative">
                <div
                  className="w-16 h-16 bg-black/70 hover:bg-cyan-400/25 rounded-2xl flex items-center justify-center text-cyan-400 transition-all duration-700 transform hover:scale-110 hover:-translate-y-2 border border-cyan-400/30 backdrop-blur-sm shadow-xl shadow-cyan-400/10 group-hover:shadow-cyan-400/30"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <social.icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs text-cyan-400/80 opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap font-mono">
                  {social.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Enhanced Interactive Action Boxes */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto animate-in slide-in-from-bottom-5 duration-1000 delay-1400">
            {/* Trade Box */}
            <Card
              className="bg-black/50 border-cyan-400/30 backdrop-blur-3xl hover:bg-black/70 transition-all duration-700 cursor-pointer group shadow-2xl hover:shadow-cyan-400/30 hover:-translate-y-3 hover:scale-[1.02]"
              onClick={() => scrollToSection(swapRef)}
            >
              <CardContent className="p-8 text-center">
                <div className="w-18 h-18 bg-gradient-to-br from-cyan-500/90 to-blue-500/90 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 shadow-lg shadow-cyan-500/30">
                  <Zap className="h-9 w-9 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4 font-mono group-hover:text-cyan-300 transition-colors duration-500">
                  INITIATE TRADE
                </h3>
                <p className="text-cyan-300/80 mb-6 text-sm leading-relaxed group-hover:text-cyan-300/100 transition-colors duration-500">
                  Deploy advanced swap protocols to acquire PSX tokens through our secure exchange interface with
                  optimal rates
                </p>
                <div className="flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 transition-colors duration-500">
                  <span className="font-mono text-sm mr-3">ACCESS TRADING TERMINAL</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </CardContent>
            </Card>

            {/* Glizzy World Box - Fixed */}
            <Link href="/glizzy-world" className="block">
              <Card className="bg-black/50 border-red-400/30 backdrop-blur-3xl hover:bg-black/70 transition-all duration-700 cursor-pointer group relative overflow-hidden shadow-2xl hover:shadow-red-400/30 hover:-translate-y-3 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <CardContent className="p-8 text-center relative z-10">
                  <div className="w-18 h-18 bg-gradient-to-br from-red-500/90 to-pink-500/90 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 shadow-lg shadow-red-500/30">
                    <Lock className="h-9 w-9 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-red-400 mb-4 font-mono group-hover:text-red-300 transition-colors duration-500">
                    GLIZZY WORLD CASINO ACCESS
                  </h3>
                  <p className="text-red-300/80 mb-6 text-sm leading-relaxed group-hover:text-red-300/100 transition-colors duration-500">
                    Access our classified casino operations. Password-protected gaming suite exclusively for verified
                    PSX agents
                  </p>
                  <div className="flex items-center justify-center text-red-400 group-hover:text-red-300 transition-colors duration-500">
                    <span className="font-mono text-sm mr-3">CLASSIFIED ACCESS</span>
                    <Shield className="h-4 w-4 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Revamped Swap Section */}
      <section
        ref={swapRef}
        className="py-32 px-4 bg-gradient-to-b from-black via-black/80 to-black relative overflow-hidden"
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,136,0.15)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15)_0%,transparent_50%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Enhanced Section Header */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 bg-black/60 backdrop-blur-3xl rounded-full px-8 py-4 border border-cyan-400/20 mb-12 shadow-2xl">
              <Zap className="h-5 w-5 text-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-mono text-sm font-bold">TRADING TERMINAL ACTIVE</span>
            </div>
            <h2 className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-8 font-mono tracking-tight">
              ACQUIRE PSX
            </h2>
            <p className="text-xl text-cyan-300/70 max-w-3xl mx-auto leading-relaxed">
              Deploy our advanced trading interface for seamless PSX token acquisition
            </p>
          </div>

          {/* Enhanced Main Trading Interface */}
          <div className="grid xl:grid-cols-3 gap-12 items-start">
            {/* Left Column - Enhanced Trading Stats & Info */}
            <div className="xl:col-span-1 space-y-8">
              {/* Enhanced Live Trading Stats */}
              <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl hover:bg-black/80 transition-all duration-500 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Activity className="h-6 w-6 text-green-400 animate-pulse" />
                    <h3 className="text-xl font-bold text-cyan-400 font-mono">LIVE MARKET DATA</h3>
                  </div>

                  <div className="space-y-6">
                    {[
                      { label: "24h Volume", value: "$127,420", color: "text-green-400" },
                      { label: "Market Cap", value: "$2.1M", color: "text-cyan-400" },
                      { label: "Holders", value: "1,337", color: "text-purple-400" },
                      { label: "Liquidity", value: "$456K", color: "text-blue-400" },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center group">
                        <span className="text-cyan-300/70 text-sm group-hover:text-cyan-300 transition-colors">
                          {item.label}
                        </span>
                        <span
                          className={`${item.color} font-mono font-bold group-hover:scale-105 transition-transform`}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-cyan-400/20">
                    <div className="flex items-center gap-2 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="font-mono text-xs">REAL-TIME UPDATES</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Security Features */}
              <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl hover:bg-black/80 transition-all duration-500 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="h-6 w-6 text-blue-400" />
                    <h3 className="text-xl font-bold text-cyan-400 font-mono">SECURITY PROTOCOL</h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      "Audited Smart Contracts",
                      "Liquidity Locked",
                      "Renounced Ownership",
                      "Base Network Verified",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 group">
                        <div className="w-2 h-2 bg-green-400 rounded-full group-hover:scale-125 transition-transform"></div>
                        <span className="text-cyan-300/80 text-sm group-hover:text-cyan-300 transition-colors">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Quick Actions */}
              <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl hover:bg-black/80 transition-all duration-500 hover:-translate-y-1">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-cyan-400 font-mono mb-6">QUICK ACTIONS</h3>

                  <div className="space-y-4">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-cyan-500/80 to-blue-500/80 hover:from-cyan-600 hover:to-blue-600 text-white font-mono transition-all duration-500 hover:scale-[1.02]"
                    >
                      <Link
                        href="https://dexscreener.com/base/0x4444489570Afd4261d616df00DE1668dAd5F8ceE"
                        target="_blank"
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        VIEW CHART
                      </Link>
                    </Button>

                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      className="w-full border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 font-mono transition-all duration-500 hover:scale-[1.02]"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      COPY CONTRACT
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-purple-400/30 text-purple-400 hover:bg-purple-400/10 font-mono transition-all duration-500 hover:scale-[1.02]"
                    >
                      <Link
                        href="https://basescan.org/address/0x4444489570Afd4261d616df00DE1668dAd5F8ceE"
                        target="_blank"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        VERIFY ON BASESCAN
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Center Column - Main Trading Widget */}
            <div className="xl:col-span-1 flex justify-center">
              <div className="w-full max-w-md">
                <SwapWidget />
              </div>
            </div>

            {/* Right Column - Enhanced Trading Guide */}
            <div className="xl:col-span-1 space-y-8">
              {/* Enhanced Trading Steps */}
              <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl hover:bg-black/80 transition-all duration-500 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="h-6 w-6 text-purple-400" />
                    <h3 className="text-xl font-bold text-cyan-400 font-mono">MISSION PROTOCOL</h3>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        step: "01",
                        title: "Connect Wallet",
                        desc: "Link your Web3 wallet to the trading terminal",
                        icon: "🔗",
                      },
                      {
                        step: "02",
                        title: "Select Amount",
                        desc: "Choose ETH amount for PSX acquisition",
                        icon: "💰",
                      },
                      {
                        step: "03",
                        title: "Review & Confirm",
                        desc: "Verify transaction details and execute",
                        icon: "✅",
                      },
                      {
                        step: "04",
                        title: "Mission Complete",
                        desc: "PSX tokens deployed to your wallet",
                        icon: "🎯",
                      },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-4 group">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-800/60 to-purple-800/60 rounded-xl flex items-center justify-center text-cyan-100 font-bold text-sm border border-cyan-400/30 font-mono group-hover:scale-110 transition-transform duration-300">
                            {item.step}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{item.icon}</span>
                            <h4 className="text-cyan-400 font-semibold font-mono text-sm group-hover:text-cyan-300 transition-colors">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-cyan-300/60 text-xs leading-relaxed group-hover:text-cyan-300/80 transition-colors">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Network Info */}
              <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl hover:bg-black/80 transition-all duration-500 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Wifi className="h-6 w-6 text-green-400" />
                    <h3 className="text-xl font-bold text-cyan-400 font-mono">NETWORK STATUS</h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: "Network", value: "BASE MAINNET", color: "text-blue-400" },
                      { label: "Gas Fees", value: "~$0.01", color: "text-green-400" },
                      { label: "Confirmation", value: "~2 SECONDS", color: "text-cyan-400" },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center group">
                        <span className="text-cyan-300/70 text-sm group-hover:text-cyan-300 transition-colors">
                          {item.label}
                        </span>
                        <span
                          className={`${item.color} font-mono font-bold group-hover:scale-105 transition-transform`}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center group">
                      <span className="text-cyan-300/70 text-sm group-hover:text-cyan-300 transition-colors">
                        Status
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 font-mono font-bold group-hover:scale-105 transition-transform">
                          OPERATIONAL
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Support */}
              <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl hover:bg-black/80 transition-all duration-500 hover:-translate-y-1">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-cyan-400 font-mono mb-6">NEED ASSISTANCE?</h3>

                  <div className="space-y-4">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 font-mono transition-all duration-500 hover:scale-[1.02]"
                    >
                      <Link href="https://discord.gg/psxonbase" target="_blank">
                        <Discord className="h-4 w-4 mr-2" />
                        AGENT SUPPORT
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 font-mono transition-all duration-500 hover:scale-[1.02]"
                    >
                      <Link href="https://t.me/psxonbase" target="_blank">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        TELEGRAM HQ
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-cyan-400/20">
                    <p className="text-cyan-300/60 text-xs text-center">24/7 Agent Support Available</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Bottom Section - Additional Info */}
          <div className="mt-24 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "SECURE TRADING",
                desc: "All transactions are secured by Base network's robust infrastructure and audited smart contracts.",
                gradient: "from-green-500/80 to-emerald-500/80",
              },
              {
                icon: Zap,
                title: "INSTANT EXECUTION",
                desc: "Lightning-fast swaps with minimal slippage powered by Flooz's advanced trading engine.",
                gradient: "from-blue-500/80 to-cyan-500/80",
              },
              {
                icon: Target,
                title: "OPTIMAL RATES",
                desc: "Get the best possible rates through intelligent routing and liquidity aggregation.",
                gradient: "from-purple-500/80 to-pink-500/80",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-black/40 border-cyan-400/20 backdrop-blur-3xl hover:bg-black/60 transition-all duration-500 hover:-translate-y-2 group"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
                  >
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-4 font-mono group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-cyan-300/70 text-sm group-hover:text-cyan-300/90 transition-colors">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Intelligence Reports Section */}
      <section ref={intelRef} className="py-32 px-4 bg-black/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-6xl font-bold text-center mb-16 text-cyan-400 font-mono">AGENT DOSSIER: PSX</h2>

          <div className="bg-black/60 backdrop-blur-3xl p-12 rounded-3xl border border-cyan-500/20 relative overflow-hidden shadow-2xl hover:shadow-cyan-500/10 transition-all duration-700">
            <div className="absolute top-6 right-6 text-red-400 font-mono text-xs font-bold animate-pulse">
              CLASSIFIED // EYES ONLY
            </div>

            <div className="space-y-10 relative z-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-6 font-mono">MISSION BRIEFING</h3>
                  <p className="text-cyan-300/80 text-lg leading-relaxed mb-6">
                    PSX operates as a <span className="text-red-400 font-bold">covert intelligence network</span>{" "}
                    embedded within the Base blockchain ecosystem.
                  </p>
                  <p className="text-cyan-300/80 text-lg leading-relaxed">
                    Our agents utilize advanced crypto warfare tactics to establish market dominance while maintaining
                    operational security.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-6 font-mono">OPERATIONAL STATUS</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Network:", value: "BASE MAINNET", color: "text-green-400" },
                      { label: "Security Level:", value: "MAXIMUM", color: "text-red-400" },
                      { label: "Agent Count:", value: "1,337 ACTIVE", color: "text-cyan-400" },
                      { label: "Mission Status:", value: "OPERATIONAL", color: "text-green-400" },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center group">
                        <span className="text-cyan-300/80 font-mono group-hover:text-cyan-300 transition-colors">
                          {item.label}
                        </span>
                        <span
                          className={`${item.color} font-mono font-bold group-hover:scale-105 transition-transform`}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-cyan-400/20 pt-10">
                <h3 className="text-2xl font-bold text-cyan-400 mb-8 font-mono">RECRUITMENT PROTOCOL</h3>
                <p className="text-cyan-300/80 text-lg leading-relaxed mb-8">
                  The agency maintains a fully operational crypto casino and advanced meme generation facilities. New
                  operatives undergo rigorous Discord verification protocols before gaining access to classified
                  operations.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <div className="text-cyan-300/80 text-lg text-center md:text-left">READY TO JOIN THE OPERATION?</div>
                  <Button
                    asChild
                    className="bg-red-500/90 hover:bg-red-600 text-white font-mono px-10 py-5 text-lg transition-all duration-500 hover:scale-[1.05] shadow-lg shadow-red-500/20"
                  >
                    <Link href="https://discord.gg/psxonbase" target="_blank" rel="noopener noreferrer">
                      [ ENLIST NOW ] <Discord className="ml-3 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Professional Footer */}
      <footer className="py-20 px-4 bg-black/80 backdrop-blur-sm border-t border-cyan-400/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-3xl font-bold text-cyan-400 mb-8 font-mono">PSX.AGENCY</h3>
              <p className="text-cyan-300/70 leading-relaxed">The People's Token on Base</p>
              <p className="text-cyan-400/50 text-sm mt-3">Classified Operations Division</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-cyan-400 mb-8 font-mono">Quick Access</h4>
              <div className="space-y-4">
                <Link
                  href="/glizzy-world"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors duration-300"
                >
                  Glizzy World Casino Access
                </Link>
                <Link
                  href="/meme-generator"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors duration-300"
                >
                  Meme Generator
                </Link>
                <Link
                  href="/pfp-generator"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors duration-300"
                >
                  PFP Generator
                </Link>
                <Link
                  href="/roadmap"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors duration-300"
                >
                  Interactive Roadmap
                </Link>
                <Link
                  href="/game-portal"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors duration-300"
                >
                  Game Portal
                </Link>
                <Link
                  href="#"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors duration-300"
                >
                  Agent Handbook
                </Link>
                <Link
                  href="#"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors duration-300"
                >
                  Legal Framework
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-cyan-400 mb-8 font-mono">Communications</h4>
              <div className="space-y-4">
                <Link
                  href="https://discord.gg/psxonbase"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors duration-300"
                >
                  Discord HQ
                </Link>
                <Link
                  href="https://t.me/psxonbase"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors duration-300"
                >
                  Telegram Channel
                </Link>
                <Link
                  href="https://x.com/PSXonBase"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors duration-300"
                >
                  Twitter/X
                </Link>
                <Link
                  href="https://basescan.org/address/0x4444489570Afd4261d616df00DE1668dAd5F8ceE"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors duration-300"
                >
                  BaseScan
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-cyan-400 mb-8 font-mono">Operations</h4>
              <div className="space-y-4">
                <Link
                  href="https://dexscreener.com/base/0x4444489570Afd4261d616df00DE1668dAd5F8ceE"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors duration-300"
                >
                  Live Chart
                </Link>
                <button
                  onClick={copyToClipboard}
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors duration-300 text-left"
                >
                  Contract Address
                </button>
                <Link
                  href="#"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors duration-300"
                >
                  Audit Reports
                </Link>
                <Link
                  href="#"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors duration-300"
                >
                  Whitepaper
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-cyan-400/20 mt-16 pt-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <p className="text-cyan-400 font-mono text-lg font-bold mb-2">
                  BUILT BY DEGENERATES, POWERED BY GLIZZIES
                </p>
                <p className="text-cyan-400/60 text-sm">
                  © 2024 PSX.AGENCY • All operations classified • Not financial advice • DYOR
                </p>
              </div>
              <div className="flex items-center gap-6">
                {[
                  { href: "https://t.me/psxonbase", icon: MessageCircle },
                  { href: "https://x.com/PSXonBase", icon: Twitter },
                  { href: "https://discord.gg/psxonbase", icon: Discord },
                ].map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-black/60 hover:bg-cyan-400/20 rounded-xl flex items-center justify-center text-cyan-400 transition-all duration-500 hover:scale-110 hover:-translate-y-1 border border-cyan-400/20 backdrop-blur-sm"
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
