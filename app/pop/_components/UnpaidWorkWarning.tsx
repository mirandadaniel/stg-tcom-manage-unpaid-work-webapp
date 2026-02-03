import React from 'react'

type UnpaidWorkWarningProps = {
  warning: string
}

export default function UnpaidWorkWarning({ warning }: UnpaidWorkWarningProps) {
  return (
    <div className="govuk-warning-text">
      <span className="govuk-warning-text__icon" aria-hidden="true">
        !
      </span>
      <strong className="govuk-warning-text__text">
        <span className="govuk-warning-text__assistive">Warning</span>
        <span className="govuk-!-font-weight-bold govuk-!-margin-0 govuk-!-padding-0 govuk-!-padding-bottom-1">
          {warning}
        </span>
      </strong>
    </div>
  )
}
