import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const submittedPassword = String(formData.get('password') || '')
  const returnURL = String(formData.get('returnURL') || '/')
  const password = process.env.POC_PASSWORD || ''

  if (submittedPassword && password && submittedPassword === password) {
    const response = NextResponse.redirect(new URL(returnURL, request.url))
    response.cookies.set('poc_check', password, {
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'none',
      httpOnly: true,
      secure: true,
    })
    return response
  }

  const url = new URL('/admin/password', request.url)
  url.searchParams.set('error', 'wrong-password')
  url.searchParams.set('returnURL', returnURL)
  return NextResponse.redirect(url)
}
