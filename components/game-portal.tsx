"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gamepad2, Puzzle, Dice5, Swords, Rocket } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Game {
  id: string
  name: string
  description: string
  icon: React.ElementType
  link: string
  status: "live" | "coming_soon" | "beta"
  themeColor: string
}

const games: Game[] = [
  {
    id: "glizzy-slots",
    name: "Glizzy Slots",
    description: "Spin the reels and hit the jackpot in our retro-futuristic slot machine.",
    icon: Dice5,
    link: "/glizzy-world",
    status: "live",
    themeColor: "red",
  },
  {
    id: "glizzy-blackjack",
    name: "Glizzy Blackjack",
    description: "Beat the dealer to 21 in this classic card game with a Glizzy twist.",
    icon: Puzzle,
    link: "/glizzy-world",
    status: "live",
    themeColor: "red",
  },
  {
    id: "glizzy-poker",
    name: "Glizzy Poker",
    description: "Test your poker face against other agents in high-stakes Texas Hold'em.",
    icon: Swords,
    link: "/glizzy-world",
    status: "live",
    themeColor: "red",
  },
  {
    id: "psx-arena",
    name: "PSX Arena",
    description: "Coming soon: A tactical battle arena where agents compete for glory and rewards.",
    icon: Rocket,
    link: "#",
    status: "coming_soon",
    themeColor: "cyan",
  },
]

export function GamePortal() {
  return (
    <Card className="w-full bg-black/70 border-cyan-500/30 backdrop-blur-xl shadow-cyan-500/20">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl font-bold text-cyan-400 flex items-center justify-center gap-2">
          <Gamepad2 className="h-8 w-8 text-purple-400 animate-pulse" />
          PSX Game Portal
          <Gamepad2 className="h-8 w-8 text-purple-400 animate-pulse" />
        </CardTitle>
        <p className="text-cyan-300/80 text-sm mt-2">Access classified gaming operations.</p>
      </CardHeader>
      <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Card
            key={game.id}
            className={cn(
              "bg-black/60 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300",
              game.status === "live" && "border-green-500/30 hover:border-green-500/50",
              game.status === "beta" && "border-yellow-500/30 hover:border-yellow-500/50",
              game.status === "coming_soon" && "border-gray-500/30 hover:border-gray-500/50",
            )}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg",
                  game.themeColor === "red" && "bg-gradient-to-br from-red-500 to-pink-500",
                  game.themeColor === "cyan" && "bg-gradient-to-br from-cyan-500 to-blue-500",
                )}
              >
                <game.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">{game.name}</h3>
              <p className="text-cyan-300/80 text-sm mb-4">{game.description}</p>
              {game.status === "live" && (
                <Button
                  asChild
                  className={cn(
                    "w-full text-white font-bold uppercase tracking-wider",
                    game.themeColor === "red" && "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700",
                    game.themeColor === "cyan" && "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700",
                  )}
                >
                  <Link href={game.link}>PLAY NOW</Link>
                </Button>
              )}
              {game.status === "beta" && (
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 font-bold uppercase tracking-wider"
                >
                  <Link href={game.link}>JOIN BETA</Link>
                </Button>
              )}
              {game.status === "coming_soon" && (
                <Button
                  disabled
                  variant="outline"
                  className="w-full border-gray-500/50 text-gray-400 font-bold uppercase tracking-wider"
                >
                  COMING SOON
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}
