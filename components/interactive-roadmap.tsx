"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock, Rocket, Lightbulb, Users, TrendingUp, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface Milestone {
  id: string
  title: string
  description: string
  status: "completed" | "in-progress" | "planned" | "delayed"
  date: string
  icon: React.ElementType
  details?: string[]
}

const milestones: Milestone[] = [
  {
    id: "m1",
    title: "Phase 1: Infiltration & Establishment",
    description: "Initial deployment of PSX token on Base network, core team formation, and community building.",
    status: "completed",
    date: "Q4 2024",
    icon: Rocket,
    details: [
      "Smart contract deployment & audit",
      "Initial liquidity provision",
      "Website launch (v1)",
      "Community Discord & Telegram establishment",
      "First marketing campaign (stealth phase)",
    ],
  },
  {
    id: "m2",
    title: "Phase 2: Agent Recruitment & Expansion",
    description: "Expanding the PSX agent network through strategic partnerships and enhanced community engagement.",
    status: "completed",
    date: "Q1 2025",
    icon: Users,
    details: [
      "Influencer marketing partnerships",
      "Community contests & giveaways",
      "Meme Generator launch",
      "PFP Generator launch",
      "Initial CEX listings exploration",
    ],
  },
  {
    id: "m3",
    title: "Phase 3: Classified Operations & Utility",
    description: "Introducing core utility features and classified gaming experiences for PSX holders.",
    status: "in-progress",
    date: "Q2 2025",
    icon: Lightbulb,
    details: [
      "Glizzy World Casino (Beta) launch",
      "Staking mechanisms implementation",
      "Partnerships with Base ecosystem projects",
      "Enhanced analytics dashboard for agents",
      "First major CEX listing",
    ],
  },
  {
    id: "m4",
    title: "Phase 4: Global Dominance & Innovation",
    description: "Scaling PSX operations globally, introducing advanced DeFi features, and fostering innovation.",
    status: "planned",
    date: "Q3 2025",
    icon: TrendingUp,
    details: [
      "Decentralized Autonomous Organization (DAO) establishment",
      "Cross-chain bridge development",
      "Advanced AI-powered trading tools (Alpha)",
      "Global marketing expansion",
      "Tier-1 CEX listings",
    ],
  },
  {
    id: "m5",
    title: "Phase 5: Perpetual Security & Evolution",
    description: "Continuous security audits, technological advancements, and community-driven evolution.",
    status: "planned",
    date: "Q4 2025+",
    icon: Shield,
    details: [
      "Quantum-resistant security research",
      "Integration with emerging blockchain technologies",
      "Community grant program for ecosystem development",
      "Real-world asset (RWA) tokenization exploration",
      "PSX Layer 2 solution research",
    ],
  },
]

const getStatusIcon = (status: Milestone["status"]) => {
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

const getStatusColor = (status: Milestone["status"]) => {
  switch (status) {
    case "completed":
      return "border-green-500/30 text-green-400"
    case "in-progress":
      return "border-yellow-500/30 text-yellow-400"
    case "planned":
      return "border-blue-500/30 text-blue-400"
    case "delayed":
      return "border-red-500/30 text-red-400"
    default:
      return "border-gray-500/30 text-gray-400"
  }
}

export function InteractiveRoadmap() {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null)

  return (
    <Card className="w-full bg-black/70 border-cyan-500/30 backdrop-blur-xl shadow-cyan-500/20">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl font-bold text-cyan-400">PSX Operational Roadmap</CardTitle>
        <p className="text-cyan-300/80 text-sm mt-2">Strategic deployment phases for global dominance.</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative flex flex-col items-center py-8">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-1 bg-cyan-700/50 h-full rounded-full" />

          {milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className={cn(
                "relative flex w-full items-center py-4",
                index % 2 === 0 ? "justify-start" : "justify-end",
              )}
            >
              {/* Milestone Card */}
              <Card
                className={cn(
                  "w-full md:w-5/12 bg-black/80 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer",
                  index % 2 === 0 ? "md:mr-auto" : "md:ml-auto",
                  getStatusColor(milestone.status),
                )}
                onClick={() => setSelectedMilestone(milestone)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-bold font-mono text-cyan-400">{milestone.title}</CardTitle>
                  {getStatusIcon(milestone.status)}
                </CardHeader>
                <CardContent>
                  <p className="text-cyan-300/80 text-sm">{milestone.description}</p>
                  <p className="text-cyan-400/70 text-xs mt-2 font-mono">{milestone.date}</p>
                </CardContent>
              </Card>

              {/* Dot on the line */}
              <div
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 z-10",
                  milestone.status === "completed" && "bg-green-500 border-green-700",
                  milestone.status === "in-progress" && "bg-yellow-500 border-yellow-700 animate-pulse",
                  milestone.status === "planned" && "bg-blue-500 border-blue-700",
                  milestone.status === "delayed" && "bg-red-500 border-red-700",
                )}
              >
                <milestone.icon className="h-3 w-3 text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          ))}
        </div>

        {selectedMilestone && (
          <Card className="mt-8 bg-black/80 border-cyan-500/30 backdrop-blur-lg shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold font-mono text-cyan-400">{selectedMilestone.title}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setSelectedMilestone(null)}>
                <XCircle className="h-6 w-6 text-cyan-400" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-cyan-300/80 text-base">{selectedMilestone.description}</p>
              <p className="text-cyan-400/70 text-sm mt-2 font-mono">
                Status: {selectedMilestone.status.toUpperCase()}
              </p>
              <p className="text-cyan-400/70 text-sm font-mono">Date: {selectedMilestone.date}</p>
              {selectedMilestone.details && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">Key Objectives:</h4>
                  <ul className="list-disc list-inside space-y-1 text-cyan-300/80 text-sm">
                    {selectedMilestone.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
