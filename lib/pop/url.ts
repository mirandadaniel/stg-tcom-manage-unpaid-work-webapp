export const appendBypassToUrl = (url: string, bypassParam: string) => {
  if (!bypassParam) {
    return url
  }

  return url.includes('?') ? `${url}&${bypassParam}` : `${url}?${bypassParam}`
}
