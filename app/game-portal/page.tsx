"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GamePortal } from "@/components/game-portal"

export default function GamePortalPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black py-12 text-white">
      <Link href="/">
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to PSX
        </Button>
      </Link>
      <h1 className="mb-8 text-5xl font-bold text-cyan-400">Game Portal</h1>
      <p className="mb-12 text-lg text-gray-300">Access classified gaming operations.</p>
      <div className="w-full max-w-4xl px-4">
        <GamePortal />
      </div>
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
  )
}
