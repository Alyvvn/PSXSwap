"use client"

import { useRef } from "react"
import Image from "next/image"

export function MemeReel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const memes = [
    "/images/psx-hero.png",
    "/images/psx-store.png",
    "/images/psx-meme.png",
    "/images/psx-computer.png",
    "/images/psx-dream.png",
    "/images/psx-attention.png",
    "/images/psx-chart.png",
  ]

  return (
    <div
      ref={scrollRef}
      className="flex overflow-x-auto scrollbar-hide gap-4 py-2"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* Double the memes for continuous scrolling */}
      {[...memes, ...memes].map((src, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-64 h-40 bg-black/30 rounded-lg overflow-hidden border border-white/10 relative"
        >
          <Image src={src || "/placeholder.svg"} alt={`PSX Meme ${index + 1}`} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-2 left-2 text-white text-xs font-mono">INTEL_FILE_{index + 1}.jpg</div>
        </div>
      ))}
    </div>
  )
}
