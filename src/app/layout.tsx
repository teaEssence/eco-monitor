import './globals.css'
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body>
        <div className="container">
          <h1>Eco Monitor</h1>
          <nav>
            <Link href="/">Stations</Link> |{' '}
            <Link href="/about">About</Link> |{' '}
            <Link href="/pollutants">Pollutants</Link> |{' '}
            <Link href="/map">Map</Link>
          </nav>
          <hr />
          {children}
        </div>
      </body>
    </html>
  )
}