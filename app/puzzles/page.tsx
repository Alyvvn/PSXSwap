"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SurveillanceGrid } from "@/components/surveillance-grid"
import { CipherChallenge } from "@/components/cipher-challenge"
import { AgentTrainingFacility } from "@/components/hotdog-factory"
import { ArrowLeft, Eye, Terminal, Lock, CheckCircle, Shield } from "lucide-react"
import Link from "next/link"

type PuzzleType = "menu" | "surveillance" | "cipher" | "training"

export default function PuzzlesPage() {
  const [currentPuzzle, setCurrentPuzzle] = useState<PuzzleType>("menu")
  const [completedPuzzles, setCompletedPuzzles] = useState<string[]>([])
  const [discoveredPasswords, setDiscoveredPasswords] = useState<string[]>([])

  const handlePuzzleComplete = (password: string) => {
    setCompletedPuzzles(prev => [...prev, currentPuzzle])
    setDiscoveredPasswords(prev => [...prev, password])
  }

  const handleBackToMenu = () => {
    setCurrentPuzzle("menu")
  }

  const isPuzzleCompleted = (puzzle: string) => completedPuzzles.includes(puzzle)

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="outline" className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to PSX
            </Button>
          </Link>
          <h1 className="text-3xl font-mono font-bold text-cyan-400">PSX PUZZLE TERMINAL</h1>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>

        {currentPuzzle === "menu" && (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-2xl font-mono font-bold text-cyan-400 mb-4">
                CLASSIFIED PUZZLE PROTOCOLS
              </h2>
              <p className="text-cyan-300/70 max-w-2xl mx-auto">
                Complete these puzzles to discover today's portal key. Each puzzle reveals a different part of the authentication sequence.
              </p>
            </div>

            {/* Puzzle Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Agent Training Facility */}
              <Card className="bg-black/70 border-green-400/30 backdrop-blur-xl hover:border-green-400/50 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Shield className="h-5 w-5" />
                    PSX Agent Training
                    {isPuzzleCompleted("training") && (
                      <CheckCircle className="h-5 w-5 text-green-400 ml-auto" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-green-300/70 text-sm">
                    Train agents in specialized skills and complete exercises. 
                    Score 800+ points to unlock the portal key!
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400/70 text-xs">TRAINING CHALLENGE</span>
                  </div>
                  <Button
                    onClick={() => setCurrentPuzzle("training")}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    {isPuzzleCompleted("training") ? "Replay Puzzle" : "Start Puzzle"}
                  </Button>
                </CardContent>
              </Card>

              {/* Surveillance Grid */}
              <Card className="bg-black/70 border-purple-400/30 backdrop-blur-xl hover:border-purple-400/50 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-400">
                    <Eye className="h-5 w-5" />
                    PSX Surveillance Grid
                    {isPuzzleCompleted("surveillance") && (
                      <CheckCircle className="h-5 w-5 text-green-400 ml-auto" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-purple-300/70 text-sm">
                    Monitor and neutralize targets using surveillance cameras in the underground facility. 
                    Score 800+ points to unlock the portal key!
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                    <span className="text-purple-400/70 text-xs">SURVEILLANCE CHALLENGE</span>
                  </div>
                  <Button
                    onClick={() => setCurrentPuzzle("surveillance")}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {isPuzzleCompleted("surveillance") ? "Replay Puzzle" : "Start Puzzle"}
                  </Button>
                </CardContent>
              </Card>

              {/* Cipher Challenge */}
              <Card className="bg-black/70 border-blue-400/30 backdrop-blur-xl hover:border-blue-400/50 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Terminal className="h-5 w-5" />
                    Cipher of Agent 44
                    {isPuzzleCompleted("cipher") && (
                      <CheckCircle className="h-5 w-5 text-green-400 ml-auto" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-blue-300/70 text-sm">
                    Decrypt the encoded messages using the Caesar cipher. 
                    Each message reveals a different portal key component.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <span className="text-blue-400/70 text-xs">CRYPTOGRAPHIC CHALLENGE</span>
                  </div>
                  <Button
                    onClick={() => setCurrentPuzzle("cipher")}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isPuzzleCompleted("cipher") ? "Replay Puzzle" : "Start Puzzle"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Discovered Passwords */}
            {discoveredPasswords.length > 0 && (
              <Card className="bg-black/70 border-purple-400/30 backdrop-blur-xl max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-400">
                    <Lock className="h-5 w-5" />
                    Discovered Portal Keys
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {discoveredPasswords.map((password, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-purple-900/20 border border-purple-400/30 rounded">
                        <CheckCircle className="h-4 w-4 text-purple-400" />
                        <span className="font-mono text-purple-300">{password}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-purple-300/70 text-sm mt-4">
                    Use these keys to access the PSX Game Portal. Keys change daily.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Instructions */}
            <div className="text-center text-cyan-300/50 text-sm max-w-2xl mx-auto">
              <p>
                Complete both puzzles to discover all possible portal keys. 
                The actual key changes every 24 hours, so you may need to try different combinations.
              </p>
            </div>
          </div>
        )}

        {/* Surveillance Grid Puzzle */}
        {currentPuzzle === "surveillance" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button
                onClick={handleBackToMenu}
                variant="outline"
                className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Puzzles
              </Button>
              <h2 className="text-xl font-mono font-bold text-cyan-400">PSX Surveillance Grid</h2>
              <div className="w-24" />
            </div>
            <SurveillanceGrid onComplete={handlePuzzleComplete} />
          </div>
        )}

        {/* Agent Training Facility */}
        {currentPuzzle === "training" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button
                onClick={handleBackToMenu}
                variant="outline"
                className="border-green-400/30 text-green-400 hover:bg-green-400/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Puzzles
              </Button>
              <h2 className="text-xl font-mono font-bold text-green-400">PSX Agent Training Facility</h2>
              <div className="w-24" />
            </div>
            <AgentTrainingFacility onComplete={handlePuzzleComplete} />
          </div>
        )}

        {/* Cipher Challenge */}
        {currentPuzzle === "cipher" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button
                onClick={handleBackToMenu}
                variant="outline"
                className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Puzzles
              </Button>
              <h2 className="text-xl font-mono font-bold text-blue-400">Cipher of Agent 44</h2>
              <div className="w-24" />
            </div>
            <CipherChallenge onComplete={handlePuzzleComplete} />
          </div>
        )}
      </div>
    </div>
  )
} 