"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MemeGenerator } from "@/components/meme-generator"

export default function MemeGeneratorPage() {
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
            <h1 className="text-4xl font-bold text-white mb-4">PSX Meme Generator</h1>
            <p className="text-gray-400">Create viral memes with PSX-themed templates</p>
          </div>
        </div>

        <MemeGenerator />

        {/* Additional Features */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-black/80 rounded-lg p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-4">🔥 Trending Templates</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• Diamond Hands PSX</p>
              <p>• To The Moon</p>
              <p>• HODL Forever</p>
              <p>• When PSX Hits $1</p>
              <p>• Glizzy World Champion</p>
            </div>
          </div>

          <div className="bg-black/80 rounded-lg p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-4">📱 Share Your Memes</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• Download in high quality</p>
              <p>• Share directly to Twitter</p>
              <p>• Post in PSX Discord</p>
              <p>• Submit to meme contests</p>
              <p>• Win PSX rewards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
