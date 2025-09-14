"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Download, RefreshCw, Text, ImageIcon, Palette, Upload, Sparkles, Zap, ArrowLeft, Home } from "lucide-react"
import Link from "next/link"

// Updated backgrounds without the deleted ones
const backgrounds = [
  "/images/meme-backgrounds/1.png",
  "/images/meme-backgrounds/2.png",
  "/images/meme-backgrounds/3.png",
  "/images/meme-backgrounds/4.png",
  "/images/meme-backgrounds/5.png",
  "/images/meme-backgrounds/6.png",
  "/images/meme-backgrounds/7.png",
  "/images/meme-backgrounds/8.png",
  "/images/meme-backgrounds/9.png",
  "/images/meme-backgrounds/10.png",
  "/images/meme-backgrounds/11.png",
  "/images/meme-backgrounds/12.png",
  "/images/meme-backgrounds/13.png",
  "/images/meme-backgrounds/14.png",
  "/images/meme-backgrounds/15.png",
  "/images/meme-backgrounds/16.png",
  "/images/meme-backgrounds/17.png",
  "/images/meme-backgrounds/18.png",
  "/images/meme-backgrounds/19.png",
  "/images/meme-backgrounds/20.png",
  "/images/meme-backgrounds/21.png",
  "/images/meme-backgrounds/22.png",
  "/images/meme-backgrounds/0885898432d089676305eb9a53d9832b.jpg",
  "/images/meme-backgrounds/19c0db272d60dd4f0ded29b3e4654ad2.jpg",
  "/images/meme-backgrounds/1e467136d39f6dbb300909407e670e42.jpg",
  "/images/meme-backgrounds/2a55b345126f7fd424480e63a43d6bd1.jpg",
  "/images/meme-backgrounds/85cb804965d4765c7388b3bbb7739b26.jpg",
  "/images/meme-backgrounds/ba74b57164c8e2aee12483de4a6753e6.jpg",
  "/images/meme-backgrounds/dcf335780d1950a819bf05240441659b.jpg",
  "/images/meme-backgrounds/e3950bfc4dd44b1684856dd5a6587a6c.jpg",
  "/images/meme-backgrounds/e6e2bcfb6129db9a9991469f736da3da.jpg",
  "/images/meme-backgrounds/ebe9614fe194336cfe426b4e5301f6ee.jpg",
  "/images/meme-backgrounds/f861494e62559f3cc29890be9df9cb35.jpg",
  "/images/meme-backgrounds/fde8e62c9a28e0433518dbd99e3b5a26.jpg",
  "/images/meme-backgrounds/New Project (1).png",
  "/images/meme-backgrounds/photo_2025-03-26_20-55-15 (2).jpg",
  "/images/meme-backgrounds/photo_2025-03-26_20-55-15-2.jpg",
  "/images/meme-backgrounds/photo_2025-03-26_20-55-15.jpg",
  "/images/meme-backgrounds/psx-character-main.png",
  "/images/meme-backgrounds/psx-graffiti.png",
  "/images/meme-backgrounds/psx_1.png",
  "/images/meme-backgrounds/psx_2.png",
  "/images/meme-backgrounds/psx_3.png",
  "/images/meme-backgrounds/psx_4.png",
  "/images/meme-backgrounds/psx_5.png",
  "/images/meme-backgrounds/psx_6.png",
  "/images/meme-backgrounds/psx_7.png",
  "/images/meme-backgrounds/psx_8.png",
  "/images/meme-backgrounds/psx_9.png",
  "/images/meme-backgrounds/psx_10.png",
  "/images/meme-backgrounds/psx_11.png",
  "/images/meme-backgrounds/psx_12.png",
  "/images/meme-backgrounds/trfgh.jpg",
  "/images/meme-backgrounds/yerdfhxcv.png",
]

interface MemeGeneratorProps {
  onMemeGenerated?: (memeDataUrl: string) => void
}

