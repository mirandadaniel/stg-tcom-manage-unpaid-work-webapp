import Alert from './_components/Alert'
import ChatWidgetModal from './_components/ChatWidgetModal'
import { getPopRequestContext, getSearchParam } from '../../lib/pop/request'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function PopHome({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { resolvedSearchParams, bypassQuery } = await getPopRequestContext(searchParams)
  const scenario = getSearchParam(resolvedSearchParams, 'scenario')

  return (
    <>
      <h1 className="govuk-heading-xl">Welcome, Joe</h1>

      {scenario === 'missed' ? (
        <Alert variant="error" title="Missed appointment on 10 March 2025">
          <p className="govuk-notification-banner__heading">
            You failed to attend your scheduled probation appointment on 10 March 2025. You have until 15
            March 2025 to respond to this notice and explain why you missed this appointment. If you fail to
            do that, this might count as a breach of your supervision requirement and enforcement action might
            be taken.
          </p>
        </Alert>
      ) : null}

      {scenario === 'reminder' ? (
        <Alert variant="info" title="Appointment reminder">
          <p className="govuk-notification-banner__heading">
            You have an appointment booked for 15 March 2025 at 9am.{' '}
            <a href={`/pop/view-appointment${bypassQuery}`} className="govuk-link">
              View your appointment
            </a>{' '}
            if you need to reschedule it.
          </p>
        </Alert>
      ) : null}

      {scenario === 'pending' ? (
        <Alert variant="warning" title="Account pending verification">
          <p className="govuk-notification-banner__heading">
            Your account has been created and will be verified after your next face-to-face appointment with
            your probation practitioner.
          </p>
          <p className="govuk-notification-banner__heading">
            Once your account is activated you will be able to acccess the links below.
          </p>
        </Alert>
      ) : null}

      {scenario === 'verified' ? (
        <Alert variant="success" title="Account verified">
          <p className="govuk-notification-banner__heading">
            Your account has been verified by your probation practitioner
          </p>
        </Alert>
      ) : null}

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
      <ChatWidgetModal />
    </>
  )
}
