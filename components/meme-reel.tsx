"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface MemeReelProps {
  userMemes: string[]
  defaultBackgrounds: string[]
}

export function MemeReel({ userMemes, defaultBackgrounds }: MemeReelProps) {
  const reelRef = useRef<HTMLDivElement>(null)

  // Use user-generated memes if available, otherwise use default backgrounds
  const memesToDisplay = userMemes.length > 0 ? userMemes : defaultBackgrounds

  useEffect(() => {
    const reel = reelRef.current
    if (!reel) return

    let scrollInterval: NodeJS.Timeout

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (reel.scrollLeft + reel.clientWidth >= reel.scrollWidth - 1) {
          // Reset to start if end is reached (with a small buffer)
          reel.scrollLeft = 0
        } else {
          reel.scrollLeft += 1 // Adjust scroll speed as needed
        }
      }, 20) // Adjust interval for smoother/faster scroll
    }

    const stopScrolling = () => {
      clearInterval(scrollInterval)
    }

    // Start scrolling when component mounts
    startScrolling()

    // Pause on hover
    reel.addEventListener("mouseenter", stopScrolling)
    reel.addEventListener("mouseleave", startScrolling)

    // Clean up on unmount
    return () => {
      stopScrolling()
      reel.removeEventListener("mouseenter", stopScrolling)
      reel.removeEventListener("mouseleave", startScrolling)
    }
  }, [memesToDisplay.length]) // Re-run effect if number of memes changes

  return (
    <div className="w-full py-8 bg-black/70 border-t border-b border-cyan-400/30 shadow-inner shadow-cyan-400/10">
      <h2 className="text-center text-3xl font-bold text-cyan-400 mb-8">Agent Meme Feed</h2>
      <div ref={reelRef} className="flex overflow-x-auto py-4 px-2 space-x-6">
        {memesToDisplay.map((meme, index) => (
          <Card
            key={index}
            className="flex-shrink-0 w-[300px] h-[250px] bg-black/50 border-cyan-400/30 backdrop-blur-lg shadow-lg hover:scale-105 transition-transform duration-300"
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
      <p className="text-center text-cyan-300/70 text-sm mt-6">Scroll or hover to interact with classified memes.</p>
    </div>
  )
}
