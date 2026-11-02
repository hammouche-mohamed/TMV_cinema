import type { Metadata } from 'next'
import { PublicShell } from '@/components/layout/public-shell'
import { DigitalTicket } from '@/components/booking/digital-ticket'

export const metadata: Metadata = { title: 'Reservation Preview · Digital Ticket', description: 'View and print a simulated TMV Cinemas reservation ticket.' }

export default function ConfirmationPage() {
  return <PublicShell><DigitalTicket /></PublicShell>
}
