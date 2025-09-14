"use client"

import type React from "react"
import { useState } from "react"
import { CheckCircle, XCircle, Clock, Rocket, Lightbulb, Users, TrendingUp, Shield } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Milestone {
  id: string
  title: string
  description: string
  status: "completed" | "in-progress" | "planned" | "delayed"
  date: string
  icon: React.ElementType
  details?: string[]
  progress?: number
}

const milestones: Milestone[] = [
  {
    id: "phase1",
    title: "Phase 1: Initiation",
    description: "Kickoff of PSX with foundational launches, community building, and strategic groundwork.",
    status: "in-progress",
    date: "Q2-Q3 2025",
    icon: Rocket,
    progress: 30,
    details: [
      "Website and social media launch",
      "Token launch",
      "Community building (1K+ members on X)",
      "2D video game beta release",
      "Sustain 1 million market cap floor",
      "Create narrative and lore manuscript",
      "Execute zealy campaign",
      "Create a few strategic partnerships",
      "Launch merch store",
      "Launch AI agent",
      "CEX listings",
      "Build rapport with Base projects via IRL event attendance",
    ],
  },
  {
    id: "phase2",
    title: "Phase 2: Expansion",
    description: "Major growth phase with new releases, expanded team, and deeper ecosystem engagement.",
    status: "planned",
    date: "Q4 2025 - Q1 2026",
    icon: Users,
    progress: 0,
    details: [
      "2D video game alpha release",
      "Full-fledged NFT collection launch",
      "Expanded Psyop Division activities",
      "Creative team expands to 20+ members delivering on content daily",
      "Expand strategic partnerships",
      "Sustain 5 million market cap floor",
      "Obtain 3K+ different holders of PSX token",
      "Launch evil corps accounts on social media for further engagement",
    ],
  },
]

const statusIcon = (status: Milestone["status"]) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-5 w-5 text-green-400" />
    case "in-progress":
      return <Clock className="h-5 w-5 text-yellow-400 animate-spin-slow" />
    case "planned":
      return <Lightbulb className="h-5 w-5 text-blue-400" />
    case "delayed":
      return <XCircle className="h-5 w-5 text-red-400" />
    default:
      return null
  }
}

const statusBorder = (status: Milestone["status"]) => {
  switch (status) {
    case "completed":
      return "border-green-500/40"
    case "in-progress":
      return "border-yellow-500/40"
    case "planned":
      return "border-blue-500/40"
    case "delayed":
      return "border-red-500/40"
    default:
      return "border-gray-500/30"
  }
}

export function InteractiveRoadmap() {
  const [selected, setSelected] = useState<Milestone | null>(null)

  return (
    <Card className="w-full bg-black/70 border-cyan-500/30 backdrop-blur-xl shadow-cyan-500/20">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl font-bold text-cyan-400">PSX Operational Roadmap</CardTitle>
        <p className="text-cyan-300/80 text-sm mt-2">Strategic deployment phases for global dominance.</p>
      </CardHeader>

      <CardContent className="p-6">
        <div className="relative flex flex-col items-center py-8">
          {/* vertical line with glow */}
          <div className="absolute left-1/2 -translate-x-1/2 w-2 bg-gradient-to-b from-cyan-400/80 via-cyan-700/40 to-transparent h-full rounded-full shadow-[0_0_32px_8px_rgba(34,211,238,0.25)]" />

          {milestones.map((m, idx) => (
            <div
              key={m.id}
              className={cn(
                "relative flex w-full items-center py-4 group",
                idx % 2 === 0 ? "justify-start" : "justify-end"
              )}
            >
              {/* milestone card */}
              <Card
                className={cn(
                  "w-full md:w-5/12 bg-black/80 backdrop-blur-lg shadow-lg hover:shadow-cyan-400/30 hover:scale-[1.025] hover:border-cyan-400/40 transition-all duration-300 cursor-pointer border-2 border-opacity-60",
                  idx % 2 === 0 ? "md:mr-auto" : "md:ml-auto",
                  statusBorder(m.status),
                )}
                onClick={() => setSelected(m)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-bold font-mono text-cyan-400 flex items-center gap-2">
                    {m.title}
                  </CardTitle>
                  {statusIcon(m.status)}
                </CardHeader>
                <CardContent>
                  <p className="text-cyan-300/80 text-sm mb-2">{m.description}</p>
                  {/* optional progress bar */}
                  {"progress" in m && m.progress !== undefined && (
                    <div className="mt-3 h-2 w-full bg-gray-700/50 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-green-400" style={{ width: `${m.progress}%` }} />
                    </div>
                  )}
                  <p className="text-cyan-400/70 text-xs mt-2 font-mono">{m.date}</p>
                  {/* Show milestone details directly */}
                  {m.details && (
                    <ul className="mt-4 space-y-2 text-cyan-200/90 text-sm list-disc list-inside">
                      {m.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>

              {/* timeline dot with glow */}
              <div
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 z-10 shadow-lg shadow-cyan-400/30",
                  m.status === "completed" && "bg-green-500 border-green-700",
                  m.status === "in-progress" && "bg-yellow-500 border-yellow-700 animate-pulse",
                  m.status === "planned" && "bg-blue-500 border-blue-700",
                  m.status === "delayed" && "bg-red-500 border-red-700",
                )}
              >
                <m.icon className="h-4 w-4 text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          ))}
        </div>

        {/* detail drawer (kept for future, but not shown since details are now inline) */}
        {/* {selected && (
          <Card className="mt-8 bg-black/80 border-cyan-500/30 backdrop-blur-lg shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold font-mono text-cyan-400 flex items-center gap-2">
                {selected.title}
              </CardTitle>
              {statusIcon(selected.status)}
            </CardHeader>
            <CardContent>
              <p className="text-cyan-300/80 text-sm mb-2">{selected.description}</p>
              {selected.details && (
                <ul className="mt-4 space-y-2 text-cyan-200/90 text-sm list-disc list-inside">
                  {selected.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )} */}
      </CardContent>
    </Card>
  )
}
