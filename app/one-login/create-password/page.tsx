import ErrorAlert from '../_components/ErrorAlert'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function CreatePassword({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const error = typeof searchParams.error === 'string' ? searchParams.error : undefined

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <ErrorAlert message={error} />

        <a href="/one-login/verify-security-code" className="govuk-back-link">
          Back
        </a>
        <h1 className="govuk-heading-l">Create your password</h1>

        <form className="form" action="/one-login/create-password/submit" method="post">
          <div className="govuk-show-password" data-module="show-password">
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="password">
                Enter a password
              </label>
              <div id="password-hint" className="govuk-hint">
                It must be at least 8 characters and must include letters and numbers. Do not use a very
                common password, such as ‘password’ or a sequence of numbers.
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

            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="confirm-password">
                Re-type password
              </label>

              <div className="govuk-show-password" data-module="show-password">
                <div className="govuk-input__wrapper">
                  <div className="govuk-show-password__input-wrapper">
                    <input
                      className="govuk-input govuk-!-width-two-thirds govuk-password-input govuk-input--with-password"
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      spellCheck={false}
                      aria-describedby="confirm-password-hint"
                      autoComplete="new-password"
                    />
                    <button className="govuk-show-password__toggle" aria-controls="confirm-password" type="button" aria-label="Show password">
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
            </div>

            <details className="govuk-details" data-module="govuk-details">
              <summary className="govuk-details__summary">
                <span className="govuk-details__summary-text">How to create a secure password</span>
              </summary>
              <div className="govuk-details__text">
                <p className="govuk-body">
                  A good way to create a secure and memorable password is to use 3 random words. You can use
                  numbers, symbols and spaces.
                </p>
                <p className="govuk-body">You should use a password that you do not use for anything else.</p>
              </div>
            </details>

            <h2 className="govuk-heading-s">Agree to our terms of use</h2>

            <p className="govuk-body">By continuing, you confirm that you agree to our:</p>
            <ul className="govuk-list govuk-list--bullet">
              <li>
                <a href="#" className="govuk-link" rel="noreferrer noopener">
                  privacy notice (opens in a new tab)
                </a>
                , which explains how we use your personal information
              </li>
              <li>
                <a href="#" className="govuk-link" rel="noreferrer noopener">
                  terms and conditions (opens in a new tab)
                </a>
              </li>
            </ul>

            <div className="govuk-button-group">
              <button className="govuk-button govuk-!-width-three-quarters" data-module="govuk-button" id="submit">
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
