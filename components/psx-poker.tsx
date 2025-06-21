"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, Users, Clock } from "lucide-react"

export function PSXPoker() {
  const [balance, setBalance] = useState(5000)
  const [currentBet, setCurrentBet] = useState(0)
  const [gameState, setGameState] = useState<"waiting" | "betting" | "playing">("waiting")

  const players = [
    { name: "You", chips: balance, status: "active", position: "bottom" },
    { name: "Agent_007", chips: 3200, status: "active", position: "left" },
    { name: "CryptoNinja", chips: 4800, status: "folded", position: "top" },
    { name: "BaseHunter", chips: 2100, status: "active", position: "right" },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <Card className="bg-black/80 border-gray-700">
          <CardContent className="p-4 text-center">
            <Coins className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{balance}</div>
            <div className="text-sm text-gray-400">Your Chips</div>
          </CardContent>
        </Card>
        <Card className="bg-black/80 border-gray-700">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">4/6</div>
            <div className="text-sm text-gray-400">Players</div>
          </CardContent>
        </Card>
        <Card className="bg-black/80 border-gray-700">
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">1,250</div>
            <div className="text-sm text-gray-400">Pot Size</div>
          </CardContent>
        </Card>
        <Card className="bg-black/80 border-gray-700">
          <CardContent className="p-4 text-center">
            <Badge className="bg-green-600 mb-2">Live</Badge>
            <div className="text-sm text-gray-400">Table Status</div>
          </CardContent>
        </Card>
      </div>

      {/* Poker Table */}
      <Card className="bg-gradient-to-br from-green-900/30 to-green-800/30 border-green-500/30 mb-6">
        <CardHeader>
          <CardTitle className="text-white text-center">Texas Hold'em - PSX Stakes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-[16/10] bg-green-800/50 rounded-lg border-4 border-green-600/30 p-8">
            {/* Community Cards */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((card) => (
                  <div
                    key={card}
                    className="w-12 h-16 bg-white rounded border-2 border-gray-300 flex items-center justify-center"
                  >
                    <span className="text-black text-xs">?</span>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">1,250 PSX</div>
                <div className="text-sm text-gray-300">Pot</div>
              </div>
            </div>

            {/* Player Positions */}
            {players.map((player, index) => (
              <div
                key={index}
                className={`absolute ${
                  player.position === "bottom"
                    ? "bottom-4 left-1/2 transform -translate-x-1/2"
                    : player.position === "top"
                      ? "top-4 left-1/2 transform -translate-x-1/2"
                      : player.position === "left"
                        ? "left-4 top-1/2 transform -translate-y-1/2"
                        : "right-4 top-1/2 transform -translate-y-1/2"
                }`}
              >
                <div className="bg-gray-900/80 rounded-lg p-3 text-center border border-gray-600">
                  <div className="text-white font-semibold text-sm">{player.name}</div>
                  <div className="text-green-400 text-xs">{player.chips} PSX</div>
                  <Badge className={`text-xs mt-1 ${player.status === "active" ? "bg-green-600" : "bg-gray-600"}`}>
                    {player.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Game Controls */}
      <Card className="bg-black/80 border-gray-700">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white mb-2">Your Turn</h3>
            <p className="text-gray-400">Choose your action</p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-500/10"
              onClick={() => setGameState("waiting")}
            >
              Fold
            </Button>
            <Button
              variant="outline"
              className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
              onClick={() => setCurrentBet(50)}
            >
              Check
            </Button>
            <Button
              variant="outline"
              className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
              onClick={() => setCurrentBet(100)}
            >
              Call (100 PSX)
            </Button>
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => setCurrentBet(200)}
            >
              Raise (200 PSX)
            </Button>
            <Button
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
              onClick={() => setCurrentBet(balance)}
            >
              All In
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Game is in demo mode. Connect your wallet to play with real PSX tokens.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
