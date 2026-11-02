import type { Metadata } from 'next'
import { MovieManagement } from '@/components/admin/movie-management'

export const metadata: Metadata = { title: 'Movie Management · TMV Cinemas', description: 'Manage sample film catalogue entries, distribution licences, and DCP packages.' }

export default function AdminMoviesPage() {
  return <MovieManagement />
}
