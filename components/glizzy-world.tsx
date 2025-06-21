"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Lock, KeyRound, AlertCircle } from "lucide-react"

export function GlizzyWorld() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Simple hardcoded password for demonstration
    if (password === "glizzy123") {
      router.push("/glizzy-world") // Redirect to the actual casino page
    } else {
      setError("Access Denied. Incorrect password.")
    }
  }

  return (
    <Card className="w-full max-w-md bg-black/80 border-red-500/30 backdrop-blur-xl shadow-red-500/20">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl font-bold text-red-400 flex items-center justify-center gap-2">
          <Lock className="h-8 w-8 text-pink-400 animate-pulse" />
          GLIZZY WORLD ACCESS
        </CardTitle>
        <p className="text-red-300/80 text-sm mt-2">Enter credentials for classified gaming suite.</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 p-6">
        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="Enter Classified Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
          </div>
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white text-lg py-3 font-bold uppercase tracking-wider shadow-lg shadow-red-500/30 hover:from-red-700 hover:to-pink-700"
          >
            <Lock className="h-5 w-5 mr-2" />
            ACCESS GLIZZY WORLD
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
