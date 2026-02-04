import ErrorAlert from '../_components/ErrorAlert'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function GetSecurityCode({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const error = typeof searchParams.error === 'string' ? searchParams.error : undefined

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <ErrorAlert message={error} />

        <a href="/one-login/enter-phone-number" className="govuk-back-link">
          Back
        </a>
        <form className="form" action="/one-login/get-security-code/submit" method="post">
          <div className="govuk-form-group">
            <fieldset className="govuk-fieldset" aria-describedby="choose-security-codes-hint">
              <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
                <h1 className="govuk-fieldset__heading">Choose how to get security codes</h1>
              </legend>

              <div id="choose-security-codes-hint" className="govuk-hint">
                To finish creating your GOV.UK One Login, choose a way to prove it’s you when you sign in.
              </div>

              <div className="govuk-radios" data-module="govuk-radios">
                <div className="govuk-radios__item">
                  <input className="govuk-radios__input" id="choose-security-codes" name="choose-security-codes" type="radio" value="Text message" />
                  <label className="govuk-label govuk-radios__label" htmlFor="choose-security-codes">
                    Text message
                  </label>
                </div>

                <div className="govuk-radios__item">
                  <input
                    className="govuk-radios__input"
                    id="choose-security-codes-2"
                    name="choose-security-codes"
                    type="radio"
                    value="Authenticator app for smartphone, tablet or computer"
                  />
                  <label className="govuk-label govuk-radios__label" htmlFor="choose-security-codes-2">
                    Authenticator app for smartphone, tablet or computer
                  </label>
                </div>
              </div>
            </fieldset>
          </div>

          <details className="govuk-details" data-module="govuk-details">
            <summary className="govuk-details__summary">
              <span className="govuk-details__summary-text">What is an authenticator app?</span>
            </summary>
            <div className="govuk-details__text">
              <p className="govuk-body">
                An authenticator app creates a security code that helps confirm it’s you when you sign in.
              </p>
              <p className="govuk-body">
                You can use an authenticator app on your smartphone, tablet or desktop computer. Download an
                authenticator app for your smartphone or tablet from your app store or search online for an
                authenticator app for your computer.
              </p>
            </div>
          </details>

          <button className="govuk-button" data-module="govuk-button">
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
