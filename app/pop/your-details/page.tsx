import SummaryCard from '../_components/SummaryCard'
import { getPopRequestContext } from '../../../lib/pop/request'
import { getUserDetails } from '../../../lib/pop/data'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function YourDetails({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { userId, bypassQuery } = await getPopRequestContext(searchParams)
  const userProfile = await getUserDetails(userId)

  return (
    <>
      <a className="govuk-back-link" href={`/pop${bypassQuery}`}>
        Back to homepage
      </a>

      <h1 className="govuk-heading-xl govuk-!-margin-bottom-1">Your details</h1>
      <p className="govuk-body-s govuk-!-margin-bottom-6">Last updated on 10 March 2025, 2.29pm</p>

      <p className="govuk-body">
        To change any of this information, contact your probation practitioner.
      </p>

      <SummaryCard title="Personal details">
        <dl className="govuk-summary-list">
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Name</dt>
            <dd className="govuk-summary-list__value">{userProfile.name}</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Preferred name</dt>
            <dd className="govuk-summary-list__value">Joey</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Date of birth</dt>
            <dd className="govuk-summary-list__value">15 March 1985</dd>
          </div>
        </dl>
      </SummaryCard>

      <SummaryCard title="Identity numbers">
        <dl className="govuk-summary-list">
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">CRN</dt>
            <dd className="govuk-summary-list__value">{userProfile.userId}</dd>
          </div>
        </dl>
      </SummaryCard>

      <SummaryCard title="Contact details">
        <dl className="govuk-summary-list">
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Address</dt>
            <dd className="govuk-summary-list__value">
              {userProfile.address.split('\n').map((line, index) => (
                <span key={`${line}-${index}`}>
                  {line}
                  <br />
                </span>
              ))}
            </dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Phone number</dt>
            <dd className="govuk-summary-list__value">{userProfile.phone}</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Mobile number</dt>
            <dd className="govuk-summary-list__value">07912 345678</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Email address</dt>
            <dd className="govuk-summary-list__value">{userProfile.email}</dd>
          </div>
        </dl>
      </SummaryCard>

      <SummaryCard title="Emergency contact details">
        <dl className="govuk-summary-list">
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Name</dt>
            <dd className="govuk-summary-list__value">Jane Bloggs</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Relationship</dt>
            <dd className="govuk-summary-list__value">Spouse</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Phone number</dt>
            <dd className="govuk-summary-list__value">07700 900456</dd>
          </div>
        </dl>
      </SummaryCard>

      <SummaryCard title="Probation practitioner details">
        <dl className="govuk-summary-list">
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Name</dt>
            <dd className="govuk-summary-list__value">Sarah Smith</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Phone number</dt>
            <dd className="govuk-summary-list__value">020 7946 0958</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Office address</dt>
            <dd className="govuk-summary-list__value">
              National Probation Service
              <br />
              235 Greenwich High Road
              <br />
              London
              <br />
              SE10 8NB
            </dd>
          </div>
        </dl>
      </SummaryCard>
    </>
  )
}
