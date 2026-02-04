import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const formData = await request.formData()
  const password = String(formData.get('password') || '')

  if (password !== process.env.POP_PASSWORD) {
    const url = new URL('/one-login/enter-password', request.url)
    url.searchParams.set('error', 'Invalid password. Please try again.')
    return NextResponse.redirect(url)
  }

  return NextResponse.redirect(new URL('/one-login/check-phone-login', request.url))
}
