import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const formData = await request.formData()
  const email = String(formData.get('email') || '').trim()

  if (!email.endsWith('@example.com')) {
    const url = new URL('/one-login/enter-email-address-login', request.url)
    url.searchParams.set('error', 'You must enter a valid email address with example.com domain')
    return NextResponse.redirect(url)
  }

  return NextResponse.redirect(new URL('/one-login/enter-password', request.url))
}
