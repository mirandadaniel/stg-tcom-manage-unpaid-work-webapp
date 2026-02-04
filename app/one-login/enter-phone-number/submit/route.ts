import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const formData = await request.formData()
  const hasInternationalPhoneNumber = formData.get('hasInternationalPhoneNumber')
  const internationalPhoneNumber = String(formData.get('internationalPhoneNumber') || '').trim()
  const phoneNumber = String(formData.get('phoneNumber') || '').trim()

  if (hasInternationalPhoneNumber && !internationalPhoneNumber) {
    const url = new URL('/one-login/enter-phone-number', request.url)
    url.searchParams.set('error', 'You must enter an international phone number.')
    return NextResponse.redirect(url)
  }
  if (!hasInternationalPhoneNumber && !phoneNumber) {
    const url = new URL('/one-login/enter-phone-number', request.url)
    url.searchParams.set('error', 'You must enter a UK mobile phone number.')
    return NextResponse.redirect(url)
  }

  return NextResponse.redirect(new URL('/one-login/get-security-code', request.url))
}
