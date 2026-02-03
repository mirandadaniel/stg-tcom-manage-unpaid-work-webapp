import SummaryCard from '../_components/SummaryCard'
import { getPastAppointment } from '../../../lib/pop/data'
import { getPopRequestContext } from '../../../lib/pop/request'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function ViewPastAppointment({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { userId, bypassQuery } = await getPopRequestContext(searchParams)
  const appointment = await getPastAppointment(userId)

  if (!appointment) {
    return (
      <>
        <a className="govuk-back-link" href={`/pop/appointments${bypassQuery}`}>
          Back to Your appointments
        </a>
        <h1 className="govuk-heading-xl">View past appointment</h1>
        <p className="govuk-body">No appointment found.</p>
      </>
    )
  }

  return (
    <>
      <a className="govuk-back-link" href={`/pop/appointments${bypassQuery}`}>
        Back to Your appointments
      </a>

      <h1 className="govuk-heading-xl">View past appointment</h1>

      <SummaryCard title="Appointment details">
        <dl className="govuk-summary-list">
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Meeting point</dt>
            <dd className="govuk-summary-list__value">{appointment.location}</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Date</dt>
            <dd className="govuk-summary-list__value">{appointment.date}</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Time</dt>
            <dd className="govuk-summary-list__value">{appointment.time}</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Your behavior and attitude</dt>
            <dd className="govuk-summary-list__value">Excellent</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Supervisor comments</dt>
            <dd className="govuk-summary-list__value">
              Great work on the skirting board. Appreciate you keeping the energy up even after 3pm
            </dd>
          </div>
        </dl>
      </SummaryCard>
    </>
  )
}
