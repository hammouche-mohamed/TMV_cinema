import Link from 'next/link'
import { Clock3, Languages, Star } from 'lucide-react'
import type { Movie } from '@/types/cinema'
import { PosterImage } from '@/components/movies/poster-image'
import { StartBookingButton } from '@/components/booking/start-booking-button'

export function MovieCard({ movie, compact = false }: { movie: Movie; compact?: boolean }) {
  return (
    <article className={`group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#141414] transition duration-300 hover:-translate-y-1 hover:border-[#b80710]/70 hover:shadow-[0_16px_36px_rgba(184,7,16,.14)] ${compact ? 'max-w-[250px]' : ''}`}>
      <Link href={`/movies/${movie.slug}`} className="relative block aspect-[2/3] overflow-hidden bg-gradient-to-br from-[#3a2421] via-[#171717] to-[#090909]" aria-label={`View ${movie.title} details`}>
        <PosterImage src={movie.poster} alt={`${movie.title} theatrical poster`} fallbackLabel={movie.title} className="poster-image transition-transform duration-500 group-hover:scale-[1.04]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-black/40" />
        <div className="absolute left-3 right-3 top-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {movie.format.slice(0, 2).map((format, index) => <span key={format} className={`rounded px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider text-white ${index === 0 ? 'bg-[#b80710]' : 'bg-black/75 backdrop-blur'}`}>{format}</span>)}
          </div>
          <span className="inline-flex items-center gap-1 rounded bg-black/75 px-2 py-1 text-xs font-bold text-white backdrop-blur"><Star size={12} className="fill-amber-400 text-amber-400" />{movie.rating.toFixed(1)}</span>
        </div>
        <div className="absolute inset-0 flex flex-col justify-end gap-3 bg-[#090909]/90 p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
          <p className="line-clamp-4 text-sm leading-5 text-zinc-300">{movie.synopsis}</p>
          <p className="text-xs text-zinc-400">Director: <span className="text-white">{movie.director}</span></p>
          <StartBookingButton movieSlug={movie.slug} className="primary-button min-h-10 w-full px-3 text-sm">Book Tickets</StartBookingButton>
        </div>
      </Link>
      <div className="flex flex-1 flex-col justify-between gap-4 p-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link href={`/movies/${movie.slug}`} className="font-heading line-clamp-2 text-[15px] font-bold leading-5 text-white hover:text-[#ffb4aa]">{movie.title}</Link>
            <span className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${movie.status === 'showing' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-300'}`}>{movie.status === 'showing' ? 'Showing' : 'Coming soon'}</span>
          </div>
          <p className="mt-1 truncate text-xs text-zinc-400">{movie.genres.slice(0, 2).join(' • ')}</p>
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-white/[0.07] pt-3 text-[11px] text-zinc-400">
          <span className="inline-flex items-center gap-1.5"><Clock3 size={13} />{movie.runtime}</span>
          <span className="inline-flex min-w-0 items-center gap-1.5"><Languages size={13} /><span className="truncate">{movie.language.split('•')[1]?.trim() ?? movie.language}</span></span>
        </div>
      </div>
    </article>
  )
}
