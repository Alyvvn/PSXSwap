"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, RotateCcw, Terminal } from "lucide-react"

interface Node {
  id: number
  x: number
  y: number
  color: string
  connected: boolean
}

interface Path {
  from: number
  to: number
  color: string
  points: { x: number; y: number }[]
}

const GRID_SIZE = 8
const CELL_SIZE = 60
const NODE_RADIUS = 20

const COLORS = [
  "#ff4444", // Red
  "#44ff44", // Green
  "#4444ff", // Blue
  "#ffff44", // Yellow
  "#ff44ff", // Magenta
  "#44ffff", // Cyan
]

export function GlizzyGridPuzzle({ onComplete }: { onComplete: (password: string) => void }) {
  const [nodes, setNodes] = useState<Node[]>([])
  const [paths, setPaths] = useState<Path[]>([])
  const [selectedNode, setSelectedNode] = useState<number | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Initialize puzzle
  useEffect(() => {
    initializePuzzle()
  }, [])

  const initializePuzzle = () => {
    const newNodes: Node[] = []
    const usedPositions = new Set<string>()

    // Create pairs of nodes
    for (let i = 0; i < 6; i++) {
      const color = COLORS[i]
      
      // Create first node
      let x1, y1
      do {
        x1 = Math.floor(Math.random() * GRID_SIZE)
        y1 = Math.floor(Math.random() * GRID_SIZE)
      } while (usedPositions.has(`${x1},${y1}`))
      usedPositions.add(`${x1},${y1}`)

      // Create second node
      let x2, y2
      do {
        x2 = Math.floor(Math.random() * GRID_SIZE)
        y2 = Math.floor(Math.random() * GRID_SIZE)
      } while (usedPositions.has(`${x2},${y2}`))
      usedPositions.add(`${x2},${y2}`)

      newNodes.push(
        { id: i * 2, x: x1, y: y1, color, connected: false },
        { id: i * 2 + 1, x: x2, y: y2, color, connected: false }
      )
    }

    setNodes(newNodes)
    setPaths([])
    setIsComplete(false)
    setShowPassword(false)
  }

  const drawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "#333"
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

    // Draw paths
    paths.forEach(path => {
      if (path.points.length > 1) {
        ctx.strokeStyle = path.color
        ctx.lineWidth = 8
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        
        ctx.beginPath()
        ctx.moveTo(path.points[0].x * CELL_SIZE + CELL_SIZE / 2, path.points[0].y * CELL_SIZE + CELL_SIZE / 2)
        
        for (let i = 1; i < path.points.length; i++) {
          ctx.lineTo(path.points[i].x * CELL_SIZE + CELL_SIZE / 2, path.points[i].y * CELL_SIZE + CELL_SIZE / 2)
        }
        ctx.stroke()
      }
    })

    // Draw nodes
    nodes.forEach(node => {
      const x = node.x * CELL_SIZE + CELL_SIZE / 2
      const y = node.y * CELL_SIZE + CELL_SIZE / 2

      // Draw glow effect
      ctx.shadowColor = node.color
      ctx.shadowBlur = 15
      ctx.fillStyle = node.color
      ctx.beginPath()
      ctx.arc(x, y, NODE_RADIUS, 0, 2 * Math.PI)
      ctx.fill()

      // Draw inner circle
      ctx.shadowBlur = 0
      ctx.fillStyle = "#000"
      ctx.beginPath()
      ctx.arc(x, y, NODE_RADIUS - 4, 0, 2 * Math.PI)
      ctx.fill()

      // Draw selection indicator
      if (selectedNode === node.id) {
        ctx.strokeStyle = "#fff"
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(x, y, NODE_RADIUS + 5, 0, 2 * Math.PI)
        ctx.stroke()
      }
    })
  }

  useEffect(() => {
    drawCanvas()
  }, [nodes, paths, selectedNode])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const gridX = Math.floor(x / CELL_SIZE)
    const gridY = Math.floor(y / CELL_SIZE)

    // Find clicked node
    const clickedNode = nodes.find(node => 
      node.x === gridX && node.y === gridY
    )

    if (clickedNode) {
      if (selectedNode === null) {
        setSelectedNode(clickedNode.id)
      } else if (selectedNode !== clickedNode.id) {
        // Try to connect nodes
        const selectedNodeData = nodes.find(n => n.id === selectedNode)
        if (selectedNodeData && selectedNodeData.color === clickedNode.color) {
          // Create path between nodes
          const path = createPath(selectedNodeData, clickedNode)
          if (path) {
            setPaths(prev => [...prev, path])
            setNodes(prev => prev.map(n => 
              n.id === selectedNode || n.id === clickedNode.id 
                ? { ...n, connected: true }
                : n
            ))
          }
        }
        setSelectedNode(null)
      } else {
        setSelectedNode(null)
      }
    }
  }

  const createPath = (from: Node, to: Node): Path | null => {
    // Simple pathfinding - just connect directly
    const points = [{ x: from.x, y: from.y }, { x: to.x, y: to.y }]
    
    return {
      from: from.id,
      to: to.id,
      color: from.color,
      points
    }
  }

  const checkCompletion = () => {
    const connectedPairs = nodes.filter(n => n.connected).length / 2
    const totalPairs = nodes.length / 2
    
    if (connectedPairs === totalPairs) {
      setIsComplete(true)
      setShowPassword(true)
      onComplete("GLZ-2024-ACCESS")
    }
  }

  useEffect(() => {
    checkCompletion()
  }, [nodes])

  return (
    <Card className="w-full max-w-4xl bg-black/90 border-cyan-400/30 backdrop-blur-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-mono font-bold text-cyan-400 flex items-center justify-center gap-2">
          <Terminal className="h-6 w-6" />
          Glizzy Grid Mainframe – Secure Data Pathing Required
        </CardTitle>
        <p className="text-cyan-300/70 text-sm">
          Connect matching Glizzy Nodes to establish secure data pathways
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-6">
          {/* Canvas */}
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={GRID_SIZE * CELL_SIZE}
              height={GRID_SIZE * CELL_SIZE}
              className="border border-cyan-400/30 rounded-lg cursor-pointer"
              onClick={handleCanvasClick}
            />
            
            {/* Completion overlay */}
            {isComplete && (
              <div className="absolute inset-0 bg-green-500/20 border-2 border-green-400 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-2" />
                  <p className="text-green-400 font-mono font-bold">PATHWAY ESTABLISHED</p>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-4">
            <Button
              onClick={initializePuzzle}
              variant="outline"
              className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Grid
            </Button>
          </div>

          {/* Password display */}
          {showPassword && (
            <div className="mt-4 p-4 bg-green-900/20 border border-green-400/30 rounded-lg">
              <div className="text-center">
                <p className="text-green-400 font-mono font-bold mb-2">ACCESS GRANTED</p>
                <p className="text-green-300 font-mono">Password: GLZ-2024-ACCESS</p>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="text-center text-cyan-300/70 text-sm max-w-md">
            <p>Click on a Glizzy Node to select it, then click on its matching pair to connect them.</p>
            <p className="mt-2">Complete all connections to unlock the portal key.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 