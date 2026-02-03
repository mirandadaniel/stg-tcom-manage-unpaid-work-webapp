import { notFound } from 'next/navigation'
import { renderLegacyRoute } from '../../lib/legacy/renderLegacyRoute'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function LegacyPage({
  params,
  searchParams,
}: {
  params: { slug?: string[] }
  searchParams: Record<string, string | string[] | undefined>
}) {
  const path = `/${(params.slug || []).join('/')}`
  const { html, status } = await renderLegacyRoute(path, searchParams)

  if (status === 404) {
    notFound()
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
