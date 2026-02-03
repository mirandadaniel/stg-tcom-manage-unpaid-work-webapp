import { renderLegacyRoute } from '../lib/legacy/renderLegacyRoute'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { html } = await renderLegacyRoute('/', searchParams)
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
