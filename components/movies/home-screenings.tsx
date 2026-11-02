'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Clock3, MapPin, Ticket } from 'lucide-react'
import { StartBookingButton } from '@/components/booking/start-booking-button'
import { getMovie } from '@/data/movies'
import { screenings } from '@/data/screenings'

const dateOptions = [
  { value: '2024-03-30', day: 'TODAY', date: 'MAR 30' },
  { value: '2024-03-31', day: 'SUNDAY', date: 'MAR 31' },
  { value: '2024-04-01', day: 'MONDAY', date: 'APR 01' },
  { value: '2024-04-02', day: 'TUESDAY', date: 'APR 02' },
  { value: '2024-04-03', day: 'WEDNESDAY', date: 'APR 03' },
]

export function HomeScreenings() {
  const [date, setDate] = useState(dateOptions[0].value)
  const [venue, setVenue] = useState('Algiers')
  const [formatFilter, setFormatFilter] = useState('All Formats')
  const items = useMemo(() => screenings.filter((screening) => screening.date === date && (formatFilter === 'All Formats' || screening.format.toLowerCase().includes(formatFilter.toLowerCase()))), [date, formatFilter])
  const activeDate = dateOptions.find((option) => option.value === date) ?? dateOptions[0]

  return (
    <section id="home-screenings" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div><p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-emerald-400"><span className="size-2 animate-pulse rounded-full bg-emerald-500" />Live schedule <span className="text-zinc-600">·</span> {activeDate.date}, Garden City</p><h2 className="font-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Today&apos;s Screenings</h2></div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg border border-white/[0.07] bg-[#141414] p-1">
            {['All Formats', 'IMAX', 'VIP Noir', 'Dolby'].map((format) => <button key={format} type="button" aria-pressed={formatFilter === format} onClick={() => setFormatFilter(format)} className={`rounded-md px-3 py-2 text-[11px] font-semibold ${formatFilter === format ? 'bg-[#262626] text-white' : 'text-zinc-500 hover:text-zinc-200'}`}>{format}</button>)}
          </div>
          <label className="sr-only" htmlFor="home-venue">Choose cinema location</label><select id="home-venue" value={venue} onChange={(event) => setVenue(event.target.value)} className="h-10 rounded-lg border border-white/[0.07] bg-[#141414] px-3 text-xs text-zinc-300"><option value="Algiers">Algiers — Garden City Mall</option><option value="Oran">Oran — Es-Senia Mall</option></select>
        </div>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {dateOptions.map((option, index) => <button key={option.value} type="button" onClick={() => setDate(option.value)} aria-pressed={date === option.value} className={`flex min-w-[100px] flex-col items-center rounded-lg px-3 py-3 transition ${date === option.value ? 'bg-[#b80710] text-white' : 'border border-white/[0.07] bg-[#141414] text-zinc-400 hover:bg-[#1d1d1d]'}`}><span className="text-[9px] font-bold tracking-wider opacity-75">{option.day}</span><span className="font-heading mt-1 text-sm font-bold">{option.date}</span><span className="mt-1 text-[10px] opacity-80">{index === 0 ? '8 screenings' : index === 1 ? '8 screenings' : '6 screenings'}</span></button>)}
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {items.length ? items.slice(0, 5).map((screening) => {
          const movie = getMovie(screening.movieSlug)
          if (!movie) return null
          return <article key={screening.id} className="flex flex-col gap-4 rounded-xl border border-white/[0.07] bg-[#141414] p-3 transition hover:border-white/15 sm:flex-row sm:items-center sm:p-4 xl:gap-6">
            <div className="flex min-w-0 items-center gap-3 sm:w-[300px] sm:shrink-0"><img src={movie.poster} alt={`${movie.title} poster`} loading="lazy" className="size-[68px] shrink-0 rounded-lg object-cover" onError={(event) => { event.currentTarget.hidden = true }} /><div className="min-w-0"><Link href={`/movies/${movie.slug}`} className="font-heading line-clamp-1 text-base font-bold hover:text-[#ffb4aa]">{movie.title}</Link><p className="mt-1 text-xs text-zinc-400">{movie.genres.slice(0, 2).join(' · ')} · {movie.runtime}</p><p className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-zinc-500"><MapPin size={11} />{venue === 'Algiers' ? 'Garden City, Algiers' : 'Es-Senia, Oran'}</p></div></div>
            <div className="flex flex-1 flex-wrap items-center gap-2">{[screening, ...screenings.filter((item) => item.movieSlug === screening.movieSlug && item.date === screening.date && item.id !== screening.id).slice(0, 2)].map((option) => <StartBookingButton key={option.id} movieSlug={movie.slug} screeningId={option.id} className="group min-w-[86px] rounded-lg border border-white/[0.07] bg-[#1c1c1c] px-3 py-2 text-center transition hover:border-[#b80710] hover:bg-[#b80710]"><span className="font-heading block text-sm font-bold">{option.time}</span><span className="mt-0.5 block text-[9px] font-semibold text-zinc-400 group-hover:text-white/80">{option.format}</span></StartBookingButton>)}</div>
            <div className="flex items-center justify-between gap-3 sm:justify-end"><div className="text-right"><span className="text-[9px] font-bold uppercase text-zinc-500">From</span><p className="font-heading text-sm font-bold text-[#ffb4aa]">{screening.price.toLocaleString('en-US')} DZD</p></div><StartBookingButton movieSlug={movie.slug} screeningId={screening.id} className="grid size-10 shrink-0 place-items-center rounded-lg border border-white/[0.07] bg-white/[0.04] text-zinc-300 hover:bg-[#b80710] hover:text-white" aria-label={`Select seats for ${movie.title} at ${screening.time}`}><Ticket size={16} /></StartBookingButton></div>
          </article>
        }) : <div className="rounded-xl border border-dashed border-white/10 bg-[#141414] px-6 py-12 text-center"><CalendarDays className="mx-auto text-zinc-500" /><p className="mt-3 font-semibold">No screen times for this date</p><p className="mt-1 text-sm text-zinc-500">Try another day to view the demo schedule.</p></div>}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="inline-flex items-center gap-2 text-xs text-zinc-500"><Clock3 size={13} />Times shown in Algiers local time (GMT+1)</p><Link href="/movies" className="inline-flex items-center gap-2 text-sm font-semibold text-[#ffb4aa] hover:text-white">View all screenings <ArrowRight size={16} /></Link></div>
    </section>
  )
}
