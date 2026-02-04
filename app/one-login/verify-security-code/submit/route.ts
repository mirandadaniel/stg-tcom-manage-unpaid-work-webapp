import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const formData = await request.formData()
  const code = String(formData.get('code') || '').trim()
  const url = new URL(request.url)
  const email = url.searchParams.get('email') || String(formData.get('email') || '').trim()

  if (code !== process.env.VALID_OTP) {
    const redirectUrl = new URL('/one-login/verify-security-code', request.url)
    if (email) {
      redirectUrl.searchParams.set('email', email)
    }
    redirectUrl.searchParams.set('error', 'Invalid OTP code. Please try again.')
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.redirect(new URL('/one-login/create-password', request.url))
}
