import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const formData = await request.formData()
  const otp = String(formData.get('otp') || '').trim()

  if (otp !== process.env.POP_LOGIN_OTP) {
    const url = new URL('/one-login/check-phone-login', request.url)
    url.searchParams.set('error', 'Invalid OTP code. Please try again.')
    return NextResponse.redirect(url)
  }

  const response = NextResponse.redirect(new URL('/pop', request.url))
  response.cookies.set('is_pop_login', 'true', { httpOnly: true, sameSite: 'lax', path: '/' })
  return response
}
