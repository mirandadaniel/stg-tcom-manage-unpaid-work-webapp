import ErrorAlert from '../_components/ErrorAlert'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function EnterPhoneNumber({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const error = typeof searchParams.error === 'string' ? searchParams.error : undefined

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <ErrorAlert message={error} />

        <a href="/one-login/create-password" className="govuk-back-link">
          Back
        </a>
        <form className="form" action="/one-login/enter-phone-number/submit" method="post">
          <h1 className="govuk-heading-l govuk-!-margin-top-0 govuk-!-margin-bottom-3">Enter your mobile phone number</h1>

          <p className="govuk-body">We will send a 6 digit security code to the number you give us.</p>

          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="phoneNumber">
              UK mobile phone number
            </label>
            <input className="govuk-input govuk-!-width-two-thirds" id="phoneNumber" name="phoneNumber" type="tel" autoComplete="tel" />
          </div>
          <div className="govuk-form-group">
            <div className="govuk-checkboxes" data-module="govuk-checkboxes">
              <div className="govuk-checkboxes__item">
                <input
                  className="govuk-checkboxes__input"
                  id="hasInternationalPhoneNumber"
                  name="hasInternationalPhoneNumber"
                  type="checkbox"
                  value="true"
                  aria-controls="conditional-hasInternationalPhoneNumber"
                  aria-expanded="false"
                />
                <label className="govuk-label govuk-checkboxes__label" htmlFor="hasInternationalPhoneNumber">
                  I do not have a UK mobile number
                </label>
              </div>
              <div className="govuk-checkboxes__conditional govuk-checkboxes__conditional--hidden" id="conditional-hasInternationalPhoneNumber">
                <div className="govuk-form-group">
                  <label className="govuk-label" htmlFor="internationalPhoneNumber">
                    Mobile phone number
                  </label>
                  <div id="internationalPhoneNumber-hint" className="govuk-hint">
                    Include the country code, for example +33 for France
                  </div>
                  <input
                    className="govuk-input govuk-!-width-two-thirds"
                    id="internationalPhoneNumber"
                    name="internationalPhoneNumber"
                    type="tel"
                    aria-describedby="internationalPhoneNumber-hint"
                    autoComplete="tel"
                  />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" data-prevent-double-click="true" className="govuk-button" data-module="govuk-button">
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
