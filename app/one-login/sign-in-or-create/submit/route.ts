import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const formData = await request.formData()
  const optionSelected = formData.get('optionSelected')
  const nextPath =
    optionSelected === 'create' ? '/one-login/enter-email-address' : '/one-login/enter-email-address-login'
  return NextResponse.redirect(new URL(nextPath, request.url))
}
