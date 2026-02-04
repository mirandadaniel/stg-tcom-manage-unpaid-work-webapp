export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function PasswordPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const error = typeof searchParams.error === 'string' ? searchParams.error : undefined
  const returnURL = typeof searchParams.returnURL === 'string' ? searchParams.returnURL : '/'
  const hasError = error === 'wrong-password'

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper app-container govuk-body" id="main-content">
        <form method="post" action="/admin/password/submit">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds-from-desktop">
              {hasError ? (
                <div className="govuk-error-summary" role="alert" aria-labelledby="error-summary-title" tabIndex={-1}>
                  <h2 className="govuk-error-summary__title" id="error-summary-title">
                    There is a problem
                  </h2>
                  <ul className="govuk-error-summary__list">
                    <li>
                      <a href="#password">The password is not correct</a>
                    </li>
                  </ul>
                </div>
              ) : null}

              <h1 className="govuk-heading-xl">This is a prototype.</h1>

              <div className={`govuk-form-group${hasError ? ' govuk-form-group--error' : ''}`}>
                <label className="govuk-label" htmlFor="password">
                  Password
                </label>
                {hasError ? (
                  <p className="govuk-error-message">
                    <span className="govuk-visually-hidden">Error:</span> The password is not correct
                  </p>
                ) : null}
                <input
                  className="govuk-input govuk-input--width-10"
                  name="password"
                  id="password"
                  type="password"
                />
              </div>

              <input type="hidden" name="returnURL" value={returnURL} />

              <button className="govuk-button" data-module="govuk-button">
                Continue
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
