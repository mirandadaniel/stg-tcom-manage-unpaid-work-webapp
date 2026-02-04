import { redirect } from 'next/navigation'
import ErrorAlert from '../_components/ErrorAlert'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function VerifySecurityCode({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const email = typeof searchParams.email === 'string' ? searchParams.email : undefined
  const error = typeof searchParams.error === 'string' ? searchParams.error : undefined

  if (!email) {
    redirect('/one-login/enter-email-address')
  }

  return (
    <>
      <a href="/one-login/enter-email-address" className="govuk-back-link">
        Back
      </a>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ErrorAlert message={error} />

          <form
            className="form"
            action={`/one-login/verify-security-code/submit?email=${encodeURIComponent(email)}`}
            method="post"
          >
            <h1 className="govuk-heading-l">Check your email</h1>

            <div className="govuk-inset-text">
              We have sent an email to: <span className="govuk-body govuk-!-font-weight-bold permit-reflow">{email}</span>
            </div>

            <p className="govuk-body">The email contains a 6 digit security code.</p>

            <p className="govuk-body">Your email might take a few minutes to arrive. If you do not get an email, check your spam folder.</p>

            <p className="govuk-body">The code will expire after one hour.</p>

            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="code">
                Enter the 6 digit security code
              </label>
              <input
                className="govuk-input govuk-input--width-10"
                id="code"
                name="code"
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
                  <a href="/one-login/enter-email-address" className="govuk-link" rel="noreferrer noopener">
                    use a different email address
                  </a>
                  .
                </p>
              </div>
            </details>
          </form>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <p>
            <a href="otp-email.html" target="_blank" style={{ color: 'orange' }}>
              View security email
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
