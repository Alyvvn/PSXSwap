"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlizzySlots } from "@/components/glizzy-slots"
import { GlizzyPoker } from "@/components/glizzy-poker"
import { GlizzyBlackjack } from "@/components/glizzy-blackjack"
import { ArrowLeft, Trophy, Users, DollarSign, Lock } from "lucide-react"
import Link from "next/link"

export default function GlizzyWorldCasinoPage() {
  const [activeGame, setActiveGame] = useState("slots")

  const leaderboardData = [
    { rank: 1, agent: "Agent_HotDog", winnings: "$1,337,000" },
    { rank: 2, agent: "SauceBoss", winnings: "$987,654" },
    { rank: 3, agent: "BunMaster", winnings: "$765,432" },
    { rank: 4, agent: "KetchupKing", winnings: "$543,210" },
    { rank: 5, agent: "MustardManiac", winnings: "$321,098" },
  ]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black py-12 text-white">
      <Link href="/glizzy-world">
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Glizzy Portal
        </Button>
      </Link>
      <h1 className="mb-8 text-5xl font-bold text-red-400">GLIZZY WORLD CASINO</h1>
      <p className="mb-12 text-lg text-gray-300">Welcome, Agent. Your classified gaming experience awaits.</p>

      <div className="w-full max-w-6xl px-4">
        <Tabs defaultValue="slots" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border border-red-500/30 rounded-lg mb-8">
            <TabsTrigger
              value="slots"
              onClick={() => setActiveGame("slots")}
              className="text-red-300 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-red-500/30"
            >
              Glizzy Slots
            </TabsTrigger>
            <TabsTrigger
              value="poker"
              onClick={() => setActiveGame("poker")}
              className="text-red-300 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-red-500/30"
            >
              Glizzy Poker
            </TabsTrigger>
            <TabsTrigger
              value="blackjack"
              onClick={() => setActiveGame("blackjack")}
              className="text-red-300 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-red-500/30"
            >
              Glizzy Blackjack
            </TabsTrigger>
          </TabsList>

          <TabsContent value="slots">
            <Card className="bg-black/70 border-red-500/30 backdrop-blur-xl shadow-red-500/20">
              <CardContent className="p-6">
                <GlizzySlots />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="poker">
            <Card className="bg-black/70 border-red-500/30 backdrop-blur-xl shadow-red-500/20">
              <CardContent className="p-6">
                <GlizzyPoker />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="blackjack">
            <Card className="bg-black/70 border-red-500/30 backdrop-blur-xl shadow-red-500/20">
              <CardContent className="p-6">
                <GlizzyBlackjack />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Leaderboard and Casino Info */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card className="bg-black/70 border-red-500/30 backdrop-blur-xl shadow-red-500/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5" /> Agent Leaderboard
              </h3>
              <div className="space-y-2">
                {leaderboardData.map((entry) => (
                  <div key={entry.rank} className="flex justify-between text-gray-300 text-sm">
                    <span>
                      {entry.rank}. {entry.agent}
                    </span>
                    <span className="font-mono text-red-300">{entry.winnings}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/70 border-red-500/30 backdrop-blur-xl shadow-red-500/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5" /> Casino Operations
              </h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-red-300" /> Exclusive access for verified PSX agents
                </p>
                <p className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-red-300" /> Secure and provably fair gaming
                </p>
                <p className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-red-300" /> Instant PSX token payouts
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
