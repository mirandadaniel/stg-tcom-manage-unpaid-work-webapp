import { getNunjucksEnv } from './nunjucksEnv'
import { matchRouteToTemplate } from './routeMap'

const extractBody = (html: string) => {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  return bodyMatch ? bodyMatch[1] : html
}

export const renderLegacyRoute = async (
  path: string,
  searchParams: Record<string, string | string[] | undefined>,
) => {
  const rawBypass = searchParams.bypass
  const bypassValue = Array.isArray(rawBypass) ? rawBypass[0] : rawBypass
  const isBypass = bypassValue === 'true'
  const bypassQuery = isBypass ? '?bypass=true' : ''
  const bypassParam = isBypass ? 'bypass=true' : ''
  const { template, status } = matchRouteToTemplate(path)
  const env = getNunjucksEnv()
  let routeContext: Record<string, unknown> = {}

  const context = {
    applicationName: 'Manage my community sentence',
    asset_path: '/assets/',
    csrfToken: '',
    session: {},
    bypass: bypassValue,
    bypassQuery,
    bypassParam,
    ...Object.fromEntries(Object.entries(searchParams).map(([key, value]) => [key, value ?? ''])),
    ...routeContext,
  }

  const html = env.render(`${template}.njk`, context)
  return { html: extractBody(html), status }
}
