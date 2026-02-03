import '../assets/scss/application.scss'

export const metadata = {
  title: 'Manage my community sentence',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
