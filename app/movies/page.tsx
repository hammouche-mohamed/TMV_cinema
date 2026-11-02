import type { Metadata } from 'next'
import { PublicShell } from '@/components/layout/public-shell'
import { MovieCatalog } from '@/components/movies/movie-catalog'

export const metadata: Metadata = { title: 'Movies & Screenings', description: 'Browse films and book premium cinema screenings across Algiers and Oran.' }

export default async function MoviesPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const query = await searchParams
  const initialStatus = query.status === 'upcoming' || query.status === 'all' ? query.status : 'showing'
  return <PublicShell><MovieCatalog initialStatus={initialStatus} /></PublicShell>
}
