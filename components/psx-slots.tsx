"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Coins, RotateCcw, TrendingUp, Zap } from "lucide-react"
import Image from "next/image"

export function PSXSlots() {
  const [balance, setBalance] = useState(1000)
  const [bet, setBet] = useState(10)
  const [isSpinning, setIsSpinning] = useState(false)
  const [reels, setReels] = useState([0, 0, 0])
  const [lastWin, setLastWin] = useState(0)
  const [totalWins, setTotalWins] = useState(0)
  const [spinCount, setSpinCount] = useState(0)

  const symbols = [
    { name: "PSX", multiplier: 10, image: "/images/pfp-character.png" }, // Updated image
    { name: "Diamond", multiplier: 5, image: "/images/meme-templates/template-1.png" }, // Updated image
    { name: "Star", multiplier: 3, image: "/images/meme-templates/template-2.png" }, // Updated image
    { name: "Cherry", multiplier: 2, image: "/images/meme-templates/template-3.png" }, // Updated image
    { name: "Bell", multiplier: 1.5, image: "/images/meme-templates/template-4.png" }, // Updated image
    { name: "Seven", multiplier: 1, image: "/images/meme-templates/template-5.png" }, // Updated image
  ]

  const spin = () => {
    if (balance < bet || isSpinning) return

    setIsSpinning(true)
    setBalance(balance - bet)
    setSpinCount(spinCount + 1)

    // Simulate spinning animation
    const spinDuration = 2000
    const spinInterval = setInterval(() => {
      setReels([
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length),
      ])
    }, 100)

    setTimeout(() => {
      clearInterval(spinInterval)

      // Final result
      const finalReels = [
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length),
      ]
      setReels(finalReels)

      // Check for wins
      let winAmount = 0
      if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
        // Three of a kind
        winAmount = bet * symbols[finalReels[0]].multiplier * 3
      } else if (
        finalReels[0] === finalReels[1] ||
        finalReels[1] === finalReels[2] ||
        finalReels[0] === finalReels[2]
      ) {
        // Two of a kind
        const matchingSymbol = finalReels[0] === finalReels[1] ? finalReels[0] : finalReels[1]
        winAmount = bet * symbols[matchingSymbol].multiplier
      }

      if (winAmount > 0) {
        setBalance(balance - bet + winAmount)
        setLastWin(winAmount)
        setTotalWins(totalWins + winAmount)
      } else {
        setLastWin(0)
      }

      setIsSpinning(false)
    }, spinDuration)
  }

  const maxBet = () => setBet(Math.min(balance, 100))
  const resetGame = () => {
    setBalance(1000)
    setBet(10)
    setLastWin(0)
    setTotalWins(0)
    setSpinCount(0)
    setReels([0, 0, 0])
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Game Area */}
        <div className="md:col-span-2">
          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white text-center text-2xl">PSX SLOTS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Slot Machine */}
              <div className="bg-black/50 rounded-lg p-6 border border-purple-500/30">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {reels.map((symbolIndex, index) => (
                    <div
                      key={index}
                      className={`aspect-square bg-gray-800 rounded-lg flex items-center justify-center border-2 border-purple-500/50 ${
                        isSpinning ? "animate-pulse" : ""
                      }`}
                    >
                      <Image
                        src={symbols[symbolIndex].image || "/placeholder.png"}
                        alt={symbols[symbolIndex].name}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>

                {/* Win Display */}
                {lastWin > 0 && (
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-yellow-400 animate-pulse">WIN: {lastWin} PSX!</div>
                  </div>
                )}

                {/* Controls */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-sm text-gray-300 mb-1 block">Bet Amount</label>
                      <Input
                        type="number"
                        value={bet}
                        onChange={(e) => setBet(Math.max(1, Math.min(balance, Number.parseInt(e.target.value) || 1)))}
                        className="bg-gray-800 border-gray-600 text-white"
                        min="1"
                        max={balance}
                      />
                    </div>
                    <Button
                      onClick={maxBet}
                      variant="outline"
                      className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                    >
                      Max Bet
                    </Button>
                  </div>

                  <Button
                    onClick={spin}
                    disabled={balance < bet || isSpinning}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 text-lg"
                  >
                    {isSpinning ? "SPINNING..." : "SPIN"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Panel */}
        <div className="space-y-6">
          {/* Balance */}
          <Card className="bg-black/80 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Coins className="h-5 w-5" />
                Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{balance} PSX</div>
              <p className="text-gray-400 text-sm">Available to bet</p>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="bg-black/80 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Session Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Spins:</span>
                <span className="text-white">{spinCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Wins:</span>
                <span className="text-green-400">{totalWins} PSX</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Last Win:</span>
                <span className="text-yellow-400">{lastWin} PSX</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Win Rate:</span>
                <span className="text-white">
                  {spinCount > 0 ? ((totalWins / (spinCount * bet)) * 100).toFixed(1) : 0}%
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Paytable */}
          <Card className="bg-black/80 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Paytable
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {symbols.map((symbol, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Image src={symbol.image || "/placeholder.png"} alt={symbol.name} width={20} height={20} />
                    <span className="text-gray-300">{symbol.name}</span>
                  </div>
                  <span className="text-yellow-400">{symbol.multiplier}x</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Reset */}
          <Button
            onClick={resetGame}
            variant="outline"
            className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Game
          </Button>
        </div>
      </div>
    </div>
  )
}
