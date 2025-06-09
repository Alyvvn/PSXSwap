"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, ExternalLink, Twitter, MessageCircle, Globe, BarChart3 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SwapWidget } from "@/components/swap-widget"
import { StepModal } from "@/components/step-modal"

export default function PSXLanding() {
  const [copied, setCopied] = useState(false)
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [activeNav, setActiveNav] = useState("tokenomics")

  const contractAddress = "0x768BE13e1680b5ebE0024C42c896E3dB59ec0149"

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const navItems = [
    { id: "story", label: "Story" },
    { id: "merch", label: "Merch" },
    { id: "tokenomics", label: "Tokenomics" },
    { id: "buy", label: "Buy $PSX" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600">
      {/* Navigation Bar */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
        <div className="bg-gray-200/90 backdrop-blur-sm rounded-full p-1 flex space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeNav === item.id ? "bg-blue-600 text-white shadow-lg" : "text-gray-700 hover:bg-gray-300/50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        {/* PSX on BASE Title */}
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tight">PSX on BASE</h1>
        </div>

        {/* Contract Address - Prominent Display */}
        <div className="mb-8">
          <Button
            onClick={copyToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white font-mono text-sm md:text-base px-6 py-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            CA: {contractAddress.slice(0, 10)}...{contractAddress.slice(-10)}
            <Copy className="ml-2 h-4 w-4" />
          </Button>
          {copied && <p className="text-center text-white mt-2 text-sm">Copied to clipboard!</p>}
        </div>

        {/* Social Links */}
        <div className="flex space-x-4 mb-12">
          <Link
            href="https://t.me/psxonbase"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110"
          >
            <MessageCircle className="h-5 w-5" />
          </Link>
          <Link
            href="https://x.com/PSXonBase"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110"
          >
            <Twitter className="h-5 w-5" />
          </Link>
          <Link
            href="https://dexscreener.com/base/0x768BE13e1680b5ebE0024C42c896E3dB59ec0149"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110"
          >
            <BarChart3 className="h-5 w-5" />
          </Link>
          <Link
            href="https://psxonbase.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110"
          >
            <Globe className="h-5 w-5" />
          </Link>
          <Link
            href="https://basescan.org/token/0x768BE13e1680b5ebE0024C42c896E3dB59ec0149"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110"
          >
            <ExternalLink className="h-5 w-5" />
          </Link>
        </div>

        {/* Swap Widget */}
        <div className="mb-12">
          <SwapWidget contractAddress={contractAddress} />
        </div>

        {/* Hero Image */}
        <div className="relative w-48 h-48 mb-8">
          <Image src="/images/psx-hero.png" alt="PSX Token" fill className="object-contain rounded-2xl" priority />
        </div>
      </section>

      {/* Interactive How to Buy Steps */}
      <section className="py-20 px-4 bg-black/20 backdrop-blur-sm">
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
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/40 transition-all duration-300 group cursor-pointer"
                onClick={() => setActiveStep(item.step)}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="w-12 h-12 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meme Gallery */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">The PSX Experience</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "/images/psx-store.png",
              "/images/psx-meme.png",
              "/images/psx-computer.png",
              "/images/psx-dream.png",
              "/images/psx-attention.png",
            ].map((src, index) => (
              <div key={index} className="relative aspect-square group cursor-pointer">
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`PSX Meme ${index + 1}`}
                  fill
                  className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-white mb-2">PSX</h3>
            <p className="text-white/80">The People's Token on Base</p>
          </div>
          <div className="text-white/60">
            <p>&copy; 2024 PSX Token. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Step Modal */}
      <StepModal step={activeStep || 1} isOpen={activeStep !== null} onClose={() => setActiveStep(null)} />
    </div>
  )
}
