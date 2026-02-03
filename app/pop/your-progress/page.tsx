import SummaryCard from '../_components/SummaryCard'
import { getPopRequestContext, getSearchParam } from '../../../lib/pop/request'
import { getProgressDetails } from '../../../lib/pop/data'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function YourProgress({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { userId, bypassQuery, resolvedSearchParams } = await getPopRequestContext(searchParams)
  const progress = getSearchParam(resolvedSearchParams, 'progress')
  const progressData = await getProgressDetails(userId, progress)

  return (
    <>
      <a className="govuk-back-link" href={`/pop${bypassQuery}`}>
        Back to homepage
      </a>

      <h1 className="govuk-heading-xl">Your progress</h1>

      <h2 className="govuk-heading-m">Overall order</h2>
      <SummaryCard title="Community order" headingLevel={3}>
        <dl className="govuk-summary-list">
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Order period</dt>
            <dd className="govuk-summary-list__value">15 January 2024 to 14 January 2026</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Time completed</dt>
            <dd className="govuk-summary-list__value">12 months</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Status</dt>
            <dd className="govuk-summary-list__value">
              <span className="govuk-tag govuk-tag--green">On track</span>
            </dd>
          </div>
        </dl>
      </SummaryCard>

      <h2 className="govuk-heading-m">Order requirements</h2>
      <SummaryCard title="Unpaid work" headingLevel={3}>
        <dl className="govuk-summary-list">
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Hours completed</dt>
            <dd className="govuk-summary-list__value">
              {progressData.totalCompletedHours} of {progressData.totalHours} hours
            </dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Status</dt>
            <dd className="govuk-summary-list__value">
              <span className="govuk-tag govuk-tag--green">On track</span>
            </dd>
          </div>
        </dl>
      </SummaryCard>

      <SummaryCard title="Curfew" headingLevel={3}>
        <dl className="govuk-summary-list">
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Curfew period</dt>
            <dd className="govuk-summary-list__value">16 December 2024 to 15 March 2025</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Time completed</dt>
            <dd className="govuk-summary-list__value">6 weeks</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Status</dt>
            <dd className="govuk-summary-list__value">
              <span className="govuk-tag govuk-tag--green">Compliant</span>
            </dd>
          </div>
        </dl>
      </SummaryCard>

      <SummaryCard title="Rehabilitation activity requirement (RAR)" headingLevel={3}>
        <dl className="govuk-summary-list">
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Days completed</dt>
            <dd className="govuk-summary-list__value">8 of 20 days</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Status</dt>
            <dd className="govuk-summary-list__value">
              <span className="govuk-tag govuk-tag--green">On track</span>
            </dd>
          </div>
        </dl>
      </SummaryCard>
    </>
  )
}
