'use client'

import { useRouter } from 'next/navigation'
import { CalendarDays, Check, Clock3, MapPin, X } from 'lucide-react'
import { useBooking } from '@/components/booking/booking-provider'
import { formatDzd, getSeatPrice } from '@/lib/format'

export function BookingSummary({ mode = 'seats' }: { mode?: 'seats' | 'checkout' }) {
  const router = useRouter()
  const { movie, screening, seats, total, concessions, setConcession, toggleSeat } = useBooking()
  const canContinue = seats.length > 0

  return <aside className="rounded-2xl border border-white/[0.08] bg-[#141414] p-4 sm:p-5 lg:sticky lg:top-24">
    <div className="flex items-start justify-between gap-3 border-b border-white/[0.08] pb-4"><div><h2 className="font-heading text-xl font-bold">Booking Summary</h2><p className="mt-1 text-xs text-zinc-500">Reference: #TMV-ALG-9842</p></div><span className="grid size-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#ffb4aa]"><CalendarDays size={17} /></span></div>
    <div className="mt-4 flex gap-3 rounded-xl border border-white/[0.07] bg-[#0d0d0d] p-3"><img src={movie.poster} alt={`${movie.title} poster`} className="h-[86px] w-[58px] shrink-0 rounded-md object-cover" onError={(event) => { event.currentTarget.hidden = true }} /><div className="min-w-0"><p className="font-heading font-bold">{movie.title}</p><p className="mt-1 text-[11px] font-semibold text-[#ffb4aa]">{screening.format}<span className="mx-1.5 text-zinc-600">·</span>{screening.roomName.replace(/^Hall \d+ — /, '')}</p><p className="mt-2 flex items-center gap-1.5 text-xs text-zinc-300"><Clock3 size={12} />{screening.dateLabel} · {screening.time}</p><p className="mt-1 flex items-center gap-1.5 text-[10px] text-zinc-500"><MapPin size={11} />Garden City Mall, Algiers</p></div></div>

    <div className="mt-5"><div className="mb-2 flex items-center justify-between"><h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Selected seats</h3><span className="rounded-full bg-[#b80710]/20 px-2 py-1 text-[10px] font-bold text-[#ffb4aa]">{seats.length} {seats.length === 1 ? 'Seat' : 'Seats'}</span></div>
      {seats.length ? <ul className="flex flex-col gap-2">{seats.map((seat) => <li key={seat} className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2.5"><span className="flex min-w-0 items-center gap-2"><span className="grid size-7 shrink-0 place-items-center rounded border border-[#b80710]/50 bg-[#b80710]/10 text-[10px] font-bold text-[#ffb4aa]">{seat}</span><span className="min-w-0"><span className="block text-xs font-semibold">Row {seat.slice(0, 1)} · Seat {Number(seat.slice(1))}</span><span className="block text-[10px] text-zinc-500">{seat.startsWith('G') || seat.startsWith('H') ? 'VIP Noir recliner' : 'Standard prime'}</span></span></span><span className="flex shrink-0 items-center gap-1.5"><span className="text-xs font-bold">{formatDzd(getSeatPrice(seat, screening.price))}</span>{mode === 'seats' && <button type="button" onClick={() => toggleSeat(seat)} aria-label={`Remove seat ${seat}`} className="grid size-7 place-items-center rounded text-zinc-500 hover:bg-white/[0.06] hover:text-white"><X size={14} /></button>}</span></li>)}</ul> : <p className="rounded-lg border border-dashed border-white/10 px-3 py-4 text-center text-xs text-zinc-500">Select at least one seat to continue.</p>}
    </div>

    <div className="mt-5 border-t border-white/[0.08] pt-4">
      <div className="mb-2 flex items-center justify-between"><h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Concessions &amp; add-ons</h3><span className="text-[10px] text-zinc-500">Express lane</span></div>
      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2 hover:bg-white/[0.03]"><span className="flex items-center gap-2 text-xs"><input type="checkbox" checked={concessions.popcorn} onChange={(event) => setConcession('popcorn', event.target.checked)} className="accent-[#b80710]" />Truffle Popcorn (L)</span><span className="text-xs font-semibold">+700 DZD</span></label>
      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2 hover:bg-white/[0.03]"><span className="flex items-center gap-2 text-xs"><input type="checkbox" checked={concessions.soda} onChange={(event) => setConcession('soda', event.target.checked)} className="accent-[#b80710]" />Artisanal Soda (Double)</span><span className="text-xs font-semibold">+350 DZD</span></label>
      <div className="mt-3 flex justify-between text-xs text-zinc-400"><span>{seats.length} × Tickets</span><span>{formatDzd(seats.reduce((sum, seat) => sum + getSeatPrice(seat, screening.price), 0))}</span></div>
      <div className="mt-2 flex justify-between text-xs text-zinc-500"><span>Digital delivery</span><span className="font-semibold text-emerald-400">FREE</span></div>
      <div className="mt-4 flex items-end justify-between border-t border-white/[0.08] pt-4"><div><p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Total amount</p><p className="text-[10px] text-zinc-500">Includes all venue fees</p></div><p className="font-heading text-2xl font-extrabold tracking-tight">{formatDzd(total)}</p></div>
    </div>

    {mode === 'seats' && <button type="button" disabled={!canContinue} onClick={() => router.push('/booking/checkout')} className="primary-button mt-5 min-h-12 w-full px-4 text-sm disabled:cursor-not-allowed disabled:opacity-50"><span>Proceed to Payment</span><span>({formatDzd(total)})</span></button>}
    {mode === 'checkout' && <div className="mt-4 rounded-lg bg-emerald-500/10 p-3 text-xs text-emerald-400"><Check size={14} className="mr-1 inline" />100% free refund up to 60 min before the screening</div>}
    <p className="mt-3 text-center text-[10px] leading-4 text-zinc-500">Prototype only. No seats are held and no payment is processed.</p>
    {mode === 'checkout' && <div className="mt-4 flex flex-wrap gap-2 border-t border-white/[0.07] pt-4 text-[9px] font-bold uppercase tracking-wider text-zinc-500">Accepted demo methods: <span className="rounded border border-white/10 px-1.5 py-1">CIB</span><span className="rounded border border-white/10 px-1.5 py-1">Edahabia</span><span className="rounded border border-white/10 px-1.5 py-1">SATIM</span></div>}
  </aside>
}
