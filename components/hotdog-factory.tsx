"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, RotateCcw, Shield, Zap, AlertTriangle, Target, Users, Clock, Star } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface TrainingExercise {
  id: number
  name: string
  type: "stealth" | "combat" | "hacking" | "surveillance"
  difficulty: number
  timeLimit: number
  points: number
  status: "pending" | "active" | "completed" | "failed"
}

interface Agent {
  id: number
  name: string
  skills: {
    stealth: number
    combat: number
    hacking: number
    surveillance: number
  }
  status: "ready" | "training" | "completed"
}

const TRAINING_EXERCISES: TrainingExercise[] = [
  {
    id: 1,
    name: "Silent Infiltration",
    type: "stealth",
    difficulty: 3,
    timeLimit: 30,
    points: 150,
    status: "pending"
  },
  {
    id: 2,
    name: "Close Quarters Combat",
    type: "combat",
    difficulty: 4,
    timeLimit: 25,
    points: 200,
    status: "pending"
  },
  {
    id: 3,
    name: "Network Breach",
    type: "hacking",
    difficulty: 5,
    timeLimit: 35,
    points: 250,
    status: "pending"
  },
  {
    id: 4,
    name: "Target Acquisition",
    type: "surveillance",
    difficulty: 3,
    timeLimit: 20,
    points: 120,
    status: "pending"
  },
  {
    id: 5,
    name: "Advanced Stealth",
    type: "stealth",
    difficulty: 4,
    timeLimit: 40,
    points: 180,
    status: "pending"
  }
]

const AGENTS: Agent[] = [
  {
    id: 1,
    name: "Agent Alpha",
    skills: { stealth: 3, combat: 2, hacking: 1, surveillance: 2 },
    status: "ready"
  },
  {
    id: 2,
    name: "Agent Beta",
    skills: { stealth: 2, combat: 3, hacking: 2, surveillance: 1 },
    status: "ready"
  },
  {
    id: 3,
    name: "Agent Gamma",
    skills: { stealth: 1, combat: 1, hacking: 3, surveillance: 3 },
    status: "ready"
  }
]

