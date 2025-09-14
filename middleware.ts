import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the user is trying to access the game route
  if (request.nextUrl.pathname === '/game') {
    // Check if user is authenticated (has the auth cookie)
    const isAuthenticated = request.cookies.has('psx-auth')
    
    if (!isAuthenticated) {
      // Redirect to authentication page if not authenticated
      return NextResponse.redirect(new URL('/game-auth', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/game']
} 