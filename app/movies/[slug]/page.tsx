import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PublicShell } from '@/components/layout/public-shell'
import { MovieDetail } from '@/components/movies/movie-detail'
import { getMovie } from '@/data/movies'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const movie = getMovie(slug)
  return movie ? { title: movie.title, description: movie.synopsis } : { title: 'Movie not found' }
}

export default async function MoviePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const movie = getMovie(slug)
  if (!movie) notFound()
  return <PublicShell><MovieDetail movie={movie} /></PublicShell>
}
