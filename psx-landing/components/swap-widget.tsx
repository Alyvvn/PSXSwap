"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpDown, Settings } from "lucide-react"

interface SwapWidgetProps {
  contractAddress: string
}

export function SwapWidget({ contractAddress }: SwapWidgetProps) {
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = () => {
    // In a real implementation, this would connect to MetaMask
    setIsConnected(true)
  }

  const handleSwap = () => {
    // In a real implementation, this would execute the swap
    console.log("Swapping", fromAmount, "ETH for PSX")
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-4">
            <button className="text-black font-semibold border-b-2 border-black pb-1">Swap</button>
            <button className="text-gray-500 font-semibold">Buy</button>
          </div>
          <Settings className="h-5 w-5 text-gray-500" />
        </div>

        <div className="space-y-4">
          {/* From Token */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">From</span>
              <span className="text-2xl font-bold">0.00</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">ETH</span>
                </div>
                <span className="font-semibold">ETH</span>
              </div>
              <span className="text-gray-400">$0.00</span>
            </div>
          </div>

          {/* Swap Arrow */}
          <div className="flex justify-center">
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>

          {/* To Token */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">To</span>
              <span className="text-2xl font-bold">0.00</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">PSX</span>
                </div>
                <span className="font-semibold">PSX</span>
              </div>
              <span className="text-gray-400">$0.00</span>
            </div>
          </div>

          {/* Connect/Swap Button */}
          <Button
            onClick={isConnected ? handleSwap : handleConnect}
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 rounded-2xl text-lg"
          >
            {isConnected ? "Swap" : "Connect"}
          </Button>

          {/* Token Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <span className="text-gray-600 text-sm">Price</span>
              </div>
              <span className="font-bold">$0.05</span>
            </div>
            <div className="text-center">
              <span className="text-gray-600 text-sm block mb-1">Market Cap</span>
              <span className="font-bold">$52.56M</span>
            </div>
            <div className="text-center">
              <span className="text-gray-600 text-sm block mb-1">24h Volume</span>
              <span className="font-bold">$421.31K</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
