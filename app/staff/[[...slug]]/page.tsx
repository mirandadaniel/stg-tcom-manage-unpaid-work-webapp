import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { renderLegacyRoute } from '../../../lib/legacy/renderLegacyRoute'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function StaffPage({
  params,
  searchParams,
}: {
  params: { slug?: string[] }
  searchParams: Record<string, string | string[] | undefined>
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams)
  const bypassFromQuery = resolvedSearchParams.bypass
  const bypassValue = Array.isArray(bypassFromQuery) ? bypassFromQuery[0] : bypassFromQuery
  const bypassCookie = (await cookies()).get('poc_bypass')?.value
  const effectiveBypass = bypassValue || bypassCookie
  const mergedParams = effectiveBypass
    ? { ...resolvedSearchParams, bypass: effectiveBypass }
    : resolvedSearchParams
  const slugPart = params.slug?.length ? `/${params.slug.join('/')}` : ''
  const path = `/staff${slugPart}`
  const { html, status } = await renderLegacyRoute(path, mergedParams)

  if (status === 404) {
    notFound()
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
