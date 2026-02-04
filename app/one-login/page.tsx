import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function OneLoginHome() {
  const isPopLogin = cookies().get('is_pop_login')?.value === 'true'
  if (isPopLogin) {
    redirect('/pop')
  }
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h1 className="govuk-heading-l govuk-!-margin-top-0 govuk-!-margin-bottom-3">
          Create a GOV.UK One&nbsp;Login or sign&nbsp;in
        </h1>

        <p className="govuk-body">You’ll need:</p>
        <ul className="govuk-list govuk-list--bullet">
          <li>an email address</li>
          <li>a way to get security codes - this can be a mobile phone number or an authenticator app</li>
        </ul>

        <div className="govuk-inset-text">
          You can also{' '}
          <a href="#" className="govuk-link" rel="noreferrer">
            use GOV.UK One Login in Welsh <span lang="cy">(Cymraeg)</span>
          </a>
          .
        </div>

        <form action="/one-login/sign-in-or-create/submit" method="post" noValidate>
          <button
            value="create"
            name="optionSelected"
            className="govuk-button govuk-!-margin-right-3"
            data-module="govuk-button"
            id="create-account-link"
            data-nav="true"
            data-link="/enter-email-create"
          >
            Create your GOV.UK One Login
          </button>

          <div>
            <button
              className="govuk-button govuk-button--secondary"
              data-module="govuk-button"
              id="sign-in-button"
              data-nav="true"
              data-link="/enter-email"
            >
              Sign in
            </button>
          </div>
        </form>

        <details className="govuk-details" data-module="govuk-details">
          <summary className="govuk-details__summary">
            <span className="govuk-details__summary-text">About GOV.UK One Login</span>
          </summary>
          <div className="govuk-details__text">
            <p className="govuk-body">You can use your GOV.UK One Login to access all government services.</p>
          </div>
        </details>
      </div>
    </div>
  )
}
