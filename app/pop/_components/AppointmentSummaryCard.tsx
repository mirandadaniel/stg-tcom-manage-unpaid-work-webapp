import React from 'react'
import { appendBypassToUrl } from '../../../lib/pop/url'
import { Appointment } from '../../../lib/pop/data'

type AppointmentSummaryCardProps = {
  appointment: Appointment
  isUpcoming: boolean
  isFirst: boolean
  submittedEvidence: boolean
  bypassParam: string
}

export default function AppointmentSummaryCard({
  appointment,
  isUpcoming,
  isFirst,
  submittedEvidence,
  bypassParam,
}: AppointmentSummaryCardProps) {
  const viewAppointmentUrl = appendBypassToUrl(
    isUpcoming
      ? `/pop/view-appointment${submittedEvidence && isFirst ? '?submitEvidence=true' : ''}`
      : '/pop/view-past-appointment',
    bypassParam,
  )

  return (
    <div className="govuk-summary-card">
      <div className="govuk-summary-card__title-wrapper">
        <h3 className="govuk-summary-card__title">
          {appointment.date}
          {isUpcoming && isFirst && submittedEvidence ? (
            <span className="govuk-tag govuk-tag--red govuk-!-margin-left-2">Cannot attend</span>
          ) : null}
        </h3>
      </div>
      <div className="govuk-summary-card__content">
        <dl className="govuk-summary-list">
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Time</dt>
            <dd className="govuk-summary-list__value">{appointment.time}</dd>
          </div>
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Type</dt>
            <dd className="govuk-summary-list__value">{appointment.title || appointment.category}</dd>
          </div>
          {appointment.contact ? (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Key contact</dt>
              <dd className="govuk-summary-list__value">{appointment.contact}</dd>
            </div>
          ) : null}
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">
              {appointment.category === 'Unpaid work' ? 'Meeting point' : 'Location'}
            </dt>
            <dd className="govuk-summary-list__value">{appointment.location}</dd>
          </div>
        </dl>

        <div className="govuk-!-margin-top-3">
          {appointment.showOnMap ? (
            <button className="govuk-button govuk-button--secondary govuk-!-margin-right-2" type="button">
              View on map
            </button>
          ) : null}
          {isUpcoming ? (
            <button className="govuk-button govuk-button--secondary govuk-!-margin-right-2" type="button">
              Add to calendar
            </button>
          ) : null}
          <a className="govuk-link" href={viewAppointmentUrl}>
            View
          </a>
        </div>
      </div>
    </div>
  )
}
