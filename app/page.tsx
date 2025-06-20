"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DiscIcon, Github, Trophy, Users, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { GlizzyWorld } from "@/components/glizzy-world" // Import the GlizzyWorld authentication component

const SwapWidget = dynamic(() => import("@/components/swap-widget"), { ssr: false })

export default function Home() {
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({})
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    // Scroll to top on initial mount
    window.scrollTo({ top: 0, behavior: "auto" })

    // Prevent any default scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }

    const handleHashChange = () => {
      const hash = window.location.hash.substring(1)
      if (hash && sectionsRef.current[hash]) {
        sectionsRef.current[hash]?.scrollIntoView({ behavior: "smooth" })
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = sectionsRef.current[sectionId]
    if (element) {
      const offset = 80 // Adjust this value based on your fixed header height
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setActiveSection(sectionId)
    }
  }

  const navItems = [
    { label: "About PSX", section: "about" },
    { label: "Tokenomics", section: "tokenomics" },
    { label: "Roadmap", section: "roadmap" },
    { label: "Meme Generator", href: "/meme-generator" },
    { label: "PFP Generator", href: "/pfp-generator" },
    { label: "Game Portal", href: "/game-portal" },
  ]

  const footerLinks = [
    { label: "Twitter", href: "https://twitter.com/psx_official" },
    { label: "Telegram", href: "https://t.me/psx_official" },
    { label: "Discord", href: "https://discord.gg/psx_official" },
    { label: "Live Chart", href: "https://dexscreener.com/base/0xYourPSXTokenAddress" },
    { label: "Buy PSX", href: "https://app.uniswap.org/swap?outputCurrency=0xYourPSXTokenAddress&chain=base" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-mono relative">
      {/* Noise Overlay */}
      <div
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "url(/images/noise.png)",
          backgroundSize: "100px 100px",
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/placeholder-logo.svg" alt="PSX Logo" width={32} height={32} />
            <span className="text-2xl font-bold text-purple-400">PSX</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) =>
              item.href ? (
                <Link key={item.label} href={item.href}>
                  <Button variant="ghost" className="text-gray-300 hover:text-purple-400 hover:bg-gray-800">
                    {item.label}
                  </Button>
                </Link>
              ) : (
                <Button
                  key={item.label}
                  variant="ghost"
                  onClick={() => scrollToSection(item.section)}
                  className={`text-gray-300 hover:text-purple-400 hover:bg-gray-800 ${
                    activeSection === item.section ? "text-purple-400" : ""
                  }`}
                >
                  {item.label}
                </Button>
              ),
            )}
            {/* Glizzy World button now links to the authentication component */}
            <Button
              variant="ghost"
              onClick={() => scrollToSection("glizzy-world")}
              className={`text-gray-300 hover:text-purple-400 hover:bg-gray-800 ${
                activeSection === "glizzy-world" ? "text-purple-400" : ""
              }`}
            >
              Glizzy World
            </Button>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" className="text-gray-300">
              Menu
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section
          id="hero"
          ref={(el) => (sectionsRef.current.hero = el)}
          className="relative h-[calc(100vh-80px)] flex items-center justify-center text-center overflow-hidden"
        >
          <Image
            src="/images/psx-hero.png"
            alt="PSX Hero Background"
            fill
            priority
            className="object-cover object-center opacity-30"
          />
          <div className="relative z-10 p-4 max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-black leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse">
              PSX
            </h1>
            <p className="text-xl md:text-3xl text-gray-200 mb-8 font-bold tracking-wide">
              The Future of Decentralized Gaming on Base
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://app.uniswap.org/swap?outputCurrency=0xYourPSXTokenAddress&chain=base" target="_blank">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg py-3 px-8 rounded-full shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                  Buy PSX Now
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => scrollToSection("about")}
                className="border-purple-500 text-purple-300 hover:bg-purple-900/20 text-lg py-3 px-8 rounded-full transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" ref={(el) => (sectionsRef.current.about = el)} className="py-20 px-4 max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12 text-purple-400">About PSX</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                PSX is pioneering the next generation of decentralized gaming, built on the secure and scalable Base
                blockchain. We offer a unique ecosystem where players can truly own their assets, participate in
                governance, and earn rewards through engaging gameplay.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our vision is to create a vibrant community-driven platform that redefines the gaming experience,
                combining cutting-edge blockchain technology with immersive entertainment. Join us on this journey to
                the future of gaming.
              </p>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-700 shadow-lg">
              <Image
                src="/images/psx-computer.png"
                alt="PSX Gaming Setup"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12 text-pink-400">Why PSX?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-900/70 border-gray-800 hover:border-pink-500/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-pink-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Blazing Fast</h3>
                <p className="text-gray-400">Leveraging Base for lightning-fast transactions and low fees.</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/70 border-gray-800 hover:border-pink-500/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-pink-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Community Driven</h3>
                <p className="text-gray-400">Decentralized governance puts power in the hands of players.</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/70 border-gray-800 hover:border-pink-500/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 text-pink-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Play & Earn</h3>
                <p className="text-gray-400">Earn PSX tokens and exclusive NFTs through gameplay.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tokenomics Section */}
        <section
          id="tokenomics"
          ref={(el) => (sectionsRef.current.tokenomics = el)}
          className="py-20 px-4 max-w-7xl mx-auto"
        >
          <h2 className="text-5xl font-bold text-center mb-12 text-purple-400">Tokenomics</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-xl overflow-hidden border border-gray-700 shadow-lg">
              <Image src="/images/psx-chart.png" alt="Tokenomics Chart" fill className="object-cover object-center" />
            </div>
            <div>
              <h3 className="text-4xl font-bold text-white mb-6">PSX Token Distribution</h3>
              <ul className="space-y-4 text-lg text-gray-300">
                <li className="flex justify-between items-center">
                  <span>Gaming Rewards:</span>
                  <span className="text-purple-300 font-bold">40%</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Liquidity & Staking:</span>
                  <span className="text-purple-300 font-bold">25%</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Development Fund:</span>
                  <span className="text-purple-300 font-bold">15%</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Marketing & Partnerships:</span>
                  <span className="text-purple-300 font-bold">10%</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Team & Advisors:</span>
                  <span className="text-purple-300 font-bold">10%</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500 mt-6">Total Supply: 1,000,000,000 PSX</p>
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" ref={(el) => (sectionsRef.current.roadmap = el)} className="py-20 px-4 max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12 text-pink-400">Roadmap</h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gray-700 rounded-full hidden md:block" />
            <div className="space-y-16">
              <div className="flex flex-col md:flex-row items-center md:justify-between md:even:flex-row-reverse">
                <div className="w-full md:w-5/12 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-white mb-4">Q4 2024: Launch & Core Features</h3>
                  <ul className="list-disc list-inside text-lg text-gray-300 space-y-2">
                    <li>PSX Token Launch on Base</li>
                    <li>Decentralized Exchange Listing</li>
                    <li>Staking Platform Deployment</li>
                    <li>Initial Gaming DApp Release</li>
                  </ul>
                </div>
                <div className="w-2 h-2 bg-pink-500 rounded-full absolute left-1/2 -translate-x-1/2 hidden md:block" />
                <div className="w-full md:w-5/12 relative aspect-video rounded-xl overflow-hidden border border-gray-700 shadow-lg mt-8 md:mt-0">
                  <Image src="/images/psx-open.png" alt="Roadmap Phase 1" fill className="object-cover object-center" />
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center md:justify-between md:even:flex-row-reverse">
                <div className="w-full md:w-5/12 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-white mb-4">Q1 2025: Ecosystem Expansion</h3>
                  <ul className="list-disc list-inside text-lg text-gray-300 space-y-2">
                    <li>NFT Marketplace Integration</li>
                    <li>New Game Releases (Poker, Blackjack)</li>
                    <li>Community Governance Portal</li>
                    <li>Strategic Partnerships</li>
                  </ul>
                </div>
                <div className="w-2 h-2 bg-pink-500 rounded-full absolute left-1/2 -translate-x-1/2 hidden md:block" />
                <div className="w-full md:w-5/12 relative aspect-video rounded-xl overflow-hidden border border-gray-700 shadow-lg mt-8 md:mt-0">
                  <Image
                    src="/images/psx-store.png"
                    alt="Roadmap Phase 2"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center md:justify-between md:even:flex-row-reverse">
                <div className="w-full md:w-5/12 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-white mb-4">Q2 2025: Global Adoption</h3>
                  <ul className="list-disc list-inside text-lg text-gray-300 space-y-2">
                    <li>Mobile App Launch</li>
                    <li>Cross-chain Interoperability</li>
                    <li>Esports Tournament Series</li>
                    <li>Global Marketing Campaigns</li>
                  </ul>
                </div>
                <div className="w-2 h-2 bg-pink-500 rounded-full absolute left-1/2 -translate-x-1/2 hidden md:block" />
                <div className="w-full md:w-5/12 relative aspect-video rounded-xl overflow-hidden border border-gray-700 shadow-lg mt-8 md:mt-0">
                  <Image
                    src="/images/psx-dream.png"
                    alt="Roadmap Phase 3"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Glizzy World Authentication Section */}
        <section
          id="glizzy-world"
          ref={(el) => (sectionsRef.current["glizzy-world"] = el)}
          className="py-20 px-4 max-w-7xl mx-auto flex justify-center items-center"
        >
          <GlizzyWorld />
        </section>

        {/* Swap Widget Section */}
        <section className="py-20 px-4 max-w-7xl mx-auto flex justify-center items-center">
          <SwapWidget />
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 max-w-7xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30">
            <h2 className="text-4xl font-bold text-white mb-4">Join the PSX Revolution!</h2>
            <p className="text-lg text-gray-300 mb-8">
              Become an early adopter and shape the future of decentralized gaming.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://app.uniswap.org/swap?outputCurrency=0xYourPSXTokenAddress&chain=base" target="_blank">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg py-3 px-8 rounded-full shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                  Buy PSX Now
                </Button>
              </Link>
              <Link href="https://discord.gg/psx_official" target="_blank">
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-300 hover:bg-purple-900/20 text-lg py-3 px-8 rounded-full transition-all duration-300"
                >
                  Join Our Community
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/80 border-t border-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <Image src="/placeholder-logo.svg" alt="PSX Logo" width={24} height={24} />
            <span>&copy; 2025 PSX. All rights reserved.</span>
          </div>
          <nav className="flex gap-6">
            {footerLinks.map((item) => (
              <Link key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                <Button variant="link" className="text-gray-400 hover:text-purple-400">
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/psx_official" target="_blank" rel="noopener noreferrer">
              <Github className="h-6 w-6 hover:text-purple-400 transition-colors" />
            </Link>
            <Link href="https://discord.gg/psx_official" target="_blank" rel="noopener noreferrer">
              <DiscIcon className="h-6 w-6 hover:text-purple-400 transition-colors" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
