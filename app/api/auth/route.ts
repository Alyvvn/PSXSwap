import { NextRequest, NextResponse } from 'next/server'

// Portal keys that change periodically
const PORTAL_KEYS = [
  "PSX2024CLASSIFIED",
  "GLZZY-WORLD-ACCESS",
  "AGENT-44-CLEARANCE",
  "BASE-NETWORK-SECURE",
  "PSX-AGENCY-TOP-SECRET"
]

// Get current portal key based on time (changes every 24 hours)
function getCurrentPortalKey(): string {
  const now = new Date()
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
  const keyIndex = dayOfYear % PORTAL_KEYS.length
  return PORTAL_KEYS[keyIndex]
}

export async function POST(request: NextRequest) {
  try {
    const { password, walletAddress } = await request.json()
    
    // Handle wallet authentication
    if (walletAddress) {
      // For wallet auth, we trust Privy's authentication and grant access
      const response = NextResponse.json({ 
        success: true,
        message: "Wallet authentication successful",
        authMethod: "wallet"
      })
      response.cookies.set('psx-auth', 'wallet', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600, // 1 hour
        path: '/'
      })
      response.cookies.set('psx-wallet', walletAddress, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600, // 1 hour
        path: '/'
      })
      return response
    }

    // Handle password authentication
    if (password) {
      const currentKey = getCurrentPortalKey()

      // Always allow PSX2024CLASSIFIED (case-insensitive)
      if (typeof password === 'string' && password.trim().toUpperCase() === 'PSX2024CLASSIFIED') {
        const response = NextResponse.json({ 
          success: true,
          message: "Access granted to PSX Game Portal",
          authMethod: "password"
        })
        response.cookies.set('psx-auth', 'password', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 3600, // 1 hour
          path: '/'
        })
        return response
      }

      if (password === currentKey) {
        // Set HTTP-only cookie for security
        const response = NextResponse.json({ 
          success: true,
          message: "Access granted to PSX Game Portal",
          authMethod: "password"
        })
        response.cookies.set('psx-auth', 'password', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 3600, // 1 hour
          path: '/'
        })
        return response
      } else {
        return NextResponse.json(
          { 
            success: false, 
            error: "ACCESS DENIED. INCORRECT PROTOCOL KEY.",
            hint: "The portal key changes daily. Complete the puzzles to discover today's key."
          },
          { status: 401 }
        )
      }
    }

    return NextResponse.json(
      { success: false, error: "No authentication method provided" },
      { status: 400 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    )
  }
}

export async function DELETE() {
  // Logout endpoint
  const response = NextResponse.json({ success: true })
  response.cookies.set('psx-auth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/'
  })
  return response
}

// Endpoint to get current portal key info (for puzzles)
export async function GET() {
  const currentKey = getCurrentPortalKey()
  const keyIndex = PORTAL_KEYS.indexOf(currentKey)
  
  return NextResponse.json({
    currentKey,
    keyIndex,
    totalKeys: PORTAL_KEYS.length,
    nextChange: "24 hours",
    hint: "Complete the puzzles to discover today's portal key"
  })
} 