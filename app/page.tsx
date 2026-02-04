export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function Home() {
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper app-container govuk-body" id="main-content">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            <h1 className="govuk-heading-l">Manage my community sentence</h1>
          </div>
        </div>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <p className="govuk-body">
              Here are the prototypes for the Manage my community sentence. They're part of the wider
              'E-supervision' concept from the Tech for Community Offender Management(TCOM) Pathfinder.
            </p>
          </div>
        </div>

        <div className="govuk-grid-row govuk-!-margin-top-8">
          <div className="govuk-grid-column-full govuk-!-margin-bottom-2">
            <h2 className="govuk-heading-m">Prototypes</h2>
          </div>
          <div className="govuk-grid-column-one-quarter">
            <p className="govuk-!-font-weight-bold">POP facing</p>
            <ul className="govuk-list govuk-list--bullet">
              <li>
                <a href="/pop">v1.4</a>
                <p>Last updated: 4 Apr 2025</p>
              </li>
              <li>
                <a href="/pop?bypass=true">v1.4 Bypass Registration</a>
                <p>Last updated: 4 Apr 2025</p>
              </li>
            </ul>
          </div>
          <div className="govuk-grid-column-one-quarter">
            <p className="govuk-!-font-weight-bold">Staff facing</p>
            <ul className="govuk-list govuk-list--bullet">
              <li>
                <a href="/staff">v1.4</a>
                <p>Last updated: 4 Apr 2025</p>
              </li>
            </ul>
          </div>
          <div className="govuk-grid-column-one-quarter">
            <p className="govuk-!-font-weight-bold">Supervisor facing</p>
            <ul className="govuk-list govuk-list--bullet">
              <li>
                <a href="/supervisor">v1.4</a>
                <p>Last updated: 4 Apr 2025</p>
              </li>
            </ul>
          </div>
          <div className="govuk-grid-column-one-quarter" />
        </div>
      </main>
    </div>
  )
}
