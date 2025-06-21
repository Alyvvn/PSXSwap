"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Lock, Gamepad2, Trophy, Eye, EyeOff, Play, Coins, Users, BarChart3 } from "lucide-react"

import { PSXSlots } from "@/components/psx-slots"
import { PSXPoker } from "@/components/psx-poker"
import { PSXBlackjack } from "@/components/psx-blackjack"

export function GamePortal() {
  /* -------------------------------------------------
   * local state
   * ------------------------------------------------- */
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [applicationText, setApplicationText] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(true) // ← set to true for demo
  const [activeGame, setActiveGame] = useState<string | null>(null)

  /* -------------------------------------------------
   * handlers
   * ------------------------------------------------- */
  const handleAuthenticate = () => {
    if (password === "glizzy123") {
      setIsAuthenticated(true)
    } else {
      alert("Incorrect password. Try 'glizzy123' for demo.")
    }
  }

  const handleApplicationSubmit = () => {
    alert("Application submitted! You'll hear back from the agency soon.")
    setApplicationText("")
  }

  /* -------------------------------------------------
   * static data
   * ------------------------------------------------- */
  const games = [
    {
      id: "slots",
      name: "PSX Slots",
      description: "Spin the reels with PSX-themed symbols",
      status: "Live",
      players: 234,
      component: PSXSlots,
      minBet: "10 PSX",
      maxBet: "1 000 PSX",
      rtp: "96.5%",
    },
    {
      id: "poker",
      name: "Crypto Poker",
      description: "Texas Hold'em with PSX stakes",
      status: "Live",
      players: 67,
      component: PSXPoker,
      minBet: "50 PSX",
      maxBet: "5 000 PSX",
      rtp: "98.2%",
    },
    {
      id: "blackjack",
      name: "Base Blackjack",
      description: "Classic 21 with crypto multipliers",
      status: "Live",
      players: 89,
      component: PSXBlackjack,
      minBet: "25 PSX",
      maxBet: "2 500 PSX",
      rtp: "99.1%",
    },
  ]

  /* -------------------------------------------------
   * authenticated flow
   * ------------------------------------------------- */
  if (isAuthenticated) {
    // 1) a specific game view
    if (activeGame) {
      const game = games.find((g) => g.id === activeGame)
      if (game) {
        const GameComponent = game.component
        return (
          <div className="max-w-6xl mx-auto" data-section="game-portal">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">🎮 {game.name}</h2>
                <p className="text-gray-400">{game.description}</p>
              </div>
              <Button
                onClick={() => setActiveGame(null)}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                ← Back to Games
              </Button>
            </div>
            <GameComponent />
          </div>
        )
      }
    }

    // 2) game directory + leaderboard
    return (
      <div className="max-w-6xl mx-auto" data-section="game-portal">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">🎮 Game Portal - Access Granted</h2>
          <Badge className="bg-green-600">Authenticated Agent</Badge>
        </div>

        {/* ---------------------------------------------
         * game selection cards
         * ------------------------------------------- */}
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

        {/* ---------------------------------------------
         * leaderboard
         * ------------------------------------------- */}
        <Card className="bg-black/80 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Agent Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* top players */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Top Players This Week</h4>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: "Agent_007", score: 15420, badge: "🥇" },
                    { rank: 2, name: "CryptoNinja", score: 12890, badge: "🥈" },
                    { rank: 3, name: "BaseHunter", score: 11250, badge: "🥉" },
                    { rank: 4, name: "PSX_Master", score: 9870, badge: "" },
                    { rank: 5, name: "GlizzyKing", score: 8940, badge: "" },
                  ].map((player) => (
                    <div key={player.rank} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-lg w-8">{player.badge || `#${player.rank}`}</span>
                        <span className="text-white font-medium">{player.name}</span>
                      </div>
                      <span className="text-purple-400 font-bold">{player.score.toLocaleString()} PSX</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* live stats */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Live Stats</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                    <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">390</div>
                    <div className="text-xs text-gray-400">Players Online</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                    <Coins className="h-6 w-6 text-green-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">2.5 M</div>
                    <div className="text-xs text-gray-400">PSX in Play</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                    <Trophy className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">125 K</div>
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
    )
  }

  /* -------------------------------------------------
   * unauthenticated flow
   * ------------------------------------------------- */
  return (
    <div className="max-w-2xl mx-auto" data-section="game-portal">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">🔒 Classified Game Portal</h2>
        <p className="text-gray-300">Access restricted to authorized agents only</p>
      </div>

      <Card className="bg-black/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Security Clearance Required
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* password entry */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Agent Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter classified password..."
                className="bg-gray-900 border-gray-600 text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Hint: Try 'glizzy123' for demo access</p>
          </div>

          <Button onClick={handleAuthenticate} className="w-full bg-red-600 hover:bg-red-700">
            Authenticate
          </Button>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Apply for Access</h3>
            <p className="text-gray-300 text-sm mb-4">
              Not an agent yet? Submit your application to join the PSX gaming division.
            </p>
            <textarea
              value={applicationText}
              onChange={(e) => setApplicationText(e.target.value)}
              placeholder="Tell us why you want to become a PSX agent..."
              className="w-full h-24 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none"
            ></textarea>
            <Button
              onClick={handleApplicationSubmit}
              variant="outline"
              className="w-full mt-4 border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
            >
              Submit Application
            </Button>
          </div>

          {/* preview panel */}
          <div className="bg-gray-900/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">What awaits inside:</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>&bull; PSX-themed slot machines with progressive jackpots</li>
              <li>&bull; Live poker tables with real PSX stakes</li>
              <li>&bull; Blackjack with crypto multipliers</li>
              <li>&bull; Exclusive agent tournaments</li>
              <li>&bull; Real-time leaderboards and rewards</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
