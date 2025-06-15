"use client"

import { useState } from "react"

export function GlizzyBlackjack() {
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
    const newPlayerCards = [...playerCards, newCar\
