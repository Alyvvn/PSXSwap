"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Download, RefreshCw, Text, ImageIcon, Palette } from "lucide-react"

const backgrounds = [
  "/images/psx-computer.png",
  "/images/psx-dream.png",
  "/images/psx-hero.png",
  "/images/psx-meme.png",
  "/images/psx-open.png",
  "/images/psx-store.png",
]

const characters = [
  "/placeholder.svg?height=200&width=200&text=Character+1",
  "/placeholder.svg?height=200&width=200&text=Character+2",
  "/placeholder.svg?height=200&width=200&text=Character+3",
]

export function MemeGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [topText, setTopText] = useState("TOP TEXT")
  const [bottomText, setBottomText] = useState("BOTTOM TEXT")
  const [selectedBackground, setSelectedBackground] = useState(backgrounds[0])
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0])
  const [textColor, setTextColor] = useState("#FFFFFF")
  const [fontSize, setFontSize] = useState([48])
  const [characterSize, setCharacterSize] = useState([100])
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 50 })

  const drawMeme = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new window.Image()
        img.crossOrigin = "anonymous" // Crucial for CORS if images are from different origins
        img.onload = () => resolve(img)
        img.onerror = (e) => reject(new Error(`Failed to load image: ${src}. Event: ${e}`))
        img.src = src
      })
    }

    Promise.all([loadImage(selectedBackground), loadImage(selectedCharacter)])
      .then(([bgImg, charImg]) => {
        // Set canvas dimensions to background image dimensions
        canvas.width = bgImg.naturalWidth
        canvas.height = bgImg.naturalHeight

        // Draw background
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)

        // Draw character
        const charWidth = (charImg.naturalWidth * characterSize[0]) / 100
        const charHeight = (charImg.naturalHeight * characterSize[0]) / 100
        const charX = (canvas.width * characterPosition.x) / 100 - charWidth / 2
        const charY = (canvas.height * characterPosition.y) / 100 - charHeight / 2
        ctx.drawImage(charImg, charX, charY, charWidth, charHeight)

        // Text settings
        ctx.fillStyle = textColor
        ctx.textAlign = "center"
        ctx.font = `${fontSize[0]}px Impact, sans-serif`
        ctx.textBaseline = "top" // For top text
        ctx.lineWidth = 0 // No border for text

        // Draw top text
        ctx.fillText(topText.toUpperCase(), canvas.width / 2, 20)

        ctx.textBaseline = "bottom" // For bottom text
        // Draw bottom text
        ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20)
      })
      .catch((error) => {
        console.error("Error drawing meme:", error)
        // Optionally draw an error message on the canvas
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.fillStyle = "red"
          ctx.font = "24px Arial"
          ctx.fillText("Error loading images!", canvas.width / 2, canvas.height / 2)
        }
      })
  }, [
    topText,
    bottomText,
    selectedBackground,
    selectedCharacter,
    textColor,
    fontSize,
    characterSize,
    characterPosition,
  ])

  useEffect(() => {
    drawMeme()
  }, [drawMeme])

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
      const link = document.createElement("a")
      link.download = "glizzy-meme.png"
      link.href = image
      link.click()
    }
  }

  const randomizeBackground = () => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length)
    setSelectedBackground(backgrounds[randomIndex])
  }

  const randomizeCharacter = () => {
    const randomIndex = Math.floor(Math.random() * characters.length)
    setSelectedCharacter(characters[randomIndex])
  }

  const handleCharacterDrag = useCallback(
    (e: React.MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height

      const startX = (e.clientX - rect.left) * scaleX
      const startY = (e.clientY - rect.top) * scaleY

      const initialCharX = (canvas.width * characterPosition.x) / 100
      const initialCharY = (canvas.height * characterPosition.y) / 100

      const offsetX = startX - initialCharX
      const offsetY = startY - initialCharY

      const onMouseMove = (moveEvent: MouseEvent) => {
        const newX = (moveEvent.clientX - rect.left) * scaleX - offsetX
        const newY = (moveEvent.clientY - rect.top) * scaleY - offsetY

        setCharacterPosition({
          x: (newX / canvas.width) * 100,
          y: (newY / canvas.height) * 100,
        })
      }

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove)
        window.removeEventListener("mouseup", onMouseUp)
      }

      window.addEventListener("mousemove", onMouseMove)
      window.addEventListener("mouseup", onMouseUp)
    },
    [characterPosition],
  )

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black py-12 text-white">
      <h1 className="mb-8 text-5xl font-bold text-cyan-400">Meme Forge</h1>
      <p className="mb-12 text-lg text-gray-300">Craft your legendary PSX memes.</p>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        {/* Canvas Section */}
        <Card className="bg-black/70 border-cyan-400/30 backdrop-blur-xl shadow-cyan-400/20">
          <CardContent className="flex aspect-video items-center justify-center p-4">
            <canvas
              ref={canvasRef}
              className="max-h-[500px] w-full rounded-lg border border-cyan-400/50 shadow-inner shadow-cyan-400/20"
              onMouseDown={handleCharacterDrag}
              style={{ cursor: "grab" }}
            />
          </CardContent>
        </Card>

        {/* Controls Section */}
        <Card className="bg-black/70 border-cyan-400/30 backdrop-blur-xl shadow-cyan-400/20">
          <CardContent className="p-6 space-y-6">
            {/* Text Inputs */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                <Text className="h-5 w-5" /> Meme Text
              </h3>
              <Input
                placeholder="TOP TEXT"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                className="bg-black/50 border-cyan-400/50 text-white placeholder:text-cyan-300/70 focus:border-cyan-400"
              />
              <Input
                placeholder="BOTTOM TEXT"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                className="bg-black/50 border-cyan-400/50 text-white placeholder:text-cyan-300/70 focus:border-cyan-400"
              />
            </div>

            {/* Text Color & Font Size */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2 mb-2">
                  <Palette className="h-5 w-5" /> Color
                </h3>
                <Input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="h-10 w-full cursor-pointer rounded-md border border-cyan-400/50 bg-black/50 p-1"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2 mb-2">
                  <Text className="h-5 w-5" /> Size
                </h3>
                <Slider min={20} max={100} step={1} value={fontSize} onValueChange={setFontSize} className="w-full" />
                <span className="text-sm text-cyan-300/70 mt-2 block text-center">{fontSize[0]}px</span>
              </div>
            </div>

            {/* Background Selection */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                <ImageIcon className="h-5 w-5" /> Background
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {backgrounds.map((bg, i) => (
                  <img
                    key={i}
                    src={bg || "/placeholder.svg"}
                    alt={`Background ${i + 1}`}
                    className={`cursor-pointer rounded-md border-2 ${
                      selectedBackground === bg ? "border-cyan-400" : "border-transparent"
                    } hover:border-cyan-300 transition`}
                    onClick={() => setSelectedBackground(bg)}
                  />
                ))}
              </div>
              <Button
                onClick={randomizeBackground}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" /> Random Background
              </Button>
            </div>

            {/* Character Selection & Size */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                <ImageIcon className="h-5 w-5" /> Character
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {characters.map((char, i) => (
                  <img
                    key={i}
                    src={char || "/placeholder.svg"}
                    alt={`Character ${i + 1}`}
                    className={`cursor-pointer rounded-md border-2 ${
                      selectedCharacter === char ? "border-cyan-400" : "border-transparent"
                    } hover:border-cyan-300 transition`}
                    onClick={() => setSelectedCharacter(char)}
                  />
                ))}
              </div>
              <Button
                onClick={randomizeCharacter}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" /> Random Character
              </Button>
              <h4 className="text-lg font-bold text-cyan-400 flex items-center gap-2 mt-4">Size</h4>
              <Slider
                min={10}
                max={200}
                step={1}
                value={characterSize}
                onValueChange={setCharacterSize}
                className="w-full"
              />
              <span className="text-sm text-cyan-300/70 mt-2 block text-center">{characterSize[0]}%</span>
            </div>

            {/* Download Button */}
            <Button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg py-6 font-bold uppercase tracking-wider shadow-lg shadow-purple-500/30 hover:from-purple-700 hover:to-pink-700 flex items-center gap-2"
            >
              <Download className="h-5 w-5" /> Download Meme
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MemeGenerator
