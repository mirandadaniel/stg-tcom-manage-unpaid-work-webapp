import { NextResponse } from 'next/server'

const buildRedirectUrl = (requestUrl: string, path: string) => {
  const url = new URL(requestUrl)
  const redirectUrl = new URL(path, url.origin)
  if (url.searchParams.get('bypass') === 'true') {
    redirectUrl.searchParams.set('bypass', 'true')
  }
  return redirectUrl
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const reason = formData.get('cancellationReason')

  if (!reason) {
    const errorUrl = buildRedirectUrl(request.url, '/pop/appointment-notify')
    errorUrl.searchParams.set('error', 'Select the reason for not attending')
    return NextResponse.redirect(errorUrl)
  }

  const redirectUrl = buildRedirectUrl(request.url, '/pop/appointment-notify-upload-evidence')
  return NextResponse.redirect(redirectUrl)
}
