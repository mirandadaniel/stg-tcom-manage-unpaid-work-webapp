import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL('/', request.url))
  response.cookies.delete('poc_check')
  response.cookies.delete('poc_bypass')
  response.cookies.delete('is_pop_login')
  return response
}
