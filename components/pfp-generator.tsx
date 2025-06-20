"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sparkles, Download, ImageIcon, Eraser, Palette, Text } from "lucide-react"
import { cn } from "@/lib/utils"

const backgrounds = [
  "/placeholder.png?height=200&width=200",
  "/placeholder.png?height=200&width=200",
  "/placeholder.png?height=200&width=200",
  "/placeholder.png?height=200&width=200",
  "/placeholder.png?height=200&width=200",
]

const characters = [
  "/placeholder.png?height=200&width=200",
  "/placeholder.png?height=200&width=200",
  "/placeholder.png?height=200&width=200",
  "/placeholder.png?height=200&width=200",
  "/placeholder.png?height=200&width=200",
]

export function PfpGenerator() {
  const [selectedBackground, setSelectedBackground] = useState(backgrounds[0])
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0])
  const [customText, setCustomText] = useState("PSX")
  const [textColor, setTextColor] = useState("#00FFFF") // Cyan
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bgImageRef = useRef<HTMLImageElement>(null)
  const charImageRef = useRef<HTMLImageElement>(null)

  const drawPfp = () => {
    const canvas = canvasRef.current
    const bgImage = bgImageRef.current
    const charImage = charImageRef.current

    if (!canvas || !bgImage || !charImage) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const size = 500 // Standard PFP size
    canvas.width = size
    canvas.height = size

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height)

    // Draw character, centered and scaled
    const charWidth = size * 0.7
    const charHeight = size * 0.7
    const charX = (size - charWidth) / 2
    const charY = (size - charHeight) / 2
    ctx.drawImage(charImage, charX, charY, charWidth, charHeight)

    // Draw custom text
    ctx.fillStyle = textColor
    ctx.strokeStyle = "black"
    ctx.lineWidth = 8
    ctx.textAlign = "center"
    ctx.textBaseline = "bottom"
    ctx.font = `bold ${size * 0.1}px 'Press Start 2P', cursive` // Example retro font

    const textX = canvas.width / 2
    const textY = canvas.height * 0.95 // Near the bottom
    ctx.strokeText(customText.toUpperCase(), textX, textY)
    ctx.fillText(customText.toUpperCase(), textX, textY)
  }

  // Load images and redraw when selections change
  useEffect(() => {
    const loadImages = async () => {
      const loadImage = (src: string) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image()
          img.src = src
          img.crossOrigin = "anonymous"
          img.onload = () => resolve(img)
          img.onerror = reject
        })

      try {
        const loadedBg = await loadImage(selectedBackground)
        const loadedChar = await loadImage(selectedCharacter)
        bgImageRef.current = loadedBg
        charImageRef.current = loadedChar
        drawPfp()
      } catch (error) {
        console.error("Error loading images:", error)
      }
    }

    loadImages()
  }, [selectedBackground, selectedCharacter, customText, textColor])

  const downloadPfp = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const link = document.createElement("a")
      link.download = "psx-pfp.png"
      link.href = canvas.toDataURL("image/png")
      link.click()
    }
  }

  const resetGenerator = () => {
    setSelectedBackground(backgrounds[0])
    setSelectedCharacter(characters[0])
    setCustomText("PSX")
    setTextColor("#00FFFF")
  }

  return (
    <Card className="w-full bg-black/70 border-cyan-500/30 backdrop-blur-xl shadow-cyan-500/20">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl font-bold text-cyan-400 flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-purple-400 animate-pulse" />
          PFP Generator
          <Sparkles className="h-8 w-8 text-purple-400 animate-pulse" />
        </CardTitle>
        <p className="text-cyan-300/80 text-sm mt-2">Craft your unique agent identity.</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 p-6">
        {/* PFP Preview */}
        <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-cyan-400/50 shadow-xl">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        {/* Controls */}
        <div className="w-full space-y-4">
          {/* Backgrounds */}
          <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-2 flex items-center gap-2">
              <Palette className="h-5 w-5" /> Background
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {backgrounds.map((bg, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedBackground(bg)}
                  className={cn(
                    "w-full h-20 rounded-md overflow-hidden border-2 transition-all",
                    selectedBackground === bg
                      ? "border-cyan-400 ring-2 ring-cyan-400"
                      : "border-gray-700 hover:border-cyan-500",
                  )}
                >
                  <img
                    src={bg || "/placeholder.png"}
                    alt={`Background ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Characters */}
          <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-2 flex items-center gap-2">
              <ImageIcon className="h-5 w-5" /> Character
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {characters.map((char, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCharacter(char)}
                  className={cn(
                    "w-full h-20 rounded-md overflow-hidden border-2 transition-all",
                    selectedCharacter === char
                      ? "border-cyan-400 ring-2 ring-cyan-400"
                      : "border-gray-700 hover:border-cyan-500",
                  )}
                >
                  <img
                    src={char || "/placeholder.png"}
                    alt={`Character ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Custom Text */}
          <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-2 flex items-center gap-2">
              <Text className="h-5 w-5" /> Custom Text
            </h3>
            <Input
              placeholder="Your Text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="bg-cyan-900/30 border-cyan-500/50 text-cyan-200 placeholder:text-cyan-400/70 focus:ring-cyan-500"
            />
          </div>

          {/* Text Color */}
          <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-2 flex items-center gap-2">
              <Palette className="h-5 w-5" /> Text Color
            </h3>
            <Input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-full h-10 bg-cyan-900/30 border-cyan-500/50 rounded-md cursor-pointer"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <Button
            onClick={downloadPfp}
            className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-lg py-6 font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/30 hover:from-cyan-700 hover:to-blue-700"
          >
            <Download className="h-5 w-5 mr-2" />
            DOWNLOAD PFP
          </Button>
          <Button
            onClick={resetGenerator}
            variant="outline"
            className="flex-1 bg-cyan-800/30 text-cyan-300 border-cyan-500/50 hover:bg-cyan-800/50 text-lg py-6 font-bold uppercase tracking-wider"
          >
            <Eraser className="h-5 w-5 mr-2" />
            RESET
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
