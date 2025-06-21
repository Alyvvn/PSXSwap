"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, RefreshCw, User } from "lucide-react"
import Image from "next/image"

export function PFPGenerator() {
  const [selectedBackground, setSelectedBackground] = useState(0)
  const [selectedCharacter, setSelectedCharacter] = useState(0)
  const [selectedAccessory, setSelectedAccessory] = useState(0)

  const backgrounds = [
    { name: "Cyber", color: "from-purple-600 to-blue-600" },
    { name: "Neon", color: "from-pink-600 to-purple-600" },
    { name: "Matrix", color: "from-green-600 to-black" },
    { name: "Sunset", color: "from-orange-600 to-red-600" },
  ]

  const characters = [
    { name: "PSX Agent", rarity: "Common" },
    { name: "Cyber Dog", rarity: "Rare" },
    { name: "Glizzy Master", rarity: "Epic" },
    { name: "Diamond Hands", rarity: "Legendary" },
  ]

  const accessories = [
    { name: "None", rarity: "Common" },
    { name: "Ski Mask", rarity: "Common" },
    { name: "Sunglasses", rarity: "Rare" },
    { name: "Crown", rarity: "Epic" },
    { name: "Laser Eyes", rarity: "Legendary" },
  ]

  const generateRandom = () => {
    setSelectedBackground(Math.floor(Math.random() * backgrounds.length))
    setSelectedCharacter(Math.floor(Math.random() * characters.length))
    setSelectedAccessory(Math.floor(Math.random() * accessories.length))
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-600"
      case "Rare":
        return "bg-blue-600"
      case "Epic":
        return "bg-purple-600"
      case "Legendary":
        return "bg-yellow-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <Card className="bg-black/80 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <User className="h-5 w-5" />
          PSX PFP Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Preview */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Your PFP</h3>
          <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden border border-gray-600 max-w-64 mx-auto">
            <div className={`absolute inset-0 bg-gradient-to-br ${backgrounds[selectedBackground].color}`}></div>
            <div className="absolute inset-4 flex items-center justify-center">
              <Image
                src="/images/pfp-character.png"
                alt="Character"
                width={150}
                height={150}
                className="object-contain"
              />
            </div>
            {selectedAccessory > 0 && (
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">👑</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customization Options */}
        <div className="space-y-4">
          {/* Background */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Background</h4>
            <div className="grid grid-cols-2 gap-2">
              {backgrounds.map((bg, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedBackground(index)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedBackground === index ? "border-purple-500" : "border-gray-600 hover:border-purple-400"
                  }`}
                >
                  <div className={`h-8 w-full rounded bg-gradient-to-r ${bg.color} mb-2`}></div>
                  <span className="text-xs text-gray-300">{bg.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Character */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Character</h4>
            <div className="grid grid-cols-2 gap-2">
              {characters.map((char, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCharacter(index)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedCharacter === index ? "border-purple-500" : "border-gray-600 hover:border-purple-400"
                  }`}
                >
                  <div className="text-xs text-white mb-1">{char.name}</div>
                  <Badge className={`text-xs ${getRarityColor(char.rarity)}`}>{char.rarity}</Badge>
                </button>
              ))}
            </div>
          </div>

          {/* Accessories */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Accessories</h4>
            <div className="grid grid-cols-2 gap-2">
              {accessories.map((acc, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAccessory(index)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedAccessory === index ? "border-purple-500" : "border-gray-600 hover:border-purple-400"
                  }`}
                >
                  <div className="text-xs text-white mb-1">{acc.name}</div>
                  <Badge className={`text-xs ${getRarityColor(acc.rarity)}`}>{acc.rarity}</Badge>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            onClick={generateRandom}
            variant="outline"
            className="flex-1 border-gray-800 text-purple-400 hover:bg-gray-800/50"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Random
          </Button>
          <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>

        {/* Stats */}
        <div className="bg-gray-900/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-300 mb-2">PFP Stats</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-white">1/10,000</div>
              <div className="text-xs text-gray-400">Rarity</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">Epic</div>
              <div className="text-xs text-gray-400">Tier</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">2.5 PSX</div>
              <div className="text-xs text-gray-400">Mint Cost</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
