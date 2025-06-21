"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles } from 'lucide-react'
import { cn } from "@/lib/utils"

type GameCard = {
  suit: string
  rank: string
  value: number
}

const suits = ["♠️", "♥️", "♦️", "♣️"]
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]

const getCardValue = (rank: string): number => {
  if (["J", "Q", "K"].includes(rank)) return 10
  if (rank === "A") return 11 // Handled separately for soft/hard totals
  return Number.parseInt(rank)
}

const createDeck = (): GameCard[] => {
  const deck: GameCard[] = []
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank, value: getCardValue(rank) })
    }
  }
  return shuffleDeck(deck)
}

const shuffleDeck = (deck: GameCard[]): GameCard[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

const calculateHandValue = (hand: GameCard[]): number => {
  let value = hand.reduce((sum, card) => sum + card.value, 0)
  let aces = hand.filter((card) => card.rank === "A").length

  while (value > 21 && aces > 0) {
    value -= 10
    aces -= 1
  }
  return value
}

export function GlizzyBlackjack() {
  const [deck, setDeck] = useState<GameCard[]>([])
  const [playerHand, setPlayerHand] = useState<GameCard[]>([])
  const [dealerHand, setDealerHand] = useState<GameCard[]>([])
  const [playerScore, setPlayerScore] = useState(0)
  const [dealerScore, setDealerScore] = useState(0)
  const [balance, setBalance] = useState(1000)
  const [bet, setBet] = useState(0)
  const [message, setMessage] = useState("Place your bet to start!")
  const [gamePhase, setGamePhase] = useState<"betting" | "dealing" | "player_turn" | "dealer_turn" | "results">(
    "betting",
  )
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
    const audioEl = audioRef.current
    if (!audioEl) return

    // Only try to play if the browser reports it can handle MP3/OGG
    const supported =
      audioEl.canPlayType("audio/mpeg") ||
      audioEl.canPlayType("audio/mp3") ||
      audioEl.canPlayType("audio/ogg")

    if (!supported) {
      console.warn("Audio type not supported in this browser.")
      return
    }

    try {
      audioEl.currentTime = 0
      // play() returns a promise - catch & swallow user-gesture errors
      audioEl.play().catch((err) => {
        console.warn("Audio playback prevented:", err)
      })
    } catch (err) {
      console.warn("Audio play threw:", err)
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
    const newPlayerHand = [newDeck.pop()!, newDeck.pop()!]
    const newDealerHand = [newDeck.pop()!, newDeck.pop()!]

    setDeck(newDeck)
    setPlayerHand(newPlayerHand)
    setDealerHand(newDealerHand)
    setPlayerScore(calculateHandValue(newPlayerHand))
    setDealerScore(calculateHandValue([newDealerHand[0]])) // Only show first dealer card
    setMessage("Dealing cards...")
    setGamePhase("dealing")

    setTimeout(() => {
      playSound(dealSoundRef)
      setPlayerScore(calculateHandValue(newPlayerHand))
      setDealerScore(calculateHandValue([newDealerHand[0]])) // Still only show first dealer card
      if (calculateHandValue(newPlayerHand) === 21) {
        setMessage("Blackjack! Player wins!")
        setBalance((prev) => prev + bet * 2.5) // Blackjack payout 1.5x bet
        playSound(winSoundRef)
        setGamePhase("results")
      } else {
        setMessage("Your turn!")
        setGamePhase("player_turn")
      }
    }, 1000)
  }

  const hit = () => {
    if (gamePhase !== "player_turn") return

    playSound(dealSoundRef)
    const newDeck = [...deck]
    const newCard = newDeck.pop()!
    const updatedPlayerHand = [...playerHand, newCard]
    const newPlayerScore = calculateHandValue(updatedPlayerHand)

    setDeck(newDeck)
    setPlayerHand(updatedPlayerHand)
    setPlayerScore(newPlayerScore)

    if (newPlayerScore > 21) {
      setMessage("Bust! Dealer wins.")
      playSound(loseSoundRef)
      setGamePhase("results")
    }
  }

  const stand = () => {
    if (gamePhase !== "player_turn") return

    setMessage("Dealer's turn...")
    setGamePhase("dealer_turn")
    setTimeout(dealerTurn, 1000)
  }

  const dealerTurn = () => {
    const currentDealerHand = [...dealerHand]
    let currentDealerScore = calculateHandValue(currentDealerHand)

    while (currentDealerScore < 17) {
      playSound(dealSoundRef)
      const newDeck = [...deck]
      const newCard = newDeck.pop()!
      currentDealerHand.push(newCard)
      setDeck(newDeck)
      setDealerHand(currentDealerHand)
      currentDealerScore = calculateHandValue(currentDealerHand)
      setDealerScore(currentDealerScore)
    }

    setTimeout(() => {
      determineWinner(playerScore, currentDealerScore)
    }, 1000)
  }

  const determineWinner = (pScore: number, dScore: number) => {
    setDealerScore(dScore) // Reveal dealer's full score
    if (pScore > 21) {
      setMessage("Bust! Dealer wins.")
      playSound(loseSoundRef)
    } else if (dScore > 21) {
      setMessage("Dealer busts! Player wins!")
      setBalance((prev) => prev + bet * 2)
      playSound(winSoundRef)
    } else if (pScore > dScore) {
      setMessage("Player wins!")
      setBalance((prev) => prev + bet * 2)
      playSound(winSoundRef)
    } else if (dScore > pScore) {
      setMessage("Dealer wins.")
      playSound(loseSoundRef)
    } else {
      setMessage("Push!")
      setBalance((prev) => prev + bet) // Return bet
    }
    setGamePhase("results")
  }

  const resetGame = () => {
    setPlayerHand([])
    setDealerHand([])
    setPlayerScore(0)
    setDealerScore(0)
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
    <div className="w-full max-w-2xl bg-black/70 border-red-500/30 backdrop-blur-xl shadow-red-500/20">
      <div className="text-center">
        <div className="text-4xl font-bold text-red-400 flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-pink-400 animate-pulse" />
          Glizzy Blackjack
          <Sparkles className="h-8 w-8 text-pink-400 animate-pulse" />
        </div>
        <p className="text-red-300/80 text-sm mt-2">Beat the dealer, win the Glizzy!</p>
      </div>
      <div className="flex flex-col items-center gap-6 p-6">
        <div className="w-full flex justify-between items-center text-red-300 font-mono text-lg">
          <span>BALANCE: ${balance}</span>
          <span>BET: ${bet}</span>
        </div>

        {/* Dealer's Hand */}
        <div className="w-full bg-red-900/20 rounded-lg p-4 border border-red-500/30 shadow-inner">
          <h3 className="text-red-400 font-mono text-lg mb-2">DEALER ({dealerScore})</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {dealerHand.map((card, index) => (
              <div
                key={index}
                className={cn(
                  "w-20 h-28 bg-white rounded-md flex flex-col items-center justify-center text-xl font-bold border-2 border-gray-400",
                  getCardColor(card.suit),
                  gamePhase === "player_turn" && index === 1 && "bg-gray-700 text-gray-700", // Hidden card
                )}
              >
                {gamePhase === "player_turn" && index === 1 ? (
                  <span className="text-4xl text-white">?</span>
                ) : (
                  <>
                    <span>{card.rank}</span>
                    <span className="text-3xl">{card.suit}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Player's Hand */}
        <div className="w-full bg-red-900/20 rounded-lg p-4 border border-red-500/30 shadow-inner">
          <h3 className="text-red-400 font-mono text-lg mb-2">YOU ({playerScore})</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {playerHand.map((card, index) => (
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
            ))}
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
              PLACE BET
            </Button>
          </div>
        )}

        {gamePhase === "player_turn" && (
          <div className="w-full flex justify-center gap-4">
            <Button
              onClick={hit}
              className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white text-xl py-6 font-bold uppercase tracking-wider shadow-lg shadow-red-500/30 hover:from-red-700 hover:to-pink-700"
            >
              HIT
            </Button>
            <Button
              onClick={stand}
              className="flex-1 bg-red-800/30 text-red-300 border-red-500/50 hover:bg-red-800/50 text-xl py-6 font-bold uppercase tracking-wider"
            >
              STAND
            </Button>
          </div>
        )}

        {gamePhase === "results" && (
          <Button
            onClick={resetGame}
            className="w-full bg-red-800/30 text-red-300 border-red-500/50 hover:bg-red-800/50 text-xl py-6 font-bold uppercase tracking-wider"
          >
            PLAY AGAIN
          </Button>
        )}
      </div>
      <audio ref={dealSoundRef} src="/sounds/deal.mp3" preload="auto" />
      <audio ref={chipSoundRef} src="/sounds/chip.mp3" preload="auto" />
      <audio ref={winSoundRef} src="/sounds/win.mp3" preload="auto" />
      <audio ref={loseSoundRef} src="/sounds/lose.mp3" preload="auto" />
    </div>
  )
}
