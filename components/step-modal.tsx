"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { ArrowRight, CheckCircle } from "lucide-react"

interface Step {
  id: string
  title: string
  description: string
  image?: string
}

interface StepModalProps {
  steps: Step[]
  isOpen: boolean
  onClose: () => void
  onComplete?: () => void
}

export function StepModal({ steps, isOpen, onClose, onComplete }: StepModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setCurrentStepIndex(0)
      setIsCompleted(false)
    }
  }, [isOpen])

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    } else {
      setIsCompleted(true)
      onComplete?.()
    }
  }

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }

  const currentStep = steps[currentStepIndex]
  const isLastStep = currentStepIndex === steps.length - 1

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-black/90 border-cyan-400/30 backdrop-blur-xl text-white p-6 rounded-lg shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-cyan-400 text-center">
            {isCompleted ? "Setup Complete!" : currentStep.title}
          </DialogTitle>
          <DialogDescription className="text-cyan-300/80 text-center mt-2">
            {isCompleted ? "You're all set to explore the PSX Agency!" : currentStep.description}
          </DialogDescription>
        </DialogHeader>

        <div className="relative my-6">
          {isCompleted ? (
            <div className="flex flex-col items-center justify-center py-12">
              <CheckCircle className="h-24 w-24 text-green-400 mb-6 animate-in zoom-in-50 duration-500" />
              <p className="text-xl text-green-300 font-semibold">Welcome, Agent!</p>
            </div>
          ) : (
            <>
              {currentStep.image && (
                <div className="mb-6 flex justify-center">
                  <img
                    src={currentStep.image || "/placeholder.png"}
                    alt={currentStep.title}
                    className="max-h-64 w-auto rounded-md border border-cyan-400/30 shadow-lg"
                  />
                </div>
              )}
              <div className="text-center text-lg text-cyan-200 font-mono">
                Step {currentStepIndex + 1} of {steps.length}
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between gap-4 mt-4">
          <Button
            onClick={handlePrevious}
            disabled={currentStepIndex === 0 || isCompleted}
            variant="outline"
            className="bg-black/50 text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10"
          >
            Previous
          </Button>
          <Button
            onClick={isCompleted ? onClose : handleNext}
            className={cn(
              "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600",
              isLastStep && !isCompleted && "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600",
            )}
          >
            {isCompleted ? (
              "Close"
            ) : isLastStep ? (
              <>
                Complete Setup <CheckCircle className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
