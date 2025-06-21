"use client"
import { useState, useEffect } from "react"
import { MemeGenerator } from "@/components/meme-generator"
import { MemeReel } from "@/components/meme-reel"

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
      <h1 className="mb-8 text-5xl font-bold text-cyan-400">Meme Generator</h1>
      <p className="mb-12 text-lg text-gray-300">Unleash your inner meme lord.</p>
      <div className="w-full max-w-4xl px-4">
        <MemeGenerator onMemeGenerated={addMemeToFeed} />
      </div>
      <div className="mt-12 w-full">
        <MemeReel userMemes={generatedMemes} />
      </div>
    </div>
  )
}
