import type { Metadata } from 'next'
import { PublicShell } from '@/components/layout/public-shell'
import { SeatSelection } from '@/components/booking/seat-selection'

export const metadata: Metadata = { title: 'Select Seats · Demo Reservation', description: 'Choose seats for a simulated TMV Cinemas screening.' }

export default function SeatSelectionPage() {
  return <PublicShell><SeatSelection /></PublicShell>
}
