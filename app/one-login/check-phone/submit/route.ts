import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const formData = await request.formData()
  const otp = String(formData.get('otp') || '').trim()

  if (otp !== process.env.POP_LOGIN_OTP) {
    const url = new URL('/one-login/check-phone', request.url)
    url.searchParams.set('error', 'Invalid OTP code. Please try again.')
    return NextResponse.redirect(url)
  }

  return NextResponse.redirect(new URL('/one-login/account-created', request.url))
}
