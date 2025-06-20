"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GamePortal } from "@/components/game-portal"

export default function GamePortalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto p-4">
        <div className="pt-8 mb-8">
          <Link href="/">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to PSX
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">PSX Game Portal</h1>
            <p className="text-gray-400">Access exclusive PSX-themed games</p>
          </div>
        </div>

        <GamePortal />

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-black/80 rounded-lg p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-4">🏆 Tournaments & Rewards</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• Compete in daily and weekly tournaments</p>
              <p>• Win exclusive PSX token prizes</p>
              <p>• Climb the global leaderboards</p>
              <p>• Unlock special agent achievements</p>
            </div>
          </div>

          <div className="bg-black/80 rounded-lg p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-4">🔒 Secure & Fair Gaming</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• Provably fair algorithms for all games</p>
              <p>• Secure blockchain transactions</p>
              <p>• Instant deposits and withdrawals</p>
              <p>• Dedicated agent support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
