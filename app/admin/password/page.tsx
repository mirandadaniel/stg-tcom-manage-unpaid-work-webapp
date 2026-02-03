import { renderLegacyRoute } from '../../../lib/legacy/renderLegacyRoute'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function PasswordPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { html } = await renderLegacyRoute('/admin/password', searchParams)
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
