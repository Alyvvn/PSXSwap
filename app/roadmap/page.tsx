import { InteractiveRoadmap } from "@/components/interactive-roadmap"

export default function RoadmapPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black py-12 text-white">
      <h1 className="mb-8 text-5xl font-bold text-cyan-400">PSX Roadmap</h1>
      <p className="mb-12 text-lg text-gray-300">Our strategic deployment phases.</p>
      <div className="w-full max-w-4xl px-4">
        <InteractiveRoadmap />
      </div>
    </div>
  )
}
