import '../assets/scss/application.scss'

export const metadata = {
  title: 'Manage my community sentence',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="js-enabled govuk-frontend-supported" suppressHydrationWarning>
        <header className="govuk-header">
          <div className="govuk-header__container">
            <div className="govuk-header__branding">
              <span className="govuk-header__logo" aria-hidden="true" />
              <a href="/" className="govuk-header__link">
                Manage my community sentence
              </a>
            </div>
            <nav className="govuk-header__navigation" aria-label="Account navigation">
              <a href="/sign-out" className="govuk-header__navigation-link">
                Sign out
              </a>
            </nav>
          </div>
        </header>
        <div className="govuk-phase-banner">
          <p className="govuk-phase-banner__content">
            <strong className="govuk-tag govuk-phase-banner__content__tag">PROTOTYPE</strong>
            <span className="govuk-phase-banner__text">This is a prototype.</span>
          </p>
        </div>
        {children}
        <footer className="govuk-footer">
          <div className="govuk-footer__container">
            <span className="govuk-footer__link">© Crown copyright</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
