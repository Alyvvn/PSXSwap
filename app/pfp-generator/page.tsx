"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PfpGenerator } from "@/components/pfp-generator"

export default function PfpGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black py-12 text-white">
      <Link href="/">
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to PSX
        </Button>
      </Link>
      <h1 className="mb-8 text-5xl font-bold text-cyan-400">PFP Generator</h1>
      <p className="mb-12 text-lg text-gray-300">Craft your unique agent identity.</p>
      <div className="w-full max-w-4xl px-4">
        <PfpGenerator />
      </div>
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
  )
}
