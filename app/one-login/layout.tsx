export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function OneLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper app-auth-container govuk-body" id="main-content">
        {children}
      </main>
    </div>
  )
}
