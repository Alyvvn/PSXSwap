"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { InteractiveRoadmap } from "@/components/interactive-roadmap"

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto p-4">
        <div className="pt-8 mb-8">
          <Link href="/">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to PSX
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">PSX Interactive Roadmap</h1>
            <p className="text-gray-400">Track our journey to crypto gaming domination</p>
          </div>
        </div>

        <InteractiveRoadmap />
      </div>
    </div>
  )
}
