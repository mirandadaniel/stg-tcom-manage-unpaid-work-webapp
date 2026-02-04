export default function ErrorAlert({ message }: { message?: string }) {
  if (!message) return null

  return (
    <div className="govuk-error-summary" role="alert" aria-labelledby="error-summary-title" tabIndex={-1}>
      <h2 className="govuk-error-summary__title" id="error-summary-title">
        {message}
      </h2>
    </div>
  )
}
