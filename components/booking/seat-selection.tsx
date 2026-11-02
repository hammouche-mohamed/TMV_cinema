'use client'

import Link from 'next/link'
import { Clock3, MapPin, ArrowLeft, LockKeyhole } from 'lucide-react'
import { useBooking } from '@/components/booking/booking-provider'
import { BookingStepper } from '@/components/booking/booking-stepper'
import { BookingSummary } from '@/components/booking/booking-summary'
import { SeatMap } from '@/components/booking/seat-map'

export function SeatSelection() {
  const { movie, screening } = useBooking()
  return <>
    <BookingStepper activeStep={4} />
    <section className="border-b border-white/[0.08] bg-[#141414]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <div className="flex min-w-0 items-center gap-3"><img src={movie.poster} alt={`${movie.title} poster`} className="h-16 w-12 shrink-0 rounded-md object-cover" onError={(event) => { event.currentTarget.hidden = true }} /><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h1 className="font-heading text-lg font-bold">{movie.title}</h1><span className="rounded border border-[#b80710]/30 bg-[#b80710]/10 px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider text-[#ffb4aa]">{screening.format}</span><span className="rounded bg-white/[0.05] px-2 py-1 text-[9px] font-bold text-zinc-400">{screening.language}</span></div><p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-400"><span>{movie.runtime}</span><span>·</span><span className="inline-flex items-center gap-1"><MapPin size={12} />Garden City Mall, Chéraga — Algiers</span><span>·</span><span className="inline-flex items-center gap-1 text-amber-300"><Clock3 size={12} />{screening.dateLabel} · {screening.time}</span></p></div></div>
        <div className="flex items-center justify-between gap-4 sm:justify-end"><div className="rounded-lg border border-white/[0.08] bg-[#090909] px-3 py-2 text-center"><span className="block text-[9px] font-bold uppercase tracking-wider text-zinc-500">Session reserve</span><span className="font-heading text-lg font-bold tabular-nums">09:38</span></div><Link href={`/movies/${movie.slug}#showtime-booking`} className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white"><ArrowLeft size={14} />Switch session</Link></div>
      </div>
    </section>
    <div className="mx-auto max-w-[1440px] px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
      <div className="grid min-w-0 items-start gap-5 lg:grid-cols-[minmax(0,1.8fr)_minmax(320px,.9fr)] lg:gap-7">
        <div className="min-w-0"><SeatMap /><div className="mt-3 flex items-center gap-2 rounded-xl border border-white/[0.07] bg-[#141414] px-4 py-3 text-xs text-zinc-400"><LockKeyhole size={14} className="shrink-0 text-emerald-400" />Seats shown are sample availability for this prototype; no seat hold is created.</div></div>
        <div className="min-w-0"><BookingSummary mode="seats" /></div>
      </div>
    </div>
  </>
}
