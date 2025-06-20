"use client"

import { useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const memes = [
  "/placeholder.png?height=300&width=400",
  "/placeholder.png?height=300&width=400",
  "/placeholder.png?height=300&width=400",
  "/placeholder.png?height=300&width=400",
  "/placeholder.png?height=300&width=400",
  "/placeholder.png?height=300&width=400",
  "/placeholder.png?height=300&width=400",
  "/placeholder.png?height=300&width=400",
  "/placeholder.png?height=300&width=400",
  "/placeholder.png?height=300&width=400",
]

export function MemeReel() {
  const reelRef = useRef<HTMLDivElement>(null)

  return (
    <div className="w-full py-8 bg-black/70 border-t border-b border-cyan-400/30 shadow-inner shadow-cyan-400/10">
      <h2 className="text-center text-3xl font-bold text-cyan-400 mb-8">Agent Meme Feed</h2>
      <div ref={reelRef} className="flex overflow-x-auto scrollbar-hide py-4 px-2 space-x-6 snap-x snap-mandatory">
        {memes.map((meme, index) => (
          <Card
            key={index}
            className="flex-shrink-0 w-[300px] h-[250px] bg-black/50 border-cyan-400/30 backdrop-blur-lg shadow-lg snap-center hover:scale-105 transition-transform duration-300"
          >
            <CardContent className="p-0 flex items-center justify-center w-full h-full">
              <Image
                src={meme || "/placeholder.png"}
                alt={`Meme ${index + 1}`}
                width={300}
                height={250}
                className="object-cover w-full h-full rounded-lg"
              />
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-center text-cyan-300/70 text-sm mt-6">Scroll to see more classified memes.</p>
    </div>
  )
}
