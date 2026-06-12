import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard')
  const isOnAuthPage = req.nextUrl.pathname.startsWith('/auth')

  if (isOnDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
  }

  if (isOnAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
}
