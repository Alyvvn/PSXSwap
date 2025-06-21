"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Trophy, Play, Coins, Users, BarChart3, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { GlizzySlots } from "@/components/glizzy-slots"
import { GlizzyPoker } from "@/components/glizzy-poker"
import { GlizzyBlackjack } from "@/components/glizzy-blackjack"

export default function GlizzyWorldCasinoPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img src="/images/glizzy-world-bg.png" alt="Glizzy World Background" className="w-full h-full object-cover" />
      </div>
      <div className="max-w-6xl mx-auto p-4 relative z-10">
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button variant="outline" className="bg-black text-white border-gray-700 hover:bg-gray-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to PSX
              </Button>
            </Link>
            {/* Removed Authenticated Agent Badge */}
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">🎰 Glizzy World Casino</h2>
          <p className="text-gray-400">Welcome to the exclusive Glizzy gaming suite</p>
        </div>

        {/* Game Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {games.map((game) => (
            <Card key={game.id} className="bg-black/80 border-gray-700 hover:border-purple-500/50 transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Gamepad2 className="h-5 w-5" />
                    {game.name}
                  </CardTitle>
                  <Badge className={game.status === "Live" ? "bg-green-600" : "bg-gray-600"}>{game.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 text-sm">{game.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Players Online:</span>
                    <span className="text-white">{game.players}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Min Bet:</span>
                    <span className="text-white">{game.minBet}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Bet:</span>
                    <span className="text-white">{game.maxBet}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">RTP:</span>
                    <span className="text-green-400">{game.rtp}</span>
                  </div>
                </div>

                <Button
                  onClick={() => setActiveGame(game.id)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Play Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leaderboard */}
        <Card className="bg-black/80 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Glizzy World Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Top Players This Week</h4>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: "GlizzyMaster", score: 15420, badge: "🥇" },
                    { rank: 2, name: "HotDogKing", score: 12890, badge: "🥈" },
                    { rank: 3, name: "SausageSlayer", score: 11250, badge: "🥉" },
                    { rank: 4, name: "GrillGod", score: 9870, badge: "" },
                    { rank: 5, name: "MustardMafia", score: 8940, badge: "" },
                  ].map((player) => (
                    <div key={player.rank} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-lg w-8">{player.badge || `#${player.rank}`}</span>
                        <span className="text-white font-medium">{player.name}</span>
                      </div>
                      <span className="text-purple-400 font-bold">{player.score.toLocaleString()} Glizzys</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Live Casino Stats</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                    <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">390</div>
                    <div className="text-xs text-gray-400">Players Online</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                    <Coins className="h-6 w-6 text-green-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">2.5M</div>
                    <div className="text-xs text-gray-400">Glizzys in Play</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                    <Trophy className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">125K</div>
                    <div className="text-xs text-gray-400">Biggest Win</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                    <BarChart3 className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">96.8%</div>
                    <div className="text-xs text-gray-400">Avg RTP</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
