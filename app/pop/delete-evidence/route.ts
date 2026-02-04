/* eslint-disable import/prefer-default-export -- Next.js route handlers require named exports */
import { NextRequest, NextResponse } from 'next/server'
import { EVIDENCE_COOKIE, parseEvidenceCookie, serializeEvidenceCookie } from '../../../lib/pop/evidence'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const filename = url.searchParams.get('filename')
  const existingEvidence = parseEvidenceCookie(request.cookies.get(EVIDENCE_COOKIE)?.value)
  const updatedEvidence = filename ? existingEvidence.filter(item => item.filename !== filename) : existingEvidence

  const redirectUrl = new URL('/pop/appointment-notify-upload-evidence', url.origin)
  if (url.searchParams.get('bypass') === 'true') {
    redirectUrl.searchParams.set('bypass', 'true')
  }

  const response = NextResponse.redirect(redirectUrl)
  response.cookies.set(EVIDENCE_COOKIE, serializeEvidenceCookie(updatedEvidence), {
    path: '/',
  })
  return response
}
