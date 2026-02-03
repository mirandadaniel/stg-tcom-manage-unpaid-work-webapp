import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const contentTypes: Record<string, string> = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
}

export async function GET(
  request: Request,
  { params }: { params: { path: string[] } | Promise<{ path: string[] }> },
) {
  const resolvedParams = await Promise.resolve(params)
  const assetPath = resolvedParams.path.join('/')
  const filePath = path.join(process.cwd(), 'assets', assetPath)
  try {
    const data = await fs.readFile(filePath)
    const ext = path.extname(filePath)
    const contentType = contentTypes[ext] || 'application/octet-stream'
    return new NextResponse(data, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    return new NextResponse('Not found', { status: 404 })
  }
}
