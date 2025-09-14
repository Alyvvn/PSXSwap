"use client"



import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Eye, EyeOff, AlertTriangle, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface PSXAuthGateProps {
  onAuthenticated?: () => void
  redirectTo?: string
}

export function PSXAuthGate({ onAuthenticated, redirectTo = "/game-portal" }: PSXAuthGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated
    const authStatus = sessionStorage.getItem("psx-auth")
    if (authStatus === "authenticated") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleAuthentication = async () => {
    setIsLoading(true)
    setError("")

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (username.toUpperCase() === "AGENT" && password === "PSX2024CLASSIFIED") {
      // Success
      sessionStorage.setItem("psx-auth", "authenticated")
      setIsAuthenticated(true)
      if (onAuthenticated) {
        onAuthenticated()
      }
      if (redirectTo) {
        router.push(redirectTo)
      }
    } else {
      // Failed attempt
      setAttempts((prev) => prev + 1)
      setError("Invalid agent credentials. Access denied.")
    }

    setIsLoading(false)
  }

  const handleGameAccess = () => {
    if (isAuthenticated) {
      router.push("/game-portal")
    } else {
      setShowAuth(true)
    }
  }

  if (showAuth && !isAuthenticated) {
    return (
      <Card className="bg-black/90 border-red-500/30 backdrop-blur-sm max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-6 w-6 text-red-400" />
            <CardTitle className="text-white font-mono">PSX AUTHENTICATION</CardTitle>
          </div>
          <Badge className="bg-red-600/20 text-red-400 border-red-500/30">CLASSIFIED ACCESS</Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block font-mono">AGENT ID</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter agent identifier..."
              className="bg-gray-900 border-gray-600 text-white font-mono"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block font-mono">SECURITY CODE</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter classified code..."
                className="bg-gray-900 border-gray-600 text-white pr-10 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm font-mono">
              <AlertTriangle className="h-4 w-4" />
              {error}
            </div>
          )}

          {attempts > 0 && <div className="text-yellow-400 text-sm font-mono">Failed attempts: {attempts}/3</div>}

          <div className="space-y-3">
            <Button
              onClick={handleAuthentication}
              disabled={!username || !password || isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 font-mono"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  VERIFYING...
                </div>
              ) : (
                "🔓 AUTHENTICATE"
              )}
            </Button>

            <Button
              onClick={() => setShowAuth(false)}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 font-mono"
            >
              Cancel
            </Button>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-3 text-xs text-gray-400 font-mono">
            <p>Hint: Agent ID is a standard operative designation</p>
            <p>Security Code: PSX + Year + Classification</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="text-center space-y-6">
      {isAuthenticated ? (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-green-400">
            <CheckCircle className="h-5 w-5" />
            <span className="font-mono">AGENT AUTHENTICATED</span>
          </div>
          <Button
            onClick={handleGameAccess}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 font-mono"
          >
            🎮 ACCESS PSX GAMES
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-black/80 rounded-lg p-6 border border-red-500/30">
            <Lock className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2 font-mono">CLASSIFIED ACCESS REQUIRED</h3>
            <p className="text-gray-400 mb-4">PSX Game Portal requires agent authentication</p>
            <Button
              onClick={() => setShowAuth(true)}
              className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 font-mono"
            >
              🔐 AGENT LOGIN
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
