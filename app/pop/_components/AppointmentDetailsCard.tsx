import React from 'react'
import SummaryCard from './SummaryCard'
import { Appointment } from '../../../lib/pop/data'

type AppointmentDetailsCardProps = {
  appointment: Appointment
}

export default function AppointmentDetailsCard({ appointment }: AppointmentDetailsCardProps) {
  return (
    <SummaryCard title="Appointment details">
      <dl className="govuk-summary-list">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Type of appointment</dt>
          <dd className="govuk-summary-list__value">{appointment.category || appointment.title}</dd>
        </div>
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
      </dl>
    </SummaryCard>
  )
}
