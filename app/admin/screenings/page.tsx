import type { Metadata } from 'next'
import { ScreeningScheduler } from '@/components/admin/screening-scheduler'

export const metadata: Metadata = { title: 'Screenings & Schedules · TMV Cinemas', description: 'Browse and edit simulated screening times, hall allocations, and occupancy.' }

export default function AdminScreeningsPage() {
  return <ScreeningScheduler />
}
