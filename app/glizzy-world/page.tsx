"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"
import { GlizzySlots } from "@/components/glizzy-slots"
import { GlizzyPoker } from "@/components/glizzy-poker"
import { GlizzyBlackjack } from "@/components/glizzy-blackjack"

export default function GlizzyWorldPage() {
  const [activeGame, setActiveGame] = useState<string | null>(null)

  const games = [
    {
      id: "slots",
      name: "Glizzy Slots",
      description: "Spin the reels with Glizzy-themed symbols",
      status: "Live",
      players: 234,
      component: GlizzySlots,
      minBet: "10 Glizzys",
      maxBet: "1,000 Glizzys",
      rtp: "96.5%",
    },
    {
      id: "poker",
      name: "Glizzy Poker",
      description: "Texas Hold'em with Glizzy stakes",
      status: "Live",
      players: 67,
      component: GlizzyPoker,
      minBet: "50 Glizzys",
      maxBet: "5,000 Glizzys",
      rtp: "98.2%",
    },
    {
      id: "blackjack",
      name: "Glizzy Blackjack",
      description: "Classic 21 with Glizzy multipliers",
      status: "Live",
      players: 89,
      component: GlizzyBlackjack,
      minBet: "25 Glizzys",
      maxBet: "2,500 Glizzys",
      rtp: "99.1%",
    },
  ]

  if (activeGame) {
    const game = games.find((g) => g.id === activeGame)
    if (game) {
      const GameComponent = game.component
      return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img
              src="/images/glizzy-world-bg.png"
              alt="Glizzy World Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="max-w-6xl mx-auto p-4 relative z-10">
            <div className="flex items-center justify-between mb-8 pt-8">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">🎰 {game.name}</h2>
                <p className="text-gray-400">{game.description}</p>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() => setActiveGame(null)}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  ← Back to Games
                </Button>
                <Link href="/">
                  <Button variant="outline" className="bg-black text-white border-gray-700 hover:bg-gray-800">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Home
                  </Button>
                </Link>
              </div>
            </div>
            <GameComponent />
          </div>
        </div>
      )
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black py-12 text-white">
      <h1 className="mb-8 text-5xl font-bold text-red-400 flex items-center gap-4">
        <Sparkles className="h-10 w-10 text-pink-400 animate-pulse" />
        GLIZZY WORLD CASINO
        <Sparkles className="h-10 w-10 text-pink-400 animate-pulse" />
      </h1>
      <p className="mb-12 text-lg text-red-300">Exclusive gaming for PSX agents.</p>

      <div className="w-full max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="bg-black/70 border-red-500/30 backdrop-blur-xl shadow-red-500/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-red-400">Glizzy Slots</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <GlizzySlots />
          </CardContent>
        </Card>

        <Card className="bg-black/70 border-red-500/30 backdrop-blur-xl shadow-red-500/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-red-400">Glizzy Blackjack</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <GlizzyBlackjack />
          </CardContent>
        </Card>

        <Card className="bg-black/70 border-red-500/30 backdrop-blur-xl shadow-red-500/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-red-400">Glizzy Poker</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <GlizzyPoker />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
