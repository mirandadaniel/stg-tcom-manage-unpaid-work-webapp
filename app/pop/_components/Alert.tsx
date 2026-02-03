import React from 'react'

type AlertVariant = 'success' | 'warning' | 'error' | 'info'

type AlertProps = {
  title: string
  variant?: AlertVariant
  children?: React.ReactNode
}

const variantClassMap: Record<AlertVariant, string> = {
  success: 'govuk-notification-banner--success',
  warning: '',
  error: '',
  info: '',
}

export default function Alert({ title, variant = 'info', children }: AlertProps) {
  const headingId = `alert-${title.replace(/\s+/g, '-').toLowerCase()}`
  const variantClass = variantClassMap[variant]

  return (
    <div
      className={`govuk-notification-banner ${variantClass}`.trim()}
      role="region"
      aria-labelledby={headingId}
      data-module="govuk-notification-banner"
    >
      <div className="govuk-notification-banner__header">
        <h2 className="govuk-notification-banner__title" id={headingId}>
          {title}
        </h2>
      </div>
      {children ? <div className="govuk-notification-banner__content">{children}</div> : null}
    </div>
  )
}
