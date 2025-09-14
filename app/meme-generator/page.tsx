"use client"
import { useState, useEffect } from "react"
import { MemeGenerator } from "@/components/meme-generator"
import { MemeReel } from "@/components/meme-reel"

// Define default backgrounds for the reel when no user memes are present
const defaultReelBackgrounds = [
  "/images/psx-computer.png",
  "/images/psx-dream.png",
  "/images/psx-hero.png",
  "/images/psx-meme.png",
  "/images/psx-open.png",
  "/images/psx-store.png",
  "/images/meme-backgrounds/fde8e62c9a28e0433518dbd99e3b5a26.jpg",
  "/images/meme-backgrounds/dcf335780d1950a819bf05240441659b.jpg",
  "/images/meme-backgrounds/e6e2bcfb6129db9a9991469f736da3da.jpeg",
  "/images/meme-backgrounds/ba74b57164c8e2aee12483de4a6753e6.jpg",
  "/images/meme-backgrounds/f861494e62559f3cc29890be9df9cb35.jpg",
  "/images/meme-backgrounds/photo_2025-03-26_20-55-15.jpg",
  "/images/meme-backgrounds/psx_1.png",
  "/images/meme-backgrounds/psx_2.png",
  "/images/meme-backgrounds/new-project-1.png",
  "/images/meme-backgrounds/photo_2025-03-26_20-55-15 (2).jpg",
  "/images/meme-backgrounds/e3950bfc4dd44b1684856dd5a6587a6c.jpg",
  "/images/meme-backgrounds/0885898432d089676305eb9a53d9832b.jpg",
  "/images/meme-backgrounds/ebe9614fe194336cfe426b4e5301f6ee.jpg",
  "/images/meme-backgrounds/85cb804965d4765c7388b3bbb7739b26.jpg",
  "/images/meme-backgrounds/photo_2025-03-26_20-55-15-2.jpg",
  "/images/meme-backgrounds/psx_3.png",
  "/images/meme-backgrounds/psx_4.png",
  "/images/meme-backgrounds/psx_9.png",
  "/images/meme-backgrounds/psx_8.png",
]

export default function MemeGeneratorPage() {
  const [generatedMemes, setGeneratedMemes] = useState<string[]>([])

  useEffect(() => {
    // Load memes from localStorage on component mount
    const storedMemes = localStorage.getItem("userMemes")
    if (storedMemes) {
      setGeneratedMemes(JSON.parse(storedMemes))
    }
  }, [])

  const addMemeToFeed = (memeDataUrl: string) => {
    setGeneratedMemes((prevMemes) => {
      const newMemes = [...prevMemes, memeDataUrl]
      localStorage.setItem("userMemes", JSON.stringify(newMemes))
      return newMemes
    })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black py-12 text-white">
      <h1 className="mb-8 text-5xl font-bold text-cyan-400">Meme Forge</h1>
      <p className="mb-12 text-lg text-gray-300">Craft your legendary PSX memes.</p>
      <div className="w-full max-w-4xl px-4">
        <MemeGenerator onMemeGenerated={addMemeToFeed} />
      </div>
      <div className="mt-12 w-full">
        <MemeReel userMemes={generatedMemes} defaultBackgrounds={defaultReelBackgrounds} />
      </div>
    </div>
  )
}
