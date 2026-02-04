import SummaryCard from '../_components/SummaryCard'
import { getOrderSummary } from '../../../lib/pop/data'
import { getPopRequestContext } from '../../../lib/pop/request'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function Conditions({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { userId, bypassQuery } = await getPopRequestContext(searchParams)
  const orderSummary = await getOrderSummary(userId)

  return (
    <>
      <a className="govuk-back-link" href={`/pop${bypassQuery}`}>
        Back to homepage
      </a>

      <h1 className="govuk-heading-xl">Your conditions</h1>

      <p className="govuk-body">
        You must follow these conditions to avoid returning to court, being given additional requirements, or
        being sent to prison.
      </p>

      <SummaryCard title="Order details">
        <dl className="govuk-summary-list">
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Order type</dt>
            <dd className="govuk-summary-list__value">{orderSummary.orderType}</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Order start date</dt>
            <dd className="govuk-summary-list__value">{orderSummary.startDate}</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Order estimated end date</dt>
            <dd className="govuk-summary-list__value">{orderSummary.requirementsCompletionDate}</dd>
          </div>
        </dl>
      </SummaryCard>

      <SummaryCard title="Order requirements">
        <dl className="govuk-summary-list">
          {orderSummary.requirements.map(requirement => (
            <div className="govuk-summary-list__row" key={requirement.category}>
              <dt className="govuk-summary-list__key">{requirement.category}</dt>
              <dd className="govuk-summary-list__value">{requirement.requirement}</dd>
            </div>
          ))}
        </dl>
      </SummaryCard>

      <span />
    </>
  )
}
