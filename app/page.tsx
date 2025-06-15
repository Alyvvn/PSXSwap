"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, ExternalLink, Twitter, MessageCircle, BarChart3, DiscIcon as Discord, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SwapWidget } from "@/components/swap-widget"
import { StepModal } from "@/components/step-modal"
import { MemeReel } from "@/components/meme-reel"
import { MemeGenerator } from "@/components/meme-generator"
import { PFPGenerator } from "@/components/pfp-generator"
import { GamePortal } from "@/components/game-portal"
import { InteractiveRoadmap } from "@/components/interactive-roadmap"
import { GlizzyWorld } from "@/components/glizzy-world"

export default function PSXLanding() {
  const [copied, setCopied] = useState(false)
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [activeNav, setActiveNav] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Refs for scroll sections
  const homeRef = useRef<HTMLDivElement>(null)
  const swapRef = useRef<HTMLDivElement>(null)
  const howToBuyRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const glizzyWorldRef = useRef<HTMLDivElement>(null)
  const tokenomicsRef = useRef<HTMLDivElement>(null)
  const roadmapRef = useRef<HTMLDivElement>(null)
  const toolsRef = useRef<HTMLDivElement>(null)

  const contractAddress = "0x4444489570Afd4261d616df00DE1668dAd5F8ceE"

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
    { id: "swap", label: "Swap", ref: swapRef },
    { id: "story", label: "Story", ref: storyRef },
    { id: "glizzyworld", label: "Glizzy World", ref: glizzyWorldRef },
    { id: "tokenomics", label: "Tokenomics", ref: tokenomicsRef },
    { id: "roadmap", label: "Roadmap", ref: roadmapRef },
    { id: "tools", label: "Tools", ref: toolsRef },
    { id: "buy", label: "How to Buy", ref: howToBuyRef },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Navigation Bar */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-4">
        <div className="bg-black/95 backdrop-blur-md rounded-full p-1.5 flex items-center justify-center border border-gray-700/50 shadow-2xl">
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
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 text-sm whitespace-nowrap ${
                    activeNav === item.id
                      ? "bg-gray-800 text-white shadow-lg border border-gray-600"
                      : "text-gray-400 hover:bg-gray-900/80 hover:text-white hover:border hover:border-gray-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center justify-between w-full px-2">
            <span className="text-white font-bold text-lg">PSX</span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 bg-black/95 backdrop-blur-md rounded-2xl p-4 border border-gray-700/50 shadow-2xl">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id)
                    scrollToSection(item.ref)
                    setMobileMenuOpen(false)
                  }}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm ${
                    activeNav === item.id
                      ? "bg-gray-800 text-white border border-gray-600"
                      : "text-gray-400 hover:bg-gray-900/80 hover:text-white hover:border hover:border-gray-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        ref={homeRef}
        className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-12 relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 animate-float">
            <Image src="/images/psx-hero.png" alt="PSX Dog" fill className="object-contain opacity-40" />
          </div>
          <div className="absolute bottom-20 right-10 w-40 h-40 animate-float-delayed">
            <Image src="/images/psx-chart.png" alt="PSX Chart" fill className="object-contain opacity-40" />
          </div>
          <div className="absolute top-1/2 left-5 w-24 h-24 animate-pulse">
            <Image src="/images/psx-attention.png" alt="PSX Attention" fill className="object-contain opacity-30" />
          </div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <div className="mb-12">
            <h1 className="text-7xl md:text-9xl font-black text-white mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-600 drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                PSX
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 font-light tracking-wide">PLEASE STOP XISTING.</p>
          </div>

          {/* Contract Address */}
          <div className="mb-12 flex justify-center">
            <Button
              onClick={copyToClipboard}
              className={`bg-gray-900/90 hover:bg-gray-800 text-white font-mono text-base px-8 py-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-600/50 backdrop-blur-sm ${
                copied ? "min-w-[280px]" : "min-w-[320px]"
              }`}
            >
              {copied ? (
                <span className="text-green-400 font-medium">✓ Copied to clipboard!</span>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm">CA:</span>
                  <span>
                    {contractAddress.slice(0, 12)}...{contractAddress.slice(-12)}
                  </span>
                  <Copy className="h-4 w-4 opacity-70" />
                </div>
              )}
            </Button>
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
                <div className="w-14 h-14 bg-gray-900/80 hover:bg-gray-800 rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 border border-gray-700/50 backdrop-blur-sm">
                  <social.icon className="h-6 w-6" />
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {social.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              onClick={() => scrollToSection(swapRef)}
              className="bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white font-semibold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 border border-gray-600/50 shadow-xl backdrop-blur-sm"
            >
              Buy PSX Now
            </Button>
            <Button
              onClick={() => scrollToSection(toolsRef)}
              variant="outline"
              className="border-gray-600/50 text-gray-300 hover:bg-gray-900/80 hover:text-white hover:border-gray-500 py-4 px-10 rounded-full text-lg transition-all duration-300 backdrop-blur-sm"
            >
              Meme Generator
            </Button>
          </div>
        </div>
      </section>

      {/* Meme Reel */}
      <section className="py-10 px-4 bg-black/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-4">
            <div className="h-6 w-6 rounded-full bg-red-500 animate-pulse mr-2"></div>
            <h2 className="text-xl font-bold text-white">LIVE OPS FEED // MEME INTELLIGENCE REPORT</h2>
          </div>
          <MemeReel />
        </div>
      </section>

      {/* Swap Section */}
      <section ref={swapRef} className="py-24 px-4 bg-gradient-to-b from-black/50 to-black/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">Get PSX Tokens</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Trade directly with our integrated swap interface for the best rates and seamless experience
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Steps on Left */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-8">How to Buy</h3>
                <p className="text-gray-400 mb-8">Follow these simple steps to get your PSX tokens</p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: "Connect Wallet",
                    desc: "Connect your MetaMask or compatible Web3 wallet to get started",
                    icon: "🔗",
                  },
                  {
                    step: 2,
                    title: "Select Tokens",
                    desc: "Choose ETH as input and PSX as output token for the swap",
                    icon: "🔄",
                  },
                  {
                    step: 3,
                    title: "Enter Amount",
                    desc: "Specify the amount of ETH you want to swap for PSX tokens",
                    icon: "💰",
                  },
                  {
                    step: 4,
                    title: "Confirm Swap",
                    desc: "Review transaction details and confirm your swap",
                    icon: "✅",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex items-start gap-6 p-6 bg-gray-900/30 rounded-2xl border border-gray-800/50 backdrop-blur-sm hover:bg-gray-900/50 transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center text-white font-bold text-lg border border-gray-700/50">
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{item.icon}</span>
                        <h4 className="text-white font-semibold text-lg">{item.title}</h4>
                      </div>
                      <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Swap Widget on Right */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <div className="bg-gray-900/20 p-1 rounded-3xl border border-gray-800/50 backdrop-blur-sm">
                  <SwapWidget contractAddress={contractAddress} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="py-20 px-4 bg-black/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-white glitch-text">The Secret World of PSX</h2>

          <div className="bg-black/40 backdrop-blur-md p-6 rounded-lg border border-purple-500/30 relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              <p className="text-white/90 text-lg leading-relaxed">
                PSX is more than just a meme token — it's a{" "}
                <span className="text-red-400 font-bold">covert spy agency</span> within the blockchain.
              </p>

              <p className="text-white/90 text-lg leading-relaxed">
                Agents operate in secret on the Base network, using memes to disguise their missions while building the
                ultimate crypto gaming empire.
              </p>

              <p className="text-white/90 text-lg leading-relaxed">
                The team has developed a fully functional crypto casino, and the agency is recruiting new operatives.
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
                <div className="text-white/90 text-lg font-mono">
                  JOIN THE DISCORD. DECODE THE CLUES. BECOME AN OPERATIVE.
                </div>
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
                  <Link href="https://discord.gg/cgUpjHpf" target="_blank" rel="noopener noreferrer">
                    Join the Agency <Discord className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Glizzy World Section */}
      <section ref={glizzyWorldRef} className="py-20 px-4">
        <GlizzyWorld />
      </section>

      {/* Game Portal */}
      <section className="py-20 px-4 bg-black/80 backdrop-blur-sm">
        <GamePortal />
      </section>

      {/* Tokenomics Section */}
      <section ref={tokenomicsRef} className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Tokenomics</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-black/80 border-purple-500/30">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Token Distribution</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Liquidity Pool</span>
                    <span className="text-white font-bold">80%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-300">Casino Treasury</span>
                    <span className="text-white font-bold">10%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-300">Development</span>
                    <span className="text-white font-bold">10%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-purple-500/30">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Token Utility</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-300">Casino Gaming Currency</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                    <span className="text-gray-300">Staking Rewards</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-300">Governance Voting</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">Exclusive Access</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-300">Tournament Entry</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Roadmap */}
      <section ref={roadmapRef} className="py-20 px-4 bg-black/90 backdrop-blur-sm">
        <InteractiveRoadmap />
      </section>

      {/* Tools Section */}
      <section ref={toolsRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">PSX Tools</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <MemeGenerator />
            <PFPGenerator />
          </div>
        </div>
      </section>

      {/* How to Buy Section */}
      <section ref={howToBuyRef} className="py-20 px-4 bg-black/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">How to Buy PSX</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Install MetaMask & Add Base", icon: "🦊" },
              { step: 2, title: "Fund Your Base Wallet", icon: "💰" },
              { step: 3, title: "Navigate to Uniswap", icon: "🦄" },
              { step: 4, title: "Complete Your Swap", icon: "✅" },
            ].map((item) => (
              <Card
                key={item.step}
                className="bg-black/80 border-purple-500/30 hover:border-purple-400 transition-all duration-300 group cursor-pointer"
                onClick={() => setActiveStep(item.step)}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="w-12 h-12 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <Button
                    variant="outline"
                    className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/50 backdrop-blur-sm border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">PSX</h3>
              <p className="text-gray-400">The People's Token on Base</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="#" className="text-gray-400 hover:text-purple-400 block">
                  Corporate Filings
                </Link>
                <Link href="#" className="text-gray-400 hover:text-purple-400 block">
                  Pitch Deck
                </Link>
                <Link href="#" className="text-gray-400 hover:text-purple-400 block">
                  Whitepaper
                </Link>
                <Link href="#" className="text-gray-400 hover:text-purple-400 block">
                  Legal
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Community</h4>
              <div className="space-y-2">
                <Link href="https://discord.gg/cgUpjHpf" className="text-gray-400 hover:text-purple-400 block">
                  Discord
                </Link>
                <Link href="https://t.me/psxonbase" className="text-gray-400 hover:text-purple-400 block">
                  Telegram
                </Link>
                <Link href="https://x.com/PSXonBase" className="text-gray-400 hover:text-purple-400 block">
                  Twitter
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
              <div className="space-y-2">
                <Link href="#" className="text-gray-400 hover:text-purple-400 block">
                  Documentation
                </Link>
                <Link href="#" className="text-gray-400 hover:text-purple-400 block">
                  API
                </Link>
                <Link href="#" className="text-gray-400 hover:text-purple-400 block">
                  Support
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>&copy; 2024 PSX Token. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Step Modal */}
      <StepModal step={activeStep || 1} isOpen={activeStep !== null} onClose={() => setActiveStep(null)} />
    </div>
  )
}
