import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function PopCatchAll() {
  notFound()
}
