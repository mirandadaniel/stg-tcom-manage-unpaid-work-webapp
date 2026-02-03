import ConditionsList from '../_components/ConditionsList'
import UnpaidWorkSummaryCard from '../_components/UnpaidWorkSummaryCard'
import UnpaidWorkWarning from '../_components/UnpaidWorkWarning'
import { getPopRequestContext } from '../../../lib/pop/request'
import { getUnpaidWorkConditions, getUnpaidWorkSummary, getUnpaidWorkWarning } from '../../../lib/pop/data'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function UnpaidWorkConditions({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { userId, bypassQuery } = await getPopRequestContext(searchParams)
  const [summary, warning, conditions] = await Promise.all([
    getUnpaidWorkSummary(userId),
    getUnpaidWorkWarning(userId),
    getUnpaidWorkConditions(userId),
  ])

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <a className="govuk-back-link" href={`/pop/conditions${bypassQuery}`}>
            Back
          </a>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h1 className="govuk-heading-xl">Unpaid work</h1>
        </div>
      </div>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full govuk-!-margin-top-6">
          <UnpaidWorkWarning warning={warning} />
          <UnpaidWorkSummaryCard summary={summary} />
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full govuk-!-margin-top-6">
          <p>Unpaid work, also called Community Payback, is a requirement in your sentence.</p>
          <p>
            You will usually work in your local area, and be managed by a Community Payback supervisor.
            Unpaid work projects can include activities such as removing graffiti, planting trees, or
            decorating community centres.
          </p>
          <p>
            This is an opportunity for you to contribute positively to your community and demonstrate a
            commitment to making amends for past actions.
          </p>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full govuk-!-margin-top-6">
          <h3 className="govuk-!-font-weight-bold govuk-heading-m govuk-!-margin-bottom-2">We expect you to:</h3>
          <ConditionsList items={conditions} />
        </div>
      </div>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full govuk-!-margin-top-4">
          <p className="govuk-!-font-weight-bold govuk-!-margin-0 govuk-!-padding-0 govuk-!-padding-bottom-2">
            Need help understanding your conditions?
          </p>
          <p className="govuk-!-margin-0 govuk-!-padding-0 govuk-!-padding-bottom-2">
            Contact your probation practitioner for guidance on any conditions you are unsure about.
          </p>
          <a className="govuk-link govuk-link--no-visited-state" href={`/pop/new-message${bypassQuery}`}>
            Message
          </a>
        </div>
      </div>
    </>
  )
}
