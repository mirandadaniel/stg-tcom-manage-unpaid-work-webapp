export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function PopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper app-container govuk-body" id="main-content">
        {children}
      </main>
    </div>
  )
}