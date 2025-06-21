"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function GlizzyWorldAuth() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = () => {
    if (password === "glizzy123") {
      setError("")
      router.push("/glizzy-world/casino")
    } else {
      setError("ACCESS DENIED. INCORRECT PROTOCOL KEY.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black py-12 text-white">
      <Link href="/">
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 mb-6">
          <ArrowRight className="h-4 w-4 rotate-180 mr-2" />
          Back to PSX
        </Button>
      </Link>
      <Card className="w-full max-w-md bg-black/70 border-red-500/30 backdrop-blur-xl shadow-red-500/20">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-red-400">GLIZZY WORLD</CardTitle>
          <p className="text-red-300/80 text-sm mt-2">CLASSIFIED ACCESS REQUIRED</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 p-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-pink-600 text-white shadow-lg">
            <Lock className="h-10 w-10" />
          </div>
          <p className="text-center text-gray-300">Enter your protocol key to access the Glizzy World Casino.</p>
          <Input
            type="password"
            placeholder="PROTOCOL KEY"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/50 border-red-500/50 text-white placeholder:text-red-300/70 focus:border-red-400"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleLogin()
              }
            }}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white text-lg py-6 font-bold uppercase tracking-wider shadow-lg shadow-red-500/30 hover:from-red-700 hover:to-pink-700"
          >
            <ArrowRight className="h-5 w-5 mr-2" />
            ACCESS GLIZZY WORLD
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
