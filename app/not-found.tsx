import Link from 'next/link'
import { Shield, AlertTriangle, Lock, ArrowLeft, Skull, Zap } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-red-400 font-mono relative overflow-hidden">
      {/* Evil Corp scanlines effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-400/5 to-transparent animate-pulse" />
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="absolute w-full h-px bg-red-400/20" style={{ top: `${i * 5}%` }} />
        ))}
      </div>

      {/* Matrix-style background with evil theme */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-red-400 font-mono text-xs animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            {['EVIL_CORP', 'STOLEN', 'HACKED', 'COMPROMISED'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Skull className="h-12 w-12 text-red-500 animate-pulse" />
            <div className="text-4xl font-bold text-red-500">ERROR 404</div>
            <Skull className="h-12 w-12 text-red-500 animate-pulse" />
          </div>

          <div className="text-sm text-gray-400 mb-4">SECURITY BREACH DETECTED // EVIL CORP INFILTRATION</div>
          <div className="text-xs text-gray-500">PSX DATA HAS BEEN COMPROMISED - IMMEDIATE ACTION REQUIRED</div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Breach Status */}
          <div className="bg-black/80 border-red-400/30 backdrop-blur-sm border rounded-lg">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="h-6 w-6 text-red-400 animate-pulse" />
                <h2 className="text-xl font-bold text-red-400">BREACH STATUS</h2>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Target Resource:</span>
                  <span className="text-red-400">STOLEN BY EVIL CORP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Infiltration Method:</span>
                  <span className="text-red-400">DATA THEFT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">PSX Security Status:</span>
                  <span className="text-yellow-400">COUNTERMEASURES ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Recovery Protocol:</span>
                  <span className="text-green-400">INITIATED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Incident Report */}
          <div className="bg-black/80 border-red-400/30 backdrop-blur-sm border rounded-lg">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="h-6 w-6 text-red-400" />
                <h2 className="text-xl font-bold text-red-400">INCIDENT REPORT</h2>
              </div>

              <div className="space-y-4 text-sm text-gray-300">
                <p>
                  The requested PSX resource has been <span className="text-red-400 font-bold">STOLEN</span> by 
                  Evil Corp operatives during a coordinated cyber attack.
                </p>

                <p>
                  Our intelligence suggests Evil Corp is attempting to <span className="text-red-400 font-bold">REPLICATE</span> PSX 
                  technology for their own malicious purposes.
                </p>

                <p>
                  PSX Security Division has deployed emergency protocols. All agents are advised to return to 
                  the main terminal immediately for mission reassignment.
                </p>

                <div className="mt-6 p-4 bg-red-900/20 border border-red-400/30 rounded">
                  <div className="flex items-center gap-2 text-red-400 font-bold mb-2">
                    <Zap className="h-4 w-4" />
                    URGENT NOTICE
                  </div>
                  <p className="text-xs text-red-300">
                    Evil Corp has compromised multiple PSX assets. Do not trust any communications 
                    claiming to be from PSX unless verified through secure channels.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recovery Actions */}
          <div className="bg-black/80 border-green-400/30 backdrop-blur-sm border rounded-lg">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-6 w-6 text-green-400" />
                <h2 className="text-xl font-bold text-green-400">RECOVERY ACTIONS</h2>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-gray-400 mb-4">Select your response to the Evil Corp breach:</div>

                <Link 
                  href="/"
                  className="w-full bg-green-900/50 hover:bg-green-800/50 border border-green-400/50 text-green-400 font-mono text-left justify-start p-4 rounded flex items-center transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-3" />
                  [01] RETURN TO PSX MAIN TERMINAL
                </Link>

                <Link 
                  href="/game-auth"
                  className="w-full bg-cyan-900/50 hover:bg-cyan-800/50 border border-cyan-400/50 text-cyan-400 font-mono text-left justify-start p-4 rounded flex items-center transition-colors"
                >
                  <Zap className="h-4 w-4 mr-3" />
                  [02] INITIATE COUNTER-ATTACK PROTOCOL
                </Link>

                <div className="w-full bg-red-900/20 border border-red-400/30 text-red-400/50 font-mono text-left justify-start p-4 rounded flex items-center cursor-not-allowed">
                  <Lock className="h-4 w-4 mr-3" />
                  [03] CONTACT EVIL CORP - CONNECTION SEVERED
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-xs text-gray-500">
          <div className="mb-2">PSX.AGENCY // SECURITY BREACH RESPONSE TEAM</div>
          <div className="text-red-400">"EVIL CORP WILL NOT PREVAIL"</div>
          <div className="mt-4 text-cyan-400">
            Report Evil Corp activity: {' '}
            <a 
              href="https://t.me/psxonbase" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline"
            >
              PSX Security Division
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
