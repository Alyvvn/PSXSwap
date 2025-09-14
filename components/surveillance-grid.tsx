"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, RotateCcw, Eye, Shield, Zap, AlertTriangle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

interface SurveillanceTarget {
  id: number
  x: number
  y: number
  type: "agent" | "suspect" | "vip" | "decoy" | "double-agent"
  status: "active" | "neutralized" | "escaped"
  priority: number
  timeLimit: number
}

interface Camera {
  id: number
  x: number
  y: number
  range: number
  angle: number
  status: "active" | "offline" | "glitched"
}

const GRID_SIZE = 12
const CELL_SIZE = 50

const TARGETS: SurveillanceTarget[] = [
  { id: 1, x: 2, y: 3, type: "agent", status: "active", priority: 3, timeLimit: 45 },
  { id: 2, x: 8, y: 5, type: "suspect", status: "active", priority: 2, timeLimit: 30 },
  { id: 3, x: 5, y: 8, type: "vip", status: "active", priority: 5, timeLimit: 20 },
  { id: 4, x: 10, y: 2, type: "decoy", status: "active", priority: 1, timeLimit: 25 },
  { id: 5, x: 1, y: 10, type: "double-agent", status: "active", priority: 4, timeLimit: 35 },
]

const CAMERAS: Camera[] = [
  { id: 1, x: 0, y: 0, range: 4, angle: 45, status: "active" },
  { id: 2, x: 11, y: 0, range: 3, angle: 135, status: "active" },
  { id: 3, x: 0, y: 11, range: 3, angle: 315, status: "glitched" },
  { id: 4, x: 11, y: 11, range: 4, angle: 225, status: "offline" },
]

