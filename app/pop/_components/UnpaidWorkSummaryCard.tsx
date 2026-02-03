import React from 'react'
import SummaryCard from './SummaryCard'
import { UnpaidWorkSummary } from '../../../server/services/PopService'

type UnpaidWorkSummaryCardProps = {
  summary: UnpaidWorkSummary
}

export default function UnpaidWorkSummaryCard({ summary }: UnpaidWorkSummaryCardProps) {
  return (
    <SummaryCard title="Unpaid work instructions">
      <dl className="govuk-summary-list">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Day</dt>
          <dd className="govuk-summary-list__value">{summary.day}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Time</dt>
          <dd className="govuk-summary-list__value">{summary.time}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Frequency</dt>
          <dd className="govuk-summary-list__value">{summary.frequency}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Meeting point</dt>
          <dd className="govuk-summary-list__value">{summary.meetingPoint}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Work type</dt>
          <dd className="govuk-summary-list__value">{summary.workType}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">What you'll need</dt>
          <dd className="govuk-summary-list__value">{summary.requirements}</dd>
        </div>
      </dl>
    </SummaryCard>
  )
}
