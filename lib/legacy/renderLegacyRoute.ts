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
  const { template, status } = matchRouteToTemplate(path)
  const env = getNunjucksEnv()

  const context = {
    applicationName: 'Manage my community sentence',
    asset_path: '/assets/',
    csrfToken: '',
    session: {},
    ...Object.fromEntries(Object.entries(searchParams).map(([key, value]) => [key, value ?? ''])),
  }

  const html = env.render(`${template}.njk`, context)
  return { html: extractBody(html), status }
}
