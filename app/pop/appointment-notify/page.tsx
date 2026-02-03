import Alert from '../_components/Alert'
import AppointmentDetailsCard from '../_components/AppointmentDetailsCard'
import { getUpcomingAppointment } from '../../../lib/pop/data'
import { getPopRequestContext, getSearchParam } from '../../../lib/pop/request'
import { appendBypassToUrl } from '../../../lib/pop/url'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const cancellationReasons = [
  {
    value: 'employment',
    text: 'Employment',
    hint: "For example, you'll be working",
  },
  {
    value: 'childcare',
    text: 'Childcare',
    hint: 'For example, you could not get someone to look after your child',
  },
  {
    value: 'family',
    text: 'Family',
    hint: 'For example, you have to look after your parents who are ill',
  },
  {
    value: 'health',
    text: 'Health',
    hint: 'For example, you are ill',
  },
  {
    value: 'plannedHoliday',
    text: 'Planned holiday',
    hint: 'For example, you have a planned trip to another area or abroad',
  },
  {
    value: 'bereavement',
    text: 'Bereavement',
    hint: 'For example, you need to attend a funeral',
  },
]

export default async function AppointmentNotify({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { userId, bypassQuery, bypassParam, resolvedSearchParams } = await getPopRequestContext(searchParams)
  const errorMessage = getSearchParam(resolvedSearchParams, 'error')
  const appointment = await getUpcomingAppointment(userId)

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          {errorMessage ? (
            <Alert variant="error" title={errorMessage} />
          ) : null}

          <a className="govuk-back-link" href={`/pop/view-appointment${bypassQuery}`}>
            Back
          </a>
          <h1 className="govuk-heading-xl">Why are you unable to attend?</h1>
        </div>
      </div>

      <div className="govuk-grid-row govuk-!-margin-top-4">
        <div className="govuk-grid-column-full">
          {appointment ? <AppointmentDetailsCard appointment={appointment} /> : null}

          <div className="govuk-!-margin-top-2">
            <form action={appendBypassToUrl('/pop/appointment-notify/submit', bypassParam)} method="post">
              <fieldset className="govuk-fieldset">
                <legend className="govuk-fieldset__legend">Select the reason for not attending</legend>
                <div className="govuk-radios">
                  {cancellationReasons.map(reason => (
                    <div className="govuk-radios__item" key={reason.value}>
                      <input
                        className="govuk-radios__input"
                        id={`reason-${reason.value}`}
                        name="cancellationReason"
                        type="radio"
                        value={reason.value}
                      />
                      <label className="govuk-label govuk-radios__label" htmlFor={`reason-${reason.value}`}>
                        {reason.text}
                      </label>
                      <div className="govuk-hint govuk-radios__hint">{reason.hint}</div>
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="govuk-form-group">
                <label className="govuk-label" htmlFor="furtherDetails">
                  Give further details (optional)
                </label>
                <div className="govuk-hint">We&apos;ll share this information with your probation practitioner.</div>
                <textarea className="govuk-textarea" id="furtherDetails" name="furtherDetails" rows={5} />
              </div>

              <button className="govuk-button" type="submit">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
