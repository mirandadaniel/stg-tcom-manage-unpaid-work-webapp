import { cookies } from 'next/headers'

export type PopSearchParams = Record<string, string | string[] | undefined>

const getSingleValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value

export async function getPopRequestContext(searchParams: PopSearchParams) {
  const resolvedSearchParams = await Promise.resolve(searchParams)
  const bypassFromQuery = getSingleValue(resolvedSearchParams.bypass)
  const bypassCookie = (await cookies()).get('poc_bypass')?.value
  const effectiveBypass = bypassFromQuery || bypassCookie
  const isBypass = effectiveBypass === 'true'

  return {
    resolvedSearchParams,
    userId: getSingleValue(resolvedSearchParams.userId) || 'prototype-user',
    isBypass,
    bypassQuery: isBypass ? '?bypass=true' : '',
    bypassParam: isBypass ? 'bypass=true' : '',
  }
}

export const getSearchParam = (searchParams: PopSearchParams, key: string) =>
  getSingleValue(searchParams[key])
