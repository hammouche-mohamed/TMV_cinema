import { PublicShell } from '@/components/layout/public-shell'
import { HomeHero } from '@/components/movies/home-hero'
import { HomeScreenings } from '@/components/movies/home-screenings'
import { HomeCollections } from '@/components/movies/home-collections'

export default function HomePage() {
  return <PublicShell><HomeHero /><HomeScreenings /><HomeCollections /></PublicShell>
}
