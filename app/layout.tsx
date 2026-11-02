import type { Metadata, Viewport } from 'next'
import { BookingProvider } from '@/components/booking/booking-provider'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'TMV Cinemas — Premier Cinematic Experiences',
    template: '%s | TMV Cinemas',
  },
  description: 'Explore new releases, premium auditoriums, and showtimes across TMV Cinemas in Algiers and Oran.',
  applicationName: 'TMV Cinemas',
  generator: 'v0.app',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#090909',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body className="antialiased">
        <BookingProvider>{children}</BookingProvider>
      </body>
    </html>
  )
}
