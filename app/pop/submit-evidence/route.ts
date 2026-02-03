import { NextResponse } from 'next/server'
import { EVIDENCE_COOKIE } from '../../../lib/pop/evidence'

export async function POST(request: Request) {
  const url = new URL(request.url)
  const redirectUrl = new URL('/pop/appointments', url.origin)
  redirectUrl.searchParams.set('submittedEvidence', 'true')

  if (url.searchParams.get('bypass') === 'true') {
    redirectUrl.searchParams.set('bypass', 'true')
  }

  const response = NextResponse.redirect(redirectUrl)
  response.cookies.set(EVIDENCE_COOKIE, '', {
    path: '/',
    maxAge: 0,
  })
  return response
}
