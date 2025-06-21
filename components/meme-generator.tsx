"use client"

import { useEffect } from "react"
import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sparkles, Download, Text, Eraser, RefreshCw } from "lucide-react"
import Image from "next/image"

export function MemeGenerator() {
  const [topText, setTopText] = useState("TOP TEXT")
  const [bottomText, setBottomText] = useState("BOTTOM TEXT")
  const [selectedBackground, setSelectedBackground] = useState("/backgrounds/04ec0d58249731679fee7a7a277385d4.jpg")
  const [selectedCharacter, setSelectedCharacter] = useState("/completed Photos/1.png")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const backgroundRef = useRef<HTMLImageElement>(null)
  const characterRef = useRef<HTMLImageElement>(null)

  const backgroundImages = [
    "/backgrounds/04ec0d58249731679fee7a7a277385d4.jpg",
    "/backgrounds/0553ecc5e17807d0f6343d3fa3d1eabf.jpg",
    "/backgrounds/07018bbf5a070faede30c1fcbcf50ff9.jpg",
    "/backgrounds/0e0da999edb51ce664c91d0bafd947cf.jpg",
    "/backgrounds/2086c5cf4f263ece85d9553f01c73c06.jpg",
  ]

  const characterImages = [
    "/completed Photos/1.png",
    "/completed Photos/2.png",
    "/completed Photos/3.png",
    "/completed Photos/4.png",
    "/completed Photos/5.png",
  ]

  const drawMeme = () => {
    const canvas = canvasRef.current
    const background = backgroundRef.current
    const character = characterRef.current

    if (!canvas || !background || !character) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match background image
    canvas.width = background.naturalWidth
    canvas.height = background.naturalHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    // Draw character in the center bottom
    const charWidth = canvas.width * 0.3 // Adjust size as needed
    const charHeight = (character.naturalHeight / character.naturalWidth) * charWidth
    const charX = (canvas.width - charWidth) / 2
    const charY = canvas.height - charHeight - canvas.height * 0.05 // 5% from bottom
    ctx.drawImage(character, charX, charY, charWidth, charHeight)

    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"

    // Calculate font size based on canvas width
    const fontSize = canvas.width * 0.06 // Adjust as needed
    ctx.font = `${fontSize}px Impact, sans-serif`

    // Top text
    ctx.fillText(topText.toUpperCase(), canvas.width / 2, canvas.height * 0.05)

    // Bottom text
    ctx.textBaseline = "bottom"
    ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height * 0.95)
  }

  // Redraw meme when text or images change
  useEffect(() => {
    const loadImage = (src: string, ref: React.MutableRefObject<HTMLImageElement | null>, callback: () => void) => {
      const img = new Image()
      img.src = src
      img.crossOrigin = "anonymous" // Crucial for CORS when drawing to canvas
      img.onload = () => {
        ref.current = img
        callback()
      }
      img.onerror = (e) => {
        console.error("Error loading image:", src, e)
      }
    }

    let backgroundLoaded = false
    let characterLoaded = false

    const checkAndDraw = () => {
      if (backgroundLoaded && characterLoaded) {
        drawMeme()
      }
    }

    loadImage(selectedBackground, backgroundRef, () => {
      backgroundLoaded = true
      checkAndDraw()
    })
    loadImage(selectedCharacter, characterRef, () => {
      characterLoaded = true
      checkAndDraw()
    })
  }, [selectedBackground, selectedCharacter, topText, bottomText])

  const downloadMeme = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const link = document.createElement("a")
      link.download = "psx-meme.png"
      link.href = canvas.toDataURL("image/png")
      link.click()
    }
  }

  const randomizeBackground = () => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length)
    setSelectedBackground(backgroundImages[randomIndex])
  }

  const randomizeCharacter = () => {
    const randomIndex = Math.floor(Math.random() * characterImages.length)
    setSelectedCharacter(characterImages[randomIndex])
  }

  const resetGenerator = () => {
    setTopText("TOP TEXT")
    setBottomText("BOTTOM TEXT")
    setSelectedBackground(backgroundImages[0])
    setSelectedCharacter(characterImages[0])
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

          {/* Background Selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Choose Background</h3>
              <Button
                onClick={randomizeBackground}
                variant="outline"
                size="sm"
                className="bg-black text-white border-gray-700 hover:bg-gray-900"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Random
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {backgroundImages.map((bg, index) => (
                <div
                  key={index}
                  className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedBackground === bg ? "border-cyan-600" : "border-gray-800 hover:border-gray-700"
                  }`}
                  onClick={() => setSelectedBackground(bg)}
                >
                  <Image src={bg || "/placeholder.svg"} alt={`Background ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Character Selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Choose Character</h3>
              <Button
                onClick={randomizeCharacter}
                variant="outline"
                size="sm"
                className="bg-black text-white border-gray-700 hover:bg-gray-900"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Random
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {characterImages.map((char, index) => (
                <div
                  key={index}
                  className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedCharacter === char ? "border-cyan-600" : "border-gray-800 hover:border-gray-700"
                  }`}
                  onClick={() => setSelectedCharacter(char)}
                >
                  <Image
                    src={char || "/placeholder.svg"}
                    alt={`Character ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
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