export function SurveillanceGrid({ onComplete }: { onComplete: (password: string) => void }) {
  const [targets, setTargets] = useState<SurveillanceTarget[]>(TARGETS)
  const [cameras, setCameras] = useState<Camera[]>(CAMERAS)
  const [selectedCamera, setSelectedCamera] = useState<number | null>(null)
  const [gameState, setGameState] = useState<"setup" | "monitoring" | "completed">("setup")
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [alerts, setAlerts] = useState<string[]>([])
  const [showPassword, setShowPassword] = useState(false)
  const [glitchEffect, setGlitchEffect] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timerRef = useRef<NodeJS.Timeout>()
  const [showDebrief, setShowDebrief] = useState(false)

  useEffect(() => {
    if (gameState === "monitoring") {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleGameOver()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => {
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }
  }, [gameState])

  useEffect(() => {
    drawGrid()
  }, [targets, cameras, selectedCamera, glitchEffect])

  const drawGrid = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "#2d1a3a"
    ctx.lineWidth = 1
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL_SIZE, 0)
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * CELL_SIZE)
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE)
      ctx.stroke()
    }

    // Draw cameras
    cameras.forEach(camera => {
      const x = camera.x * CELL_SIZE + CELL_SIZE / 2
      const y = camera.y * CELL_SIZE + CELL_SIZE / 2

      // Camera base
      ctx.fillStyle = camera.status === "active" ? "#a259ff" : 
                     camera.status === "glitched" ? "#ff6600" : "#666666"
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, 2 * Math.PI)
      ctx.fill()

      // Camera range
      if (camera.status === "active") {
        ctx.strokeStyle = "#a259ff"
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.arc(x, y, camera.range * CELL_SIZE, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.setLineDash([])
      }

      // Selection indicator
      if (selectedCamera === camera.id) {
        ctx.strokeStyle = "#fff"
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(x, y, 15, 0, 2 * Math.PI)
        ctx.stroke()
      }
    })

    // Draw targets
    targets.forEach(target => {
      const x = target.x * CELL_SIZE + CELL_SIZE / 2
      const y = target.y * CELL_SIZE + CELL_SIZE / 2

      // Target color based on type and status
      let color = "#fff"
      let icon = "" // emoji for demo
      if (target.type === "agent") {
        color = target.status === "active" ? "#00e1ff" : "#666"
        icon = "🕵️"
      } else if (target.type === "suspect") {
        color = target.status === "active" ? "#ff2d55" : "#666"
        icon = "🎯"
      } else if (target.type === "vip") {
        color = target.status === "active" ? "#ffd700" : "#666"
        icon = "⭐"
      } else if (target.type === "decoy") {
        color = target.status === "active" ? "#b2bec3" : "#666"
        icon = "👤"
      } else if (target.type === "double-agent") {
        color = target.status === "active" ? "#a259ff" : "#666"
        icon = "🕶️"
      }
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, y, 10, 0, 2 * Math.PI)
      ctx.fill()
      ctx.font = "16px monospace"
      ctx.textAlign = "center"
      ctx.fillStyle = "#fff"
      ctx.fillText(icon, x, y + 6)
      if (target.status === "active") {
        ctx.fillStyle = "#fff"
        ctx.font = "10px monospace"
        ctx.fillText(target.priority.toString(), x, y - 12)
      }
    })

    // Glitch/static overlay
    if (glitchEffect) {
      for (let i = 0; i < 10; i++) {
        ctx.fillStyle = `rgba(162,89,255,${Math.random() * 0.15})`
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 80, 2)
      }
      ctx.globalAlpha = 0.2
      ctx.drawImage(canvas, 0, 0)
      ctx.globalAlpha = 1
    }
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const gridX = Math.floor(x / CELL_SIZE)
    const gridY = Math.floor(y / CELL_SIZE)

    // Check if clicked on camera
    const clickedCamera = cameras.find(camera => 
      camera.x === gridX && camera.y === gridY
    )

    if (clickedCamera) {
      setSelectedCamera(clickedCamera.id)
      return
    }

    // Check if clicked on target
    const clickedTarget = targets.find(target => 
      target.x === gridX && target.y === gridY
    )

    if (clickedTarget && selectedCamera) {
      handleTargetNeutralization(clickedTarget)
    }
  }

  const handleTargetNeutralization = (target: SurveillanceTarget) => {
    const camera = cameras.find(c => c.id === selectedCamera)
    if (!camera || camera.status !== "active") return

    // Check if target is in camera range
    const distance = Math.sqrt(
      Math.pow(target.x - camera.x, 2) + Math.pow(target.y - camera.y, 2)
    )

    if (distance <= camera.range) {
      setTargets(prev => prev.map(t => 
        t.id === target.id ? { ...t, status: "neutralized" } : t
      ))
      
      const points = target.priority * 100
      setScore(prev => prev + points)
      setAlerts(prev => [...prev, `Target ${target.id} neutralized! +${points} points`])
      
      // Check win condition
      const activeTargets = targets.filter(t => t.status === "active")
      if (activeTargets.length === 1) {
        handleGameComplete()
      }
    } else {
      setAlerts(prev => [...prev, "Target out of camera range!"])
    }
  }

  const activateCamera = (cameraId: number) => {
    setCameras(prev => prev.map(c => 
      c.id === cameraId ? { ...c, status: "active" } : c
    ))
  }

  const repairCamera = (cameraId: number) => {
    setCameras(prev => prev.map(c => 
      c.id === cameraId ? { ...c, status: "active" } : c
    ))
  }

  const startMonitoring = () => {
    setGameState("monitoring")
    setTimeLeft(60)
  }

  const handleGameComplete = () => {
    setGameState("completed")
    if (timerRef.current) clearInterval(timerRef.current)
    setShowDebrief(true)
    
    if (score >= 800) {
      setShowPassword(true)
      onComplete("SURVEILLANCE-MASTER-2024")
    }
  }

  const handleGameOver = () => {
    setGameState("completed")
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const resetGame = () => {
    setTargets(TARGETS)
    setCameras(CAMERAS)
    setSelectedCamera(null)
    setGameState("setup")
    setScore(0)
    setTimeLeft(60)
    setAlerts([])
    setShowPassword(false)
    setGlitchEffect(false)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  // Glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true)
      setTimeout(() => setGlitchEffect(false), 200)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <Card className="w-full max-w-6xl bg-black/90 border-purple-400/30 backdrop-blur-xl">
      {/* Mission Debrief Modal */}
      <Dialog open={showDebrief} onOpenChange={setShowDebrief}>
        <DialogContent className="bg-black/95 border-purple-400/30 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-purple-400 font-mono text-2xl flex items-center gap-2">
              <Eye className="h-6 w-6 animate-pulse" />
              MISSION DEBRIEF
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Image src="/images/psx-logo-character.png" alt="Agency" width={48} height={48} className="rounded-full border-2 border-purple-400" />
              <span className="text-purple-300 font-mono">Operation: Surveillance Grid</span>
            </div>
            <div className="bg-black/60 border border-purple-400/20 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-purple-300 font-mono">
                <span>Final Score:</span>
                <span>{score}</span>
              </div>
              <div className="flex justify-between text-purple-300 font-mono">
                <span>Targets Neutralized:</span>
                <span>{targets.filter(t => t.status === "neutralized").length}</span>
              </div>
              <div className="flex justify-between text-purple-300 font-mono">
                <span>VIPs Protected:</span>
                <span>{targets.filter(t => t.type === "vip" && t.status !== "neutralized").length}</span>
              </div>
              <div className="flex justify-between text-purple-300 font-mono">
                <span>Double Agents Caught:</span>
                <span>{targets.filter(t => t.type === "double-agent" && t.status === "neutralized").length}</span>
              </div>
            </div>
            <div className="text-center mt-4">
              <Button onClick={() => setShowDebrief(false)} className="bg-purple-600 hover:bg-purple-700 text-white font-mono px-8 py-2">Close Debrief</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-mono font-bold text-purple-400 flex items-center justify-center gap-2">
          <Eye className="h-6 w-6" />
          PSX Underground Surveillance Network – Classified Operations
        </CardTitle>
        <p className="text-purple-300/70 text-sm">
          Monitor and neutralize targets using advanced surveillance systems. Score 800+ points to unlock access.
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Surveillance Grid */}
          <div className="lg:col-span-2">
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={GRID_SIZE * CELL_SIZE}
                height={GRID_SIZE * CELL_SIZE}
                className="border border-purple-400/30 rounded-lg cursor-pointer"
                onClick={handleCanvasClick}
              />
              
              {gameState === "completed" && (
                <div className="absolute inset-0 bg-green-500/20 border-2 border-green-400 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-2" />
                    <p className="text-green-400 font-mono font-bold">SURVEILLANCE COMPLETE</p>
                  </div>
                </div>
              )}
            </div>

            {/* Game Controls */}
            <div className="flex gap-4 mt-4">
              {gameState === "setup" && (
                <Button
                  onClick={startMonitoring}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-mono"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  INITIATE SURVEILLANCE
                </Button>
              )}
              
              <Button
                onClick={resetGame}
                variant="outline"
                className="border-purple-400/30 text-purple-400 hover:bg-purple-400/10"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Grid
              </Button>
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-4">
            {/* Game Stats */}
            <div className="bg-black/50 border border-purple-400/30 rounded-lg p-4">
              <h3 className="text-purple-400 font-mono font-bold mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                OPERATIONS STATUS
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-purple-300">Mission Score:</span>
                  <span className="font-mono text-white">{score}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">Time Remaining:</span>
                  <span className={`font-mono ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>
                    {timeLeft}s
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">Active Targets:</span>
                  <span className="font-mono text-white">
                    {targets.filter(t => t.status === "active").length}/{targets.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Camera Controls */}
            <div className="bg-black/50 border border-purple-400/30 rounded-lg p-4">
              <h3 className="text-purple-400 font-mono font-bold mb-3 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                SURVEILLANCE NETWORK
              </h3>
              <div className="space-y-2">
                {cameras.map(camera => (
                  <div key={camera.id} className="flex items-center justify-between">
                    <span className="text-purple-300">Camera {camera.id}:</span>
                    <div className="flex gap-2">
                      {camera.status === "offline" && (
                        <Button
                          onClick={() => activateCamera(camera.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Activate
                        </Button>
                      )}
                      {camera.status === "glitched" && (
                        <Button
                          onClick={() => repairCamera(camera.id)}
                          size="sm"
                          className="bg-orange-600 hover:bg-orange-700 text-white"
                        >
                          Repair
                        </Button>
                      )}
                      <span className={`text-xs ${
                        camera.status === "active" ? "text-green-400" :
                        camera.status === "glitched" ? "text-orange-400" : "text-gray-400"
                      }`}>
                        {camera.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-black/50 border border-purple-400/30 rounded-lg p-4">
              <h3 className="text-purple-400 font-mono font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                ALERT LOG
              </h3>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {alerts.slice(-5).map((alert, index) => (
                  <div key={index} className="text-xs text-purple-300 font-mono">
                    {alert}
                  </div>
                ))}
              </div>
            </div>

            {/* Password Display */}
            {showPassword && (
              <div className="bg-green-900/20 border border-green-400/30 rounded-lg p-4">
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <p className="text-green-400 font-mono font-bold">ACCESS GRANTED</p>
                  <p className="text-green-300 font-mono">Password: SURVEILLANCE-MASTER-2024</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center text-purple-300/70 text-sm max-w-2xl mx-auto">
          <p>Click cameras to select them, then click targets to neutralize them.</p>
          <p className="mt-2">Green dots = friendly agents, Red dots = suspects. Higher numbers = higher priority.</p>
          <p className="mt-2">Activate offline cameras and repair glitched ones to expand surveillance coverage.</p>
        </div>
      </CardContent>
    </Card>
  )
} 