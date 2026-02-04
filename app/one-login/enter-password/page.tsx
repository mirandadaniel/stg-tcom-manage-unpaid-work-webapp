import ErrorAlert from '../_components/ErrorAlert'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function EnterPassword({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const error = typeof searchParams.error === 'string' ? searchParams.error : undefined

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <ErrorAlert message={error} />

        <a href="/one-login/enter-email-address-login" className="govuk-back-link">
          Back
        </a>
        <form className="form" action="/one-login/enter-password/submit" method="post">
          <h1 className="govuk-heading-l">Enter your password</h1>

          <div className="govuk-show-password" data-module="show-password">
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="password">
                Enter a password
              </label>
              <div id="password-hint" className="govuk-hint">
                It must be at least 8 characters and must include letters and numbers. Do not use a very
                common password, such as 'password' or a sequence of numbers.
              </div>
              <div className="govuk-input__wrapper">
                <div className="govuk-show-password__input-wrapper">
                  <input
                    className="govuk-input govuk-!-width-two-thirds govuk-password-input govuk-input--with-password"
                    id="password"
                    name="password"
                    type="password"
                    spellCheck={false}
                    aria-describedby="password-hint"
                    autoComplete="new-password"
                  />
                  <button className="govuk-show-password__toggle" aria-controls="password" type="button" aria-label="Show password">
                    Show
                  </button>
                  <span className="govuk-visually-hidden" aria-live="polite">
                    Your password is hidden
                  </span>
                </div>
                <span className="govuk-input__icon govuk-input__icon--right" />
                <span className="govuk-visually-hidden" aria-live="polite">
                  Your password is hidden
                </span>
              </div>
            </div>

            <button className="govuk-button" data-module="govuk-button">
              Continue
            </button>

            <p>
              <a href="#">I've forgotten my password</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
