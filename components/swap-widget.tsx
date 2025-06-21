"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SwapWidget() {
  return (
    <Card className="w-full max-w-md bg-black/70 border-purple-500/30 backdrop-blur-xl shadow-purple-500/20">
      <CardHeader className="text-center p-6 pb-4">
        <CardTitle className="text-4xl font-bold text-purple-400">PSX Swap</CardTitle>
        <p className="text-purple-300/80 text-sm mt-2">Trade PSX on Base Network</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 p-4 pt-0">
        <div className="w-full h-[450px] rounded-lg overflow-hidden border border-purple-500/50 shadow-inner shadow-purple-500/20">
          <iframe
            src="https://app.uniswap.org/#/swap?outputCurrency=0x4444489570Afd4261d616df00DE1668dAd5F8ceE&chain=base&theme=dark"
            width="100%"
            height="100%"
            style={{ border: "0", margin: "0", display: "block", borderRadius: "10px" }}
            title="Uniswap Widget"
            scrolling="no"
          />
        </div>
        {/* Removed "View Live Chart" button */}
      </CardContent>
    </Card>
  )
}

export default SwapWidget
