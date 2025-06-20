"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Coins, Users, TrendingUp, Lock, Shield, Zap, Target } from "lucide-react"
import Image from "next/image"

export function GlizzyWorld() {
  const scrollToGamePortal = () => {
    // This function is no longer needed as GamePortal is on a separate page
    // and GlizzyWorld itself is a page.
    // However, if you want to scroll to a specific section within the GlizzyWorldPage,
    // you would need to pass a ref or use a state management solution.
  }

  return (
    <div className="max-w-6xl mx-auto relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img src="/images/glizzy-world-bg.png" alt="Glizzy World Background" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-white mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
              GLIZZY WORLD
            </span>
          </h2>
          <p className="text-xl text-gray-300">The Ultimate Crypto Casino Ecosystem</p>
          <p className="text-gray-400 mt-2">Powered by PSX • Built on Base • Secured by Blockchain</p>
        </div>

        {/* Casino Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-gradient-to-br from-gray-900/50 to-pink-600/20 border-gray-800">
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">$125K</div>
              <div className="text-sm text-gray-300">Total Winnings</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900/50 to-purple-600/20 border-gray-800">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">2,847</div>
              <div className="text-sm text-gray-300">Active Players</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900/50 to-blue-600/20 border-gray-800">
            <CardContent className="p-4 text-center">
              <Coins className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">50M</div>
              <div className="text-sm text-gray-300">PSX Staked</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900/50 to-red-600/20 border-gray-800">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">96.5%</div>
              <div className="text-sm text-gray-300">Average RTP</div>
            </CardContent>
          </Card>
        </div>

        {/* Casino Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-black/80 border-gray-800 hover:border-purple-500/50 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Instant Payouts</h3>
              <p className="text-gray-400 text-sm">
                Lightning-fast withdrawals directly to your wallet. No waiting, no delays.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-gray-800 hover:border-purple-500/50 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Provably Fair</h3>
              <p className="text-gray-400 text-sm">
                Blockchain-verified randomness ensures every game is completely fair and transparent.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-gray-800 hover:border-purple-500/50 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">High RTP</h3>
              <p className="text-gray-400 text-sm">
                Industry-leading return rates with transparent odds on every game.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Exclusive Access Section - Modified to link to Game Portal Page */}
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-800 mb-12">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="h-8 w-8 text-purple-400" />
                  <h3 className="text-3xl font-bold text-white">Exclusive Gaming Portal</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  Access our premium gaming suite featuring PSX-themed slots, poker, blackjack, and exclusive
                  tournaments. All games are available to verified PSX agents.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-300">PSX-themed slot machines with progressive jackpots</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span className="text-gray-300">Live poker tables with PSX stakes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-300">Blackjack with crypto multipliers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">Exclusive agent tournaments</span>
                  </div>
                </div>
                <Link href="/game-portal">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8">
                    Access Gaming Portal
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg p-8 border border-purple-500/30">
                  <div className="text-center mb-6">
                    <Lock className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-white mb-2">Unlock Gaming Suite</h4>
                    <p className="text-gray-400 text-sm">Explore the full range of Glizzy World games</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6 opacity-50">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                      <div
                        key={i}
                        className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center border border-gray-600"
                      >
                        <Image
                          src="/images/pfp-character.png" // Using a character placeholder
                          alt="PSX Symbol"
                          width={24}
                          height={24}
                          className="opacity-40"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <Badge className="bg-green-600 text-white">ACCESS AVAILABLE</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Casino Ecosystem */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-black/80 border-gray-800">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4">PSX Token Utility</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Gaming Currency</span>
                  <Badge className="bg-purple-600">Primary</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Staking Rewards</span>
                  <Badge className="bg-green-600">12% APY</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Tournament Entry</span>
                  <Badge className="bg-blue-600">Required</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">VIP Access</span>
                  <Badge className="bg-yellow-600">Exclusive</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-gray-800">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Security Features</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Multi-signature wallets</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">Encrypted transactions</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-300">Audited smart contracts</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <span className="text-gray-300">Real-time monitoring</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Enter Glizzy World?</h3>
            <p className="text-gray-300 mb-6">
              Join the exclusive PSX gaming ecosystem. Connect your wallet, stake PSX tokens, and gain access to our
              premium gaming suite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/game-portal">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8">
                  Access Gaming Portal
                </Button>
              </Link>
              <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 py-3 px-8">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
