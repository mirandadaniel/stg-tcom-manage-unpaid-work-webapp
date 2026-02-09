import { getPopRequestContext, getSearchParam } from '../../lib/pop/request'
import { getUserDetails } from '../../lib/pop/data'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function PopHome({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { userId, resolvedSearchParams, bypassQuery } = await getPopRequestContext(searchParams)
  const scenario = getSearchParam(resolvedSearchParams, 'scenario')
  const userProfile = await getUserDetails(userId)

  return (
    <>
      <h1 className="govuk-heading-xl">Welcome, {userProfile.preferredName}</h1>
      <div className="govuk-card-grid">
        <a className="govuk-card-link" href={`/pop/your-details${bypassQuery}`}>
          <h2 className="govuk-card-link__title">Your details</h2>
          <p className="govuk-card-link__description">View your personal information</p>
        </a>
        <a className="govuk-card-link" href={`/pop/your-progress${bypassQuery}`}>
          <h2 className="govuk-card-link__title">Your progress</h2>
          <p className="govuk-card-link__description">Track your community order progress</p>
        </a>
        <a className="govuk-card-link" href={`/pop/appointments${bypassQuery}`}>
          <h2 className="govuk-card-link__title">Past and upcoming appointments</h2>
          <p className="govuk-card-link__description">View your scheduled sessions</p>
        </a>
        <a className="govuk-card-link" href={`/pop/conditions${bypassQuery}`}>
          <h2 className="govuk-card-link__title">Your conditions</h2>
          <p className="govuk-card-link__description">View the conditions of your order</p>
        </a>
      </div>
    </>
  )
}
