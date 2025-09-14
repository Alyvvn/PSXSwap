"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ChevronLeft, ChevronRight, Download, Shuffle, Share2, Volume2, VolumeX, Palette, Settings, Database } from "lucide-react"
import Link from "next/link"

// Asset categories with proper layering order (bottom to top)
const ASSET_CATEGORIES = [
  { id: "shoes", name: "Shoes", layer: 1, description: "Footwear and shoes" },
  { id: "pants", name: "Pants", layer: 2, description: "Bottoms and pants" },
  { id: "tops", name: "Tops", layer: 3, description: "Shirts, jackets, and upper body clothing" },
  { id: "eyewear", name: "Eyewear", layer: 4, description: "Glasses, visors, and eye accessories" },
  { id: "hair", name: "Hair", layer: 5, description: "Hair styles and colors" },
  { id: "headgear", name: "Headgear", layer: 6, description: "Hats, helmets, and head accessories" },
  { id: "accessories", name: "Accessories", layer: 7, description: "Watches, jewelry, and other accessories" },
]

export default function PFPMaker() {
  // Dynamic asset loading from assets.json
  const [availableAssets, setAvailableAssets] = useState<Record<string, string[]>>({})
  const [selectedAssets, setSelectedAssets] = useState<Record<string, string>>({})
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [scale, setScale] = useState([100])
  const [showDownloadPanel, setShowDownloadPanel] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [secretKeySequence, setSecretKeySequence] = useState<string[]>([])
  const [showSecretAccess, setShowSecretAccess] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Load assets from assets.json on component mount
  useEffect(() => {
    const loadAssets = async () => {
      try {
        const response = await fetch('/src/data/assets.json')
        const assets = await response.json()
        setAvailableAssets(assets)
        
        // Initialize selected assets with first item or "none" for each category
        const initialSelection: Record<string, string> = {}
        ASSET_CATEGORIES.forEach(category => {
          const categoryAssets = assets[category.id] || []
          initialSelection[category.id] = categoryAssets.length > 0 ? categoryAssets[0] : "none"
        })
        setSelectedAssets(initialSelection)
      } catch (error) {
        console.error('Failed to load assets:', error)
        // Fallback to empty assets
        const emptyAssets = {
          shoes: [],
          pants: [],
          tops: [],
          eyewear: [],
          hair: [],
          headgear: [],
          accessories: []
        }
        setAvailableAssets(emptyAssets)
        
        // Initialize with "none" for all categories
        const initialSelection: Record<string, string> = {}
        ASSET_CATEGORIES.forEach(category => {
          initialSelection[category.id] = "none"
        })
        setSelectedAssets(initialSelection)
      }
    }
    loadAssets()
  }, [])

  // Secret key sequence handler for CMS access
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const newSequence = [...secretKeySequence, event.key].slice(-6) // Keep last 6 keys
      setSecretKeySequence(newSequence)
      
      // Check for secret sequence: "admin" + "cms"
      const secretCode = ['a', 'd', 'm', 'i', 'n', 's']
      if (newSequence.length === 6 && newSequence.every((key, index) => key.toLowerCase() === secretCode[index])) {
        setShowSecretAccess(true)
        setSecretKeySequence([]) // Reset sequence
        playSound("success")
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [secretKeySequence])

  // Check URL parameters for CMS access
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('dev') === 'true' || urlParams.get('cms') === 'access') {
      setShowSecretAccess(true)
    }
  }, [])

  // Play sound effect
  const playSound = (type: "click" | "randomize" | "download" | "save" | "navigate" | "success") => {
    if (!soundEnabled || !audioRef.current) return
    
    // Simple beep sounds for different actions
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    const frequencies = {
      click: 800,
      navigate: 600,
      randomize: 400,
      download: 1000,
      save: 1200,
      success: 1400
    }
    
    oscillator.frequency.setValueAtTime(frequencies[type], audioContext.currentTime)
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }

  // Randomize character
  const randomizeCharacter = () => {
    playSound("randomize")
    const newSelection: Record<string, string> = {}
    
    ASSET_CATEGORIES.forEach(category => {
      const categoryAssets = availableAssets[category.id] || []
      if (categoryAssets.length > 0) {
        const randomIndex = Math.floor(Math.random() * (categoryAssets.length + 1)) // +1 for "none" option
        newSelection[category.id] = randomIndex === categoryAssets.length ? "none" : categoryAssets[randomIndex]
      } else {
        newSelection[category.id] = "none"
      }
    })
    
    setSelectedAssets(newSelection)
  }

  // Share character
  const shareCharacter = async () => {
    playSound("click")
    const characterData = {
      assets: selectedAssets,
      timestamp: Date.now()
    }
    
    const shareText = `Check out my PFP! Created with PSX PFP Maker 🎨`
    const shareUrl = `${window.location.origin}/pfp-maker?config=${encodeURIComponent(JSON.stringify(characterData))}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My PFP Character',
          text: shareText,
          url: shareUrl
        })
        playSound("success")
      } catch (error) {
        console.log('Share cancelled or failed')
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
        alert('Share link copied to clipboard!')
        playSound("success")
      } catch (error) {
        console.error('Failed to copy to clipboard')
      }
    }
  }

  // Get current asset for a category
  const getCurrentAsset = (categoryId: string) => {
    const assetId = selectedAssets[categoryId]
    if (!assetId || assetId === "none") return null
    return assetId
  }

  // Navigate through assets for a category
  const navigateAsset = (categoryId: string, direction: "prev" | "next") => {
    playSound("navigate")
    const categoryAssets = availableAssets[categoryId] || []
    const allOptions = ["none", ...categoryAssets]
    const currentAsset = selectedAssets[categoryId] || "none"
    const currentIndex = allOptions.indexOf(currentAsset)
    
    let newIndex
    if (direction === "next") {
      newIndex = (currentIndex + 1) % allOptions.length
    } else {
      newIndex = currentIndex === 0 ? allOptions.length - 1 : currentIndex - 1
    }
    
    setSelectedAssets(prev => ({
      ...prev,
      [categoryId]: allOptions[newIndex]
    }))
  }

  // Enhanced download character function
  const downloadCharacter = async (resolution: number = 1024) => {
    playSound("download")
    setIsDownloading(true)
    
    try {
      const canvas = canvasRef.current
      if (!canvas) return
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      // Set canvas size
      canvas.width = resolution
      canvas.height = resolution
      
      // Clear canvas
      ctx.clearRect(0, 0, resolution, resolution)
      
      // Draw layers in order
      const sortedCategories = ASSET_CATEGORIES.sort((a, b) => a.layer - b.layer)
      
      for (const category of sortedCategories) {
        const assetId = selectedAssets[category.id]
        if (assetId && assetId !== "none") {
          try {
            const img = new Image()
            img.crossOrigin = "anonymous"
            
            await new Promise((resolve, reject) => {
              img.onload = () => {
                ctx.drawImage(img, 0, 0, resolution, resolution)
                resolve(null)
              }
              img.onerror = reject
              img.src = `/assets/${category.id}/${assetId}`
            })
          } catch (error) {
            console.warn(`Failed to load asset: ${category.id}/${assetId}`)
          }
        }
      }
      
      // Download the image
      const link = document.createElement('a')
      link.download = `pfp-${Date.now()}-${resolution}x${resolution}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      
      playSound("success")
    } catch (error) {
      console.error('Download failed:', error)
      alert('Download failed. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)]" />
      
      {/* Hidden canvas for rendering */}
      <canvas ref={canvasRef} className="hidden" />
      <audio ref={audioRef} />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              ← Back to Home
            </Link>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            PFP Maker
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Create your unique profile picture with layered customization
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl">
              <CardContent className="p-8">
                <div className="aspect-square bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-cyan-400/20 flex items-center justify-center relative overflow-hidden">
                  {/* Character Preview */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {ASSET_CATEGORIES
                      .sort((a, b) => a.layer - b.layer)
                      .map((category) => {
                        const assetId = selectedAssets[category.id]
                        if (!assetId || assetId === "none") return null
                        
                        return (
                          <img
                            key={`${category.id}-${assetId}`}
                            src={`/assets/${category.id}/${assetId}`}
                            alt={`${category.name}: ${assetId}`}
                            className="absolute inset-0 w-full h-full object-contain"
                            style={{ zIndex: category.layer }}
                            onError={(e) => {
                              console.warn(`Failed to load: /assets/${category.id}/${assetId}`)
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        )
                      })}
                    
                    {/* Placeholder when no assets */}
                    {Object.values(selectedAssets).every(asset => !asset || asset === "none") && (
                      <div className="text-center text-gray-500">
                        <Palette className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Start customizing your PFP</p>
                        <p className="text-sm">Select assets from the categories below</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap gap-4 mt-6 justify-center">
                  <Button
                    onClick={randomizeCharacter}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Shuffle className="h-5 w-5 mr-2" />
                    Randomize
                  </Button>
                  
                  <Button
                    onClick={() => setShowDownloadPanel(!showDownloadPanel)}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                    disabled={isDownloading}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    {isDownloading ? "Generating..." : "Download"}
                  </Button>
                  
                  <Button
                    onClick={shareCharacter}
                    variant="outline"
                    className="border-cyan-400/30 hover:border-cyan-400/50 text-cyan-400 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Share2 className="h-5 w-5 mr-2" />
                    Share
                  </Button>
                  
                  <Button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    variant="outline"
                    size="sm"
                    className="border-gray-600 hover:border-gray-500 p-3 rounded-xl"
                  >
                    {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                  
                  {/* Secret CMS Access Button */}
                  {showSecretAccess && (
                    <Button
                      onClick={() => window.open('/pfp-maker/cms', '_blank')}
                      variant="outline"
                      size="sm"
                      className="border-red-500/30 hover:border-red-500/50 text-red-400 hover:bg-red-500/10 p-3 rounded-xl transition-all"
                      title="Developer CMS Access"
                    >
                      <Database className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customization Panel */}
          <div className="space-y-6">
            <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">Customize Assets</h3>
                <div className="space-y-4">
                  {ASSET_CATEGORIES.map((category) => {
                    const currentAsset = getCurrentAsset(category.id)
                    const categoryAssets = availableAssets[category.id] || []
                    const allOptions = ["none", ...categoryAssets]
                    const currentIndex = allOptions.indexOf(selectedAssets[category.id] || "none")
                    
                    return (
                      <div key={category.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-cyan-400">{category.name}</span>
                          <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                            {currentAsset || "None"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => navigateAsset(category.id, "prev")}
                            variant="outline"
                            size="sm"
                            className="border-cyan-400/20 hover:border-cyan-400/40 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 p-2 rounded-lg transition-all"
                          >
                            <ChevronLeft className="h-3 w-3" />
                          </Button>
                          <div className="flex-1 h-2 bg-black/50 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300"
                              style={{
                                width: `${allOptions.length > 0 ? ((currentIndex + 1) / allOptions.length) * 100 : 0}%`,
                              }}
                            />
                          </div>
                          <Button
                            onClick={() => navigateAsset(category.id, "next")}
                            variant="outline"
                            size="sm"
                            className="border-cyan-400/20 hover:border-cyan-400/40 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 p-2 rounded-lg transition-all"
                          >
                            <ChevronRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Download Panel */}
            {showDownloadPanel && (
              <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-3xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-cyan-400 mb-4">Download Options</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { size: 256, label: "256x256", desc: "Discord" },
                      { size: 512, label: "512x512", desc: "Twitter" },
                      { size: 1024, label: "1024x1024", desc: "High Res" },
                      { size: 2048, label: "2048x2048", desc: "Print" },
                    ].map((option) => (
                      <Button
                        key={option.size}
                        onClick={() => downloadCharacter(option.size)}
                        variant="outline"
                        className="border-cyan-400/20 hover:border-cyan-400/40 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 flex flex-col h-auto py-3 transition-all"
                        disabled={isDownloading}
                      >
                        <span className="font-bold">{option.label}</span>
                        <span className="text-xs text-cyan-400/60">{option.desc}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
