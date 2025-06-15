"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Coins, RotateCcw, TrendingUp } from "lucide-react"

export function PSXBlackjack() {
  const [balance, setBalance] = useState(2500)
  const [bet, setBet] = useState(25)
  const [gameState, setGameState] = useState<"betting" | "playing" | "finished">("betting")
  const [playerCards, setPlayerCards] = useState<number[]>([])
  const [dealerCards, setDealerCards] = useState<number[]>([])
  const [playerScore, setPlayerScore] = useState(0)
  const [dealerScore, setDealerScore] = useState(0)
  const [gameResult, setGameResult] = useState<string>("")
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)

  const getCardValue = (card: number) => {
    if (card > 10) return 10
    return card
  }

  const calculateScore = (cards: number[]) => {
    let score = 0
    let aces = 0

    for (const card of cards) {
      if (card === 1) {
        aces++
        score += 11
      } else {
        score += getCardValue(card)
      }
    }

    while (score > 21 && aces > 0) {
      score -= 10
      aces--
    }

    return score
  }

  const drawCard = () => Math.floor(Math.random() * 13) + 1

  const startGame = () => {
    if (balance < bet) return

    setBalance(balance - bet)
    const newPlayerCards = [drawCard(), drawCard()]
    const newDealerCards = [drawCard(), drawCard()]

    setPlayerCards(newPlayerCards)
    setDealerCards(newDealerCards)
    setPlayerScore(calculateScore(newPlayerCards))
    setDealerScore(calculateScore(newDealerCards))
    setGameState("playing")
    setGameResult("")
  }

  const hit = () => {
    const newCard = drawCard()
    const newPlayerCards = [...playerCards, newCard]
    const newScore = calculateScore(newPlayerCards)

    setPlayerCards(newPlayerCards)
    setPlayerScore(newScore)

    if (newScore > 21) {
      setGameResult("Bust! Dealer wins.")
      setLosses(losses + 1)
      setGameState("finished")
    }
  }

  const stand = () => {
    const newDealerCards = [...dealerCards]
    let newDealerScore = dealerScore

    while (newDealerScore < 17) {
      const newCard = drawCard()
      newDealerCards.push(newCard)
      newDealerScore = calculateScore(newDealerCards)
    }

    setDealerCards(newDealerCards)
    setDealerScore(newDealerScore)

    let result = ""
    let winAmount = 0

    if (newDealerScore > 21) {
      result = "Dealer busts! You win!"
      winAmount = bet * 2
      setWins(wins + 1)
    } else if (playerScore > newDealerScore) {
      result = "You win!"
      winAmount = bet * 2
      setWins(wins + 1)
    } else if (playerScore < newDealerScore) {
      result = "Dealer wins!"
      setLosses(losses + 1)
    } else {
      result = "Push! It's a tie."
      winAmount = bet
    }

    setBalance(balance + winAmount)
    setGameResult(result)
    setGameState("finished")
  }

  const newGame = () => {
    setGameState("betting")
    setPlayerCards([])
    setDealerCards([])
    setPlayerScore(0)
    setDealerScore(0)
    setGameResult("")
  }

  const resetStats = () => {
    setBalance(2500)
    setWins(0)
    setLosses(0)
    newGame()
  }

  const renderCard = (card: number, hidden = false) => {
    if (hidden) {
      return (
        <div className="w-16 h-24 bg-blue-900 rounded border-2 border-blue-700 flex items-center justify-center">
          <span className="text-white text-xs">PSX</span>
        </div>
      )
    }

    const suits = ["♠", "♥", "♦", "♣"]
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    const suit = suits[Math.floor(Math.random() * 4)]
    const value = values[card - 1]
    const isRed = suit === "♥" || suit === "♦"

    return (
      <div className="w-16 h-24 bg-white rounded border-2 border-gray-300 flex flex-col items-center justify-center">
        <span className={`text-lg font-bold ${isRed ? "text-red-500" : "text-black"}`}>{value}</span>
        <span className={`text-lg ${isRed ? "text-red-500" : "text-black"}`}>{suit}</span>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Game Area */}
        <div className="md:col-span-2">
          <Card className="bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white text-center text-2xl">PSX BLACKJACK</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dealer's Hand */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Dealer {gameState === "playing" ? "(Hidden)" : `(${dealerScore})`}
                </h3>
                <div className="flex gap-2 justify-center mb-4">
                  {dealerCards.map((card, index) => (
                    <div key={index}>{renderCard(card, gameState === "playing" && index === 1)}</div>
                  ))}
                </div>
              </div>

              {/* Player's Hand */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Your Hand ({playerScore})</h3>
                <div className="flex gap-2 justify-center mb-4">
                  {playerCards.map((card, index) => (
                    <div key={index}>{renderCard(card)}</div>
                  ))}
                </div>
              </div>

              {/* Game Result */}
              {gameResult && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-4">{gameResult}</div>
                </div>
              )}

              {/* Game Controls */}
              <div className="space-y-4">
                {gameState === "betting" && (
                  <>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <label className="text-sm text-gray-300 mb-1 block">Bet Amount</label>
                        <Input
                          type="number"
                          value={bet}
                          onChange={(e) =>
                            setBet(Math.max(25, Math.min(balance, Number.parseInt(e.target.value) || 25)))
                          }
                          className="bg-gray-800 border-gray-600 text-white"
                          min="25"
                          max={balance}
                        />
                      </div>
                      <Button
                        onClick={() => setBet(Math.min(balance, 100))}
                        variant="outline"
                        className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                      >
                        Max Bet
                      </Button>
                    </div>
                    <Button
                      onClick={startGame}
                      disabled={balance < bet}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 text-lg"
                    >
                      Deal Cards
                    </Button>
                  </>
                )}

                {gameState === "playing" && (
                  <div className="flex gap-4">
                    <Button
                      onClick={hit}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Hit
                    </Button>
                    <Button
                      onClick={stand}
                      className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                    >
                      Stand
                    </Button>
                  </div>
                )}

                {gameState === "finished" && (
                  <Button
                    onClick={newGame}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 text-lg"
                  >
                    New Game
                  </Button>
                )}
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
                <span className="text-gray-400">Wins:</span>
                <span className="text-green-400">{wins}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Losses:</span>
                <span className="text-red-400">{losses}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Win Rate:</span>
                <span className="text-white">
                  {wins + losses > 0 ? ((wins / (wins + losses)) * 100).toFixed(1) : 0}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Current Bet:</span>
                <span className="text-yellow-400">{bet} PSX</span>
              </div>
            </CardContent>
          </Card>

          {/* Rules */}
          <Card className="bg-black/80 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-sm">Quick Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-gray-400">
              <p>• Get as close to 21 as possible</p>
              <p>• Aces count as 1 or 11</p>
              <p>• Face cards count as 10</p>
              <p>• Dealer must hit on 16</p>
              <p>• Blackjack pays 3:2</p>
            </CardContent>
          </Card>

          {/* Reset */}
          <Button
            onClick={resetStats}
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
