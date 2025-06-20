"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Lock, Unlock, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export function GlizzyWorld() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [unlocked, setUnlocked] = useState(false)
  const router = useRouter()

  const correctPassword = "glizzygang" // Example password

  const handleLogin = () => {
    if (password === correctPassword) {
      setUnlocked(true)
      setError("")
      setTimeout(() => {
        router.push("/glizzy-world") // Redirect to the actual casino page
      }, 1000)
    } else {
      setError("ACCESS DENIED. Incorrect password. Try 'glizzygang'.")
      setUnlocked(false)
    }
  }

  return (
    <Card className="w-full max-w-md bg-black/70 border-red-500/30 backdrop-blur-xl shadow-red-500/20">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl font-bold text-red-400 flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-pink-400 animate-pulse" />
          Glizzy World
          <Sparkles className="h-8 w-8 text-pink-400 animate-pulse" />
        </CardTitle>
        <p className="text-red-300/80 text-sm mt-2">Classified Access Protocol</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 p-6">
        {unlocked ? (
          <div className="text-center text-green-400 text-2xl font-bold flex flex-col items-center gap-4">
            <Unlock className="h-16 w-16 animate-in zoom-in-50 duration-500" />
            ACCESS GRANTED!
            <p className="text-lg text-green-300/80">Redirecting to Glizzy World...</p>
          </div>
        ) : (
          <>
            <div className="w-full space-y-4">
              <Input
                type="password"
                placeholder="Enter Classified Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleLogin()
                }}
                className="bg-red-900/30 border-red-500/50 text-red-200 placeholder:text-red-400/70 focus:ring-red-500"
              />
              {error && (
                <p className="text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </p>
              )}
            </div>
            <Button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white text-xl py-6 font-bold uppercase tracking-wider shadow-lg shadow-red-500/30 hover:from-red-700 hover:to-pink-700"
            >
              <Lock className="h-5 w-5 mr-2" />
              ACCESS GLIZZY WORLD
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
