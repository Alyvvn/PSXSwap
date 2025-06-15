"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Clock, Rocket, Target, Zap } from "lucide-react"

export function InteractiveRoadmap() {
  const [selectedPhase, setSelectedPhase] = useState(0)

  const roadmapPhases = [
    {
      phase: "Phase 1",
      title: "Foundation",
      status: "completed",
      date: "Q4 2024",
      icon: <CheckCircle className="h-6 w-6" />,
      items: [
        "✅ Token Launch on Base",
        "✅ Initial Liquidity Pool",
        "✅ Community Building",
        "✅ Basic Website Launch",
        "✅ Social Media Presence",
      ],
      description: "Establishing the core infrastructure and community foundation for PSX.",
    },
    {
      phase: "Phase 2",
      title: "Growth",
      status: "in-progress",
      date: "Q1 2025",
      icon: <Zap className="h-6 w-6" />,
      items: [
        "✅ Meme Generator Tool",
        "✅ PFP Generator",
        "🔄 Glizzy World Alpha",
        "🔄 First Casino Games",
        "⏳ Mobile App Development",
      ],
      description: "Expanding the ecosystem with tools and gaming features.",
    },
    {
      phase: "Phase 3",
      title: "Gaming Empire",
      status: "upcoming",
      date: "Q2 2025",
      icon: <Target className="h-6 w-6" />,
      items: [
        "⏳ Full Casino Launch",
        "⏳ Tournament System",
        "⏳ NFT Marketplace",
        "⏳ Staking Rewards",
        "⏳ DAO Governance",
      ],
      description: "Launching the complete gaming ecosystem with advanced features.",
    },
    {
      phase: "Phase 4",
      title: "Domination",
      status: "future",
      date: "Q3 2025",
      icon: <Rocket className="h-6 w-6" />,
      items: [
        "⏳ Multi-chain Expansion",
        "⏳ VR Casino Experience",
        "⏳ Celebrity Partnerships",
        "⏳ Global Tournaments",
        "⏳ PSX Metaverse",
      ],
      description: "Expanding beyond Base to become the ultimate crypto gaming platform.",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-600"
      case "in-progress":
        return "bg-yellow-600"
      case "upcoming":
        return "bg-blue-600"
      case "future":
        return "bg-purple-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "in-progress":
        return <Zap className="h-4 w-4" />
      case "upcoming":
        return <Clock className="h-4 w-4" />
      case "future":
        return <Rocket className="h-4 w-4" />
      default:
        return <Circle className="h-4 w-4" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Interactive Roadmap</h2>
        <p className="text-gray-300">Track our journey to crypto gaming domination</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-gray-700 via-gray-500 to-gray-700 rounded-full"></div>

        {/* Phase Cards */}
        <div className="space-y-12">
          {roadmapPhases.map((phase, index) => (
            <div
              key={index}
              className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              {/* Timeline Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div
                  className={`w-12 h-12 rounded-full border-4 border-gray-900 flex items-center justify-center cursor-pointer transition-all duration-300 ${getStatusColor(
                    phase.status,
                  )} ${selectedPhase === index ? "scale-125" : "hover:scale-110"}`}
                  onClick={() => setSelectedPhase(index)}
                >
                  <div className="text-white">{getStatusIcon(phase.status)}</div>
                </div>
              </div>

              {/* Phase Card */}
              <Card
                className={`w-5/12 cursor-pointer transition-all duration-300 ${
                  selectedPhase === index
                    ? "bg-black/80 border-gray-500 scale-105"
                    : "bg-black/80 border-gray-700 hover:border-gray-500/50"
                } ${index % 2 === 0 ? "mr-auto" : "ml-auto"}`}
                onClick={() => setSelectedPhase(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                      <p className="text-sm text-gray-400">{phase.phase}</p>
                    </div>
                    <Badge className={`${getStatusColor(phase.status)} text-white`}>{phase.date}</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{phase.description}</p>
                  <div className="space-y-2">
                    {phase.items.slice(0, 3).map((item, itemIndex) => (
                      <div key={itemIndex} className="text-sm text-gray-400">
                        {item}
                      </div>
                    ))}
                    {phase.items.length > 3 && (
                      <div className="text-sm text-purple-400">+{phase.items.length - 3} more items...</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed View */}
      <Card className="mt-12 bg-black/80 border-gray-500/30">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 rounded-full ${getStatusColor(roadmapPhases[selectedPhase].status)}`}>
              {roadmapPhases[selectedPhase].icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{roadmapPhases[selectedPhase].title}</h3>
              <p className="text-gray-400">
                {roadmapPhases[selectedPhase].phase} - {roadmapPhases[selectedPhase].date}
              </p>
            </div>
            <Badge className={`ml-auto ${getStatusColor(roadmapPhases[selectedPhase].status)} text-white`}>
              {roadmapPhases[selectedPhase].status.replace("-", " ").toUpperCase()}
            </Badge>
          </div>

          <p className="text-gray-300 mb-6">{roadmapPhases[selectedPhase].description}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Deliverables</h4>
              <div className="space-y-3">
                {roadmapPhases[selectedPhase].items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.startsWith("✅") ? "bg-green-500" : item.startsWith("🔄") ? "bg-yellow-500" : "bg-gray-500"
                      }`}
                    ></div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Progress Metrics</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Completion</span>
                    <span className="text-white">
                      {roadmapPhases[selectedPhase].status === "completed"
                        ? "100%"
                        : roadmapPhases[selectedPhase].status === "in-progress"
                          ? "60%"
                          : roadmapPhases[selectedPhase].status === "upcoming"
                            ? "20%"
                            : "0%"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getStatusColor(roadmapPhases[selectedPhase].status)}`}
                      style={{
                        width:
                          roadmapPhases[selectedPhase].status === "completed"
                            ? "100%"
                            : roadmapPhases[selectedPhase].status === "in-progress"
                              ? "60%"
                              : roadmapPhases[selectedPhase].status === "upcoming"
                                ? "20%"
                                : "0%",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <div className="text-lg font-bold text-white">
                      {roadmapPhases[selectedPhase].items.filter((item) => item.startsWith("✅")).length}
                    </div>
                    <div className="text-xs text-gray-400">Completed</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <div className="text-lg font-bold text-white">{roadmapPhases[selectedPhase].items.length}</div>
                    <div className="text-xs text-gray-400">Total Items</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
