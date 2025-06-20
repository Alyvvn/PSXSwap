"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

const symbols = ["🍒", "🍋", "🍊", "🍇", "🔔", "💎", "💰", "🍀", "⭐", "👑"]
const winMessages = [
  "JACKPOT! You're a Glizzy God!",
  "EPIC WIN! The Glizzy Gods favor you!",
  "BIG WIN! Glizzy Gang!",
  "WINNER! Keep that Glizzy energy!",
  "Nice one! Glizzy on!",
]
const loseMessages = [
  "No luck this time, Glizzy Gang!",
  "Better luck next spin, agent!",
  "Almost! Keep trying!",
  "The Glizzy Gods are testing you...",
  "Try again, the Glizzy awaits!",
]

export function PsxSlots() {
  const [reels, setReels] = useState(["?", "?", "?"])
  const [spinning, setSpinning] = useState(false)
  const [message, setMessage] = useState("Spin to win!")
  const [balance, setBalance] = useState(1000)
  const [betAmount, setBetAmount] = useState(10)
  const [lastWin, setLastWin] = useState(0)
  const [history, setHistory] = useState<string[]>([])

  const reelRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]

  const spinSoundRef = useRef<HTMLAudioElement>(null)
  const winSoundRef = useRef<HTMLAudioElement>(null)
  const loseSoundRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Preload sounds
    if (spinSoundRef.current) spinSoundRef.current.load()
    if (winSoundRef.current) winSoundRef.current.load()
    if (loseSoundRef.current) loseSoundRef.current.load()
  }, [])

  const playSound = (audioRef: React.RefObject<HTMLAudioElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((e) => console.error("Error playing sound:", e))
    }
  }

  const spinReels = () => {
    if (spinning || balance < betAmount) {
      setMessage(balance < betAmount ? "Not enough balance!" : "Reels are spinning!")
      return
    }

    playSound(spinSoundRef)
    setSpinning(true)
    setMessage("Spinning...")
    setBalance((prev) => prev - betAmount)
    setLastWin(0)

    const newReels = ["", "", ""]
    const spinDurations = [2000, 2500, 3000] // Different durations for staggered stop

    reels.forEach((_, i) => {
      const reelElement = reelRefs[i].current
      if (reelElement) {
        reelElement.style.transition = "none"
        reelElement.style.transform = "translateY(0)"
      }

      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * symbols.length)
        newReels[i] = symbols[randomIndex]
        setReels((prev) => {
          const updated = [...prev]
          updated[i] = newReels[i]
          return updated
        })

        if (reelElement) {
          reelElement.style.transition = `transform ${spinDurations[i] / 1000}s cubic-bezier(0.25, 0.1, 0.25, 1)`
          reelElement.style.transform = `translateY(-${randomIndex * 100}%)` // Simulate scrolling to symbol
        }

        if (i === reels.length - 1) {
          // Last reel finished spinning
          setTimeout(() => {
            checkWin(newReels)
            setSpinning(false)
          }, spinDurations[i])
        }
      }, i * 500) // Stagger the start of each reel spin
    })
  }

  const checkWin = (finalReels: string[]) => {
    let win = 0
    let msg = ""

    if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
      // Three in a row
      win = betAmount * 10 // Example payout
      msg = winMessages[0]
    } else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2]) {
      // Two in a row
      win = betAmount * 2 // Example payout
      msg = winMessages[4]
    } else {
      msg = loseMessages[Math.floor(Math.random() * loseMessages.length)]
    }

    setBalance((prev) => prev + win)
    setLastWin(win)
    setHistory((prev) => [`${finalReels.join(" ")} - ${win > 0 ? `+${win}` : "LOSE"}`, ...prev].slice(0, 5))

    if (win > 0) {
      playSound(winSoundRef)
    } else {
      playSound(loseSoundRef)
    }
    setMessage(msg)
  }

  return (
    <Card className="w-full max-w-md bg-black/70 border-red-500/30 backdrop-blur-xl shadow-red-500/20">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl font-bold text-red-400 flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-pink-400 animate-pulse" />
          Glizzy Slots
          <Sparkles className="h-8 w-8 text-pink-400 animate-pulse" />
        </CardTitle>
        <p className="text-red-300/80 text-sm mt-2">Spin the reels, win the Glizzy!</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 p-6">
        <div className="flex items-center justify-around w-full bg-red-900/20 rounded-lg p-4 border border-red-500/30 shadow-inner">
          {reels.map((symbol, i) => (
            <div
              key={i}
              className="relative w-24 h-24 bg-red-900/40 rounded-md flex items-center justify-center text-6xl border-2 border-red-500 text-white overflow-hidden"
            >
              <div ref={reelRefs[i]} className="absolute inset-0 flex flex-col justify-center items-center">
                {symbols.map((s, idx) => (
                  <span key={idx} className="h-24 w-24 flex items-center justify-center">
                    {s}
                  </span>
                ))}
                {/* Duplicate symbols to allow smooth looping */}
                {symbols.map((s, idx) => (
                  <span key={`dup-${idx}`} className="h-24 w-24 flex items-center justify-center">
                    {s}
                  </span>
                ))}
              </div>
              <span className="relative z-10">{symbol}</span>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-between items-center text-red-300 font-mono text-lg">
          <span>BALANCE: ${balance}</span>
          <span>BET: ${betAmount}</span>
        </div>

        <div className="w-full flex justify-center gap-4">
          <Button
            onClick={() => setBetAmount(5)}
            variant="outline"
            className={cn(
              "bg-red-800/30 text-red-300 border-red-500/50 hover:bg-red-800/50",
              betAmount === 5 && "bg-red-500/50 text-white",
            )}
          >
            Bet $5
          </Button>
          <Button
            onClick={() => setBetAmount(10)}
            variant="outline"
            className={cn(
              "bg-red-800/30 text-red-300 border-red-500/50 hover:bg-red-800/50",
              betAmount === 10 && "bg-red-500/50 text-white",
            )}
          >
            Bet $10
          </Button>
          <Button
            onClick={() => setBetAmount(25)}
            variant="outline"
            className={cn(
              "bg-red-800/30 text-red-300 border-red-500/50 hover:bg-red-800/50",
              betAmount === 25 && "bg-red-500/50 text-white",
            )}
          >
            Bet $25
          </Button>
        </div>

        <Button
          onClick={spinReels}
          disabled={spinning || balance < betAmount}
          className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white text-xl py-6 font-bold uppercase tracking-wider shadow-lg shadow-red-500/30 hover:from-red-700 hover:to-pink-700"
        >
          {spinning ? "Spinning..." : "SPIN"}
        </Button>

        <div className="text-center text-red-200 font-mono text-lg mt-2">
          {message} {lastWin > 0 && <span className="text-green-400"> (+${lastWin})</span>}
        </div>

        <div className="w-full mt-4">
          <h4 className="text-red-400 font-mono text-sm mb-2">Recent Spins:</h4>
          <div className="bg-red-900/20 border border-red-500/30 rounded-md p-3 h-24 overflow-y-auto scrollbar-hide">
            {history.length === 0 ? (
              <p className="text-red-300/60 text-sm">No spins yet.</p>
            ) : (
              <ul className="space-y-1">
                {history.map((entry, index) => (
                  <li key={index} className="text-red-300 text-sm font-mono">
                    {entry}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </CardContent>
      <audio ref={spinSoundRef} src="/sounds/spin.mp3" preload="auto" />
      <audio ref={winSoundRef} src="/sounds/win.mp3" preload="auto" />
      <audio ref={loseSoundRef} src="/sounds/lose.mp3" preload="auto" />
    </Card>
  )
}
