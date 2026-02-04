import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const formData = await request.formData()
  const password = String(formData.get('password') || '')
  const confirmPassword = String(formData.get('confirmPassword') || '')

  if (password !== confirmPassword) {
    const url = new URL('/one-login/create-password', request.url)
    url.searchParams.set('error', 'Passwords do not match. Please try again.')
    return NextResponse.redirect(url)
  }
  if (password.length < 8) {
    const url = new URL('/one-login/create-password', request.url)
    url.searchParams.set('error', 'Password must be at least 8 characters long. Please try again.')
    return NextResponse.redirect(url)
  }

  return NextResponse.redirect(new URL('/one-login/enter-phone-number', request.url))
}
