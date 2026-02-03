export const EVIDENCE_COOKIE = 'pop_uploaded_evidence'

export type UploadedEvidence = { filename: string }

export const parseEvidenceCookie = (cookieValue?: string): UploadedEvidence[] => {
  if (!cookieValue) {
    return []
  }

  try {
    const parsed = JSON.parse(cookieValue)
    if (!Array.isArray(parsed)) {
      return []
    }
    return parsed
      .filter(item => item && typeof item.filename === 'string')
      .map(item => ({ filename: item.filename }))
  } catch (error) {
    return []
  }
}

export const serializeEvidenceCookie = (items: UploadedEvidence[]) =>
  JSON.stringify(items.map(item => ({ filename: item.filename })))
