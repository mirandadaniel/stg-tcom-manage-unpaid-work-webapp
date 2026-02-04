export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function AccountCreated() {
  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <a href="/one-login/enter-phone-number" className="govuk-back-link">
            Back
          </a>

          <form className="form" action="/one-login/account-created/submit" method="post">
            <h1 className="govuk-heading-l">You’ve created your GOV.UK One Login</h1>

            <p>Now continue to use the service.</p>

            <button className="govuk-button" data-module="govuk-button">
              Continue
            </button>
          </form>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <p>
            <a href="#" target="_blank" style={{ color: 'orange' }}>
              View account created email
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
