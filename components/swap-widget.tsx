"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function SwapWidget() {
  return (
    <Card className="w-full max-w-md bg-black/70 border-purple-500/30 backdrop-blur-xl shadow-purple-500/20">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl font-bold text-purple-400">PSX Swap</CardTitle>
        <p className="text-purple-300/80 text-sm mt-2">Trade PSX on Base Network</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 p-6">
        <div className="w-full h-[400px] rounded-lg overflow-hidden border border-purple-500/50 shadow-inner shadow-purple-500/20">
          <iframe
            src="https://app.uniswap.org/#/swap?outputCurrency=0x4444489570Afd4261d616df00DE1668dAd5F8ceE&chain=base"
            width="100%"
            height="100%"
            style={{ border: "0", margin: "0", display: "block", borderRadius: "10px" }}
            title="Uniswap Widget"
            scrolling="no" // Crucial for preventing iframe-induced scrolling
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
