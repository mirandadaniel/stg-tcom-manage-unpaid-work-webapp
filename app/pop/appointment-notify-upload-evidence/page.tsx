import { cookies } from 'next/headers'
import Alert from '../_components/Alert'
import { EVIDENCE_COOKIE, parseEvidenceCookie } from '../../../lib/pop/evidence'
import { getPopRequestContext, getSearchParam } from '../../../lib/pop/request'
import { appendBypassToUrl } from '../../../lib/pop/url'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function AppointmentNotifyUploadEvidence({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { bypassQuery, bypassParam, resolvedSearchParams } = await getPopRequestContext(searchParams)
  const errorMessage = getSearchParam(resolvedSearchParams, 'error')
  const cookieStore = await cookies()
  const evidenceCookie = cookieStore.get(EVIDENCE_COOKIE)?.value
  const uploadedEvidence = parseEvidenceCookie(evidenceCookie)

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          {errorMessage ? (
            <Alert variant="error" title={errorMessage} />
          ) : null}

          <a className="govuk-back-link" href={`/pop/appointment-notify${bypassQuery}`}>
            Back
          </a>
          <h1 className="govuk-heading-xl">You need to upload supporting evidence</h1>
        </div>
      </div>

      <div className="govuk-grid-row govuk-!-margin-top-4">
        <div className="govuk-grid-column-full">
          <p className="govuk-body">You can upload one of the following as evidence:</p>
          <ul className="govuk-list govuk-list--bullet">
            <li>Doctor's notes</li>
            <li>Fit note (sometimes called a 'sick note')</li>
            <li>Diagnostic test results</li>
            <li>Hospital discharge papers</li>
            <li>Prescription receipts</li>
            <li>Photographs or videos</li>
          </ul>

          <h2 className="govuk-heading-m">Uploaded files</h2>

          {uploadedEvidence.length > 0 ? (
            <>
              <p className="govuk-body">
                When you submit this application, a caseworker will be able to access these files.
              </p>
              <table className="govuk-table">
                <thead className="govuk-table__head">
                  <tr className="govuk-table__row">
                    <th className="govuk-table__header">File Name</th>
                    <th className="govuk-table__header">Action</th>
                  </tr>
                </thead>
                <tbody className="govuk-table__body">
                  {uploadedEvidence.map(evidence => (
                    <tr className="govuk-table__row" key={evidence.filename}>
                      <td className="govuk-table__cell">{evidence.filename}</td>
                      <td className="govuk-table__cell">
                        <a
                          className="govuk-link govuk-link--no-visited-state"
                          href={appendBypassToUrl(
                            `/pop/delete-evidence?filename=${encodeURIComponent(evidence.filename)}`,
                            bypassParam,
                          )}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <form action={appendBypassToUrl('/pop/submit-evidence', bypassParam)} method="post">
                <button className="govuk-button govuk-!-margin-top-2" type="submit">
                  Submit
                </button>
              </form>
            </>
          ) : (
            <>
              <p className="govuk-body">
                Your probation practitioner will be able to access these files when you submit them.
              </p>
              <form
                action={appendBypassToUrl('/pop/upload-evidence', bypassParam)}
                method="post"
                encType="multipart/form-data"
              >
                <div>
                  <input
                    className="govuk-file-upload"
                    id="attachments"
                    name="attachments"
                    accept=".png,.jpeg,.jpg,.webp,.pdf"
                    type="file"
                    multiple
                  />
                </div>
                <button className="govuk-button govuk-!-margin-top-2" type="submit">
                  Upload
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}
