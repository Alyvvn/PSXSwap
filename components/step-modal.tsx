"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, ExternalLink } from "lucide-react"

interface StepModalProps {
  step: number
  isOpen: boolean
  onClose: () => void
}

const stepContent = {
  1: {
    title: "Install MetaMask & Add Base Network",
    content: (
      <div className="space-y-4">
        <p className="text-gray-300">First, install MetaMask wallet extension, then add the Base network:</p>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-gray-300 mb-3">
            Navigate to the 'Settings' option within your wallet and locate the networks section. Manually include a new
            network, and input the following details for Base:
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>Network Name:</strong> BaseRPC
            </li>
            <li>
              <strong>RPC URL:</strong> https://mainnet.base.org/
            </li>
            <li>
              <strong>Chain ID:</strong> 8453
            </li>
            <li>
              <strong>Currency Symbol:</strong> ETH
            </li>
            <li>
              <strong>Block Explorer:</strong> https://basescan.org
            </li>
          </ul>
        </div>
        <p className="text-sm text-gray-300">
          Click on 'CONNECT TO BASE' after saving the information. Upon completion, you can connect to Base by choosing
          it from the network selection menu.
        </p>
      </div>
    ),
  },
  2: {
    title: "Fund Your Base Wallet with ETH",
    content: (
      <div className="space-y-4">
        <p className="text-gray-300">To fund your Base wallet with ETH, you have a couple of options:</p>
        <div className="bg-gray-800 p-4 rounded-lg space-y-3">
          <div>
            <h4 className="font-semibold text-purple-400 mb-2">Option 1: Direct Transfer</h4>
            <p className="text-sm text-gray-300">
              Transfer ETH from Coinbase, Binance, Bybit, or OKX to your Base wallet. Ensure you select Base as the
              withdrawal network.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-purple-400 mb-2">Option 2: Bridge from Another Chain</h4>
            <p className="text-sm text-gray-300">Use the official Base Bridge:</p>
            <a
              href="https://bridge.base.org/deposit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
            >
              https://bridge.base.org/deposit <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
        <p className="text-sm text-gray-300">
          To use the bridge, connect your wallet, choose the network you wish to bridge from, designate Base as the
          target network, and specify the amount of ETH you intend to transfer.
        </p>
      </div>
    ),
  },
  3: {
    title: "Navigate to Uniswap",
    content: (
      <div className="space-y-4">
        <p className="text-gray-300">Now that you have ETH on Base, it's time to swap for PSX tokens:</p>
        <div className="bg-gray-800 p-4 rounded-lg space-y-3">
          <p className="text-sm text-gray-300">1. Go to Uniswap and connect your wallet</p>
          <p className="text-sm text-gray-300">2. Make sure you're on the Base network</p>
          <p className="text-sm text-gray-300">3. Select ETH as the input token</p>
          <p className="text-sm text-gray-300">4. Paste the PSX contract address as the output token:</p>
          <div className="bg-gray-900 p-2 rounded font-mono text-xs text-green-400 break-all">
            0x4444489570Afd4261d616df00DE1668dAd5F8ceE
          </div>
        </div>
        <Button asChild className="w-full bg-pink-600 hover:bg-pink-700">
          <a
            href="https://app.uniswap.org/swap?outputCurrency=0x4444489570Afd4261d616df00DE1668dAd5F8ceE&chain=base"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Uniswap <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    ),
  },
  4: {
    title: "Complete Your Swap",
    content: (
      <div className="space-y-4">
        <p className="text-gray-300">Final step - execute your swap:</p>
        <div className="bg-gray-800 p-4 rounded-lg space-y-3">
          <p className="text-sm text-gray-300">1. Enter the amount of ETH you want to swap</p>
          <p className="text-sm text-gray-300">2. Review the transaction details and slippage</p>
          <p className="text-sm text-gray-300">3. Click "Swap" and confirm the transaction in your wallet</p>
          <p className="text-sm text-gray-300">4. Wait for the transaction to confirm on Base</p>
        </div>
        <div className="bg-green-900/30 border border-green-500/30 p-4 rounded-lg">
          <p className="text-green-400 text-sm font-semibold">🎉 Congratulations!</p>
          <p className="text-green-300 text-sm">You now own PSX tokens! Welcome to the community!</p>
        </div>
      </div>
    ),
  },
}

export function StepModal({ step, isOpen, onClose }: StepModalProps) {
  if (!isOpen) return null

  const content = stepContent[step as keyof typeof stepContent]

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-900 border-purple-500/30 max-h-[80vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-purple-400">
            Step {step}: {content.title}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>{content.content}</CardContent>
      </Card>
    </div>
  )
}