export function MemeGenerator({ onMemeGenerated }: MemeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [topText, setTopText] = useState("TOP TEXT")
  const [bottomText, setBottomText] = useState("BOTTOM TEXT")
  const [selectedBackground, setSelectedBackground] = useState(backgrounds[0])
  const [textColor, setTextColor] = useState("#FFFFFF")
  const [fontSize, setFontSize] = useState([60])
  const [textStroke, setTextStroke] = useState([3])
  const [strokeColor, setStrokeColor] = useState("#000000")
  const [isGenerating, setIsGenerating] = useState(false)

  const loadImage = useCallback((src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image()
      img.crossOrigin = "anonymous"
      img.onload = () => resolve(img)
      img.onerror = (e) => reject(new Error(`Failed to load image: ${src}. Event: ${e}`))
      img.src = encodeURI(src)
    })
  }, [])

  const drawMeme = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    try {
      const bgImg = await loadImage(selectedBackground)

      canvas.width = bgImg.naturalWidth
      canvas.height = bgImg.naturalHeight
      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)

      // Enhanced text rendering with better quality
      ctx.font = `bold ${fontSize[0]}px Impact, Arial Black, sans-serif`
      ctx.textAlign = "center"
      ctx.fillStyle = textColor
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = textStroke[0]
      ctx.lineJoin = "round"
      ctx.miterLimit = 2

      // Add text shadow for better readability
      ctx.shadowColor = "rgba(0, 0, 0, 0.8)"
      ctx.shadowBlur = 4
      ctx.shadowOffsetX = 2
      ctx.shadowOffsetY = 2

      // Top text with stroke
      ctx.textBaseline = "top"
      if (textStroke[0] > 0) {
        ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 30)
      }
      ctx.fillText(topText.toUpperCase(), canvas.width / 2, 30)

      // Bottom text with stroke
      ctx.textBaseline = "bottom"
      if (textStroke[0] > 0) {
        ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 30)
      }
      ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 30)

      // Reset shadow
      ctx.shadowColor = "transparent"
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
    } catch (err) {
      console.error("Error drawing meme:", err)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#ff4444"
      ctx.font = "24px Arial"
      ctx.textAlign = "center"
      ctx.fillText("Error loading image!", canvas.width / 2, canvas.height / 2)
    }
  }, [topText, bottomText, selectedBackground, textColor, fontSize, textStroke, strokeColor, loadImage])

  useEffect(() => {
    drawMeme()
  }, [drawMeme])

  const handleDownloadAndPublish = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    setIsGenerating(true)

    try {
      // Add a small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500))

      const image = canvas.toDataURL("image/png", 1.0) // High quality

      if (onMemeGenerated) {
        onMemeGenerated(image)
      }

      // Download the image
      const link = document.createElement("a")
      link.download = `psx-meme-${Date.now()}.png`
      link.href = image
      link.click()
    } catch (error) {
      console.error("Error generating meme:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const randomizeBackground = () => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length)
    setSelectedBackground(backgrounds[randomIndex])
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedBackground(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const resetToDefaults = () => {
    setTopText("TOP TEXT")
    setBottomText("BOTTOM TEXT")
    setTextColor("#FFFFFF")
    setFontSize([60])
    setTextStroke([3])
    setStrokeColor("#000000")
    setSelectedBackground(backgrounds[0])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Professional Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-cyan-400/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="hidden sm:flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-cyan-400" />
                <h1 className="text-xl font-mono font-bold text-cyan-400">PSX Meme Forge</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-full border border-green-400/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 font-mono text-xs">FORGE ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile Header */}
        <div className="sm:hidden text-center mb-8">
          <h1 className="text-3xl font-mono font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            PSX Meme Forge
          </h1>
          <p className="text-gray-400 mt-2">Create legendary PSX memes</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Canvas Section */}
          <div className="xl:col-span-2">
            <Card className="bg-slate-900/50 border-cyan-400/20 backdrop-blur-xl shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-mono text-cyan-400 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Meme Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-black/30 rounded-xl border border-cyan-400/10 p-4 mb-6">
                  <div className="flex items-center justify-center min-h-[400px]">
                    <canvas
                      ref={canvasRef}
                      className="max-w-full max-h-[500px] rounded-lg shadow-xl border border-cyan-400/20"
                      style={{ maxHeight: "500px" }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleDownloadAndPublish}
                    disabled={isGenerating}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="h-5 w-5 mr-2" />
                        Download Meme
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={resetToDefaults}
                    variant="outline"
                    className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 bg-transparent"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Section */}
          <div className="space-y-6">
            {/* Text Controls */}
            <Card className="bg-slate-900/50 border-cyan-400/20 backdrop-blur-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-mono text-cyan-400 flex items-center gap-2">
                  <Text className="h-5 w-5" />
                  Text Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-mono text-cyan-300 mb-2 block">Top Text</label>
                    <Input
                      placeholder="Enter top text..."
                      value={topText}
                      onChange={(e) => setTopText(e.target.value)}
                      className="bg-black/30 border-cyan-400/30 text-white placeholder:text-gray-500 focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-mono text-cyan-300 mb-2 block">Bottom Text</label>
                    <Input
                      placeholder="Enter bottom text..."
                      value={bottomText}
                      onChange={(e) => setBottomText(e.target.value)}
                      className="bg-black/30 border-cyan-400/30 text-white placeholder:text-gray-500 focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Color Controls */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-mono text-cyan-300 mb-2 block flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Text Color
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-12 h-10 p-1 cursor-pointer rounded border border-cyan-400/30 bg-black/30"
                      />
                      <Input
                        type="text"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="flex-1 bg-black/30 border-cyan-400/30 text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-mono text-cyan-300 mb-2 block flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Stroke Color
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={strokeColor}
                        onChange={(e) => setStrokeColor(e.target.value)}
                        className="w-12 h-10 p-1 cursor-pointer rounded border border-cyan-400/30 bg-black/30"
                      />
                      <Input
                        type="text"
                        value={strokeColor}
                        onChange={(e) => setStrokeColor(e.target.value)}
                        className="flex-1 bg-black/30 border-cyan-400/30 text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Sliders */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-mono text-cyan-300 mb-2 block">Font Size: {fontSize[0]}px</label>
                    <Slider
                      min={20}
                      max={150}
                      step={1}
                      value={fontSize}
                      onValueChange={setFontSize}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-mono text-cyan-300 mb-2 block">
                      Stroke Width: {textStroke[0]}px
                    </label>
                    <Slider
                      min={0}
                      max={10}
                      step={1}
                      value={textStroke}
                      onValueChange={setTextStroke}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Background Controls */}
            <Card className="bg-slate-900/50 border-cyan-400/20 backdrop-blur-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-mono text-cyan-400 flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Background
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {backgrounds.map((bg, i) => (
                    <button
                      key={i}
                      className={`relative aspect-square cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                        selectedBackground === bg
                          ? "border-cyan-400 shadow-lg shadow-cyan-400/30 scale-105"
                          : "border-transparent hover:border-cyan-300/50 hover:scale-105"
                      }`}
                      onClick={() => setSelectedBackground(bg)}
                    >
                      <img
                        src={bg || "/placeholder.svg"}
                        alt={`Background ${i + 1}`}
                        className="w-full h-full object-cover rounded-md"
                        onError={(e) => {
                          console.log(`Failed to load background: ${bg}`)
                          e.currentTarget.style.display = "none"
                        }}
                      />
                      {selectedBackground === bg && (
                        <div className="absolute inset-0 bg-cyan-400/20 rounded-md flex items-center justify-center">
                          <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  <label htmlFor="upload-background" className="w-full">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 bg-transparent cursor-pointer"
                    >
                      <span>
                        <Upload className="h-4 w-4 mr-2" /> Upload Custom Image
                      </span>
                    </Button>
                  </label>
                  <input
                    id="upload-background"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />

                  <Button
                    onClick={randomizeBackground}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-mono"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Random Background
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-900/50 border-cyan-400/20 backdrop-blur-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-mono text-cyan-400">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 bg-transparent"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Back to Main Site
                  </Button>
                </Link>
                <Link href="/roadmap">
                  <Button
                    variant="outline"
                    className="w-full border-purple-400/30 text-purple-400 hover:bg-purple-400/10 bg-transparent"
                  >
                    View Roadmap
                  </Button>
                </Link>
                <Link href="/game-auth">
                  <Button
                    variant="outline"
                    className="w-full border-green-400/30 text-green-400 hover:bg-green-400/10 bg-transparent"
                  >
                    Play PSX Game
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemeGenerator
