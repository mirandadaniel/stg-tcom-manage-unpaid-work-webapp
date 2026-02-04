import ErrorAlert from '../_components/ErrorAlert'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function EnterEmailAddress({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const error = typeof searchParams.error === 'string' ? searchParams.error : undefined

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <ErrorAlert message={error} />

        <a href="/one-login" className="govuk-back-link">
          Back
        </a>
        <form className="form" action="/one-login/enter-email-address/submit" method="post">
          <div className="govuk-form-group">
            <h1 className="govuk-label-wrapper">
              <label className="govuk-label govuk-label--l" htmlFor="email">
                Enter your email address
              </label>
            </h1>

            <input className="govuk-input" id="email" name="email" type="text" />
          </div>
          <button className="govuk-button" data-module="govuk-button" id="submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
