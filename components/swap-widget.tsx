export function SwapWidget() {
  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden bg-black">
      <iframe
        src="https://flooz.xyz/embed/trade?swapDisabled=false&swapLockToToken=true&token=0x4444489570Afd4261d616df00DE1668dAd5F8ceE&chain=BASE"
        width="100%"
        height="100%"
        style={{
          border: "none",
          borderRadius: "16px",
          overflow: "hidden",
          display: "block",
        }}
        allow="clipboard-write; clipboard-read; web-share"
        className="w-full h-full"
      />
    </div>
  )
}
