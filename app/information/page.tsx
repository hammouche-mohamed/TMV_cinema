import type { Metadata } from 'next'
import { CinemaInformationPage } from '@/components/layout/information-page'

export const metadata: Metadata = {
  title: 'Visitor Information',
  description: 'Cinema policies, ticketing terms, privacy, and prototype information for TMV Cinemas.',
}

export default function InformationPage() {
  return <CinemaInformationPage />
}
