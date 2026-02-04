import Alert from '../_components/Alert'
import AppointmentSummaryCard from '../_components/AppointmentSummaryCard'
import { getAppointments } from '../../../lib/pop/data'
import { getPopRequestContext, getSearchParam } from '../../../lib/pop/request'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function Appointments({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { userId, bypassQuery, resolvedSearchParams } = await getPopRequestContext(searchParams)
  const submittedEvidence = getSearchParam(resolvedSearchParams, 'submittedEvidence') === 'true'
  const { upcomingAppointments, pastAppointments } = await getAppointments(userId)

  return (
    <>
      {submittedEvidence ? (
        <Alert
          variant="success"
          title="You told us you cannot attend your unpaid work appointment on Saturday 15 March 2025"
        >
          <p className="govuk-notification-banner__heading">
            This has been shared with your probation practitioner who will check your justification. They'll
            contact you if the evidence you provided was not accepted.
          </p>
        </Alert>
      ) : null}

      <a className="govuk-back-link" href={`/pop${bypassQuery}`}>
        Back
      </a>

      <h1 className="govuk-heading-xl">Appointments</h1>

      <p className="govuk-body">
        Attending probation appointments is part of complying with your conditions. If you have a problem
        attending an appointment, you need to tell your probation practitioner as soon as possible.
      </p>

      <h2 className="govuk-heading-l">Upcoming appointments</h2>
      {upcomingAppointments.map(appointment => (
        <AppointmentSummaryCard
          key={`${appointment.date}-${appointment.title}`}
          appointment={appointment}
          isUpcoming
        />
      ))}

      <h2 className="govuk-heading-l">Past appointments</h2>
      {pastAppointments.map(appointment => (
        <AppointmentSummaryCard
          key={`${appointment.date}-${appointment.title}`}
          appointment={appointment}
          isUpcoming={false}
        />
      ))}
    </>
  )
}
