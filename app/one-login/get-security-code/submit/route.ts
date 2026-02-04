import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const formData = await request.formData()
  const chooseSecurityCodes = formData.get('choose-security-codes')

  if (!chooseSecurityCodes) {
    const url = new URL('/one-login/get-security-code', request.url)
    url.searchParams.set('error', 'You must choose a method to get code.')
    return NextResponse.redirect(url)
  }

  return NextResponse.redirect(new URL('/one-login/check-phone', request.url))
}
