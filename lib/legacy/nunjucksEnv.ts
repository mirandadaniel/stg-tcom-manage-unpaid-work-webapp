import path from 'path'
import nunjucks from 'nunjucks'
import mojFilters from '@ministryofjustice/frontend/moj/filters/all.js'

let env: nunjucks.Environment | null = null

export const getNunjucksEnv = () => {
  if (env) {
    return env
  }

  env = nunjucks.configure(
    [
      path.join(process.cwd(), 'server/views'),
      path.join(process.cwd(), 'node_modules/govuk-frontend/dist'),
      path.join(process.cwd(), 'node_modules/@ministryofjustice/frontend'),
    ],
    {
      autoescape: true,
      throwOnUndefined: false,
    },
  )

  const initialiseName = (fullName?: string): string | null => {
    if (!fullName) return null
    const array = fullName.split(' ')
    return `${array[0][0]}. ${array.reverse()[0]}`
  }
  env.addFilter('initialiseName', initialiseName)
  env.addFilter('assetMap', (url: string) => url)

  for (const [name, filter] of Object.entries(mojFilters())) {
    env.addFilter(name, filter as (...args: unknown[]) => unknown)
  }

  return env
}
