import '../assets/scss/application.scss'
import '../assets/css/tailwind.css'
import AppChrome from './_components/AppChrome'

export const metadata = {
  title: 'Manage my community sentence',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="js-enabled govuk-frontend-supported" suppressHydrationWarning>
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  )
}
