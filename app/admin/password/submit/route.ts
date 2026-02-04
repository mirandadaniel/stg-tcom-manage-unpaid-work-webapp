import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const formData = await request.formData()
  const submittedPassword = String(formData.get('password') || '')
  const returnURL = String(formData.get('returnURL') || '/')
  const password = process.env.POC_PASSWORD || ''
  const hasPassword = Boolean(password)
  const isMatch = submittedPassword.length > 0 && submittedPassword === password

  console.log(
    `[poc-auth] submit received (hasPassword=${hasPassword}, hasInput=${
      submittedPassword.length > 0
    }, isMatch=${isMatch})`,
  )

  if (isMatch) {
    const response = NextResponse.redirect(new URL(returnURL, request.url))
    const isSecure = new URL(request.url).protocol === 'https:'
    response.cookies.set('poc_check', password, {
      maxAge: 60 * 60 * 24 * 30,
      sameSite: isSecure ? 'none' : 'lax',
      httpOnly: true,
      secure: isSecure,
    })
    console.log(`[poc-auth] set poc_check cookie (secure=${isSecure})`)
    return response
  }

  const url = new URL('/admin/password', request.url)
  url.searchParams.set('error', 'wrong-password')
  url.searchParams.set('returnURL', returnURL)
  return NextResponse.redirect(url)
}
