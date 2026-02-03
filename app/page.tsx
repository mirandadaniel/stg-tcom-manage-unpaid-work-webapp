import { cookies } from 'next/headers'
import { renderLegacyRoute } from '../lib/legacy/renderLegacyRoute'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function Home({
  searchParams,
}: {
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
  const { html } = await renderLegacyRoute('/', mergedParams)
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
