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
import dynamic from "next/dynamic"

const SwapWidget = dynamic(() => import("@/components/swap-widget"), { ssr: false })

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
  // ... other intel reports
]

export default function PSXLanding() {
  const [copied, setCopied] = useState(false)
  const [activeNav, setActiveNav] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentIntel, setCurrentIntel] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  const homeRef = useRef<HTMLDivElement>(null)
  const swapRef = useRef<HTMLDivElement>(null)
  const intelRef = useRef<HTMLDivElement>(null)

  const contractAddress = "0x4444489570Afd4261d616df00DE1668dAd5F8ceE"
  const displayAddress = contractAddress

  const navItems = [
    { id: "home", label: "Home", ref: homeRef },
    { id: "buy-psx", label: "Buy PSX", ref: swapRef },
    { id: "roadmap", label: "Roadmap", href: "/roadmap" },
    { id: "glizzy-portal", label: "Glizzy Portal", href: "/glizzy-world" },
    { id: "meme-forge", label: "Meme Forge", href: "/meme-generator" },
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

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background layers */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-purple-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,136,0.04)_1px,transparent_1px)] bg-[length:60px_60px]" />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 transition-transform duration-300 ease-out"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
      </div>

      {/* Header/Terminal bar */}
      <header className="fixed top-0 inset-x-0 z-50 bg-black/90 backdrop-blur-md border-b border-cyan-400/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 text-xs font-mono text-cyan-400">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: "0.2s" }} />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
          <span className="hidden sm:block opacity-80">PSX.AGENCY // MAINFRAME v2.1.337</span>
          <span className="sm:hidden opacity-80">PSX.AGENCY</span>
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1 opacity-70">
              <Wifi className="h-3 w-3 animate-pulse" /> SECURE
            </span>
            <span className="flex items-center gap-1 text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> ONLINE
            </span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="fixed top-12 left-1/2 -translate-x-1/2 z-40 w-full max-w-5xl px-4">
        <div
          className="bg-black/60 backdrop-blur-md border border-cyan-400/20 rounded-full shadow-2xl shadow-cyan-400/10 transition-all duration-700"
          style={{
            transform: `translateY(${Math.min(scrollY * 0.05, 10)}px)`,
            opacity: Math.max(0.9, 1 - scrollY * 0.0005),
          }}
        >
          {/* Desktop nav */}
          <div className="hidden lg:flex items-center justify-center px-8 py-2">
            <div className="flex gap-2">
              {navItems.map((n) => (
                <Link key={n.id} href={n.href || "#"} passHref>
                  <Button
                    onClick={() => {
                      setActiveNav(n.id)
                      if (n.ref) scrollToSection(n.ref)
                    }}
                    className={`relative px-6 py-3 rounded-full text-sm font-mono transition-all ${
                      activeNav === n.id
                        ? "bg-cyan-400/25 text-cyan-100 shadow-lg shadow-cyan-400/25"
                        : "text-cyan-400/90 hover:bg-cyan-400/15 hover:text-cyan-100"
                    }`}
                  >
                    {n.label}
                    {activeNav === n.id && (
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 animate-pulse" />
                    )}
                  </Button>
                </Link>
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
              <Link key={n.id} href={n.href || "#"} passHref>
                <Button
                  onClick={() => {
                    setActiveNav(n.id)
                    if (n.ref) scrollToSection(n.ref)
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full text-left px-6 py-4 rounded-xl text-sm font-mono transition ${
                    activeNav === n.id
                      ? "bg-cyan-400/25 text-cyan-100 border border-cyan-400/40"
                      : "text-cyan-400/90 hover:bg-cyan-400/15 hover:text-cyan-100"
                  }`}
                >
                  {n.label}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Hero section */}
      <section
        ref={homeRef}
        className="min-h-screen flex flex-col justify-center items-center pt-32 pb-24 px-4 text-center"
      >
        <h1 className="text-8xl md:text-[12rem] font-black bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-600 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
          PSX
        </h1>
        <p className="mt-6 text-2xl md:text-4xl font-mono text-cyan-300">PRECISION. STEALTH. EXECUTION.</p>
        <p className="mt-2 text-sm md:text-base font-mono text-cyan-400/70 uppercase tracking-wider">
          PLEASE STOP XISTING. // Base Network Protocol
        </p>

        {/* Contract address */}
        <div className="mt-16 bg-black/70 border border-cyan-400/30 rounded-3xl p-1.5 backdrop-blur-sm shadow-2xl">
          <Button
            onClick={copyToClipboard}
            className={`bg-black/70 hover:bg-cyan-400/15 font-mono transition ${
              copied ? "min-w-[300px]" : "min-w-[380px]"
            }`}
          >
            {copied ? (
              <span className="text-green-400">✓ COPIED TO CLIPBOARD</span>
            ) : (
              <span className="flex items-center gap-3 text-cyan-400">
                <span className="text-sm opacity-70">CONTRACT:</span>
                <span className="tracking-tight">
                  {displayAddress.slice(0, 12)}…{displayAddress.slice(-12)}
                </span>
                <Copy className="h-4 w-4 opacity-70" />
              </span>
            )}
          </Button>
        </div>

        {/* Social icons */}
        <div className="mt-24 flex gap-8 justify-center">
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
          ].map(({ href, icon: Icon, label }, i) => (
            <Link key={label} href={href} target="_blank" rel="noopener noreferrer">
              <span className="group relative block">
                <span className="w-16 h-16 flex items-center justify-center rounded-2xl bg-black/70 border border-cyan-400/30 text-cyan-400 transition group-hover:bg-cyan-400/25 group-hover:-translate-y-2 group-hover:scale-110">
                  <Icon className="h-6 w-6 transition group-hover:scale-110" />
                </span>
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 text-xs font-mono text-cyan-400 opacity-0 group-hover:opacity-100 transition">
                  {label}
                </span>
              </span>
            </Link>
          ))}
        </div>

        {/* Call to action cards */}
        <div className="mt-24 grid md:grid-cols-2 gap-8 max-w-6xl w-full">
          {/* Trade card */}
          <Card
            className="bg-black/50 border-cyan-400/30 backdrop-blur-3xl cursor-pointer hover:bg-black/70 hover:-translate-y-2 transition"
            onClick={() => scrollToSection(swapRef)}
          >
            <CardContent className="p-8 text-center">
              <div className="w-18 h-18 flex items-center justify-center mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg">
                <Zap className="h-9 w-9" />
              </div>
              <h3 className="text-2xl font-mono font-bold text-cyan-400">INITIATE TRADE</h3>
              <p className="mt-4 text-sm text-cyan-300/80">
                Deploy advanced swap protocols to acquire PSX tokens with optimal rates.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-mono text-cyan-400">
                ACCESS TRADING TERMINAL <ArrowRight className="h-4 w-4" />
              </span>
            </CardContent>
          </Card>

          {/* Glizzy Portal card */}
          <Link href="/glizzy-world" className="block">
            <Card className="bg-black/50 border-red-400/30 backdrop-blur-3xl hover:bg-black/70 hover:-translate-y-2 transition relative overflow-hidden">
              <CardContent className="p-8 text-center relative z-10">
                <div className="w-18 h-18 flex items-center justify-center mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-lg">
                  <Lock className="h-9 w-9" />
                </div>
                <h3 className="text-2xl font-mono font-bold text-red-400">GLIZZY PORTAL</h3>
                <p className="mt-4 text-sm text-red-300/80">
                  Password-protected gaming suite exclusively for verified PSX agents.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-mono text-red-400">
                  CLASSIFIED ACCESS <Shield className="h-4 w-4" />
                </span>
              </CardContent>
              <span className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 opacity-0 hover:opacity-100 transition" />
            </Card>
          </Link>
        </div>
      </section>

      {/* Swap section */}
      <section ref={swapRef} className="py-32 px-4 bg-gradient-to-b from-black via-black/80 to-black relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,136,0.15)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15)_0%,transparent_50%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <header className="text-center mb-24">
            <span className="inline-flex items-center gap-2 px-8 py-4 border border-cyan-400/20 rounded-full bg-black/60 backdrop-blur-3xl text-sm font-mono text-cyan-400 shadow-2xl">
              <Zap className="h-5 w-5 animate-pulse" /> TRADING TERMINAL ACTIVE
            </span>
            <h2 className="mt-12 text-7xl md:text-8xl font-mono font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              ACQUIRE PSX
            </h2>
            <p className="mt-4 text-xl text-cyan-300/70 max-w-3xl mx-auto">
              Deploy our advanced trading interface for seamless PSX token acquisition
            </p>
          </header>

          {/* Three column grid */}
          <div className="grid xl:grid-cols-3 gap-12">
            {/* Left column - stats/info */}
            <div className="space-y-8">
              {/* Live market */}
              <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl hover:bg-black/80 transition">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Activity className="h-6 w-6 text-green-400 animate-pulse" />
                    <h3 className="text-xl font-mono font-bold text-cyan-400">LIVE MARKET DATA</h3>
                  </div>
                  <div className="space-y-6">
                    {[
                      ["24h Volume", "$127,420"],
                      ["Market Cap", "$2.1M"],
                      ["Holders", "1,337"],
                      ["Liquidity", "$456K"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-sm text-cyan-300/70">{label}</span>
                        <span className="font-mono font-bold text-green-400">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-cyan-400/20 flex items-center gap-2 text-xs font-mono text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> REAL-TIME UPDATES
                  </div>
                </CardContent>
              </Card>

              {/* Security */}
              <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl hover:bg-black/80 transition">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="h-6 w-6 text-blue-400" />
                    <h3 className="text-xl font-mono font-bold text-cyan-400">SECURITY PROTOCOL</h3>
                  </div>
                  {["Audited Smart Contracts", "Liquidity Locked", "Renounced Ownership", "Base Network Verified"].map(
                    (t) => (
                      <div key={t} className="flex items-center gap-3 text-sm text-cyan-300/80">
                        <span className="w-2 h-2 rounded-full bg-green-400" />
                        {t}
                      </div>
                    ),
                  )}
                </CardContent>
              </Card>

              {/* Quick actions */}
              <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl hover:bg-black/80 transition">
                <CardContent className="p-8 space-y-4">
                  <h3 className="text-xl font-mono font-bold text-cyan-400 mb-4">QUICK ACTIONS</h3>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-mono"
                  >
                    <Link
                      href="https://dexscreener.com/base/0x4444489570Afd4261d616df00DE1668dAd5F8ceE"
                      target="_blank"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" /> VIEW CHART
                    </Link>
                  </Button>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="w-full border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 font-mono"
                  >
                    <Copy className="h-4 w-4 mr-2" /> COPY CONTRACT
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-purple-400/30 text-purple-400 hover:bg-purple-400/10 font-mono"
                  >
                    <Link
                      href="https://basescan.org/address/0x4444489570Afd4261d616df00DE1668dAd5F8ceE"
                      target="_blank"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" /> VERIFY ON BASESCAN
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Center column - swap widget */}
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <SwapWidget />
              </div>
            </div>

            {/* Right column - guide/status */}
            <div className="space-y-8">
              {/* Steps */}
              <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl hover:bg-black/80 transition">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="h-6 w-6 text-purple-400" />
                    <h3 className="text-xl font-mono font-bold text-cyan-400">MISSION PROTOCOL</h3>
                  </div>
                  {[
                    ["01", "Connect Wallet", "🔗"],
                    ["02", "Select Amount", "💰"],
                    ["03", "Review & Confirm", "✅"],
                    ["04", "Mission Complete", "🎯"],
                  ].map(([step, title, icon]) => (
                    <div key={step} className="flex items-start gap-4 mb-4">
                      <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-800/60 to-purple-800/60 font-mono font-bold border border-cyan-400/30 text-cyan-100">
                        {step}
                      </span>
                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-mono text-cyan-400">
                          <span>{icon}</span> {title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Network */}
              <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl hover:bg-black/80 transition">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Wifi className="h-6 w-6 text-green-400" />
                    <h3 className="text-xl font-mono font-bold text-cyan-400">NETWORK STATUS</h3>
                  </div>
                  {[
                    ["Network", "BASE MAINNET"],
                    ["Gas Fees", "~$0.01"],
                    ["Confirmation", "~2 s"],
                  ].map(([l, v]) => (
                    <div key={l} className="flex justify-between text-sm">
                      <span className="text-cyan-300/70">{l}</span>
                      <span className="font-mono font-bold text-blue-400">{v}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-cyan-300/70">Status</span>
                    <span className="flex items-center gap-2 font-mono font-bold text-green-400">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      OPERATIONAL
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Support */}
              <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl hover:bg-black/80 transition">
                <CardContent className="p-8">
                  <h3 className="text-xl font-mono font-bold text-cyan-400 mb-6">NEED ASSISTANCE?</h3>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full mb-4 border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 font-mono"
                  >
                    <Link href="https://discord.gg/psxonbase" target="_blank">
                      <Discord className="h-4 w-4 mr-2" /> AGENT SUPPORT
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 font-mono"
                  >
                    <Link href="https://t.me/psxonbase" target="_blank">
                      <MessageCircle className="h-4 w-4 mr-2" /> TELEGRAM HQ
                    </Link>
                  </Button>
                  <p className="mt-6 pt-6 border-t border-cyan-400/20 text-center text-xs text-cyan-300/60">
                    24/7 Agent Support Available
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 backdrop-blur-sm border-t border-cyan-400/10 py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-3xl font-mono font-bold text-cyan-400 mb-4">PSX.AGENCY</h3>
            <p className="text-cyan-300/70">The People's Token on Base</p>
            <p className="mt-3 text-sm text-cyan-400/50">Classified Operations Division</p>
          </div>

          {[
            {
              title: "Quick Access",
              links: [
                { label: "Glizzy Portal", href: "/glizzy-world" },
                { label: "Meme Forge", href: "/meme-generator" },
                { label: "Roadmap", href: "/roadmap" },
                { label: "Game Portal", href: "/game-portal" },
              ],
            },
            {
              title: "Communications",
              links: [
                { label: "Discord HQ", href: "https://discord.gg/psxonbase" },
                { label: "Telegram Channel", href: "https://t.me/psxonbase" },
                { label: "Twitter/X", href: "https://x.com/PSXonBase" },
                { label: "BaseScan", href: `https://basescan.org/address/${contractAddress}` },
              ],
            },
            {
              title: "Operations",
              links: [
                { label: "Live Chart", href: `https://dexscreener.com/base/${contractAddress}` },
                { label: "Contract Address", href: "#copy-contract" },
                { label: "Audit Reports", href: "#" },
                { label: "Whitepaper", href: "#" },
              ],
            },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-xl font-mono font-semibold text-cyan-400 mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((item) => (
                  <li key={item.label}>
                    {item.href === "#copy-contract" ? (
                      <button
                        onClick={copyToClipboard}
                        className="text-cyan-300/70 hover:text-cyan-400 font-mono text-left"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        className="text-cyan-300/70 hover:text-cyan-400 font-mono"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-12 border-t border-cyan-400/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="font-mono font-bold text-lg text-cyan-400">BUILT BY DEGENERATES, POWERED BY GLIZZIES</p>
            <p className="text-sm text-cyan-400/60">
              © 2024 PSX.AGENCY • All operations classified • Not financial advice • DYOR
            </p>
          </div>

          <div className="flex gap-6">
            {[
              { href: "https://t.me/psxonbase", icon: MessageCircle },
              { href: "https://x.com/PSXonBase", icon: Twitter },
              { href: "https://discord.gg/psxonbase", icon: Discord },
            ].map(({ href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-black/60 border border-cyan-400/20 text-cyan-400 hover:bg-cyan-400/20 transition"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
