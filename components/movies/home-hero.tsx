'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CalendarDays, PlayCircle, Star, X } from 'lucide-react'
import { StartBookingButton } from '@/components/booking/start-booking-button'
import { getMovie } from '@/data/movies'

export function HomeHero() {
  const [trailerOpen, setTrailerOpen] = useState(false)
  const movie = getMovie('dune-part-two')!

  return (
    <section className="relative isolate min-h-[630px] overflow-hidden bg-[#090909] sm:min-h-[690px]">
      <div className="absolute inset-0 -z-20 bg-cover bg-[center_38%] opacity-60" style={{ backgroundImage: `url('${movie.backdrop}')` }} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#090909] via-[#090909]/75 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#090909] via-[#090909]/35 to-black/25" />
      <div className="absolute right-[-8%] top-[-20%] -z-10 size-[34rem] rounded-full bg-[#b80710]/15 blur-[120px]" />

      <div className="mx-auto flex min-h-[630px] max-w-[1440px] items-end px-5 pb-24 pt-20 sm:min-h-[690px] sm:px-8 sm:pb-28 lg:px-10">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-[#b80710] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider">IMAX 70mm exclusive</span>
            <span className="rounded border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-200">Dolby Atmos</span>
            <span className="rounded border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-bold text-zinc-200">16+</span>
            <span className="inline-flex items-center gap-1 rounded border border-white/10 bg-black/60 px-2.5 py-1 text-xs font-bold"><Star size={12} className="fill-amber-400 text-amber-400" />8.8 IMDb</span>
            <span className="rounded border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-bold text-emerald-400">94% Fresh</span>
          </div>
          <p className="mt-6 text-[11px] font-bold uppercase tracking-[.22em] text-[#ffb4aa]">Now screening across Algeria</p>
          <h1 className="font-heading mt-2 max-w-4xl text-5xl font-extrabold uppercase leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-[76px]">Dune: Part Two</h1>
          <p className="mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-zinc-200 sm:text-base"><span>Sci-Fi</span><span className="size-1 rounded-full bg-zinc-500" /><span>Epic adventure</span><span className="size-1 rounded-full bg-zinc-500" /><span>2h 46m</span><span className="size-1 rounded-full bg-zinc-500" /><span className="text-[#ffb4aa]">English · French &amp; Arabic subtitles</span></p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-[15px]">Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. A story of love, destiny, and a future only he can foresee.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <StartBookingButton movieSlug="dune-part-two" screeningId="dune-imax-2030" className="primary-button min-h-12 px-5 text-sm"><CalendarDays size={17} />Book Tickets</StartBookingButton>
            <button type="button" onClick={() => setTrailerOpen(true)} className="secondary-button min-h-12 px-5 text-sm"><PlayCircle size={18} className="text-[#ffb4aa]" />Watch Trailer</button>
            <span className="hidden items-center gap-2 border-l border-white/15 pl-4 text-xs text-zinc-400 sm:inline-flex"><span className="size-2 rounded-full bg-emerald-500" />20:30 IMAX · filling fast</span>
            <Link href="/movies/dune-part-two" className="px-2 py-3 text-sm font-semibold text-zinc-300 underline decoration-white/20 underline-offset-4 hover:text-white">Film details</Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 z-10 w-[calc(100%-2.5rem)] max-w-[1360px] -translate-x-1/2 rounded-xl border border-white/10 bg-[#141414]/90 p-3 shadow-2xl backdrop-blur-xl sm:bottom-5 sm:w-[calc(100%-4rem)] lg:flex lg:items-center lg:justify-between lg:gap-4 lg:px-4">
        <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
          {['TODAY|MAR 30', 'TOMORROW|MAR 31', 'MON|APR 01', 'TUE|APR 02', 'WED|APR 03'].map((day, index) => {
            const [label, date] = day.split('|')
            return <button key={day} type="button" className={`flex min-w-[76px] flex-col items-center rounded-lg px-3 py-2 text-[10px] font-bold ${index === 0 ? 'bg-[#b80710] text-white' : 'border border-white/[0.06] bg-white/[0.04] text-zinc-300 hover:bg-white/[0.09]'}`} onClick={() => document.getElementById('home-screenings')?.scrollIntoView({ behavior: 'smooth' })}><span className="text-[9px] tracking-wider opacity-75">{label}</span>{date}</button>
          })}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 lg:mt-0">
          <span className="hidden text-[9px] font-bold uppercase tracking-wider text-zinc-500 lg:inline">Selected venue</span>
          <span className="inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-2 text-xs text-zinc-200"><span className="text-[#ffb4aa]">⌖</span>TMV Algiers — Garden City Mall</span>
          <Link href="#home-screenings" className="secondary-button min-h-9 px-3 text-xs">See today&apos;s times</Link>
        </div>
      </div>

      {trailerOpen && <dialog open aria-labelledby="trailer-title" className="fixed inset-0 z-50 m-auto w-[min(92vw,850px)] max-w-none overflow-hidden rounded-2xl border border-white/10 bg-[#151515] p-0 text-white shadow-2xl backdrop:bg-black/80" onCancel={() => setTrailerOpen(false)} onClose={() => setTrailerOpen(false)}>
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><div><p className="text-[10px] font-bold uppercase tracking-widest text-[#ffb4aa]">Official trailer preview</p><h2 id="trailer-title" className="font-heading mt-1 text-lg font-bold">Dune: Part Two</h2></div><button type="button" onClick={() => setTrailerOpen(false)} aria-label="Close trailer preview" className="grid size-10 place-items-center rounded-lg text-zinc-400 hover:bg-white/[0.07] hover:text-white"><X size={18} /></button></div>
        <div className="relative grid min-h-[250px] place-items-center bg-cover bg-center sm:min-h-[430px]" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,.75)),url('${movie.backdrop}')` }}><div className="text-center"><span className="mx-auto grid size-16 place-items-center rounded-full bg-[#b80710] shadow-xl"><PlayCircle size={30} /></span><p className="mt-4 font-semibold">Trailer preview</p><p className="mt-1 text-sm text-zinc-300">Video playback is not connected in this demonstration.</p></div></div>
        <div className="flex justify-end border-t border-white/10 p-4"><Link href="/movies/dune-part-two" onClick={() => setTrailerOpen(false)} className="text-sm font-semibold text-[#ffb4aa] hover:text-white">View film details</Link></div>
      </dialog>}
    </section>
  )
}
