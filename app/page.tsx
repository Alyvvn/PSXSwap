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
  Terminal,
  Wifi,
  Eye,
  Lock,
  Zap,
  ArrowRight,
  Shield,
  Activity,
  Users,
  TrendingUp,
  Clock,
  Target,
} from "lucide-react"
import Link from "next/link"
import { SwapWidget } from "@/components/swap-widget"
import { StepModal } from "@/components/step-modal"

export default function PSXLanding() {
  const [copied, setCopied] = useState(false)
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [activeNav, setActiveNav] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const [terminalText, setTerminalText] = useState("")
  const [glizzyModalOpen, setGlizzyModalOpen] = useState(false)
  const [accessGranted, setAccessGranted] = useState(false)
  const [currentIntel, setCurrentIntel] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  // Refs for scroll sections
  const homeRef = useRef<HTMLDivElement>(null)
  const swapRef = useRef<HTMLDivElement>(null)
  const intelRef = useRef<HTMLDivElement>(null)

  const contractAddress = "0x4444489570Afd4261d616df00DE1668dAd5F8ceE"

  // Smooth scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Intelligence reports data
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

  // Optimized glitch effect
  useEffect(() => {
    const interval = setInterval(
      () => {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 100)
      },
      15000 + Math.random() * 10000,
    )
    return () => clearInterval(interval)
  }, [])

  // Smooth terminal typing effect
  useEffect(() => {
    const messages = [
      "ACCESSING PSX MAINFRAME...",
      "CRYPTO PROTOCOLS ACTIVE",
      "AGENTS: 1337 ONLINE",
      "MARKET INTEL ACQUIRED",
      "OPERATION STATUS: GREEN",
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
        }, 4000)
      }
    }, 120)

    return () => clearInterval(typeInterval)
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

  const handleGlizzyAccess = () => {
    setAccessGranted(true)
    setTimeout(() => {
      window.location.href = "/glizzy-world"
    }, 1500)
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,136,0.03)_1px,transparent_1px)] bg-[length:60px_60px] animate-pulse"></div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        ></div>
      </div>

      {/* Subtle glitch overlay */}
      {glitchActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/3 to-purple-500/3 pointer-events-none animate-pulse" />
      )}

      {/* Ultra-sleek Header Terminal */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full bg-black/80 backdrop-blur-2xl border-b border-cyan-400/10 transition-all duration-500">
        <div className="flex items-center justify-between text-cyan-400 font-mono text-xs max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <div
                className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
            <span className="hidden sm:block opacity-70">PSX.AGENCY // MAINFRAME v2.1.337</span>
            <span className="sm:hidden opacity-70">PSX.AGENCY</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 opacity-70">
              <Wifi className="h-3 w-3 animate-pulse" />
              <span className="text-xs">SECURE</span>
            </div>
            <div className="flex items-center gap-1.5 text-green-400">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs">ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ultra-sleek Navigation Bar */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-4xl px-4 transition-all duration-700">
        <div
          className="bg-black/60 backdrop-blur-3xl rounded-full border border-cyan-400/20 shadow-2xl shadow-cyan-400/5 transition-all duration-700"
          style={{
            transform: `translateY(${Math.min(scrollY * 0.1, 20)}px)`,
            opacity: Math.max(0.8, 1 - scrollY * 0.001),
          }}
        >
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400/80 to-purple-500/80 rounded-full flex items-center justify-center">
                <Eye className="h-4 w-4 text-black animate-pulse" />
              </div>
              <span className="text-cyan-400 font-bold text-lg font-mono">PSX</span>
            </div>

            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id)
                    scrollToSection(item.ref)
                  }}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all duration-500 text-sm font-mono relative overflow-hidden group ${
                    activeNav === item.id
                      ? "bg-cyan-400/20 text-cyan-100 shadow-lg shadow-cyan-400/20"
                      : "text-cyan-400/80 hover:bg-cyan-400/10 hover:text-cyan-100"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {activeNav === item.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setGlizzyModalOpen(true)}
                className="px-4 py-2.5 rounded-full font-medium transition-all duration-500 text-sm bg-gradient-to-r from-red-500/80 to-pink-500/80 text-white hover:from-red-600 hover:to-pink-600 shadow-lg shadow-red-500/20 font-mono relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="text-xs">🎰</span>
                  CASINO
                </span>
              </button>
              <Link href="/meme-generator">
                <button className="px-4 py-2.5 rounded-full font-medium transition-all duration-500 text-sm text-cyan-400/80 hover:bg-cyan-400/10 hover:text-cyan-100 font-mono">
                  MEMES
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400/80 to-purple-500/80 rounded-full flex items-center justify-center">
                <Eye className="h-4 w-4 text-black animate-pulse" />
              </div>
              <span className="text-cyan-400 font-bold text-lg font-mono">PSX</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-cyan-400 p-2 hover:bg-cyan-400/10 rounded-full transition-all duration-300"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 bg-black/80 backdrop-blur-3xl rounded-2xl border border-cyan-400/20 shadow-2xl animate-in slide-in-from-top-5 duration-500">
            <div className="p-6 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id)
                    scrollToSection(item.ref)
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm font-mono text-left ${
                    activeNav === item.id
                      ? "bg-cyan-400/20 text-cyan-100 border border-cyan-400/30"
                      : "text-cyan-400/80 hover:bg-cyan-400/10 hover:text-cyan-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 border-t border-cyan-400/20 space-y-3">
                <button
                  onClick={() => setGlizzyModalOpen(true)}
                  className="w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm bg-gradient-to-r from-red-500/80 to-pink-500/80 text-white hover:from-red-600 hover:to-pink-600 font-mono"
                >
                  🎰 CASINO
                </button>
                <Link href="/meme-generator" className="block">
                  <button className="w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm text-cyan-400/80 hover:bg-cyan-400/10 hover:text-cyan-100 font-mono text-left">
                    MEMES
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Floating Agent Character - Enhanced */}
      <div
        className="fixed top-32 right-8 z-30 hidden lg:block transition-all duration-1000"
        style={{
          transform: `translateY(${Math.sin(Date.now() * 0.001) * 10}px) translateX(${scrollY * 0.05}px)`,
        }}
      >
        <div className="w-14 h-14 bg-gradient-to-br from-cyan-400/90 to-purple-500/90 rounded-2xl flex items-center justify-center border border-cyan-400/30 shadow-2xl shadow-cyan-400/20 backdrop-blur-sm animate-pulse">
          <Eye className="h-6 w-6 text-black" />
        </div>
      </div>

      {/* Enhanced Terminal Status */}
      <div
        className="fixed top-32 left-8 z-30 hidden xl:block transition-all duration-1000"
        style={{
          transform: `translateY(${scrollY * 0.02}px)`,
          opacity: Math.max(0.7, 1 - scrollY * 0.002),
        }}
      >
        <div className="bg-black/70 border border-cyan-400/20 backdrop-blur-3xl rounded-2xl p-4 min-w-[220px] shadow-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="h-4 w-4 text-cyan-400 animate-pulse" />
            <span className="text-cyan-400 font-mono text-xs">SYSTEM.LOG</span>
            <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div className="bg-black/60 p-3 rounded-xl border border-cyan-400/10">
            <div className="text-green-400 font-mono text-xs">
              <div className="mb-2">
                {">"} {terminalText}
                <span className="animate-pulse">_</span>
              </div>
              <div className="text-cyan-400/60 text-xs space-y-1">
                <div>STATUS: OPERATIONAL</div>
                <div>AGENTS: 1337 ACTIVE</div>
                <div>UPTIME: 99.9%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Enhanced */}
      <section
        ref={homeRef}
        className="min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-20 relative"
      >
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* Main Title - Enhanced */}
          <div className="mb-16 animate-in fade-in-50 duration-1000">
            <h1
              className="text-8xl md:text-[12rem] font-black text-white mb-8 tracking-tight transition-all duration-1000"
              style={{
                transform: `translateY(${scrollY * 0.1}px)`,
              }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-600 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)] animate-pulse">
                PSX
              </span>
            </h1>
            <div
              className="transition-all duration-1000 delay-300"
              style={{
                transform: `translateY(${scrollY * 0.05}px)`,
              }}
            >
              <p className="text-2xl md:text-4xl text-cyan-300 font-light tracking-wide font-mono mt-6 animate-in slide-in-from-bottom-5 duration-1000 delay-500">
                PLEASE. STOP. XISTING.
              </p>
              <div className="text-cyan-400/70 font-mono text-sm tracking-wider mt-4 uppercase animate-in slide-in-from-bottom-5 duration-1000 delay-700">
                Elite Crypto Operations // Base Network Protocol
              </div>
            </div>
          </div>

          {/* Enhanced Contract Address */}
          <div className="mb-20 flex justify-center animate-in slide-in-from-bottom-5 duration-1000 delay-1000">
            <div className="bg-black/60 border border-cyan-400/20 backdrop-blur-3xl rounded-3xl p-1 shadow-2xl">
              <Button
                onClick={copyToClipboard}
                className={`bg-black/60 hover:bg-cyan-400/10 text-cyan-400 font-mono text-base px-8 py-4 rounded-3xl shadow-xl transition-all duration-500 transform hover:scale-[1.02] border border-cyan-400/20 backdrop-blur-sm group ${
                  copied ? "min-w-[280px]" : "min-w-[360px]"
                }`}
              >
                {copied ? (
                  <span className="text-green-400 font-medium animate-in zoom-in-50 duration-300">
                    ✓ COPIED TO CLIPBOARD
                  </span>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400/60 text-sm">CONTRACT:</span>
                    <span className="text-cyan-300 group-hover:text-cyan-100 transition-colors">
                      {contractAddress.slice(0, 12)}...{contractAddress.slice(-12)}
                    </span>
                    <Copy className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Enhanced Social Links */}
          <div className="flex justify-center space-x-6 mb-24 animate-in slide-in-from-bottom-5 duration-1000 delay-1200">
            {[
              { href: "https://t.me/psxonbase", icon: MessageCircle, label: "Telegram" },
              { href: "https://x.com/PSXonBase", icon: Twitter, label: "Twitter" },
              {
                href: "https://dexscreener.com/base/0x4444489570Afd4261d616df00DE1668dAd5F8ceE",
                icon: BarChart3,
                label: "Chart",
              },
              { href: "https://discord.gg/cgUpjHpf", icon: Discord, label: "Discord" },
              {
                href: "https://basescan.org/address/0x4444489570Afd4261d616df00DE1668dAd5F8ceE",
                icon: ExternalLink,
                label: "Explorer",
              },
            ].map((social, index) => (
              <Link key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="group relative">
                <div
                  className="w-14 h-14 bg-black/60 hover:bg-cyan-400/20 rounded-2xl flex items-center justify-center text-cyan-400 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 border border-cyan-400/20 backdrop-blur-sm shadow-xl shadow-cyan-400/5 group-hover:shadow-cyan-400/20"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-cyan-400/70 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap font-mono">
                  {social.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Enhanced Interactive Action Boxes */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto animate-in slide-in-from-bottom-5 duration-1000 delay-1400">
            {/* Trade Box */}
            <Card
              className="bg-black/40 border-cyan-400/20 backdrop-blur-3xl hover:bg-black/60 transition-all duration-700 cursor-pointer group shadow-2xl hover:shadow-cyan-400/20 hover:-translate-y-2 hover:scale-[1.02]"
              onClick={() => scrollToSection(swapRef)}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/80 to-blue-500/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-cyan-500/20">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4 font-mono group-hover:text-cyan-300 transition-colors">
                  INITIATE TRADE
                </h3>
                <p className="text-cyan-300/70 mb-6 font-mono text-sm leading-relaxed group-hover:text-cyan-300/90 transition-colors">
                  Deploy advanced swap protocols to acquire PSX tokens through our secure exchange interface with
                  optimal rates
                </p>
                <div className="flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  <span className="font-mono text-sm mr-3">ACCESS TRADING TERMINAL</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </CardContent>
            </Card>

            {/* Glizzy World Box */}
            <Card
              className="bg-black/40 border-red-400/20 backdrop-blur-3xl hover:bg-black/60 transition-all duration-700 cursor-pointer group relative overflow-hidden shadow-2xl hover:shadow-red-400/20 hover:-translate-y-2 hover:scale-[1.02]"
              onClick={() => setGlizzyModalOpen(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <CardContent className="p-8 text-center relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500/80 to-pink-500/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-red-500/20">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-red-400 mb-4 font-mono group-hover:text-red-300 transition-colors">
                  CASINO ACCESS
                </h3>
                <p className="text-red-300/70 mb-6 font-mono text-sm leading-relaxed group-hover:text-red-300/90 transition-colors">
                  Access our classified casino operations. Password-protected gaming suite exclusively for verified PSX
                  agents
                </p>
                <div className="flex items-center justify-center text-red-400 group-hover:text-red-300 transition-colors">
                  <span className="font-mono text-sm mr-3">CLASSIFIED ACCESS</span>
                  <Shield className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Intelligence Reports Section */}
      <section className="py-20 px-4 bg-black/60 backdrop-blur-sm border-y border-cyan-400/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-red-500/80 animate-pulse flex items-center justify-center shadow-lg shadow-red-500/20">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-cyan-400 font-mono">LIVE INTELLIGENCE FEED</h2>
              <div className="hidden sm:flex items-center gap-2 text-green-400 text-sm font-mono">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>REAL-TIME</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-cyan-400/60 text-sm font-mono">
              <Users className="h-4 w-4" />
              <span className="hidden sm:block">1,337 AGENTS ACTIVE</span>
            </div>
          </div>

          {/* Enhanced Intelligence Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Current Report */}
            <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl hover:bg-black/80 transition-all duration-500 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
                    <span className="text-red-400 font-mono text-xs font-bold">
                      {intelReports[currentIntel].classification}
                    </span>
                  </div>
                  <span className="text-cyan-400/60 font-mono text-xs">{intelReports[currentIntel].id}</span>
                </div>

                <h3 className="text-xl font-bold text-cyan-400 mb-4 font-mono">{intelReports[currentIntel].title}</h3>

                <p className="text-cyan-300/80 mb-6 font-mono text-sm leading-relaxed">
                  {intelReports[currentIntel].content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono text-xs font-bold ${getStatusColor(intelReports[currentIntel].status)}`}
                    >
                      {intelReports[currentIntel].status}
                    </span>
                    <span className={`font-mono text-xs ${getPriorityColor(intelReports[currentIntel].priority)}`}>
                      {intelReports[currentIntel].priority}
                    </span>
                  </div>
                  <span className="text-cyan-400/60 font-mono text-xs">{intelReports[currentIntel].timestamp}</span>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Mission Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: TrendingUp, value: "98.7%", label: "MISSION SUCCESS", color: "text-green-400" },
                { icon: Target, value: "24", label: "ACTIVE OPERATIONS", color: "text-blue-400" },
                { icon: Clock, value: "72h", label: "AVG RESPONSE", color: "text-yellow-400" },
                { icon: Shield, value: "MAX", label: "SECURITY LEVEL", color: "text-purple-400" },
              ].map((stat, index) => (
                <Card
                  key={index}
                  className="bg-black/60 border-cyan-400/10 backdrop-blur-3xl hover:bg-black/80 transition-all duration-500 hover:-translate-y-1 group"
                >
                  <CardContent className="p-6 text-center">
                    <stat.icon
                      className={`h-6 w-6 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                    />
                    <div className="text-xl font-bold text-white font-mono">{stat.value}</div>
                    <div className="text-xs text-cyan-400/60 font-mono">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Glizzy World Access Modal */}
      {glizzyModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-50 flex items-center justify-center p-4 animate-in fade-in-0 duration-300">
          <Card className="w-full max-w-md bg-black/80 border-red-500/30 relative backdrop-blur-3xl shadow-2xl animate-in zoom-in-95 duration-500">
            <button
              onClick={() => setGlizzyModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110"
            >
              <X className="h-5 w-5" />
            </button>
            <CardContent className="p-10 text-center">
              {!accessGranted ? (
                <>
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500/80 to-pink-500/80 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-red-500/20 animate-pulse">
                    <Lock className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-red-400 mb-6 font-mono">CLASSIFIED ACCESS</h3>
                  <p className="text-gray-300 mb-8 font-mono text-sm leading-relaxed">
                    You are about to enter the Casino. This is a password-protected gaming suite exclusively for PSX
                    agents.
                  </p>
                  <div className="space-y-4">
                    <Button
                      onClick={handleGlizzyAccess}
                      className="w-full bg-gradient-to-r from-red-500/90 to-pink-500/90 hover:from-red-600 hover:to-pink-600 text-white font-mono py-4 text-lg transition-all duration-500 hover:scale-[1.02]"
                    >
                      🎰 ACCESS CASINO
                    </Button>
                    <Button
                      onClick={() => setGlizzyModalOpen(false)}
                      variant="outline"
                      className="w-full border-gray-600 text-gray-400 hover:bg-gray-800 font-mono transition-all duration-300"
                    >
                      CANCEL OPERATION
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500/80 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/20">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-400 mb-6 font-mono">ACCESS GRANTED</h3>
                  <p className="text-green-300 font-mono">Redirecting to Casino...</p>
                  <div className="mt-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto"></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Rest of sections with enhanced styling... */}
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
            <p className="text-xl text-cyan-300/70 max-w-3xl mx-auto font-mono leading-relaxed">
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
                        <span className="text-cyan-300/70 font-mono text-sm group-hover:text-cyan-300 transition-colors">
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
                        <span className="text-cyan-300/80 font-mono text-sm group-hover:text-cyan-300 transition-colors">
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
                          <p className="text-cyan-300/60 font-mono text-xs leading-relaxed group-hover:text-cyan-300/80 transition-colors">
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
                        <span className="text-cyan-300/70 font-mono text-sm group-hover:text-cyan-300 transition-colors">
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
                      <span className="text-cyan-300/70 font-mono text-sm group-hover:text-cyan-300 transition-colors">
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
                      <Link href="https://discord.gg/cgUpjHpf" target="_blank">
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
                    <p className="text-cyan-300/60 font-mono text-xs text-center">24/7 Agent Support Available</p>
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
                  <p className="text-cyan-300/70 font-mono text-sm group-hover:text-cyan-300/90 transition-colors">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Agent Dossier Section */}
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
                  <p className="text-cyan-300/80 text-lg leading-relaxed font-mono mb-6">
                    PSX operates as a <span className="text-red-400 font-bold">covert intelligence network</span>{" "}
                    embedded within the Base blockchain ecosystem.
                  </p>
                  <p className="text-cyan-300/80 text-lg leading-relaxed font-mono">
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
                <p className="text-cyan-300/80 text-lg leading-relaxed font-mono mb-8">
                  The agency maintains a fully operational crypto casino and advanced meme generation facilities. New
                  operatives undergo rigorous Discord verification protocols before gaining access to classified
                  operations.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <div className="text-cyan-300/80 text-lg font-mono text-center md:text-left">
                    READY TO JOIN THE OPERATION?
                  </div>
                  <Button
                    asChild
                    className="bg-red-500/90 hover:bg-red-600 text-white font-mono px-10 py-5 text-lg transition-all duration-500 hover:scale-[1.05] shadow-lg shadow-red-500/20"
                  >
                    <Link href="https://discord.gg/cgUpjHpf" target="_blank" rel="noopener noreferrer">
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
              <p className="text-cyan-300/70 font-mono leading-relaxed">The People's Token on Base</p>
              <p className="text-cyan-400/50 font-mono text-sm mt-3">Classified Operations Division</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-cyan-400 mb-8 font-mono">Quick Access</h4>
              <div className="space-y-4">
                <button
                  onClick={() => setGlizzyModalOpen(true)}
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors duration-300"
                >
                  Casino Access
                </button>
                <Link
                  href="/meme-generator"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors duration-300"
                >
                  Meme Generator
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
                  href="https://discord.gg/cgUpjHpf"
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
                  Twitter Intel
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-cyan-400 mb-8 font-mono">Intelligence</h4>
              <div className="space-y-4">
                <Link
                  href="#"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors duration-300"
                >
                  Mission Reports
                </Link>
                <Link
                  href="#"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors duration-300"
                >
                  Technical Specs
                </Link>
                <Link
                  href="#"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors duration-300"
                >
                  Support Desk
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-cyan-400/20 text-center text-cyan-400/50 font-mono">
            <p>&copy; 2024 PSX Token. All rights reserved. // CLASSIFIED OPERATION // UNAUTHORIZED ACCESS PROHIBITED</p>
          </div>
        </div>
      </footer>

      {/* Step Modal */}
      <StepModal step={activeStep || 1} isOpen={activeStep !== null} onClose={() => setActiveStep(null)} />
    </div>
  )
}
