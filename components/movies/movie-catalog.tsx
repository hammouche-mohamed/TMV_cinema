'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Grid2X2, List, Search, SlidersHorizontal, Theater, Ticket, X } from 'lucide-react'
import { MovieCard } from '@/components/movies/movie-card'
import { StartBookingButton } from '@/components/booking/start-booking-button'
import { movies } from '@/data/movies'
import type { ReleaseStatus } from '@/types/cinema'

const formats = ['All Formats', 'IMAX® Laser', 'VIP Noir Lounge', '4DX & ScreenX', 'Dolby Atmos®']
const genres = ['All Genres', 'Action & Sci-Fi', 'Drama & Thriller', 'Animation & Family', 'Horror', 'Comedy']

export function MovieCatalog({ initialStatus = 'showing' }: { initialStatus?: 'all' | ReleaseStatus }) {
  const [status, setStatus] = useState<'all' | ReleaseStatus>(initialStatus)
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All Genres')
  const [format, setFormat] = useState('All Formats')
  const [sort, setSort] = useState('popular')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [venue, setVenue] = useState('All Theatres (Algiers & Oran)')

  const filteredMovies = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const matchesGenre = (movieGenres: string[]) => {
      if (genre === 'All Genres') return true
      if (genre === 'Action & Sci-Fi') return movieGenres.some((item) => ['Action', 'Sci-Fi', 'Epic Adventure'].includes(item))
      if (genre === 'Drama & Thriller') return movieGenres.some((item) => ['Drama', 'History', 'Biography'].includes(item))
      if (genre === 'Animation & Family') return movieGenres.some((item) => ['Animation', 'Family', 'Comedy'].includes(item))
      return movieGenres.some((item) => item.toLowerCase().includes(genre.toLowerCase()))
    }
    const result = movies.filter((movie) => {
      const statusMatches = status === 'all' || movie.status === status
      const formatMatches = format === 'All Formats' || movie.format.some((item) => item.toLowerCase().includes(format.toLowerCase().replace('®', '').split(' ')[0]))
      const searchMatches = !normalized || [movie.title, movie.director, movie.production, ...movie.cast, ...movie.genres].join(' ').toLowerCase().includes(normalized)
      return statusMatches && formatMatches && matchesGenre(movie.genres) && searchMatches
    })
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating)
    if (sort === 'newest') result.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
    return result
  }, [status, query, genre, format, sort])

  return (
    <div className="min-h-screen bg-[#090909]">
      <section className="relative overflow-hidden border-b border-white/[0.06] bg-[radial-gradient(ellipse_at_75%_0%,rgba(184,7,16,.18),transparent_43%)]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-7 px-5 pb-8 pt-10 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:pb-10 lg:pt-12">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#ffb4aa]"><span className="size-2 rounded-full bg-[#b80710]" /> Cinematheque schedule · 2025 season</p>
            <h1 className="font-heading mt-3 text-3xl font-extrabold tracking-[-.04em] sm:text-4xl lg:text-[46px]">Explore Movies &amp; Screenings</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">Discover premier worldwide releases, exclusive 70mm IMAX roadshows, and tailored VIP hospitality across TMV auditoriums in Algiers and Oran.</p>
          </div>
          <div className="flex flex-wrap gap-2 rounded-xl border border-white/[0.06] bg-[#141414] p-2">
            <span className="inline-flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2 text-xs font-semibold"><Theater size={14} className="text-emerald-400" />{movies.filter((movie) => movie.status === 'showing').length} Now Showing</span>
            <span className="inline-flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2 text-xs font-semibold"><Ticket size={14} className="text-amber-400" />{movies.filter((movie) => movie.status === 'upcoming').length} Coming Soon</span>
            <span className="rounded-lg bg-white/[0.04] px-3 py-2 text-xs font-semibold text-zinc-400">Algiers &amp; Oran</span>
          </div>
        </div>
      </section>

      <section className="sticky top-[74px] z-30 border-b border-white/[0.07] bg-[#090909]/95 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex w-fit max-w-full gap-1 overflow-x-auto rounded-xl bg-[#141414] p-1">
              {(['all', 'showing', 'upcoming'] as const).map((value) => <button key={value} type="button" onClick={() => setStatus(value)} className={`shrink-0 rounded-lg px-3.5 py-2 text-xs font-semibold transition ${status === value ? 'bg-[#b80710] text-white' : 'text-zinc-400 hover:text-white'}`}>{value === 'all' ? 'All Releases' : value === 'showing' ? 'Currently Showing' : 'Coming Soon'}<span className="ml-2 rounded-full bg-black/20 px-1.5 py-0.5 text-[10px]">{value === 'all' ? movies.length : movies.filter((movie) => movie.status === value).length}</span></button>)}
            </div>
            <div className="grid gap-2 sm:grid-cols-[minmax(220px,1fr)_auto_auto_auto] xl:w-[min(100%,780px)]">
              <div className="relative min-w-0">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <label htmlFor="movie-search" className="sr-only">Search by movie, director, cast, or genre</label>
                <input id="movie-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title, director, cast, or genre..." className="h-10 w-full rounded-lg border border-white/[0.06] bg-[#141414] pl-10 pr-9 text-xs text-white placeholder:text-zinc-600 focus:border-[#b80710] focus:outline-none" />
                {query && <button type="button" onClick={() => setQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white" aria-label="Clear search"><X size={15} /></button>}
              </div>
              <label className="sr-only" htmlFor="venue-filter">Cinema location</label>
              <select id="venue-filter" value={venue} onChange={(event) => setVenue(event.target.value)} className="h-10 rounded-lg border border-white/[0.06] bg-[#141414] px-3 text-xs text-zinc-200"><option>All Theatres (Algiers &amp; Oran)</option><option>TMV Algiers — Garden City Mall</option><option>TMV Oran — Es-Senia Mall</option></select>
              <label className="sr-only" htmlFor="sort-filter">Sort movies</label>
              <select id="sort-filter" value={sort} onChange={(event) => setSort(event.target.value)} className="h-10 rounded-lg border border-white/[0.06] bg-[#141414] px-3 text-xs text-zinc-200"><option value="popular">Sort: Popularity</option><option value="newest">Sort: Release date</option><option value="rating">Sort: IMDb rating</option></select>
              <div className="flex rounded-lg border border-white/[0.06] bg-[#141414] p-1">
                <button type="button" onClick={() => setView('grid')} className={`grid size-8 place-items-center rounded-md ${view === 'grid' ? 'bg-[#252525] text-white' : 'text-zinc-500'}`} aria-label="Grid view" aria-pressed={view === 'grid'}><Grid2X2 size={16} /></button>
                <button type="button" onClick={() => setView('list')} className={`grid size-8 place-items-center rounded-md ${view === 'list' ? 'bg-[#252525] text-white' : 'text-zinc-500'}`} aria-label="List view" aria-pressed={view === 'list'}><List size={16} /></button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {formats.map((item) => <button key={item} type="button" onClick={() => setFormat(item)} className={`shrink-0 rounded-md px-3 py-1.5 text-[11px] font-semibold transition ${format === item ? 'bg-white text-black' : 'bg-[#141414] text-zinc-400 hover:text-white'}`}>{item}</button>)}
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {genres.map((item) => <button key={item} type="button" onClick={() => setGenre(item)} className={`shrink-0 rounded-md px-2.5 py-1.5 text-[11px] font-semibold transition ${genre === item ? 'bg-white text-black' : 'bg-[#141414] text-zinc-400 hover:text-white'}`}>{item}</button>)}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-zinc-400">Showing <span className="font-bold text-white">{filteredMovies.length}</span> of <span className="font-bold text-white">{movies.length}</span> curated titles in Algeria</p>
          <p className="inline-flex items-center gap-2 text-xs text-zinc-500"><span className="size-2 rounded-full bg-emerald-500" />Ticket booking live for today &amp; week ahead</p>
        </div>
        {filteredMovies.length ? <div className={view === 'grid' ? 'grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4' : 'flex flex-col gap-3'}>
          {filteredMovies.map((movie) => view === 'grid' ? <MovieCard key={movie.slug} movie={movie} /> : <MovieListItem key={movie.slug} movie={movie} />)}
        </div> : <div className="rounded-2xl border border-dashed border-white/10 bg-[#141414] px-6 py-16 text-center"><SlidersHorizontal className="mx-auto text-zinc-500" /><h2 className="font-heading mt-4 text-lg font-bold">No films match these filters</h2><p className="mt-2 text-sm text-zinc-400">Try another title, format, or genre.</p><button type="button" onClick={() => { setQuery(''); setGenre('All Genres'); setFormat('All Formats'); setStatus('all') }} className="secondary-button mt-5 px-4 py-2 text-sm">Clear all filters</button></div>}
      </section>

      <section id="experiences" className="border-t border-white/[0.06] bg-[#111] py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
          <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#ffb4aa]">Signature projection</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4"><h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">Tailor-made auditorium technologies</h2><p className="max-w-lg text-sm leading-6 text-zinc-400">Every auditorium at TMV Garden City Mall and Es-Senia Mall is tuned and calibrated to reference levels.</p></div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {[
              ['IMAX® with Laser', '4K dual-laser projection for sharper, brighter images and deeper contrast.'],
              ['VIP Noir Private Lounge', 'Ultra-wide motorized recliners, at-seat gourmet dining, and private cocktail service.'],
              ['4DX Immersive Motion', 'Synchronized motion, fog, lighting, rain, and scent effects.'],
            ].map(([title, text]) => <article key={title} className="rounded-xl border border-white/[0.07] bg-[#191919] p-5"><p className="text-xs font-bold uppercase tracking-widest text-[#ffb4aa]">TMV experience</p><h3 className="font-heading mt-3 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p><Link href="/#experiences" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#ffb4aa]">Explore experience <span aria-hidden="true">→</span></Link></article>)}
          </div>
        </div>
      </section>
    </div>
  )
}

function MovieListItem({ movie }: { movie: (typeof movies)[number] }) {
  return <article className="flex flex-col gap-4 rounded-xl border border-white/[0.07] bg-[#141414] p-3 sm:flex-row sm:items-center sm:p-4">
    <Link href={`/movies/${movie.slug}`} className="relative h-36 w-24 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-[#41231c] to-[#111] sm:h-28 sm:w-[74px]" aria-label={`View ${movie.title} details`}><img src={movie.poster} alt={`${movie.title} theatrical poster`} loading="lazy" className="poster-image" onError={(event) => { event.currentTarget.hidden = true }} /></Link>
    <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><Link href={`/movies/${movie.slug}`} className="font-heading text-lg font-bold hover:text-[#ffb4aa]">{movie.title}</Link><span className="text-xs text-amber-300">★ {movie.rating.toFixed(1)}</span></div><p className="mt-1 text-sm text-zinc-400">{movie.genres.join(' · ')} · {movie.runtime} · {movie.ageRating}</p><p className="mt-2 line-clamp-2 text-sm leading-5 text-zinc-400">{movie.synopsis}</p></div>
    <StartBookingButton movieSlug={movie.slug} className="primary-button shrink-0 px-4 py-2.5 text-sm">{movie.status === 'showing' ? 'Book tickets' : 'Advance tickets'}</StartBookingButton>
  </article>
}
