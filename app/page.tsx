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
} from "lucide-react"
import Link from "next/link"
import { SwapWidget } from "@/components/swap-widget"
import { StepModal } from "@/components/step-modal"
import { MemeReel } from "@/components/meme-reel"

export default function PSXLanding() {
  const [copied, setCopied] = useState(false)
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [activeNav, setActiveNav] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const [terminalText, setTerminalText] = useState("")
  const [glizzyModalOpen, setGlizzyModalOpen] = useState(false)
  const [accessGranted, setAccessGranted] = useState(false)

  // Refs for scroll sections
  const homeRef = useRef<HTMLDivElement>(null)
  const swapRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)

  const contractAddress = "0x4444489570Afd4261d616df00DE1668dAd5F8ceE"

  // Optimized glitch effect - less frequent
  useEffect(() => {
    const interval = setInterval(
      () => {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 150)
      },
      8000 + Math.random() * 10000,
    )
    return () => clearInterval(interval)
  }, [])

  // Optimized terminal typing effect
  useEffect(() => {
    const messages = [
      "ACCESSING PSX MAINFRAME...",
      "GLIZZY PROTOCOLS ACTIVE",
      "AGENTS: 1337 ONLINE",
      "MARKET INTEL ACQUIRED",
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
        }, 3000)
      }
    }, 150)

    return () => clearInterval(typeInterval)
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
    { id: "story", label: "Story", ref: storyRef },
  ]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Lightweight CSS-only background effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-pink-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,136,0.1)_1px,transparent_1px)] bg-[length:30px_30px]"></div>
      </div>

      {/* Optimized glitch overlay */}
      {glitchActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 animate-pulse pointer-events-none" />
      )}

      {/* Header Terminal */}
      <div className="relative z-50 w-full bg-gradient-to-r from-slate-900 to-slate-800 border-b border-cyan-400/30 p-2">
        <div className="flex items-center justify-between text-cyan-400 font-mono text-sm">
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span>PSX.AGENCY MAINFRAME v2.1.337</span>
          </div>
          <div className="flex items-center gap-4">
            <Wifi className="h-4 w-4 animate-pulse" />
            <span>SECURE CONNECTION</span>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <div className="bg-slate-900/95 backdrop-blur-md rounded-full p-1.5 flex items-center justify-center border border-cyan-400/50 shadow-2xl">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center w-full">
            <div className="flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id)
                    scrollToSection(item.ref)
                  }}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 text-sm whitespace-nowrap font-mono ${
                    activeNav === item.id
                      ? "bg-cyan-800 text-cyan-100 shadow-lg border border-cyan-400"
                      : "text-cyan-400 hover:bg-cyan-900/80 hover:text-cyan-100 hover:border hover:border-cyan-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => setGlizzyModalOpen(true)}
                className="px-5 py-2.5 rounded-full font-medium transition-all duration-300 text-sm whitespace-nowrap bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 shadow-lg border border-red-500/50 animate-pulse font-mono"
              >
                🎰 GLIZZY WORLD
              </button>
              <Link href="/meme-generator">
                <button className="px-5 py-2.5 rounded-full font-medium transition-all duration-300 text-sm whitespace-nowrap text-cyan-400 hover:bg-cyan-900/80 hover:text-cyan-100 hover:border hover:border-cyan-700 font-mono">
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
              className="text-cyan-400 p-2 hover:bg-cyan-800 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 border border-cyan-400/50 shadow-2xl">
            <div className="grid grid-cols-2 gap-2">
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
                      ? "bg-cyan-800 text-cyan-100 border border-cyan-400"
                      : "text-cyan-400 hover:bg-cyan-900/80 hover:text-cyan-100 hover:border hover:border-cyan-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => setGlizzyModalOpen(true)}
                className="px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 w-full font-mono"
              >
                🎰 GLIZZY WORLD
              </button>
              <Link href="/meme-generator">
                <button className="px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm text-cyan-400 hover:bg-cyan-900/80 hover:text-cyan-100 hover:border hover:border-cyan-700 w-full font-mono">
                  MEME GEN
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Floating Agent Character */}
      <div className="absolute top-32 right-8 z-20 animate-float">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-lg flex items-center justify-center border border-cyan-400/50 shadow-lg shadow-cyan-400/25">
          <Eye className="h-8 w-8 text-black animate-pulse" />
        </div>
      </div>

      {/* Terminal Status */}
      <div className="absolute top-32 left-8 z-20 hidden lg:block">
        <div className="bg-slate-900/90 border border-cyan-400/30 backdrop-blur-sm rounded p-3 min-w-[200px]">
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="h-4 w-4 text-cyan-400" />
            <span className="text-cyan-400 font-mono text-xs">SYSTEM.LOG</span>
          </div>
          <div className="bg-black/50 p-2 rounded border border-cyan-400/20">
            <div className="text-green-400 font-mono text-xs">
              <div className="mb-1">
                {">"} {terminalText}
                <span className="animate-pulse">_</span>
              </div>
              <div className="text-cyan-400/60 text-xs">
                <div>STATUS: OPERATIONAL</div>
                <div>AGENTS: 1337 ACTIVE</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section
        ref={homeRef}
        className="min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-12 relative"
      >
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <div className="mb-12">
            <div className={`relative inline-block ${glitchActive ? "animate-glitch" : ""}`}>
              <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-600 drop-shadow-[0_0_20px_rgba(168,85,247,0.3)] font-mono tracking-tight">
                PSX
              </h1>
            </div>
            <p className="text-2xl md:text-3xl text-cyan-300 font-light tracking-wide font-mono">
              PLEASE STOP XISTING.
            </p>
            <div className="text-cyan-400/80 font-mono text-sm tracking-wider mt-2">
              CLASSIFIED OPERATION // SPY AGENCY PROTOCOL
            </div>
          </div>

          {/* Contract Address */}
          <div className="mb-12 flex justify-center">
            <div className="bg-slate-900/90 border border-cyan-400/30 backdrop-blur-sm rounded-lg p-1">
              <Button
                onClick={copyToClipboard}
                className={`bg-black/50 hover:bg-cyan-800/50 text-cyan-400 font-mono text-base px-8 py-4 rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-105 border border-cyan-400/50 backdrop-blur-sm ${
                  copied ? "min-w-[280px]" : "min-w-[320px]"
                }`}
              >
                {copied ? (
                  <span className="text-green-400 font-medium">✓ COPIED TO CLIPBOARD</span>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400/80 text-sm">CONTRACT:</span>
                    <span>
                      {contractAddress.slice(0, 12)}...{contractAddress.slice(-12)}
                    </span>
                    <Copy className="h-4 w-4 opacity-70" />
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-16">
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
                <div className="w-14 h-14 bg-slate-900/80 hover:bg-cyan-800/50 rounded-full flex items-center justify-center text-cyan-400 transition-all duration-300 transform hover:scale-110 border border-cyan-400/50 backdrop-blur-sm shadow-lg shadow-cyan-400/25">
                  <social.icon className="h-6 w-6" />
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-cyan-400/80 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono">
                  {social.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Interactive Action Boxes */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Trade Box */}
            <Card
              className="bg-slate-900/30 border-cyan-400/50 backdrop-blur-sm hover:bg-slate-900/50 transition-all duration-300 cursor-pointer group"
              onClick={() => scrollToSection(swapRef)}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-3 font-mono">INITIATE TRADE</h3>
                <p className="text-cyan-300/80 mb-4 font-mono text-sm">
                  Deploy swap protocols to acquire PSX tokens through secure exchange interface
                </p>
                <div className="flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  <span className="font-mono text-sm mr-2">ACCESS TRADING TERMINAL</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>

            {/* Glizzy World Box */}
            <Card
              className="bg-slate-900/30 border-red-400/50 backdrop-blur-sm hover:bg-slate-900/50 transition-all duration-300 cursor-pointer group relative overflow-hidden"
              onClick={() => setGlizzyModalOpen(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-8 text-center relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-red-400 mb-3 font-mono">GLIZZY WORLD</h3>
                <p className="text-red-300/80 mb-4 font-mono text-sm">
                  Access classified casino operations. Password-protected gaming suite for verified agents only
                </p>
                <div className="flex items-center justify-center text-red-400 group-hover:text-red-300 transition-colors">
                  <span className="font-mono text-sm mr-2">CLASSIFIED ACCESS</span>
                  <Shield className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Glizzy World Access Modal */}
      {glizzyModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-slate-900 border-red-500/50 relative">
            <button
              onClick={() => setGlizzyModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <CardContent className="p-8 text-center">
              {!accessGranted ? (
                <>
                  <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-red-400 mb-4 font-mono">CLASSIFIED ACCESS</h3>
                  <p className="text-gray-300 mb-6 font-mono text-sm">
                    You are about to enter the Glizzy World casino. This is a password-protected gaming suite for PSX
                    agents only.
                  </p>
                  <div className="space-y-4">
                    <Button
                      onClick={handleGlizzyAccess}
                      className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-mono"
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
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-400 mb-4 font-mono">ACCESS GRANTED</h3>
                  <p className="text-green-300 font-mono">Redirecting to Glizzy World...</p>
                  <div className="mt-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto"></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Rest of sections remain the same... */}
      {/* Meme Reel */}
      <section className="py-10 px-4 bg-slate-900/80 backdrop-blur-sm border-y border-cyan-400/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-4">
            <div className="h-6 w-6 rounded-full bg-red-500 animate-pulse mr-2"></div>
            <h2 className="text-xl font-bold text-cyan-400 font-mono">LIVE OPS FEED // MEME INTELLIGENCE REPORT</h2>
          </div>
          <MemeReel />
        </div>
      </section>

      {/* Swap Section */}
      <section ref={swapRef} className="py-24 px-4 bg-gradient-to-b from-slate-900/50 to-black/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-cyan-400 mb-4 font-mono">ACQUIRE PSX TOKENS</h2>
            <p className="text-xl text-cyan-300/80 max-w-2xl mx-auto font-mono">
              Deploy integrated swap protocols for optimal asset acquisition rates
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Steps on Left */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-cyan-400 mb-8 font-mono">OPERATION PROTOCOL</h3>
                <p className="text-cyan-300/80 mb-8 font-mono">Execute these classified steps to acquire PSX assets</p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: "Connect Wallet",
                    desc: "Establish secure connection with MetaMask or compatible Web3 wallet",
                    icon: "🔗",
                  },
                  {
                    step: 2,
                    title: "Select Tokens",
                    desc: "Configure ETH as input and PSX as target asset for swap operation",
                    icon: "🔄",
                  },
                  {
                    step: 3,
                    title: "Enter Amount",
                    desc: "Specify ETH quantity for PSX token acquisition protocol",
                    icon: "💰",
                  },
                  {
                    step: 4,
                    title: "Execute Swap",
                    desc: "Review transaction parameters and confirm swap execution",
                    icon: "✅",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex items-start gap-6 p-6 bg-slate-900/30 rounded-2xl border border-cyan-400/30 backdrop-blur-sm hover:bg-slate-900/50 transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-800 to-slate-900 rounded-xl flex items-center justify-center text-cyan-100 font-bold text-lg border border-cyan-400/50 font-mono">
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{item.icon}</span>
                        <h4 className="text-cyan-400 font-semibold text-lg font-mono">{item.title}</h4>
                      </div>
                      <p className="text-cyan-300/80 leading-relaxed font-mono text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Swap Widget on Right */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <SwapWidget contractAddress={contractAddress} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="py-20 px-4 bg-slate-900/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-cyan-400 font-mono">THE CLASSIFIED WORLD OF PSX</h2>

          <div className="bg-black/40 backdrop-blur-md p-6 rounded-lg border border-cyan-500/30 relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              <p className="text-cyan-300/90 text-lg leading-relaxed font-mono">
                PSX is more than just a meme token — it's a{" "}
                <span className="text-red-400 font-bold">covert spy agency</span> within the blockchain.
              </p>

              <p className="text-cyan-300/90 text-lg leading-relaxed font-mono">
                Agents operate in secret on the Base network, using memes to disguise their missions while building the
                ultimate crypto gaming empire.
              </p>

              <p className="text-cyan-300/90 text-lg leading-relaxed font-mono">
                The team has developed a fully functional crypto casino, and the agency is recruiting new operatives.
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
                <div className="text-cyan-300/90 text-lg font-mono">
                  JOIN THE DISCORD. DECODE THE CLUES. BECOME AN OPERATIVE.
                </div>
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-mono">
                  <Link href="https://discord.gg/cgUpjHpf" target="_blank" rel="noopener noreferrer">
                    [ JOIN THE AGENCY ] <Discord className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900/50 backdrop-blur-sm border-t border-cyan-400/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-4 font-mono">PSX.AGENCY</h3>
              <p className="text-cyan-300/80 font-mono">The People's Token on Base</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-cyan-400 mb-4 font-mono">Quick Links</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setGlizzyModalOpen(true)}
                  className="text-cyan-300/80 hover:text-cyan-400 block font-mono"
                >
                  Glizzy World Casino
                </button>
                <Link href="/meme-generator" className="text-cyan-300/80 hover:text-cyan-400 block font-mono">
                  Meme Generator
                </Link>
                <Link href="#" className="text-cyan-300/80 hover:text-cyan-400 block font-mono">
                  Whitepaper
                </Link>
                <Link href="#" className="text-cyan-300/80 hover:text-cyan-400 block font-mono">
                  Legal
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-cyan-400 mb-4 font-mono">Community</h4>
              <div className="space-y-2">
                <Link
                  href="https://discord.gg/cgUpjHpf"
                  className="text-cyan-300/80 hover:text-cyan-400 block font-mono"
                >
                  Discord
                </Link>
                <Link href="https://t.me/psxonbase" className="text-cyan-300/80 hover:text-cyan-400 block font-mono">
                  Telegram
                </Link>
                <Link href="https://x.com/PSXonBase" className="text-cyan-300/80 hover:text-cyan-400 block font-mono">
                  Twitter
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-cyan-400 mb-4 font-mono">Resources</h4>
              <div className="space-y-2">
                <Link href="#" className="text-cyan-300/80 hover:text-cyan-400 block font-mono">
                  Documentation
                </Link>
                <Link href="#" className="text-cyan-300/80 hover:text-cyan-400 block font-mono">
                  API
                </Link>
                <Link href="#" className="text-cyan-300/80 hover:text-cyan-400 block font-mono">
                  Support
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-cyan-400/30 text-center text-cyan-400/60 font-mono">
            <p>&copy; 2024 PSX Token. All rights reserved. // CLASSIFIED OPERATION</p>
          </div>
        </div>
      </footer>

      {/* Step Modal */}
      <StepModal step={activeStep || 1} isOpen={activeStep !== null} onClose={() => setActiveStep(null)} />
    </div>
  )
}
