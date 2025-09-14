import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Check if the authentication cookie exists
  const authCookie = request.cookies.get('psx-auth')
  const walletCookie = request.cookies.get('psx-wallet')
  
  // Accept both password authentication ('password') and wallet authentication ('wallet')
  if (authCookie?.value === 'password' || authCookie?.value === 'wallet') {
    return NextResponse.json({ 
      authenticated: true,
      authMethod: authCookie.value,
      walletAddress: walletCookie?.value || null
    })
  } else {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    )
  }
} 