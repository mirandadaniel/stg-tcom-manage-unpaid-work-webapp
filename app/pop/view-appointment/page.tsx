import AppointmentDetailsCard from '../_components/AppointmentDetailsCard'
import { getUpcomingAppointment } from '../../../lib/pop/data'
import { getPopRequestContext, getSearchParam } from '../../../lib/pop/request'
import { appendBypassToUrl } from '../../../lib/pop/url'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function ViewAppointment({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { userId, bypassQuery, bypassParam, resolvedSearchParams } = await getPopRequestContext(searchParams)
  const submitEvidence = getSearchParam(resolvedSearchParams, 'submitEvidence') === 'true'
  const appointment = await getUpcomingAppointment(userId)

  if (!appointment) {
    return (
      <>
        <a className="govuk-back-link" href={`/pop/appointments${bypassQuery}`}>
          Back to Your appointments
        </a>
        <h1 className="govuk-heading-xl">View upcoming appointment</h1>
        <p className="govuk-body">No appointment found.</p>
      </>
    )
  }

  return (
    <>
      <a className="govuk-back-link" href={`/pop/appointments${bypassQuery}`}>
        Back to Your appointments
      </a>

      <h1 className="govuk-heading-xl">View upcoming appointment</h1>

      {submitEvidence ? (
        <div className="govuk-inset-text">
          You told us you cannot attend this appointment. This has been shared with your probation
          practitioner who will check your justification. They&apos;ll contact you if the evidence you provided
          was not accepted.
        </div>
      ) : (
        <p className="govuk-body">
          If you have a problem attending an appointment, you need to{' '}
          <a className="govuk-link" href={appendBypassToUrl('/pop/appointment-notify', bypassParam)}>
            tell your probation practitioner
          </a>{' '}
          as soon as possible.
        </p>
      )}

      <AppointmentDetailsCard appointment={appointment} />
    </>
  )
}
