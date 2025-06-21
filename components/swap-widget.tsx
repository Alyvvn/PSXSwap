"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function SwapWidget() {
  return (
    <Card className="w-full max-w-md bg-black/70 border-purple-500/30 backdrop-blur-xl shadow-purple-500/20">
      <CardHeader className="text-center p-6 pb-4">
        <CardTitle className="text-4xl font-bold text-purple-400">PSX Swap</CardTitle>
        <p className="text-purple-300/80 text-sm mt-2">Trade PSX on Base Network</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 p-4 pt-0">
        <div className="mt-6 mb-6 px-4 py-4 bg-slate-900/90 rounded-3xl border border-cyan-400/30 shadow-2xl">
          <iframe
            src="https://app.uniswap.org/#/swap?outputCurrency=0x4444489570Afd4261d616df00DE1668dAd5F8ceE&chain=base&theme=dark"
            width="100%"
            height="400px" // Reverted to 400px
            style={{ border: "0", margin: "0", display: "block", borderRadius: "10px" }}
            title="Uniswap Widget"
            scrolling="no"
          />
        </div>
        <Link
          href="https://dexscreener.com/base/0x4444489570Afd4261d616df00DE1668dAd5F8ceE"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg py-6 font-bold uppercase tracking-wider shadow-lg shadow-purple-500/30 hover:from-purple-700 hover:to-pink-700">
            <ArrowRight className="h-5 w-5 mr-2" />
            View Live Chart
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default SwapWidget
