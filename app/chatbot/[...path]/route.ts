import { NextRequest, NextResponse } from 'next/server'

/**
 * Proxy /chatbot/* requests to the familylaw FastAPI backend (port 8000).
 *
 * The chatbot widget (from @familylaw/chatbot) calls same-origin endpoints
 * like POST /chatbot/chat.  This route handler forwards those requests to
 * the real Python backend, adding the Bearer token it requires in local dev.
 */

const CHATBOT_BACKEND_URL = process.env.FAMILYLAW_CHATBOT_URL || 'http://localhost:8000'

/** Create a simple base64-encoded dev token (same format the familylaw frontend uses). */
function createLocalDevToken(): string {
  const payload = {
    user_id: 'local-dev-user-123',
    name: 'Local Developer',
    email: 'developer@localhost.com',
    roles: ['developer', 'admin'],
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    iat: Math.floor(Date.now() / 1000),
  }
  return Buffer.from(JSON.stringify(payload)).toString('base64')
}

async function proxyRequest(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const targetUrl = `${CHATBOT_BACKEND_URL}${pathname}${search}`

  const headers = new Headers(request.headers)
  headers.set('Authorization', `Bearer ${createLocalDevToken()}`)
  // Remove host / next-specific headers so the backend doesn't get confused
  headers.delete('host')

  const init: RequestInit = {
    method: request.method,
    headers,
  }

  // Forward body for methods that have one
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = await request.text()
  }

  try {
    const upstream = await fetch(targetUrl, init)
    const body = await upstream.text()

    return new NextResponse(body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: {
        'Content-Type': upstream.headers.get('Content-Type') || 'application/json',
      },
    })
  } catch {
    return NextResponse.json({ detail: 'Chatbot backend unavailable' }, { status: 502 })
  }
}

export const GET = proxyRequest
export const POST = proxyRequest
export const PUT = proxyRequest
export const DELETE = proxyRequest
export const PATCH = proxyRequest