export function AgentTrainingFacility({ onComplete }: { onComplete: (password: string) => void }) {
  const [exercises, setExercises] = useState<TrainingExercise[]>(TRAINING_EXERCISES)
  const [agents, setAgents] = useState<Agent[]>(AGENTS)
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null)
  const [currentExercise, setCurrentExercise] = useState<TrainingExercise | null>(null)
  const [gameState, setGameState] = useState<"setup" | "training" | "completed">("setup")
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [progress, setProgress] = useState(0)
  const [alerts, setAlerts] = useState<string[]>([])
  const [showPassword, setShowPassword] = useState(false)
  const [streak, setStreak] = useState(0)
  const timerRef = useRef<NodeJS.Timeout>()
  const [showReport, setShowReport] = useState(false)

  useEffect(() => {
    if (gameState === "training" && currentExercise) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleExerciseFail()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => {
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }
  }, [gameState, currentExercise])

  useEffect(() => {
    if (currentExercise && timeLeft > 0) {
      const totalTime = currentExercise.timeLimit
      const remaining = timeLeft
      const completed = ((totalTime - remaining) / totalTime) * 100
      setProgress(Math.min(completed, 100))
    }
  }, [timeLeft, currentExercise])

  const startExercise = (exercise: TrainingExercise, agentId: number) => {
    if (!selectedAgent) return

    const agent = agents.find(a => a.id === agentId)
    if (!agent) return

    setCurrentExercise(exercise)
    setTimeLeft(exercise.timeLimit)
    setProgress(0)
    setGameState("training")
    
    // Update agent status
    setAgents(prev => prev.map(a => 
      a.id === agentId ? { ...a, status: "training" } : a
    ))

    addAlert(`Agent ${agent.name} started ${exercise.name}`)
  }

  const handleExerciseSuccess = () => {
    if (!currentExercise) return

    const points = currentExercise.points + (streak * 10)
    setScore(prev => prev + points)
    setStreak(prev => prev + 1)

    // Update exercise status
    setExercises(prev => prev.map(ex => 
      ex.id === currentExercise.id ? { ...ex, status: "completed" } : ex
    ))

    // Update agent status
    if (selectedAgent) {
      setAgents(prev => prev.map(a => 
        a.id === selectedAgent ? { ...a, status: "completed" } : a
      ))
    }

    addAlert(`Exercise completed! +${points} points (Streak: ${streak + 1})`)

    // Check if all exercises are completed
    const completedExercises = exercises.filter(ex => ex.status === "completed").length + 1
    if (completedExercises >= exercises.length) {
      handleTrainingComplete()
    } else {
      setCurrentExercise(null)
      setGameState("setup")
    }
  }

  const handleExerciseFail = () => {
    if (!currentExercise) return

    setStreak(0)
    setExercises(prev => prev.map(ex => 
      ex.id === currentExercise.id ? { ...ex, status: "failed" } : ex
    ))

    if (selectedAgent) {
      setAgents(prev => prev.map(a => 
        a.id === selectedAgent ? { ...a, status: "ready" } : a
      ))
    }

    addAlert(`Exercise failed! Streak reset.`)

    setCurrentExercise(null)
    setGameState("setup")
  }

  const handleTrainingComplete = () => {
    setGameState("completed")
    if (timerRef.current) clearInterval(timerRef.current)
    setShowReport(true)
    
    if (score >= 800) {
      setShowPassword(true)
      onComplete("AGENT-TRAINING-MASTER-2024")
    }
  }

  const addAlert = (message: string) => {
    setAlerts(prev => [...prev, message])
    if (alerts.length > 10) {
      setAlerts(prev => prev.slice(-10))
    }
  }

  const resetTraining = () => {
    setExercises(TRAINING_EXERCISES)
    setAgents(AGENTS)
    setSelectedAgent(null)
    setCurrentExercise(null)
    setGameState("setup")
    setScore(0)
    setTimeLeft(0)
    setProgress(0)
    setAlerts([])
    setShowPassword(false)
    setStreak(0)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const getSkillColor = (skill: string) => {
    switch (skill) {
      case "stealth": return "text-green-400"
      case "combat": return "text-red-400"
      case "hacking": return "text-blue-400"
      case "surveillance": return "text-purple-400"
      default: return "text-gray-400"
    }
  }

  const getExerciseColor = (type: string) => {
    switch (type) {
      case "stealth": return "border-green-400/30 bg-green-900/10"
      case "combat": return "border-red-400/30 bg-red-900/10"
      case "hacking": return "border-blue-400/30 bg-blue-900/10"
      case "surveillance": return "border-purple-400/30 bg-purple-900/10"
      default: return "border-gray-400/30 bg-gray-900/10"
    }
  }

  return (
    <Card className="w-full max-w-6xl bg-black/90 border-green-400/30 backdrop-blur-xl">
      {/* End-of-training report card modal */}
      <Dialog open={showReport} onOpenChange={setShowReport}>
        <DialogContent className="bg-black/95 border-green-400/30 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-green-400 font-mono text-2xl flex items-center gap-2">
              <Star className="h-6 w-6 animate-bounce" />
              AGENT TRAINING REPORT
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Removed agent avatar row */}
            <div className="bg-black/60 border border-green-400/20 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-green-300 font-mono">
                <span>Total Score:</span>
                <span>{score}</span>
              </div>
              <div className="flex justify-between text-green-300 font-mono">
                <span>Exercises Completed:</span>
                <span>{exercises.filter(ex => ex.status === "completed").length}/{exercises.length}</span>
              </div>
              <div className="flex justify-between text-green-300 font-mono">
                <span>Streak:</span>
                <span>{streak}</span>
              </div>
              <div className="flex justify-between text-green-300 font-mono">
                <span>Failed Exercises:</span>
                <span>{exercises.filter(ex => ex.status === "failed").length}</span>
              </div>
            </div>
            <div className="text-center mt-4">
              <Button onClick={() => setShowReport(false)} className="bg-green-600 hover:bg-green-700 text-white font-mono px-8 py-2">Close Report</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-mono font-bold text-green-400 flex items-center justify-center gap-2">
          <Shield className="h-6 w-6" />
          PSX Agent Training Facility – Advanced Operations
        </CardTitle>
        <p className="text-green-300/70 text-sm">
          Train agents in specialized skills. Complete all exercises with 800+ points to unlock access.
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Training Exercises */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-black/50 border border-green-400/30 rounded-lg p-4">
              <h3 className="text-green-400 font-mono font-bold mb-3 flex items-center gap-2">
                <Target className="h-4 w-4" />
                TRAINING EXERCISES
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exercises.map(exercise => (
                  <div
                    key={exercise.id}
                    className={`p-3 rounded-lg border ${getExerciseColor(exercise.type)} ${
                      exercise.status === "completed" ? "opacity-60" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-mono font-bold">{exercise.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        exercise.status === "completed" ? "bg-green-600 text-white" :
                        exercise.status === "failed" ? "bg-red-600 text-white" :
                        "bg-gray-600 text-white"
                      }`}>
                        {exercise.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-green-300">Type:</span>
                        <span className={`font-mono ${getSkillColor(exercise.type)}`}>
                          {exercise.type.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-300">Difficulty:</span>
                        <span className="text-white font-mono">{exercise.difficulty}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-300">Points:</span>
                        <span className="text-white font-mono">{exercise.points}</span>
                      </div>
                    </div>

                    {selectedAgent && exercise.status === "pending" && (
                      <Button
                        onClick={() => startExercise(exercise, selectedAgent)}
                        className="w-full mt-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                        size="sm"
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        Start Exercise
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Current Exercise */}
            {currentExercise && (
              <div className="bg-black/50 border border-green-400/30 rounded-lg p-4">
                <h3 className="text-green-400 font-mono font-bold mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  ACTIVE EXERCISE: {currentExercise.name}
                </h3>
                
                <div className="space-y-3">
                  {/* Removed agent avatar row */}
                  <div className="flex justify-between items-center">
                    <span className="text-green-300">Time Remaining:</span>
                    <span className={`font-mono ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>{timeLeft}s</span>
                  </div>
                  {/* Animated progress bar */}
                  <div className="w-full bg-green-900/30 rounded-full h-4 overflow-hidden border border-green-400/20">
                    <div
                      className="bg-gradient-to-r from-green-400 to-blue-400 h-4 transition-all duration-500 animate-pulse"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleExerciseSuccess}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Exercise
                    </Button>
                    
                    <Button
                      onClick={handleExerciseFail}
                      variant="outline"
                      className="border-red-400/30 text-red-400 hover:bg-red-400/10"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Fail Exercise
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex gap-4">
              <Button
                onClick={resetTraining}
                variant="outline"
                className="border-green-400/30 text-green-400 hover:bg-green-400/10"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Training
              </Button>
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-4">
            {/* Training Status */}
            <div className="bg-black/50 border border-green-400/30 rounded-lg p-4">
              <h3 className="text-green-400 font-mono font-bold mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                TRAINING STATUS
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-green-300">Total Score:</span>
                  <span className="font-mono text-white">{score}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-300">Streak:</span>
                  <span className="font-mono text-white">{streak}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-300">Completed:</span>
                  <span className="font-mono text-white">
                    {exercises.filter(ex => ex.status === "completed").length}/{exercises.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Agent Selection */}
            <div className="bg-black/50 border border-green-400/30 rounded-lg p-4">
              <h3 className="text-green-400 font-mono font-bold mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" />
                AGENT SELECTION
              </h3>
              <div className="space-y-2">
                {agents.map(agent => (
                  <div
                    key={agent.id}
                    className={`p-2 rounded border cursor-pointer transition-colors ${
                      selectedAgent === agent.id 
                        ? "border-green-400 bg-green-900/20" 
                        : "border-gray-600 hover:border-green-400/50"
                    }`}
                    onClick={() => setSelectedAgent(agent.id)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-mono">{agent.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        agent.status === "completed" ? "bg-green-600 text-white" :
                        agent.status === "training" ? "bg-blue-600 text-white" :
                        "bg-gray-600 text-white"
                      }`}>
                        {agent.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-green-300">Stealth:</span>
                        <span className="text-green-400">{agent.skills.stealth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-300">Combat:</span>
                        <span className="text-red-400">{agent.skills.combat}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Hacking:</span>
                        <span className="text-blue-400">{agent.skills.hacking}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">Surveillance:</span>
                        <span className="text-purple-400">{agent.skills.surveillance}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-black/50 border border-green-400/30 rounded-lg p-4">
              <h3 className="text-green-400 font-mono font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                TRAINING LOG
              </h3>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {alerts.slice(-5).map((alert, index) => (
                  <div key={index} className="text-xs text-green-300 font-mono">
                    {alert}
                  </div>
                ))}
              </div>
            </div>

            {/* Password Display */}
            {showPassword && (
              <div className="bg-green-900/20 border border-green-400/30 rounded-lg p-4">
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <p className="text-green-400 font-mono font-bold">TRAINING COMPLETE</p>
                  <p className="text-green-300 font-mono">Password: AGENT-TRAINING-MASTER-2024</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center text-green-300/70 text-sm max-w-2xl mx-auto">
          <p>Select an agent and assign them to training exercises.</p>
          <p className="mt-2">Complete exercises within time limits to earn points and build streaks.</p>
          <p className="mt-2">Match agent skills to exercise types for better performance.</p>
        </div>
      </CardContent>
    </Card>
  )
} 