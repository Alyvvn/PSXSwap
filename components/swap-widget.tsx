"use client"

import { Card, CardContent } from "@/components/ui/card"

export function SwapWidget() {
  return (
    <Card className="w-full max-w-md bg-black/80 border border-purple-500/50 rounded-xl overflow-hidden">
      {/* Removed CardHeader for a simpler widget */}
      <CardContent className="p-0">
        {/* Removed inner div wrapper, iframe directly inside CardContent */}
        <iframe
          src="https://app.uniswap.org/#/swap?outputCurrency=0x4444489570Afd4261d616df00DE1668dAd5F8ceE&chain=base&theme=dark"
          width="100%"
          height="400px"
          style={{ border: "0", margin: "0", display: "block", borderRadius: "10px" }}
          title="Uniswap Widget"
          scrolling="no"
        />
      </CardContent>
    </Card>
  )
}

export default SwapWidget
