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

  // Refs for scroll sections
  const homeRef = useRef<HTMLDivElement>(null)
  const swapRef = useRef<HTMLDivElement>(null)
  const intelRef = useRef<HTMLDivElement>(null)

  const contractAddress = "0x4444489570Afd4261d616df00DE1668dAd5F8ceE"

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
      12000 + Math.random() * 8000,
    )
    return () => clearInterval(interval)
  }, [])

  // Smooth terminal typing effect
  useEffect(() => {
    const messages = [
      "ACCESSING PSX MAINFRAME...",
      "GLIZZY PROTOCOLS ACTIVE",
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
    { id: "swap", label: "Swap", ref: swapRef },
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
      {/* Professional background effects */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-transparent to-pink-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,136,0.08)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
      </div>

      {/* Subtle glitch overlay */}
      {glitchActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-pink-500/5 pointer-events-none" />
      )}

      {/* Professional Header Terminal */}
      <div className="relative z-50 w-full bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-md border-b border-cyan-400/20 p-3">
        <div className="flex items-center justify-between text-cyan-400 font-mono text-sm max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="hidden sm:block">PSX.AGENCY MAINFRAME v2.1.337</span>
            <span className="sm:hidden">PSX.AGENCY</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <Wifi className="h-4 w-4 animate-pulse" />
              <span>SECURE</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs">ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sleek Navigation Bar */}
      <nav className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-4">
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-2 flex items-center justify-center border border-cyan-400/30 shadow-2xl shadow-black/50">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center w-full">
            <div className="flex space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id)
                    scrollToSection(item.ref)
                  }}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 text-sm whitespace-nowrap font-mono ${
                    activeNav === item.id
                      ? "bg-cyan-800/80 text-cyan-100 shadow-lg border border-cyan-400/50"
                      : "text-cyan-400 hover:bg-cyan-900/50 hover:text-cyan-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => setGlizzyModalOpen(true)}
                className="px-6 py-3 rounded-xl font-medium transition-all duration-300 text-sm whitespace-nowrap bg-gradient-to-r from-red-600/90 to-pink-600/90 text-white hover:from-red-700 hover:to-pink-700 shadow-lg border border-red-500/30 font-mono"
              >
                🎰 GLIZZY WORLD
              </button>
              <Link href="/meme-generator">
                <button className="px-6 py-3 rounded-xl font-medium transition-all duration-300 text-sm whitespace-nowrap text-cyan-400 hover:bg-cyan-900/50 hover:text-cyan-100 font-mono">
                  MEME GEN
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center justify-between w-full px-2">
            <span className="text-cyan-400 font-bold text-lg font-mono">PSX.AGENCY</span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-cyan-400 p-2 hover:bg-cyan-800/50 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 bg-slate-900/95 backdrop-blur-xl rounded-2xl p-4 border border-cyan-400/30 shadow-2xl">
            <div className="grid grid-cols-2 gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id)
                    scrollToSection(item.ref)
                    setMobileMenuOpen(false)
                  }}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm font-mono ${
                    activeNav === item.id
                      ? "bg-cyan-800/80 text-cyan-100 border border-cyan-400/50"
                      : "text-cyan-400 hover:bg-cyan-900/50 hover:text-cyan-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => setGlizzyModalOpen(true)}
                className="px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm bg-gradient-to-r from-red-600/90 to-pink-600/90 text-white hover:from-red-700 hover:to-pink-700 w-full font-mono"
              >
                🎰 GLIZZY WORLD
              </button>
              <Link href="/meme-generator">
                <button className="px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm text-cyan-400 hover:bg-cyan-900/50 hover:text-cyan-100 w-full font-mono">
                  MEME GEN
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Floating Agent Character */}
      <div className="absolute top-36 right-8 z-20 animate-float hidden lg:block">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/90 to-pink-500/90 rounded-xl flex items-center justify-center border border-cyan-400/30 shadow-xl shadow-cyan-400/20 backdrop-blur-sm">
          <Eye className="h-8 w-8 text-black animate-pulse" />
        </div>
      </div>

      {/* Professional Terminal Status */}
      <div className="absolute top-36 left-8 z-20 hidden xl:block">
        <div className="bg-slate-900/90 border border-cyan-400/20 backdrop-blur-xl rounded-xl p-4 min-w-[240px] shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="h-4 w-4 text-cyan-400" />
            <span className="text-cyan-400 font-mono text-xs">SYSTEM.LOG</span>
            <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div className="bg-black/40 p-3 rounded-lg border border-cyan-400/10">
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

      {/* Hero Section */}
      <section
        ref={homeRef}
        className="min-h-screen flex flex-col items-center justify-center px-4 pt-40 pb-20 relative"
      >
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <div className="mb-12">
            <h1 className="text-7xl md:text-9xl font-black text-white mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-600 drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                PSX
              </h1>
            </div>
            <p className="text-2xl md:text-4xl text-cyan-300 font-light tracking-wide font-mono mt-4">
              PLEASE STOP XISTING.
            </p>
            <div className="text-cyan-400/70 font-mono text-sm tracking-wider mt-3 uppercase">
              Classified Operation // Spy Agency Protocol
            </div>
          </div>

          {/* Professional Contract Address */}
          <div className="mb-16 flex justify-center">
            <div className="bg-slate-900/80 border border-cyan-400/20 backdrop-blur-xl rounded-2xl p-2 shadow-2xl">
              <Button
                onClick={copyToClipboard}
                className={`bg-black/40 hover:bg-cyan-800/30 text-cyan-400 font-mono text-base px-10 py-5 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-cyan-400/30 backdrop-blur-sm ${
                  copied ? "min-w-[300px]" : "min-w-[380px]"
                }`}
              >
                {copied ? (
                  <span className="text-green-400 font-medium">✓ COPIED TO CLIPBOARD</span>
                ) : (
                  <div className="flex items-center gap-4">
                    <span className="text-cyan-400/70 text-sm">CONTRACT:</span>
                    <span className="text-cyan-300">
                      {contractAddress.slice(0, 14)}...{contractAddress.slice(-14)}
                    </span>
                    <Copy className="h-4 w-4 opacity-70" />
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Professional Social Links */}
          <div className="flex justify-center space-x-8 mb-20">
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
                <div className="w-16 h-16 bg-slate-900/70 hover:bg-cyan-800/40 rounded-2xl flex items-center justify-center text-cyan-400 transition-all duration-300 transform hover:scale-110 border border-cyan-400/30 backdrop-blur-sm shadow-xl shadow-cyan-400/10">
                  <social.icon className="h-7 w-7" />
                </div>
                <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs text-cyan-400/70 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono">
                  {social.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Premium Interactive Action Boxes */}
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Trade Box */}
            <Card
              className="bg-slate-900/20 border-cyan-400/30 backdrop-blur-xl hover:bg-slate-900/40 transition-all duration-500 cursor-pointer group shadow-2xl hover:shadow-cyan-400/20"
              onClick={() => scrollToSection(swapRef)}
            >
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-600/80 to-blue-600/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-cyan-400 mb-4 font-mono">INITIATE TRADE</h3>
                <p className="text-cyan-300/70 mb-6 font-mono text-sm leading-relaxed">
                  Deploy advanced swap protocols to acquire PSX tokens through our secure exchange interface with
                  optimal rates
                </p>
                <div className="flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  <span className="font-mono text-sm mr-3">ACCESS TRADING TERMINAL</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            {/* Glizzy World Box */}
            <Card
              className="bg-slate-900/20 border-red-400/30 backdrop-blur-xl hover:bg-slate-900/40 transition-all duration-500 cursor-pointer group relative overflow-hidden shadow-2xl hover:shadow-red-400/20"
              onClick={() => setGlizzyModalOpen(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-10 text-center relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-red-600/80 to-pink-600/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Lock className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-red-400 mb-4 font-mono">GLIZZY WORLD</h3>
                <p className="text-red-300/70 mb-6 font-mono text-sm leading-relaxed">
                  Access our classified casino operations. Password-protected gaming suite exclusively for verified PSX
                  agents
                </p>
                <div className="flex items-center justify-center text-red-400 group-hover:text-red-300 transition-colors">
                  <span className="font-mono text-sm mr-3">CLASSIFIED ACCESS</span>
                  <Shield className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Intelligence Reports Section */}
      <section className="py-16 px-4 bg-slate-900/40 backdrop-blur-sm border-y border-cyan-400/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-red-500 animate-pulse flex items-center justify-center">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-cyan-400 font-mono">LIVE INTELLIGENCE FEED</h2>
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

          {/* Intelligence Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Current Report */}
            <Card className="bg-black/40 border-cyan-400/30 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-400 font-mono text-xs font-bold">
                      {intelReports[currentIntel].classification}
                    </span>
                  </div>
                  <span className="text-cyan-400/60 font-mono text-xs">{intelReports[currentIntel].id}</span>
                </div>

                <h3 className="text-xl font-bold text-cyan-400 mb-3 font-mono">{intelReports[currentIntel].title}</h3>

                <p className="text-cyan-300/80 mb-4 font-mono text-sm leading-relaxed">
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

            {/* Mission Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-black/40 border-cyan-400/20 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white font-mono">98.7%</div>
                  <div className="text-xs text-cyan-400/60 font-mono">MISSION SUCCESS</div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-cyan-400/20 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white font-mono">24</div>
                  <div className="text-xs text-cyan-400/60 font-mono">ACTIVE BOUNTY OPERATIONS</div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-cyan-400/20 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white font-mono">72h</div>
                  <div className="text-xs text-cyan-400/60 font-mono">AVG RESPONSE</div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-cyan-400/20 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <Shield className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white font-mono">MAX</div>
                  <div className="text-xs text-cyan-400/60 font-mono">SECURITY LEVEL</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Glizzy World Access Modal */}
      {glizzyModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-slate-900/95 border-red-500/30 relative backdrop-blur-xl shadow-2xl">
            <button
              onClick={() => setGlizzyModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <CardContent className="p-10 text-center">
              {!accessGranted ? (
                <>
                  <div className="w-24 h-24 bg-gradient-to-br from-red-600/80 to-pink-600/80 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                    <Lock className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-red-400 mb-6 font-mono">CLASSIFIED ACCESS</h3>
                  <p className="text-gray-300 mb-8 font-mono text-sm leading-relaxed">
                    You are about to enter the Glizzy World casino. This is a password-protected gaming suite
                    exclusively for PSX agents.
                  </p>
                  <div className="space-y-4">
                    <Button
                      onClick={handleGlizzyAccess}
                      className="w-full bg-gradient-to-r from-red-600/90 to-pink-600/90 hover:from-red-700 hover:to-pink-700 text-white font-mono py-4 text-lg"
                    >
                      🎰 ACCESS GLIZZY WORLD
                    </Button>
                    <Button
                      onClick={() => setGlizzyModalOpen(false)}
                      variant="outline"
                      className="w-full border-gray-600 text-gray-400 hover:bg-gray-800 font-mono"
                    >
                      CANCEL OPERATION
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-24 h-24 bg-green-600/80 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                    <Shield className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-green-400 mb-6 font-mono">ACCESS GRANTED</h3>
                  <p className="text-green-300 font-mono">Redirecting to Glizzy World...</p>
                  <div className="mt-6">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-400 mx-auto"></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Revamped Swap Section */}
      <section
        ref={swapRef}
        className="py-32 px-4 bg-gradient-to-b from-black via-slate-900/20 to-black relative overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,136,0.1)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1)_0%,transparent_50%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-slate-900/80 backdrop-blur-xl rounded-full px-6 py-3 border border-cyan-400/30 mb-8">
              <Zap className="h-5 w-5 text-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-mono text-sm font-bold">TRADING TERMINAL ACTIVE</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-6 font-mono tracking-tight">
              ACQUIRE PSX
            </h2>
            <p className="text-xl text-cyan-300/70 max-w-3xl mx-auto font-mono leading-relaxed">
              Deploy our advanced trading interface powered for seamless PSX token acquisition
            </p>
          </div>

          {/* Main Trading Interface */}
          <div className="grid xl:grid-cols-3 gap-12 items-start">
            {/* Left Column - Trading Stats & Info */}
            <div className="xl:col-span-1 space-y-8">
              {/* Live Trading Stats */}
              <Card className="bg-slate-900/40 border-cyan-400/20 backdrop-blur-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Activity className="h-6 w-6 text-green-400 animate-pulse" />
                    <h3 className="text-xl font-bold text-cyan-400 font-mono">LIVE MARKET DATA</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-300/70 font-mono text-sm">24h Volume</span>
                      <span className="text-green-400 font-mono font-bold">$127,420</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-300/70 font-mono text-sm">Market Cap</span>
                      <span className="text-cyan-400 font-mono font-bold">$2.1M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-300/70 font-mono text-sm">Holders</span>
                      <span className="text-purple-400 font-mono font-bold">1,337</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-300/70 font-mono text-sm">Liquidity</span>
                      <span className="text-blue-400 font-mono font-bold">$456K</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-cyan-400/20">
                    <div className="flex items-center gap-2 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="font-mono text-xs">REAL-TIME UPDATES</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Features */}
              <Card className="bg-slate-900/40 border-cyan-400/20 backdrop-blur-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="h-6 w-6 text-blue-400" />
                    <h3 className="text-xl font-bold text-cyan-400 font-mono">SECURITY PROTOCOL</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-cyan-300/80 font-mono text-sm">Audited Smart Contracts</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-cyan-300/80 font-mono text-sm">Liquidity Locked</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-cyan-300/80 font-mono text-sm">Renounced Ownership</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-cyan-300/80 font-mono text-sm">Base Network Verified</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-slate-900/40 border-cyan-400/20 backdrop-blur-xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-cyan-400 font-mono mb-6">QUICK ACTIONS</h3>

                  <div className="space-y-4">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-cyan-600/80 to-blue-600/80 hover:from-cyan-700 hover:to-blue-700 text-white font-mono"
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
                      className="w-full border-cyan-400/30 text-cyan-400 hover:bg-cyan-900/30 font-mono"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      COPY CONTRACT
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-purple-400/30 text-purple-400 hover:bg-purple-900/30 font-mono"
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

            {/* Right Column - Trading Guide */}
            <div className="xl:col-span-1 space-y-8">
              {/* Trading Steps */}
              <Card className="bg-slate-900/40 border-cyan-400/20 backdrop-blur-xl">
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
                      <div key={item.step} className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-800/60 to-purple-800/60 rounded-xl flex items-center justify-center text-cyan-100 font-bold text-sm border border-cyan-400/30 font-mono">
                            {item.step}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{item.icon}</span>
                            <h4 className="text-cyan-400 font-semibold font-mono text-sm">{item.title}</h4>
                          </div>
                          <p className="text-cyan-300/60 font-mono text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Network Info */}
              <Card className="bg-slate-900/40 border-cyan-400/20 backdrop-blur-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Wifi className="h-6 w-6 text-green-400" />
                    <h3 className="text-xl font-bold text-cyan-400 font-mono">NETWORK STATUS</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-300/70 font-mono text-sm">Network</span>
                      <span className="text-blue-400 font-mono font-bold">BASE MAINNET</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-300/70 font-mono text-sm">Gas Fees</span>
                      <span className="text-green-400 font-mono font-bold">~$0.01</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-300/70 font-mono text-sm">Confirmation</span>
                      <span className="text-cyan-400 font-mono font-bold">~2 SECONDS</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-300/70 font-mono text-sm">Status</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 font-mono font-bold">OPERATIONAL</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Support */}
              <Card className="bg-slate-900/40 border-cyan-400/20 backdrop-blur-xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-cyan-400 font-mono mb-6">NEED ASSISTANCE?</h3>

                  <div className="space-y-4">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-cyan-400/30 text-cyan-400 hover:bg-cyan-900/30 font-mono"
                    >
                      <Link href="https://discord.gg/cgUpjHpf" target="_blank">
                        <Discord className="h-4 w-4 mr-2" />
                        AGENT SUPPORT
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-cyan-400/30 text-cyan-400 hover:bg-cyan-900/30 font-mono"
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

          {/* Bottom Section - Additional Info */}
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-900/30 border-cyan-400/20 backdrop-blur-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600/80 to-emerald-600/80 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-cyan-400 mb-3 font-mono">SECURE TRADING</h3>
                <p className="text-cyan-300/70 font-mono text-sm">
                  All transactions are secured by Base network's robust infrastructure and audited smart contracts.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/30 border-cyan-400/20 backdrop-blur-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600/80 to-cyan-600/80 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-cyan-400 mb-3 font-mono">INSTANT EXECUTION</h3>
                <p className="text-cyan-300/70 font-mono text-sm">
                  Lightning-fast swaps with minimal slippage powered by Flooz's advanced trading engine.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/30 border-cyan-400/20 backdrop-blur-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600/80 to-pink-600/80 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-cyan-400 mb-3 font-mono">OPTIMAL RATES</h3>
                <p className="text-cyan-300/70 font-mono text-sm">
                  Get the best possible rates through intelligent routing and liquidity aggregation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Agent Dossier Section */}
      <section ref={intelRef} className="py-32 px-4 bg-slate-900/60 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12 text-cyan-400 font-mono">AGENT DOSSIER: PSX</h2>

          <div className="bg-black/50 backdrop-blur-xl p-10 rounded-3xl border border-cyan-500/20 relative overflow-hidden shadow-2xl">
            <div className="absolute top-4 right-4 text-red-400 font-mono text-xs font-bold">
              CLASSIFIED // EYES ONLY
            </div>

            <div className="space-y-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4 font-mono">MISSION BRIEFING</h3>
                  <p className="text-cyan-300/80 text-lg leading-relaxed font-mono mb-4">
                    PSX operates as a <span className="text-red-400 font-bold">covert intelligence network</span>{" "}
                    embedded within the Base blockchain ecosystem.
                  </p>
                  <p className="text-cyan-300/80 text-lg leading-relaxed font-mono">
                    Our agents utilize advanced meme warfare tactics to establish market dominance while maintaining
                    operational security.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4 font-mono">OPERATIONAL STATUS</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-300/80 font-mono">Network:</span>
                      <span className="text-green-400 font-mono font-bold">BASE MAINNET</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-300/80 font-mono">Security Level:</span>
                      <span className="text-red-400 font-mono font-bold">MAXIMUM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-300/80 font-mono">Agent Count:</span>
                      <span className="text-cyan-400 font-mono font-bold">1,337 ACTIVE</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-300/80 font-mono">Mission Status:</span>
                      <span className="text-green-400 font-mono font-bold">OPERATIONAL</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-cyan-400/20 pt-8">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6 font-mono">RECRUITMENT PROTOCOL</h3>
                <p className="text-cyan-300/80 text-lg leading-relaxed font-mono mb-6">
                  The agency maintains a fully operational crypto casino and advanced meme generation facilities. New
                  operatives undergo rigorous Discord verification protocols before gaining access to classified
                  operations.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="text-cyan-300/80 text-lg font-mono text-center md:text-left">
                    READY TO JOIN THE OPERATION?
                  </div>
                  <Button asChild className="bg-red-600/90 hover:bg-red-700 text-white font-mono px-8 py-4 text-lg">
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

      {/* Professional Footer */}
      <footer className="py-16 px-4 bg-slate-900/40 backdrop-blur-sm border-t border-cyan-400/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-3xl font-bold text-cyan-400 mb-6 font-mono">PSX.AGENCY</h3>
              <p className="text-cyan-300/70 font-mono leading-relaxed">The People's Token on Base</p>
              <p className="text-cyan-400/50 font-mono text-sm mt-2">Classified Operations Division</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-cyan-400 mb-6 font-mono">Quick Access</h4>
              <div className="space-y-3">
                <button
                  onClick={() => setGlizzyModalOpen(true)}
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors"
                >
                  Glizzy World Casino
                </button>
                <Link
                  href="/meme-generator"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors"
                >
                  Meme Generator
                </Link>
                <Link href="#" className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors">
                  Agent Handbook
                </Link>
                <Link href="#" className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors">
                  Legal Framework
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-cyan-400 mb-6 font-mono">Communications</h4>
              <div className="space-y-3">
                <Link
                  href="https://discord.gg/cgUpjHpf"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors"
                >
                  Discord HQ
                </Link>
                <Link
                  href="https://t.me/psxonbase"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors"
                >
                  Telegram Channel
                </Link>
                <Link
                  href="https://x.com/PSXonBase"
                  className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors"
                >
                  Twitter Intel
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-cyan-400 mb-6 font-mono">Intelligence</h4>
              <div className="space-y-3">
                <Link href="#" className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors">
                  Mission Reports
                </Link>
                <Link href="#" className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors">
                  Technical Specs
                </Link>
                <Link href="#" className="text-cyan-300/70 hover:text-cyan-400 block font-mono transition-colors">
                  Support Desk
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-cyan-400/20 text-center text-cyan-400/50 font-mono">
            <p>&copy; 2024 PSX Token. All rights reserved. // CLASSIFIED OPERATION // UNAUTHORIZED ACCESS PROHIBITED</p>
          </div>
        </div>
      </footer>

      {/* Step Modal */}
      <StepModal step={activeStep || 1} isOpen={activeStep !== null} onClose={() => setActiveStep(null)} />
    </div>
  )
}
