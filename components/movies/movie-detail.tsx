'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Bookmark, CalendarDays, Check, ChevronRight, Clock3, MapPin, Play, Share2, Star, Ticket, X } from 'lucide-react'
import { useBooking } from '@/components/booking/booking-provider'
import type { Movie, Screening } from '@/types/cinema'
import { screenings } from '@/data/screenings'

export function MovieDetail({ movie }: { movie: Movie }) {
  const router = useRouter()
  const { beginBooking } = useBooking()
  const movieScreenings = screenings.filter((item) => item.movieSlug === movie.slug)
  const [selectedDate, setSelectedDate] = useState(movieScreenings[0]?.date ?? '2024-03-30')
  const [selectedFormat, setSelectedFormat] = useState('All Formats')
  const [selectedScreeningId, setSelectedScreeningId] = useState(movieScreenings[0]?.id ?? '')
  const [watchlisted, setWatchlisted] = useState(false)
  const [trailerOpen, setTrailerOpen] = useState(false)
  const [shareMessage, setShareMessage] = useState('')
  const dates = Array.from(new Map(movieScreenings.map((item) => [item.date, item.dateLabel])).entries())
  const visibleScreenings = useMemo(() => movieScreenings.filter((item) => item.date === selectedDate && (selectedFormat === 'All Formats' || item.format.toLowerCase().includes(selectedFormat.toLowerCase().split(' ')[0]))), [movieScreenings, selectedDate, selectedFormat])
  const selectedScreening = movieScreenings.find((item) => item.id === selectedScreeningId) ?? movieScreenings[0]

  async function shareFilm() {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    if (navigator.share) {
      try { await navigator.share({ title: movie.title, text: `Explore ${movie.title} at TMV Cinemas`, url }) } catch { setShareMessage('Share cancelled') }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setShareMessage('Film link copied')
    } catch {
      setShareMessage('Use your browser address bar to share this film')
    }
  }

  function startReservation(screening: Screening) {
    beginBooking(movie.slug, screening.id)
    router.push('/booking/seats')
  }

  return <>
    <section className="relative isolate overflow-hidden bg-[#090909]">
      <div className="absolute inset-0 -z-20 bg-cover bg-center opacity-35 blur-[1px]" style={{ backgroundImage: `url('${movie.backdrop}')` }} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#090909] via-[#090909]/95 to-[#090909]/35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#090909] via-transparent to-black/30" />
      <div className="mx-auto max-w-[1440px] px-5 pb-12 pt-7 sm:px-8 sm:pb-16 lg:px-10 lg:pb-20">
        <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-2 text-xs text-zinc-500"><Link href="/" className="hover:text-white">Home</Link><ChevronRight size={13} /><Link href="/movies" className="hover:text-white">Movies</Link><ChevronRight size={13} /><span className="text-zinc-200">{movie.title}</span></nav>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(260px,350px)_1fr] lg:gap-12">
          <div className="mx-auto w-full max-w-[340px] sm:max-w-[370px] lg:mx-0">
            <div className="group relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#43271c] to-[#101010] shadow-2xl"><img src={movie.poster} alt={`${movie.title} official theatrical poster`} className="poster-image transition duration-700 group-hover:scale-105" onError={(event) => { event.currentTarget.hidden = true }} /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/15" /><div className="absolute left-3 top-3 flex flex-wrap gap-1.5">{movie.format.slice(0, 3).map((item) => <span key={item} className="rounded bg-black/70 px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider">{item}</span>)}</div><span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded bg-black/70 px-2 py-1 text-[10px] font-semibold"><Check size={12} className="text-emerald-400" />Official TMV Cinema Algerian license</span></div>
            <div className="mt-3 grid grid-cols-2 gap-2"><button type="button" onClick={() => setWatchlisted((current) => !current)} aria-pressed={watchlisted} className="secondary-button min-h-11 text-xs"><Bookmark size={15} className={watchlisted ? 'fill-[#ffb4aa] text-[#ffb4aa]' : ''} />{watchlisted ? 'Added to Watchlist' : 'Watchlist'}</button><button type="button" onClick={shareFilm} className="secondary-button min-h-11 text-xs"><Share2 size={15} />Share Film</button></div>
            {shareMessage && <p role="status" className="mt-2 text-center text-xs text-emerald-400">{shareMessage}</p>}
          </div>

          <div className="flex flex-col gap-5 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#141414]/80 px-3 py-2 text-sm font-bold"><span className="rounded bg-[#f5c518] px-1.5 py-0.5 text-[10px] font-black text-black">IMDb</span>{movie.rating.toFixed(1)}<span className="text-xs font-normal text-zinc-500">/10</span></span>
              <span className="rounded-lg bg-[#141414]/80 px-3 py-2 text-sm font-bold"><span className="mr-1 text-[#fa320a]">●</span>94% <span className="text-xs font-normal text-zinc-400">Certified Fresh</span></span>
              <span className="rounded-lg bg-[#141414]/80 px-3 py-2 text-xs font-semibold">{movie.ageRating} Guidance</span>
              <span className="rounded-lg bg-[#b80710]/20 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#ffb4aa]">Exclusive presentation</span>
            </div>
            <div><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#ffb4aa]">{movie.production} · TMV theatrical release</p><h1 className="font-heading mt-2 text-4xl font-extrabold uppercase leading-[1.02] tracking-[-.045em] sm:text-5xl lg:text-6xl">{movie.title}</h1><div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zinc-300"><span className="inline-flex items-center gap-1.5"><CalendarDays size={14} className="text-[#e50914]" />In theatres: {movie.releaseDate}</span><span className="text-zinc-700">•</span><span className="inline-flex items-center gap-1.5"><Clock3 size={14} />{movie.runtime}</span><span className="text-zinc-700">•</span><span>{movie.language}</span></div></div>
            <div className="flex flex-wrap gap-2">{movie.genres.map((item) => <span key={item} className="rounded-full bg-[#171717] px-3.5 py-1.5 text-xs text-zinc-300">{item}</span>)}</div>
            <div className="rounded-xl border border-white/[0.06] bg-[#141414]/80 p-5 sm:p-6"><p className="text-sm leading-7 text-zinc-300">{movie.synopsis}</p><div className="mt-5 grid gap-4 border-t border-white/[0.07] pt-4 sm:grid-cols-3"><Credit label="Director" value={movie.director} /><Credit label="Screenplay" value={movie.director} /><Credit label="Original score" value={movie.slug === 'dune-part-two' ? 'Hans Zimmer' : 'TMV premiere soundtrack'} /></div></div>
            <div className="flex flex-wrap items-center gap-3"><button type="button" onClick={() => { if (selectedScreening) startReservation(selectedScreening) }} disabled={!selectedScreening} className="primary-button min-h-12 px-5 text-sm"><Ticket size={17} />Book Tickets Now</button><button type="button" onClick={() => setTrailerOpen(true)} className="secondary-button min-h-12 px-5 text-sm"><span className="grid size-7 place-items-center rounded-full bg-white/[0.07]"><Play size={14} fill="currentColor" /></span>Watch Official Trailer <span className="text-xs text-zinc-500">2:48</span></button></div>
          </div>
        </div>
      </div>
    </section>

    <section id="showtime-booking" className="scroll-mt-24 bg-[#141414] py-12 sm:py-16">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#e50914]">Select screening &amp; hall</p><h2 className="font-heading mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Showtimes &amp; Reservation</h2></div><div className="flex gap-1 rounded-lg bg-[#1c1c1c] p-1"><button type="button" className="rounded-md bg-[#b80710] px-3 py-2 text-xs font-semibold">Garden City Mall — Algiers</button><button type="button" onClick={() => setShareMessage('Oran showtimes are included in this demonstration schedule.')} className="rounded-md px-3 py-2 text-xs text-zinc-400 hover:text-white">Es-Senia — Oran</button></div></div>
        <div className="mt-6 flex gap-2 overflow-x-auto pb-1">{dates.map(([date, label], index) => <button key={date} type="button" onClick={() => { setSelectedDate(date); setSelectedScreeningId(movieScreenings.find((item) => item.date === date)?.id ?? '') }} aria-pressed={selectedDate === date} className={`flex min-w-[108px] flex-col items-center rounded-xl px-4 py-3 ${selectedDate === date ? 'bg-[#b80710] text-white' : 'bg-[#1c1c1c] text-zinc-400 hover:bg-[#292929]'}`}><span className="text-[9px] font-bold uppercase tracking-wider">{index === 0 ? 'Today' : label.split(',')[0]}</span><span className="font-heading mt-1 text-sm font-bold">{label.split(' ').slice(-3, -1).join(' ')}</span><span className="mt-1 text-[10px]">{movieScreenings.filter((item) => item.date === date).length} Screenings</span></button>)}</div>
        <div className="mt-4 flex flex-wrap gap-2">{['All Formats', ...Array.from(new Set(movieScreenings.map((item) => item.format)))].map((item) => <button key={item} type="button" onClick={() => setSelectedFormat(item)} aria-pressed={selectedFormat === item} className={`rounded-md px-3.5 py-2 text-[11px] font-semibold transition ${selectedFormat === item ? 'bg-white text-black' : 'bg-[#1c1c1c] text-zinc-400 hover:text-white'}`}>{item}</button>)}</div>
        <div className="mt-5 flex flex-col gap-3">{visibleScreenings.length ? visibleScreenings.map((item) => <article key={item.id} className={`rounded-xl border p-4 transition sm:p-5 ${selectedScreeningId === item.id ? 'border-[#b80710]/70 bg-[#1b1717]' : 'border-white/[0.07] bg-[#1c1c1c] hover:border-white/20'}`}>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"><div className="flex items-center gap-3"><span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#090909] text-[#ffb4aa]"><Ticket size={19} /></span><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-heading text-base font-bold">{item.roomName}</h3><span className="rounded bg-[#b80710]/20 px-2 py-1 text-[9px] font-bold uppercase text-[#ffb4aa]">{item.format}</span></div><p className="mt-1 text-xs text-zinc-500">{item.totalSeats} seats · {item.language}</p></div></div><div className="flex flex-wrap gap-2">{movieScreenings.filter((entry) => entry.date === item.date && entry.roomId === item.roomId).map((time) => <button key={time.id} type="button" onClick={() => setSelectedScreeningId(time.id)} aria-pressed={selectedScreeningId === time.id} className={`min-w-[86px] rounded-lg border px-3 py-2 text-center transition ${selectedScreeningId === time.id ? 'border-[#e50914] bg-[#b80710] text-white' : 'border-white/[0.07] bg-[#111] text-zinc-200 hover:border-[#b80710]'}`}><span className="font-heading block text-sm font-bold">{time.time}</span><span className="mt-0.5 block text-[9px] text-zinc-400">{time.availableSeats} seats left</span></button>)}</div><div className="flex items-center justify-between gap-4 xl:justify-end"><div className="text-right"><span className="text-[9px] font-bold uppercase text-zinc-500">From</span><p className="font-heading text-base font-bold">{item.price.toLocaleString('en-US')} DZD</p></div><button type="button" onClick={() => startReservation(movieScreenings.find((entry) => entry.id === selectedScreeningId) ?? item)} className="primary-button min-h-10 px-4 text-xs"><span>Select Seats &amp; Proceed</span><ArrowRight size={15} /></button></div></div>
        </article>) : <div className="rounded-xl border border-dashed border-white/10 bg-[#1c1c1c] px-5 py-10 text-center text-sm text-zinc-400">No times for that format on this date. Select another date or format.</div>}</div>
        <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500"><MapPin size={13} />Garden City Mall, Chéraga — Algiers <span>·</span> Times are local (GMT+1)</div>
      </div>
    </section>

    <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16"><div className="flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#ffb4aa]">The ensemble</p><h2 className="font-heading mt-2 text-2xl font-bold">Cast &amp; Characters</h2></div><p className="text-xs text-zinc-500">{movie.cast.length} principal cast members</p></div><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">{movie.cast.map((actor, index) => <article key={actor} className="rounded-xl border border-white/[0.06] bg-[#141414] p-3"><div className={`grid aspect-square place-items-center rounded-lg bg-gradient-to-br ${['from-amber-900/60 to-[#111]', 'from-rose-900/50 to-[#111]', 'from-zinc-700 to-[#111]', 'from-slate-800 to-[#111]'][index % 4]}`}><span className="font-heading text-2xl font-bold text-white/80">{actor.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span></div><p className="mt-3 line-clamp-1 text-xs font-bold">{actor}</p><p className="mt-1 text-[10px] text-zinc-500">Principal cast</p></article>)}</div></section>

    <section className="border-t border-white/[0.06] bg-[#111] py-12 sm:py-16"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#ffb4aa]">State-of-the-art mastering</p><h2 className="font-heading mt-2 text-2xl font-bold sm:text-3xl">Audio &amp; Projection Technology</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{[['1.43:1 Expanded IMAX Sequences', 'Up to 40 minutes of key sequences captured for large-format IMAX presentation.'], ['Dolby Atmos & 12.1 IMAX Audio', 'A calibrated spatial soundtrack delivered through discreet overhead and surround channels.'], ['Dual Arabic & French Subtitles', 'Subtitles are positioned for clear viewing in every seat, including recliner tiers.']].map(([title, text]) => <article key={title} className="rounded-xl border border-white/[0.07] bg-[#171717] p-5"><h3 className="font-heading font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p></article>)}</div></div></section>

    {trailerOpen && <dialog open aria-labelledby="detail-trailer-title" className="fixed inset-0 z-50 m-auto w-[min(92vw,850px)] max-w-none overflow-hidden rounded-2xl border border-white/10 bg-[#151515] p-0 text-white shadow-2xl backdrop:bg-black/80" onCancel={() => setTrailerOpen(false)} onClose={() => setTrailerOpen(false)}><div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><div><p className="text-[10px] font-bold uppercase tracking-widest text-[#ffb4aa]">Official trailer preview</p><h2 id="detail-trailer-title" className="font-heading mt-1 text-lg font-bold">{movie.title}</h2></div><button type="button" onClick={() => setTrailerOpen(false)} aria-label="Close trailer preview" className="grid size-10 place-items-center rounded-lg text-zinc-400 hover:bg-white/[0.07]"><X size={18} /></button></div><div className="grid min-h-[300px] place-items-center bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.8)),url('${movie.backdrop}')` }}><div className="text-center"><span className="mx-auto grid size-14 place-items-center rounded-full bg-[#b80710]"><Play size={22} fill="currentColor" /></span><p className="mt-4 font-semibold">Trailer playback is not connected in this demonstration.</p></div></div></dialog>}
  </>
}

function Credit({ label, value }: { label: string; value: string }) {
  return <div><span className="block text-[10px] text-zinc-500">{label}</span><span className="mt-1 block text-xs font-bold text-white">{value}</span></div>
}
