import { NextResponse } from 'next/server'
import { EVIDENCE_COOKIE, parseEvidenceCookie, serializeEvidenceCookie } from '../../../lib/pop/evidence'

const buildRedirectUrl = (requestUrl: string, path: string) => {
  const url = new URL(requestUrl)
  const redirectUrl = new URL(path, url.origin)
  if (url.searchParams.get('bypass') === 'true') {
    redirectUrl.searchParams.set('bypass', 'true')
  }
  return redirectUrl
}

const extractFiles = (formData: FormData) =>
  formData
    .getAll('attachments')
    .filter(item => item && typeof item === 'object' && 'name' in item)
    .map(item => ({
      filename: (item as File).name,
    }))

export async function POST(request: Request) {
  const formData = await request.formData()
  const newEvidence = extractFiles(formData)

  if (newEvidence.length === 0) {
    const errorUrl = buildRedirectUrl(request.url, '/pop/appointment-notify-upload-evidence')
    errorUrl.searchParams.set('error', 'Select a file to upload')
    return NextResponse.redirect(errorUrl)
  }

  const existingEvidence = parseEvidenceCookie(request.cookies.get(EVIDENCE_COOKIE)?.value)
  const updatedEvidence = [...existingEvidence, ...newEvidence]

  const redirectUrl = buildRedirectUrl(request.url, '/pop/appointment-notify-upload-evidence')
  const response = NextResponse.redirect(redirectUrl)
  response.cookies.set(EVIDENCE_COOKIE, serializeEvidenceCookie(updatedEvidence), {
    path: '/',
  })
  return response
}
