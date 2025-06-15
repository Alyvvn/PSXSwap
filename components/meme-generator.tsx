"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Download, RefreshCw, Type } from "lucide-react"
import Image from "next/image"

export function MemeGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState(0)
  const [topText, setTopText] = useState("")
  const [bottomText, setBottomText] = useState("")

  const memeTemplates = [
    "/images/psx-hero.png",
    "/images/psx-store.png",
    "/images/psx-meme.png",
    "/images/psx-computer.png",
    "/images/psx-dream.png",
    "/images/psx-attention.png",
  ]

  const handleDownload = () => {
    console.log("Downloading meme with:", { selectedTemplate, topText, bottomText })
  }

  const randomizeTemplate = () => {
    const randomIndex = Math.floor(Math.random() * memeTemplates.length)
    setSelectedTemplate(randomIndex)
  }

  return (
    <Card className="bg-black/80 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Type className="h-5 w-5" />
          PSX Meme Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Template Selection */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Choose Template</h3>
            <Button
              onClick={randomizeTemplate}
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:bg-gray-900"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Random
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {memeTemplates.map((template, index) => (
              <div
                key={index}
                className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                  selectedTemplate === index ? "border-gray-600" : "border-gray-800 hover:border-gray-700"
                }`}
                onClick={() => setSelectedTemplate(index)}
              >
                <Image
                  src={template || "/placeholder.svg"}
                  alt={`Template ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Text Inputs */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Top Text</label>
            <Input
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              placeholder="Enter top text..."
              className="bg-gray-900 border-gray-800 text-white placeholder-gray-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Bottom Text</label>
            <Input
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              placeholder="Enter bottom text..."
              className="bg-gray-900 border-gray-800 text-white placeholder-gray-500"
            />
          </div>
        </div>

        {/* Preview */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
          <div className="relative aspect-square bg-black rounded-lg overflow-hidden border border-gray-800">
            <Image
              src={memeTemplates[selectedTemplate] || "/placeholder.svg"}
              alt="Meme Preview"
              fill
              className="object-cover"
            />
            {topText && (
              <div className="absolute top-4 left-4 right-4 text-center">
                <span
                  className="text-white font-black bg-black/70 px-4 py-2 rounded-lg shadow-lg"
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                    textShadow: "2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000",
                    letterSpacing: "0.1em",
                  }}
                >
                  {topText.toUpperCase()}
                </span>
              </div>
            )}
            {bottomText && (
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span
                  className="text-white font-black bg-black/70 px-4 py-2 rounded-lg shadow-lg"
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                    textShadow: "2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000",
                    letterSpacing: "0.1em",
                  }}
                >
                  {bottomText.toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            onClick={handleDownload}
            className="flex-1 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 border border-gray-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Meme
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-900">
            Share
          </Button>
        </div>

        {/* Quick Templates */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Quick Templates</h4>
          <div className="flex flex-wrap gap-2">
            {[
              { top: "WHEN PSX HITS", bottom: "$1" },
              { top: "DIAMOND HANDS", bottom: "PSX FOREVER" },
              { top: "TO THE MOON", bottom: "AND BEYOND" },
              { top: "HOLD PSX", bottom: "NEVER SELL" },
            ].map((template, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="border-gray-800 text-gray-400 hover:border-gray-700 hover:bg-gray-900"
                onClick={() => {
                  setTopText(template.top)
                  setBottomText(template.bottom)
                }}
              >
                {template.top}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
