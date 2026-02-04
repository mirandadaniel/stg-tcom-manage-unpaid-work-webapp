import ErrorAlert from '../_components/ErrorAlert'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function CheckPhoneFormFields() {
  return (
    <>
      <h1 className="govuk-heading-l">Check your phone</h1>

      <div className="govuk-inset-text">
        We have sent a code to your phone number ending with <b>7137</b>
      </div>

      <p className="govuk-body">It might take a few minutes to arrive. The code will expire after 15 minutes.</p>

      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor="otp">
          Enter the 6 digit security code
        </label>
        <input
          className="govuk-input govuk-input--width-10"
          id="otp"
          name="otp"
          type="text"
          spellCheck={false}
          autoComplete="one-time-code"
          inputMode="numeric"
        />
      </div>

      <button className="govuk-button" data-module="govuk-button">
        Continue
      </button>

      <details className="govuk-details" data-module="govuk-details">
        <summary className="govuk-details__summary">
          <span className="govuk-details__summary-text">Problems with the code?</span>
        </summary>
        <div className="govuk-details__text">
          <p className="govuk-body">
            We can{' '}
            <a href="#" className="govuk-link" rel="noreferrer noopener">
              send the code again
            </a>{' '}
            or you can{' '}
            <a href="enter-phone-number" className="govuk-link" rel="noreferrer noopener">
              use a different phone number
            </a>
            .
          </p>
          <p className="govuk-body">
            <a href="get-security-code" className="govuk-link" rel="noreferrer noopener">
              Get a code another way
            </a>
            .
          </p>
        </div>
      </details>
    </>
  )
}

export default function CheckPhone({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const error = typeof searchParams.error === 'string' ? searchParams.error : undefined

  return (
    <>
      <ErrorAlert message={error} />
      <a href="/one-login/enter-phone-number" className="govuk-back-link">
        Back
      </a>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <form className="form" action="/one-login/check-phone/submit" method="post">
            <CheckPhoneFormFields />
          </form>
        </div>
      </div>
    </>
  )
}
