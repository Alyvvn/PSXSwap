"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

type PlayingCard = {
  suit: string
  rank: string
  value: number
}

const suits = ["♠️", "♥️", "♦️", "♣️"]
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]

const getCardValue = (rank: string): number => {
  if (rank === "A") return 14 // For poker ranking, Ace is high
  if (rank === "K") return 13
  if (rank === "Q") return 12
  if (rank === "J") return 11
  return Number.parseInt(rank)
}

const createDeck = (): PlayingCard[] => {
  const deck: PlayingCard[] = []
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank, value: getCardValue(rank) })
    }
  }
  return shuffleDeck(deck)
}

const shuffleDeck = (deck: PlayingCard[]): PlayingCard[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

// Simplified hand evaluation for demonstration (e.g., just checking for pairs)
const evaluateHand = (hand: PlayingCard[]): string => {
  if (hand.length < 2) return "Incomplete Hand"

  const rankCounts: { [key: string]: number } = {}
  for (const card of hand) {
    rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1
  }

  const pairs = Object.values(rankCounts).filter((count) => count === 2).length
  const threes = Object.values(rankCounts).filter((count) => count === 3).length
  const fours = Object.values(rankCounts).filter((count) => count === 4).length

  if (fours > 0) return "Four of a Kind!"
  if (threes > 0 && pairs > 0) return "Full House!"
  if (threes > 0) return "Three of a Kind!"
  if (pairs === 2) return "Two Pair!"
  if (pairs === 1) return "One Pair!"

  return "High Card"
}

export function GlizzyPoker() {
  const [deck, setDeck] = useState<PlayingCard[]>([])
  const [playerHand, setPlayerHand] = useState<PlayingCard[]>([])
  const [communityCards, setCommunityCards] = useState<PlayingCard[]>([])
  const [balance, setBalance] = useState(1000)
  const [bet, setBet] = useState(0)
  const [message, setMessage] = useState("Place your bet to start!")
  const [gamePhase, setGamePhase] = useState<"betting" | "pre_flop" | "flop" | "turn" | "river" | "results">("betting")
  const [inputBet, setInputBet] = useState("")

  const dealSoundRef = useRef<HTMLAudioElement>(null)
  const chipSoundRef = useRef<HTMLAudioElement>(null)
  const winSoundRef = useRef<HTMLAudioElement>(null)
  const loseSoundRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Preload sounds
    if (dealSoundRef.current) dealSoundRef.current.load()
    if (chipSoundRef.current) chipSoundRef.current.load()
    if (winSoundRef.current) winSoundRef.current.load()
    if (loseSoundRef.current) loseSoundRef.current.load()
  }, [])

  const playSound = (audioRef: React.RefObject<HTMLAudioElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((e) => console.error("Error playing sound:", e))
    }
  }

  const startGame = () => {
    if (bet <= 0 || bet > balance) {
      setMessage("Invalid bet amount!")
      return
    }
    playSound(chipSoundRef)
    setBalance((prev) => prev - bet)
    const newDeck = createDeck()
    setDeck(newDeck)
    setPlayerHand([newDeck.pop()!, newDeck.pop()!])
    setCommunityCards([])
    setMessage("Dealing hole cards...")
    setGamePhase("pre_flop")
    playSound(dealSoundRef)
  }

  const dealFlop = () => {
    if (deck.length < 3) {
      setMessage("Not enough cards for flop!")
      return
    }
    playSound(dealSoundRef)
    const newDeck = [...deck]
    setCommunityCards([newDeck.pop()!, newDeck.pop()!, newDeck.pop()!])
    setDeck(newDeck)
    setMessage("Flop dealt!")
    setGamePhase("flop")
  }

  const dealTurn = () => {
    if (deck.length < 1) {
      setMessage("Not enough cards for turn!")
      return
    }
    playSound(dealSoundRef)
    const newDeck = [...deck]
    setCommunityCards((prev) => [...prev, newDeck.pop()!])
    setDeck(newDeck)
    setMessage("Turn dealt!")
    setGamePhase("turn")
  }

  const dealRiver = () => {
    if (deck.length < 1) {
      setMessage("Not enough cards for river!")
      return
    }
    playSound(dealSoundRef)
    const newDeck = [...deck]
    setCommunityCards((prev) => [...prev, newDeck.pop()!])
    setDeck(newDeck)
    setMessage("River dealt! Showdown!")
    setGamePhase("river")
  }

  const showdown = () => {
    const fullHand = [...playerHand, ...communityCards]
    const handResult = evaluateHand(fullHand)
    setMessage(`Your best hand: ${handResult}`)
    // Simplified win condition: if player has at least a pair, they win
    if (handResult.includes("Pair") || handResult.includes("Kind") || handResult.includes("House")) {
      setBalance((prev) => prev + bet * 3) // Example payout
      playSound(winSoundRef)
    } else {
      playSound(loseSoundRef)
    }
    setGamePhase("results")
  }

  const resetGame = () => {
    setPlayerHand([])
    setCommunityCards([])
    setBet(0)
    setInputBet("")
    setMessage("Place your bet to start!")
    setGamePhase("betting")
  }

  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputBet(value)
    const numValue = Number.parseInt(value)
    if (!isNaN(numValue) && numValue > 0 && numValue <= balance) {
      setBet(numValue)
    } else {
      setBet(0)
    }
  }

  const getCardColor = (suit: string) => {
    return suit === "♥️" || suit === "♦️" ? "text-red-500" : "text-black"
  }

  return (
    <Card className="w-full max-w-3xl bg-black/70 border-red-500/30 backdrop-blur-xl shadow-red-500/20">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl font-bold text-red-400 flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-pink-400 animate-pulse" />
          Glizzy Poker
          <Sparkles className="h-8 w-8 text-pink-400 animate-pulse" />
        </CardTitle>
        <p className="text-red-300/80 text-sm mt-2">Go all-in for the Glizzy!</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 p-6">
        <div className="w-full flex justify-between items-center text-red-300 font-mono text-lg">
          <span>BALANCE: ${balance}</span>
          <span>CURRENT BET: ${bet}</span>
        </div>

        {/* Community Cards */}
        <div className="w-full bg-red-900/20 rounded-lg p-4 border border-red-500/30 shadow-inner">
          <h3 className="text-red-400 font-mono text-lg mb-2">COMMUNITY CARDS</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {communityCards.length === 0 ? (
              <p className="text-red-300/60">No community cards yet.</p>
            ) : (
              communityCards.map((card, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-20 h-28 bg-white rounded-md flex flex-col items-center justify-center text-xl font-bold border-2 border-gray-400",
                    getCardColor(card.suit),
                  )}
                >
                  <span>{card.rank}</span>
                  <span className="text-3xl">{card.suit}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Player's Hand */}
        <div className="w-full bg-red-900/20 rounded-lg p-4 border border-red-500/30 shadow-inner">
          <h3 className="text-red-400 font-mono text-lg mb-2">YOUR HAND</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {playerHand.length === 0 ? (
              <p className="text-red-300/60">Deal to see your hand.</p>
            ) : (
              playerHand.map((card, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-20 h-28 bg-white rounded-md flex flex-col items-center justify-center text-xl font-bold border-2 border-gray-400",
                    getCardColor(card.suit),
                  )}
                >
                  <span>{card.rank}</span>
                  <span className="text-3xl">{card.suit}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="text-center text-red-200 font-mono text-lg mt-2">{message}</div>

        {gamePhase === "betting" && (
          <div className="w-full flex flex-col gap-4">
            <input
              type="number"
              value={inputBet}
              onChange={handleBetChange}
              placeholder="Enter bet amount"
              className="w-full p-3 rounded-md bg-red-900/30 border border-red-500/50 text-red-200 placeholder:text-red-400/70 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Button
              onClick={startGame}
              disabled={bet === 0 || bet > balance}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white text-xl py-6 font-bold uppercase tracking-wider shadow-lg shadow-red-500/30 hover:from-red-700 hover:to-pink-700"
            >
              PLACE BET & DEAL
            </Button>
          </div>
        )}

        {gamePhase === "pre_flop" && (
          <Button
            onClick={dealFlop}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white text-xl py-6 font-bold uppercase tracking-wider shadow-lg shadow-red-500/30 hover:from-red-700 hover:to-pink-700"
          >
            DEAL FLOP
          </Button>
        )}

        {gamePhase === "flop" && (
          <Button
            onClick={dealTurn}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white text-xl py-6 font-bold uppercase tracking-wider shadow-lg shadow-red-500/30 hover:from-red-700 hover:to-pink-700"
          >
            DEAL TURN
          </Button>
        )}

        {gamePhase === "turn" && (
          <Button
            onClick={dealRiver}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white text-xl py-6 font-bold uppercase tracking-wider shadow-lg shadow-red-500/30 hover:from-red-700 hover:to-pink-700"
          >
            DEAL RIVER
          </Button>
        )}

        {gamePhase === "river" && (
          <Button
            onClick={showdown}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white text-xl py-6 font-bold uppercase tracking-wider shadow-lg shadow-red-500/30 hover:from-red-700 hover:to-pink-700"
          >
            SHOWDOWN
          </Button>
        )}

        {gamePhase === "results" && (
          <Button
            onClick={resetGame}
            className="w-full bg-red-800/30 text-red-300 border-red-500/50 hover:bg-red-800/50 text-xl py-6 font-bold uppercase tracking-wider"
          >
            PLAY AGAIN
          </Button>
        )}
      </CardContent>
      <audio ref={dealSoundRef} src="/sounds/deal.mp3" preload="auto" />
      <audio ref={chipSoundRef} src="/sounds/chip.mp3" preload="auto" />
      <audio ref={winSoundRef} src="/sounds/win.mp3" preload="auto" />
      <audio ref={loseSoundRef} src="/sounds/lose.mp3" preload="auto" />
    </Card>
  )
}
