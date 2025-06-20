"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PFPGenerator } from "@/components/pfp-generator"

export default function PFPGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-4xl mx-auto p-4">
        <div className="pt-8 mb-8">
          <Link href="/">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to PSX
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">PSX PFP Generator</h1>
            <p className="text-gray-400">Craft your unique PSX Agent profile picture</p>
          </div>
        </div>

        <PFPGenerator />

        {/* Additional Features */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-black/80 rounded-lg p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-4">🎨 Customization Options</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• Diverse backgrounds</p>
              <p>• Unique character types</p>
              <p>• Exclusive accessories</p>
              <p>• Rarity tiers for each element</p>
            </div>
          </div>

          <div className="bg-black/80 rounded-lg p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-4">🖼️ Mint & Collect</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• Mint your PFP as an NFT</p>
              <p>• Showcase on your social profiles</p>
              <p>• Join the PSX Agent collection</p>
              <p>• Unlock future utilities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
