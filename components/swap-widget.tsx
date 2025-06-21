'use client';
import { useEffect, useRef } from 'react';

export function SwapWidget() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const scrollFix = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', scrollFix);
      iframe.addEventListener('focus', scrollFix);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', scrollFix);
        iframe.removeEventListener('focus', scrollFix);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Swap Container */}
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl p-1 border border-cyan-400/30 shadow-2xl">
        <div className="bg-black/50 rounded-[22px] overflow-hidden">
          <iframe
            ref={iframeRef}
            src="https://app.uniswap.org/#/swap?outputCurrency=0x4444489570Afd4261d616df00DE1668dAd5F8ceE&chain=base"
            width="100%"
            height="660"
            style={{
              border: "none",
              borderRadius: "22px",
              overflow: "hidden",
              display: "block",
              margin: 0,
              padding: 0,
            }}
            allow="clipboard-write; clipboard-read; web-share"
            className="w-full h-[660px]"
          />
        </div>
      </div>

      {/* Branding Badge */}
      <div className="text-center mt-4">
        <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm rounded-full px-4 py-2 border border-cyan-400/20">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-cyan-400 font-mono text-xs">POWERED BY UNISWAP</span>
        </div>
      </div>
    </div>
  );
}
