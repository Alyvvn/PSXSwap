"use client"

import { useEffect } from "react"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sparkles, Download, ImageIcon, Text, Eraser } from "lucide-react"

export function MemeGenerator() {
  const [topText, setTopText] = useState("TOP TEXT")
  const [bottomText, setBottomText] = useState("BOTTOM TEXT")
  const [imageSrc, setImageSrc] = useState("/placeholder.png?height=400&width=600")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const drawMeme = () => {
    const canvas = canvasRef.current
    const image = imageRef.current

    if (!canvas || !image) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match image
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "white"
    ctx.strokeStyle = "black"
    ctx.lineWidth = canvas.width * 0.008 // Responsive border
    ctx.textAlign = "center"
    ctx.textBaseline = "top"

    // Calculate font size based on canvas width
    const fontSize = canvas.width * 0.06 // Adjust as needed
    ctx.font = `${fontSize}px Impact, sans-serif`
    ctx.lineJoin = "round"

    // Top text
    ctx.strokeText(topText.toUpperCase(), canvas.width / 2, canvas.height * 0.05)
    ctx.fillText(topText.toUpperCase(), canvas.width / 2, canvas.height * 0.05)

    // Bottom text
    ctx.textBaseline = "bottom"
    ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height * 0.95)
    ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height * 0.95)
  }

  // Redraw meme when text or image changes
  useEffect(() => {
    const image = new Image()
    image.src = imageSrc
    image.crossOrigin = "anonymous" // Crucial for CORS when drawing to canvas
    image.onload = () => {
      imageRef.current = image
      drawMeme()
    }
  }, [imageSrc, topText, bottomText])

  const downloadMeme = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const link = document.createElement("a")
      link.download = "psx-meme.png"
      link.href = canvas.toDataURL("image/png")
      link.click()
    }
  }

  const resetGenerator = () => {
    setTopText("TOP TEXT")
    setBottomText("BOTTOM TEXT")
    setImageSrc("/placeholder.png?height=400&width=600")
  }

  return (
    <Card className="w-full bg-black/70 border-cyan-500/30 backdrop-blur-xl shadow-cyan-500/20">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl font-bold text-cyan-400 flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-purple-400 animate-pulse" />
          Meme Generator
          <Sparkles className="h-8 w-8 text-purple-400 animate-pulse" />
        </CardTitle>
        <p className="text-cyan-300/80 text-sm mt-2">Craft your viral PSX memes.</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 p-6">
        {/* Meme Preview */}
        <div className="relative w-full max-w-xl aspect-video bg-gray-900 rounded-lg overflow-hidden border border-cyan-400/30 shadow-lg">
          <img
            ref={imageRef}
            src={imageSrc || "/placeholder.png"}
            alt="Meme Base"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ display: "none" }} // Hide the img element, only canvas is visible
          />
          <canvas ref={canvasRef} className="w-full h-full object-contain" />
        </div>

        {/* Controls */}
        <div className="w-full space-y-4">
          <div className="flex items-center gap-2">
            <Text className="h-5 w-5 text-cyan-400" />
            <Input
              placeholder="Top Text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              className="bg-cyan-900/30 border-cyan-500/50 text-cyan-200 placeholder:text-cyan-400/70 focus:ring-cyan-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Text className="h-5 w-5 text-cyan-400" />
            <Input
              placeholder="Bottom Text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              className="bg-cyan-900/30 border-cyan-500/50 text-cyan-200 placeholder:text-cyan-400/70 focus:ring-cyan-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-cyan-400" />
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="bg-cyan-900/30 border-cyan-500/50 text-cyan-200 file:text-cyan-400 file:bg-cyan-400/10 file:rounded-md file:px-3 file:py-1 file:border-none file:mr-2 hover:file:bg-cyan-400/20 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <Button
            onClick={downloadMeme}
            className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-lg py-6 font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/30 hover:from-cyan-700 hover:to-blue-700"
          >
            <Download className="h-5 w-5 mr-2" />
            DOWNLOAD MEME
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
