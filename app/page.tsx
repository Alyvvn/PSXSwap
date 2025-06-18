"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Copy,
  Twitter,
  MessageCircle,
  DiscIcon as Discord,
  Upload,
  Download,
  Gamepad2,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Zap,
  X,
  RefreshCw,
} from "lucide-react"

export default function GlizzyWorld() {
  const [activeSection, setActiveSection] = useState("home")
  const [gamePassword, setGamePassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [gameUnlocked, setGameUnlocked] = useState(false)
  const [memeText, setMemeText] = useState({ top: "", bottom: "" })
  const [selectedMemeTemplate, setSelectedMemeTemplate] = useState(0)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [roadmapStep, setRoadmapStep] = useState(0)
  const [pfpTraits, setPfpTraits] = useState({ background: 0, character: 0, accessory: 0 })
  const [glizzyCount, setGlizzyCount] = useState(0)
  const [poweradeCount, setPoweradeCount] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Meme templates (can be dynamically updated)
  const [memeTemplates, setMemeTemplates] = useState([
    "/placeholder.svg?height=400&width=400&text=Glizzy+Template+1",
    "/placeholder.svg?height=400&width=400&text=Glizzy+Template+2",
    "/placeholder.svg?height=400&width=400&text=Glizzy+Template+3",
    "/placeholder.svg?height=400&width=400&text=Glizzy+Template+4",
  ])

  // Roadmap data
  const roadmapSteps = [
    {
      phase: "Phase 1",
      title: "Launch",
      status: "completed",
      items: ["Token Launch", "Website Live", "Community Building"],
    },
    { phase: "Phase 2", title: "Growth", status: "active", items: ["CEX Listings", "Partnerships", "Meme Contests"] },
    { phase: "Phase 3", title: "Expansion", status: "upcoming", items: ["NFT Collection", "Staking", "Mobile App"] },
    {
      phase: "Phase 4",
      title: "Domination",
      status: "future",
      items: ["Metaverse", "Global Adoption", "Glizzy Empire"],
    },
  ]

  // PFP traits
  const pfpBackgrounds = ["Neon City", "Space", "Underwater", "Fire"]
  const pfpCharacters = ["Cool Glizzy", "Cyber Glizzy", "Golden Glizzy", "Diamond Glizzy"]
  const pfpAccessories = ["None", "Sunglasses", "Crown", "Laser Eyes"]

  // Tokenomics data
  const tokenomics = [
    { label: "Total Supply", value: "1,000,000,000", icon: "🌭", color: "text-yellow-400" },
    { label: "Liquidity Pool", value: "80%", icon: "💧", color: "text-blue-400" },
    { label: "Marketing", value: "10%", icon: "📢", color: "text-green-400" },
    { label: "Team", value: "5%", icon: "👥", color: "text-purple-400" },
    { label: "Burned", value: "5%", icon: "🔥", color: "text-red-400" },
  ]

  // Auto-cycle roadmap
  useEffect(() => {
    const interval = setInterval(() => {
      setRoadmapStep((prev) => (prev + 1) % roadmapSteps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Glizzy counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setGlizzyCount((prev) => prev + Math.floor(Math.random() * 10))
      setPoweradeCount((prev) => prev + Math.floor(Math.random() * 5))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handlePasswordSubmit = () => {
    if (gamePassword === "glizzy123" || gamePassword === "hotdog") {
      setGameUnlocked(true)
    } else {
      alert('Wrong password! Try "glizzy123" or "hotdog"')
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage = e.target?.result as string
        setUploadedImages((prev) => [...prev, newImage])
        setMemeTemplates((prev) => [...prev, newImage])
      }
      reader.readAsDataURL(file)
    }
  }

  const removeUploadedImage = (index: number) => {
    const imageToRemove = uploadedImages[index]
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
    setMemeTemplates((prev) => prev.filter((template) => template !== imageToRemove))
  }

  const downloadMeme = () => {
    // In a real implementation, this would generate and download the meme
    alert("Meme downloaded! 🌭")
  }

  const generateRandomPFP = () => {
    setPfpTraits({
      background: Math.floor(Math.random() * pfpBackgrounds.length),
      character: Math.floor(Math.random() * pfpCharacters.length),
      accessory: Math.floor(Math.random() * pfpAccessories.length),
    })
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Custom Font Import */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Luckiest+Guy&display=swap');
        .meme-font { font-family: 'Bangers', cursive; }
        .lucky-font { font-family: 'Luckiest Guy', cursive; }
        
        .glizzy-hover:hover {
          transform: scale(1.05) rotate(2deg);
          filter: drop-shadow(0 0 10px #fbbf24);
        }
        
        .powerade-hover:hover {
          transform: scale(1.05);
          filter: drop-shadow(0 0 10px #3b82f6);
        }
        
        .gold-glow {
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.5); }
          50% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.8); }
        }
        
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-yellow-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold meme-font text-yellow-400">🌭 GLIZZY WORLD</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {["home", "buy", "tokenomics", "roadmap", "games", "memes"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 glizzy-hover ${
                      activeSection === item ? "bg-yellow-400 text-black" : "text-yellow-400 hover:bg-yellow-400/10"
                    }`}
                  >
                    {item.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 text-6xl animate-bounce">🌭</div>
          <div className="absolute top-40 right-32 text-4xl animate-pulse">💧</div>
          <div className="absolute bottom-32 left-40 text-5xl float-animation">🏆</div>
          <div className="absolute bottom-20 right-20 text-3xl animate-spin">⭐</div>
        </div>

        <div className="text-center z-10 max-w-6xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-bold meme-font text-yellow-400 mb-8 animate-pulse">GLIZZY WORLD</h1>
          <p className="text-2xl md:text-4xl lucky-font text-blue-400 mb-12 leading-tight">
            Where Memes, Money, and Mayhem Meet
          </p>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card className="bg-gray-900/50 border-yellow-400/30 glizzy-hover">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{glizzyCount.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Glizzies Consumed</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-blue-400/30 powerade-hover">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{poweradeCount.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Powerade Chugged</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-green-400/30 glizzy-hover">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">$420.69</div>
                <div className="text-sm text-gray-400">Current Price</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-purple-400/30 powerade-hover">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">69,420</div>
                <div className="text-sm text-gray-400">Holders</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection("buy")}
              className="bg-yellow-400 text-black hover:bg-yellow-500 text-xl px-8 py-4 meme-font glizzy-hover"
            >
              🌭 BUY GLIZZY NOW
            </Button>
            <Button
              onClick={() => scrollToSection("games")}
              className="bg-blue-500 text-white hover:bg-blue-600 text-xl px-8 py-4 meme-font powerade-hover"
            >
              🎮 PLAY GAMES
            </Button>
          </div>
        </div>
      </section>

      {/* Token Swap Widget */}
      <section id="buy" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold meme-font text-yellow-400 mb-12">🌭 GET YOUR GLIZZIES</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Swap Widget Placeholder */}
            <Card className="bg-gray-900/50 border-yellow-400/30 gold-glow">
              <CardHeader>
                <CardTitle className="meme-font text-yellow-400">SWAP WIDGET</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="bg-black/50 rounded-lg p-8 border-2 border-dashed border-yellow-400/50">
                  <div className="text-center">
                    <Zap className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">Swap Widget Integration</p>
                    <div className="bg-gray-800 p-4 rounded text-left text-sm font-mono">
                      {`<iframe 
  src="your-swap-widget-url"
  width="100%" 
  height="400"
  frameborder="0">
</iframe>`}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How to Buy */}
            <Card className="bg-gray-900/50 border-blue-400/30">
              <CardHeader>
                <CardTitle className="meme-font text-blue-400">HOW TO BUY</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { step: 1, text: "Connect your wallet", icon: "🔗" },
                    { step: 2, text: "Add ETH to swap", icon: "💰" },
                    { step: 3, text: "Swap for GLIZZY", icon: "🌭" },
                    { step: 4, text: "HODL and enjoy!", icon: "💎" },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex items-center space-x-4 p-3 bg-black/30 rounded-lg glizzy-hover"
                    >
                      <div className="text-2xl">{item.icon}</div>
                      <div className="flex-1">
                        <div className="font-bold text-yellow-400">Step {item.step}</div>
                        <div className="text-gray-300">{item.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tokenomics */}
      <section id="tokenomics" className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold meme-font text-yellow-400 text-center mb-12">🌭 GLIZZYNOMICS</h2>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {tokenomics.map((item, index) => (
              <Card key={index} className="bg-black/50 border-yellow-400/30 glizzy-hover">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className={`text-2xl font-bold ${item.color} mb-2`}>{item.value}</div>
                  <div className="text-gray-400 text-sm">{item.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contract Address */}
          <div className="mt-12 text-center">
            <Card className="bg-black/50 border-yellow-400/30 max-w-2xl mx-auto pulse-glow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-yellow-400 font-bold mb-2">CONTRACT ADDRESS</div>
                    <div className="font-mono text-sm text-gray-300">0x1234...5678</div>
                  </div>
                  <Button className="bg-yellow-400 text-black hover:bg-yellow-500 glizzy-hover">
                    <Copy className="h-4 w-4 mr-2" />
                    COPY
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Roadmap */}
      <section id="roadmap" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold meme-font text-yellow-400 text-center mb-12">🗺️ ROADMAP TO GLORY</h2>

          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-yellow-400/30"></div>

            <div className="space-y-12">
              {roadmapSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} transition-all duration-500 ${
                    roadmapStep === index ? "scale-105" : "scale-95 opacity-70"
                  }`}
                >
                  <div className="w-5/12">
                    <Card
                      className={`bg-gray-900/50 border-2 ${
                        step.status === "completed"
                          ? "border-green-400"
                          : step.status === "active"
                            ? "border-yellow-400"
                            : step.status === "upcoming"
                              ? "border-blue-400"
                              : "border-gray-400"
                      } glizzy-hover`}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="meme-font text-xl">{step.phase}</CardTitle>
                          <Badge
                            className={
                              step.status === "completed"
                                ? "bg-green-400"
                                : step.status === "active"
                                  ? "bg-yellow-400"
                                  : step.status === "upcoming"
                                    ? "bg-blue-400"
                                    : "bg-gray-400"
                            }
                          >
                            {step.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold text-yellow-400">{step.title}</div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {step.items.map((item, i) => (
                            <li key={i} className="flex items-center space-x-2">
                              <span className="text-yellow-400">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Node */}
                  <div className="w-2/12 flex justify-center">
                    <div
                      className={`w-8 h-8 rounded-full border-4 ${
                        step.status === "completed"
                          ? "bg-green-400 border-green-400"
                          : step.status === "active"
                            ? "bg-yellow-400 border-yellow-400 pulse-glow"
                            : step.status === "upcoming"
                              ? "bg-blue-400 border-blue-400"
                              : "bg-gray-400 border-gray-400"
                      }`}
                    ></div>
                  </div>

                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Password-Gated Game */}
      <section id="games" className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold meme-font text-yellow-400 mb-12">🎮 GLIZZY DEFENSE</h2>

          {!gameUnlocked ? (
            <Card className="bg-black/50 border-red-400/30 max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="meme-font text-red-400 flex items-center justify-center">
                  <Lock className="h-6 w-6 mr-2" />
                  CLASSIFIED GAME
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400">Enter the secret password to unlock Glizzy Defense!</p>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={gamePassword}
                    onChange={(e) => setGamePassword(e.target.value)}
                    placeholder="Enter password..."
                    className="bg-gray-800 border-gray-600 text-white pr-10"
                    onKeyPress={(e) => e.key === "Enter" && handlePasswordSubmit()}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <Button onClick={handlePasswordSubmit} className="w-full bg-red-500 hover:bg-red-600 glizzy-hover">
                  UNLOCK GAME
                </Button>
                <p className="text-xs text-gray-500">Hint: It's related to hotdogs... 🌭</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-black/50 border-green-400/30">
              <CardHeader>
                <CardTitle className="meme-font text-green-400 flex items-center justify-center">
                  <Unlock className="h-6 w-6 mr-2" />
                  GLIZZY DEFENSE UNLOCKED!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-800 p-8 rounded-lg border-2 border-dashed border-green-400/50">
                  <Gamepad2 className="h-24 w-24 text-green-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">Game Integration Area</p>
                  <p className="text-sm text-gray-500">
                    This is where your Glizzy Defense game would be embedded. Could be a canvas-based game, iframe, or
                    React game component.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">1,337</div>
                    <div className="text-sm text-gray-400">High Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">420</div>
                    <div className="text-sm text-gray-400">Glizzies Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">69</div>
                    <div className="text-sm text-gray-400">Level</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Meme Generator & PFP Generator */}
      <section id="memes" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold meme-font text-yellow-400 text-center mb-12">🎨 MEME FACTORY</h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Meme Generator */}
            <Card className="bg-gray-900/50 border-yellow-400/30">
              <CardHeader>
                <CardTitle className="meme-font text-yellow-400 text-2xl">MEME GENERATOR</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Image Upload */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium text-gray-300">Upload Custom Images</label>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-blue-500 hover:bg-blue-600 text-sm powerade-hover"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {/* Uploaded Images */}
                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Uploaded ${index}`}
                            className="w-full h-16 object-cover rounded border border-gray-600"
                          />
                          <button
                            onClick={() => removeUploadedImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Template Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Choose Template</label>
                  <div className="grid grid-cols-4 gap-2">
                    {memeTemplates.map((template, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedMemeTemplate(index)}
                        className={`aspect-square rounded border-2 transition-all glizzy-hover ${
                          selectedMemeTemplate === index ? "border-yellow-400" : "border-gray-600 hover:border-gray-400"
                        }`}
                      >
                        <img
                          src={template || "/placeholder.svg"}
                          alt={`Template ${index + 1}`}
                          className="w-full h-full object-cover rounded"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Top Text</label>
                    <Input
                      value={memeText.top}
                      onChange={(e) => setMemeText((prev) => ({ ...prev, top: e.target.value }))}
                      placeholder="Enter top text..."
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Bottom Text</label>
                    <Input
                      value={memeText.bottom}
                      onChange={(e) => setMemeText((prev) => ({ ...prev, bottom: e.target.value }))}
                      placeholder="Enter bottom text..."
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>

                {/* Preview */}
                <div className="relative">
                  <img
                    src={memeTemplates[selectedMemeTemplate] || "/placeholder.svg"}
                    alt="Meme Preview"
                    className="w-full rounded border border-gray-600"
                  />
                  {memeText.top && (
                    <div className="absolute top-4 left-4 right-4 text-center">
                      <span className="text-white font-bold text-xl bg-black/70 px-2 py-1 rounded meme-font">
                        {memeText.top.toUpperCase()}
                      </span>
                    </div>
                  )}
                  {memeText.bottom && (
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <span className="text-white font-bold text-xl bg-black/70 px-2 py-1 rounded meme-font">
                        {memeText.bottom.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  onClick={downloadMeme}
                  className="w-full bg-yellow-400 text-black hover:bg-yellow-500 glizzy-hover"
                >
                  <Download className="h-4 w-4 mr-2" />
                  DOWNLOAD MEME
                </Button>
              </CardContent>
            </Card>

            {/* PFP Generator */}
            <Card className="bg-gray-900/50 border-blue-400/30">
              <CardHeader>
                <CardTitle className="meme-font text-blue-400 text-2xl">PFP GENERATOR</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* PFP Preview */}
                <div className="aspect-square bg-gray-800 rounded-lg border-2 border-blue-400/30 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center">
                    <div className="text-6xl mb-2">🌭</div>
                    <div className="text-sm text-gray-400">
                      {pfpBackgrounds[pfpTraits.background]} + {pfpCharacters[pfpTraits.character]}
                    </div>
                    {pfpTraits.accessory > 0 && (
                      <div className="text-sm text-yellow-400">+ {pfpAccessories[pfpTraits.accessory]}</div>
                    )}
                  </div>
                </div>

                {/* Trait Selection */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Background</label>
                    <div className="grid grid-cols-2 gap-2">
                      {pfpBackgrounds.map((bg, index) => (
                        <button
                          key={index}
                          onClick={() => setPfpTraits((prev) => ({ ...prev, background: index }))}
                          className={`p-2 rounded border text-sm transition-all powerade-hover ${
                            pfpTraits.background === index
                              ? "border-blue-400 bg-blue-400/20"
                              : "border-gray-600 hover:border-gray-400"
                          }`}
                        >
                          {bg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Character</label>
                    <div className="grid grid-cols-2 gap-2">
                      {pfpCharacters.map((char, index) => (
                        <button
                          key={index}
                          onClick={() => setPfpTraits((prev) => ({ ...prev, character: index }))}
                          className={`p-2 rounded border text-sm transition-all glizzy-hover ${
                            pfpTraits.character === index
                              ? "border-yellow-400 bg-yellow-400/20"
                              : "border-gray-600 hover:border-gray-400"
                          }`}
                        >
                          {char}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Accessory</label>
                    <div className="grid grid-cols-2 gap-2">
                      {pfpAccessories.map((acc, index) => (
                        <button
                          key={index}
                          onClick={() => setPfpTraits((prev) => ({ ...prev, accessory: index }))}
                          className={`p-2 rounded border text-sm transition-all powerade-hover ${
                            pfpTraits.accessory === index
                              ? "border-purple-400 bg-purple-400/20"
                              : "border-gray-600 hover:border-gray-400"
                          }`}
                        >
                          {acc}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={generateRandomPFP}
                    className="flex-1 bg-purple-500 hover:bg-purple-600 powerade-hover"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    RANDOM
                  </Button>
                  <Button
                    onClick={() => alert("PFP downloaded! 🌭")}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 powerade-hover"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    DOWNLOAD
                  </Button>
                </div>

                {/* Rarity Info */}
                <div className="bg-black/30 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Rarity Score</div>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 font-bold">Epic Tier</span>
                    <span className="text-gray-300">1 in 420</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black border-t border-yellow-400/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold meme-font text-yellow-400 mb-4">🌭 GLIZZY WORLD</h3>
              <p className="text-gray-400 mb-4">The ultimate meme coin experience</p>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-400 hover:text-blue-300 powerade-hover">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-purple-400 hover:text-purple-300 glizzy-hover">
                  <Discord className="h-6 w-6" />
                </a>
                <a href="#" className="text-green-400 hover:text-green-300 powerade-hover">
                  <MessageCircle className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-yellow-400 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#buy" className="hover:text-yellow-400 transition-colors">
                    Buy Glizzy
                  </a>
                </li>
                <li>
                  <a href="#tokenomics" className="hover:text-yellow-400 transition-colors">
                    Tokenomics
                  </a>
                </li>
                <li>
                  <a href="#roadmap" className="hover:text-yellow-400 transition-colors">
                    Roadmap
                  </a>
                </li>
                <li>
                  <a href="#games" className="hover:text-yellow-400 transition-colors">
                    Games
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-yellow-400 mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Telegram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Reddit
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-yellow-400 mb-4">Tools</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#memes" className="hover:text-yellow-400 transition-colors">
                    Meme Generator
                  </a>
                </li>
                <li>
                  <a href="#memes" className="hover:text-yellow-400 transition-colors">
                    PFP Generator
                  </a>
                </li>
                <li>
                  <a href="#games" className="hover:text-yellow-400 transition-colors">
                    Glizzy Defense
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Staking
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-yellow-400/20 mt-8 pt-8 text-center">
            <p className="text-2xl meme-font text-yellow-400 mb-2">Built by degenerates, powered by glizzies</p>
            <p className="text-gray-400 text-sm">
              © 2024 Glizzy World. All rights reserved. Not financial advice. DYOR. 🌭
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
