import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL('/pop/verify', request.url))
  response.cookies.set('is_pop_login', 'true', { httpOnly: true, sameSite: 'lax', path: '/' })
  return response
}
