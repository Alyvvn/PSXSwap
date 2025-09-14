import { InteractiveRoadmap } from "@/components/interactive-roadmap"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RoadmapPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black py-12 text-white">
      <div className="w-full max-w-4xl px-4 flex flex-col items-center">
        <Link href="/" className="self-start mb-6">
          <Button variant="outline" className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 bg-black font-mono">
            ← Back to PSX Homepage
          </Button>
        </Link>
        <h1 className="mb-8 text-5xl font-bold text-cyan-400">PSX Roadmap</h1>
        <p className="mb-12 text-lg text-gray-300">Our strategic deployment phases.</p>
        <InteractiveRoadmap />
      </div>
    </div>
  )
}
