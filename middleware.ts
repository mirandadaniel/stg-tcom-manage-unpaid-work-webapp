import { NextRequest, NextResponse } from 'next/server'

const allowedPathsWhenUnauthenticated = ['/admin/password', '/admin/password/submit']

const shouldUseAuth = () => {
  const safeNodeEnv = process.env.NODE_ENV || 'not set'
  const isRunningInProduction = safeNodeEnv.toLowerCase() === 'production'
  return isRunningInProduction || true
}

export function middleware(request: NextRequest) {
  if (!shouldUseAuth()) {
    return NextResponse.next()
  }

  const bypassParam = request.nextUrl.searchParams.get('bypass') === 'true'
  const bypassCookie = request.cookies.get('poc_bypass')?.value === 'true'

  if (bypassParam || bypassCookie) {
    if (bypassParam && !bypassCookie) {
      const response = NextResponse.next()
      const isSecure = request.nextUrl.protocol === 'https:'
      response.cookies.set('poc_bypass', 'true', {
        maxAge: 60 * 60 * 24 * 30,
        sameSite: isSecure ? 'none' : 'lax',
        httpOnly: true,
        secure: isSecure,
      })
      return response
    }
    return NextResponse.next()
  }

  const password = process.env.POC_PASSWORD
  if (!password) {
    return new NextResponse('<h1>Error:</h1><p>Password not set.</p>', {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    })
  }

  const { pathname } = request.nextUrl
  if (allowedPathsWhenUnauthenticated.includes(pathname)) {
    return NextResponse.next()
  }

  const cookie = request.cookies.get('poc_check')?.value
  if (cookie && cookie === password) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = '/admin/password'
  url.searchParams.set('returnURL', request.nextUrl.pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|assets).*)'],
}
