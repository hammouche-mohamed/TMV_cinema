import type { Metadata } from 'next'
import { AdminDashboard } from '@/components/admin/admin-dashboard'

export const metadata: Metadata = { title: 'Operations Center · TMV Cinemas', description: 'Live sample cinema operations, auditoriums, box office, and gate events.' }

export default function AdminOverviewPage() {
  return <AdminDashboard />
}
