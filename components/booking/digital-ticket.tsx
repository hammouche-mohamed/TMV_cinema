'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useBooking } from '@/components/booking/booking-provider'
import { BookingStepper } from '@/components/booking/booking-stepper'
import { formatDzd, getSeatPrice } from '@/lib/format'
import { CalendarDays, CheckCircle2, Clapperboard, Copy, Download, Mail, MapPin, Ticket, Wallet, X } from 'lucide-react'

const qrCells = Array.from({ length: 21 * 21 }, (_, index) => {
  const row = Math.floor(index / 21)
  const column = index % 21
  const finder = (top: number, left: number) => {
    const y = row - top
    const x = column - left
    if (x < 0 || x > 6 || y < 0 || y > 6) return null
    return x === 0 || x === 6 || y === 0 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4)
  }
  const mark = finder(0, 0) ?? finder(0, 14) ?? finder(14, 0)
  return mark === null ? ((row * 19 + column * 31 + row * column) % 7 < 3 || (row + column) % 11 === 0) : mark
})

export function DigitalTicket() {
  const { movie, screening, seats, customer, concessions, reference: storedReference, total, paymentMethod } = useBooking()
  const [message, setMessage] = useState('')
  const [walletOpen, setWalletOpen] = useState(false)
  const reference = storedReference ?? 'TMV-ALG-9842-D2'
  const seatRows = Array.from(new Set(seats.map((seat) => seat.slice(0, 1))))
  const seatNumbers = seats.map((seat) => seat.slice(1)).join(', ')

  async function copyReference() {
    try {
      await navigator.clipboard.writeText(reference)
      setMessage('Booking reference copied.')
    } catch {
      setMessage(`Booking reference: ${reference}`)
    }
  }

  function downloadCalendar() {
    const [year, month, day] = screening.date.split('-').map(Number)
    const [hour, minute] = screening.time.split(':').map(Number)
    const [runtimeHoursValue, runtimeMinutesValue] = movie.runtime.split(' ')
    const runtimeHours = Number(runtimeHoursValue?.replace('h', '') ?? 0)
    const runtimeMinutes = Number(runtimeMinutesValue?.replace('m', '') ?? 0)
    const start = new Date(Date.UTC(year, month - 1, day, hour - 1, minute))
    const end = new Date(start.getTime() + (runtimeHours * 60 + runtimeMinutes) * 60_000)
    const toIcsDate = (date: Date) => `${date.toISOString().slice(0, 19).replaceAll('-', '').replaceAll(':', '')}Z`
    const content = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//TMV Cinemas//Demo Ticket//EN',
      'BEGIN:VEVENT',
      `UID:${reference}@tmvcinemas.example`,
      `DTSTAMP:${toIcsDate(new Date())}`,
      `DTSTART:${toIcsDate(start)}`,
      `DTEND:${toIcsDate(end)}`,
      `SUMMARY:${movie.title} — TMV Cinemas`,
      'LOCATION:TMV Garden City Mall, Algiers',
      'DESCRIPTION:Demonstration ticket only. No real reservation was made.',
      'END:VEVENT',
      'END:VCALENDAR',
      '',
    ].join('\r\n')
    const url = URL.createObjectURL(new Blob([content], { type: 'text/calendar;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${reference}.ics`
    anchor.click()
    URL.revokeObjectURL(url)
    setMessage('Demo calendar file downloaded.')
  }

  return <>
    <BookingStepper activeStep={6} />
    <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
      <header className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div className="flex items-center gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-400"><CheckCircle2 size={26} /></span><div><div className="flex flex-wrap gap-2"><span className="rounded bg-emerald-500/10 px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider text-emerald-400">Demo pass prepared</span><span className="rounded bg-white/[0.07] px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider text-zinc-300">Instant pass preview</span></div><h1 className="font-heading mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">Reservation Preview</h1></div></div><div className="flex items-center gap-2 self-start rounded-lg bg-[#141414] px-3 py-2.5 text-xs sm:self-auto"><span className="text-amber-400">#</span><span className="text-zinc-500">Booking Ref:</span><strong>{reference}</strong><button type="button" onClick={copyReference} className="ml-1 grid size-7 place-items-center rounded text-zinc-400 hover:bg-white/[0.06] hover:text-white" aria-label="Copy booking reference"><Copy size={14} /></button></div></div>
        <div className="grid gap-3 lg:grid-cols-[1.7fr_1fr]"><div className="flex gap-3 rounded-xl border border-white/[0.07] bg-[#141414] p-4"><Mail size={18} className="mt-0.5 shrink-0 text-[#ffb4aa]" /><div><p className="text-xs leading-5 text-zinc-200">A copy of this sample pass is addressed to <strong className="text-white">{customer.email}</strong> and <strong className="text-white">+213 {customer.phone}</strong>.</p><p className="mt-1 text-[10px] text-zinc-500">No email, SMS, wallet pass, seat hold, or payment was actually processed.</p></div></div><div className="flex gap-3 rounded-xl border border-amber-500/15 bg-amber-500/[0.07] p-4 text-amber-300"><span className="mt-0.5 text-sm">ⓘ</span><p className="text-xs leading-5"><strong>Prototype demonstration</strong> — this is a simulated reservation preview. No actual seats were booked or charged.</p></div></div>
      </header>

      <section className="ticket-print overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1c1b1b] shadow-2xl">
        <div className="grid xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 border-b border-white/[0.07] pb-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-lg bg-[#141414] text-amber-400"><Clapperboard size={19} /></span><div><p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-amber-400">VIP Noir exclusive pass</p><p className="text-xs font-bold uppercase tracking-wider">TMV Cinemas Algeria</p></div></div><span className="inline-flex items-center gap-2 rounded-full bg-[#141414] px-3 py-2 text-[9px] font-bold uppercase tracking-wider text-[#ffb4aa]"><span className="size-2 rounded-full bg-emerald-500" />{screening.roomName} · {screening.format}</span></div>
            <div className="mt-5 grid gap-5 rounded-xl bg-[#141414]/80 p-4 sm:grid-cols-[135px_1fr] sm:p-5"><img src={movie.poster} alt={`${movie.title} poster`} className="mx-auto aspect-[2/3] w-[135px] rounded-lg object-cover sm:mx-0" onError={(event) => { event.currentTarget.hidden = true }} /><div className="flex flex-col justify-between gap-4"><div><div className="flex flex-wrap gap-1.5">{movie.genres.slice(0, 2).map((genre) => <span key={genre} className="rounded bg-[#b80710] px-2 py-1 text-[9px] font-bold uppercase">{genre}</span>)}<span className="rounded bg-white/[0.06] px-2 py-1 text-[9px] font-bold uppercase text-zinc-300">{screening.language}</span></div><h2 className="font-heading mt-3 text-2xl font-extrabold sm:text-3xl">{movie.title}</h2><p className="mt-1 text-xs text-zinc-400">{movie.director} · {movie.runtime} · {movie.ageRating}</p><p className="mt-3 text-sm leading-6 text-zinc-300">{movie.synopsis}</p></div><div className="grid gap-3 sm:grid-cols-2"><TicketDetail icon={<CalendarDays size={15} />} label="Screening date & showtime" value={`${screening.dateLabel} · ${screening.time}`} helper="Doors open 30 minutes before showtime" /><TicketDetail icon={<MapPin size={15} />} label="Cinema complex venue" value="TMV Garden City Mall" helper="Chéraga — Algiers" /></div></div></div>
            <div className="mt-4 grid gap-3 lg:grid-cols-[1.25fr_.75fr]"><div className="rounded-xl border border-[#b80710]/20 bg-[linear-gradient(100deg,rgba(184,7,16,.16),#141414_70%)] p-4"><div className="flex items-center justify-between gap-2"><p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Reserved demo seats</p><span className="rounded bg-emerald-500/10 px-2 py-1 text-[9px] font-bold uppercase text-emerald-400">Selected</span></div><div className="mt-3 flex items-end gap-4"><div><p className="text-[9px] font-bold uppercase text-zinc-500">Rows</p><p className="font-heading text-3xl font-extrabold">{seatRows.join(', ') || '—'}</p></div><div><p className="text-[9px] font-bold uppercase text-zinc-500">Seat numbers</p><p className="font-heading text-xl font-bold text-[#ffb4aa]">{seatNumbers || 'Not selected'}</p></div></div><p className="mt-2 text-[10px] text-zinc-500">Selection is local to this demonstration and is not held by TMV Cinemas.</p></div><div className="flex flex-col justify-between rounded-xl bg-[#141414] p-4"><div className="flex items-center justify-between"><span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">Passholder</span><span className="text-[9px] font-bold uppercase text-emerald-400">{formatDzd(total)} · demo</span></div><p className="font-heading mt-3 font-bold">{customer.name}</p><p className="mt-1 text-xs text-zinc-400">{customer.email}</p><p className="mt-1 text-xs text-zinc-400">+213 {customer.phone}</p><p className="mt-3 border-t border-white/[0.07] pt-3 text-[10px] text-zinc-500">{paymentMethod === 'edahabia' ? 'Edahabia demo card •• 9410' : paymentMethod === 'cib' ? 'CIB demo method' : paymentMethod === 'wallet' ? 'Digital wallet preview' : 'Box office demo reservation'}</p></div></div>
            <div className="mt-4 flex flex-col gap-3 rounded-xl bg-[#141414] p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[9px] font-bold uppercase tracking-wider text-amber-400">Optional concession preview</p><p className="mt-1 text-xs font-bold">{[concessions.popcorn && '1× Truffle Popcorn (Large)', concessions.soda && '1× Artisanal Soda'].filter(Boolean).join(' + ') || 'No add-ons selected'}</p><p className="mt-1 text-[10px] text-zinc-500">Sample voucher only. No concessions have been ordered.</p></div><span className="rounded-lg bg-emerald-500/10 px-3 py-2 text-[10px] font-bold text-emerald-400">Preview only</span></div>
          </div>
          <aside className="flex flex-col items-center border-t border-white/[0.08] bg-[#141414] p-5 sm:p-7 xl:border-l xl:border-t-0"><span className="text-[9px] font-bold uppercase tracking-[.18em] text-zinc-500">Entry scan pass</span><h2 className="font-heading mt-1 text-center text-xl font-bold">Turnstile A / Turnstile B</h2><p className="mt-1 text-center text-xs text-zinc-500">Simulated contactless entry</p><div className="mt-5 w-full max-w-[250px] rounded-2xl bg-white p-4"><div className="qr-grid" role="img" aria-label="Simulated QR code placeholder; not a valid entry pass">{qrCells.map((dark, index) => <span key={index} className={`qr-cell ${dark ? '' : 'is-empty'}`} />)}</div><div className="mt-4 flex h-8 items-end justify-center gap-[2px]" aria-hidden="true">{Array.from({ length: 58 }, (_, index) => <span key={index} className="bg-black" style={{ width: index % 4 === 0 ? 3 : 1, height: `${15 + ((index * 7) % 12)}px` }} />)}</div><p className="mt-1 text-center font-mono text-[9px] font-bold tracking-[.2em] text-black">{reference.replaceAll('-', ' ').slice(-15)}</p></div><p className="mt-4 max-w-[260px] text-center text-[10px] leading-5 text-zinc-500">QR is a visual placeholder only. It will not scan at a cinema turnstile.</p><div className="mt-5 flex w-full max-w-[280px] flex-col gap-2"><button type="button" onClick={() => window.print()} className="primary-button min-h-11 px-4 text-sm"><Download size={16} />Print / Save PDF</button><button type="button" onClick={() => setWalletOpen(true)} className="secondary-button min-h-11 px-4 text-sm"><Wallet size={16} />Preview Wallet Pass</button><div className="grid grid-cols-2 gap-2"><button type="button" onClick={copyReference} className="secondary-button min-h-10 px-2 text-[10px]"><Copy size={13} />Copy ref</button><button type="button" onClick={downloadCalendar} className="secondary-button min-h-10 px-2 text-[10px]"><CalendarDays size={13} />Add calendar</button></div></div></aside>
        </div>
      </section>

      {message && <p role="status" className="text-center text-xs text-emerald-400">{message}</p>}
      <div className="grid gap-3 md:grid-cols-3">{[['Doors open at 20:00', 'Admission gates unlock 30 minutes prior to showtime.'], ['IMAX 3D laser eyewear', 'Sanitized glasses are available at the entrance for compatible screenings.'], ['Free parking validation', 'Present your ticket barcode at Garden City Mall parking validation.']].map(([title, text]) => <article key={title} className="rounded-xl border border-white/[0.07] bg-[#141414] p-4"><h3 className="font-heading text-sm font-bold">{title}</h3><p className="mt-2 text-xs leading-5 text-zinc-400">{text}</p></article>)}</div>
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1"><div className="flex gap-2"><Link href="/" className="secondary-button min-h-10 px-4 text-xs">Back to Home</Link><Link href="/movies" className="secondary-button min-h-10 px-4 text-xs">Browse Movies</Link></div><Link href="/booking/confirmation" className="primary-button min-h-11 px-5 text-xs"><Ticket size={15} />View Demo Reservation</Link></div>
    </div>

    {walletOpen && <div className="no-print fixed inset-0 z-50 grid place-items-center bg-black/80 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setWalletOpen(false) }}><section role="dialog" aria-modal="true" aria-labelledby="wallet-title" className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#191919] p-5 shadow-2xl"><div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-lg bg-[#b80710]/15 text-[#ffb4aa]"><Wallet size={19} /></span><button type="button" onClick={() => setWalletOpen(false)} aria-label="Close wallet preview" className="grid size-9 place-items-center rounded-lg text-zinc-400 hover:bg-white/[0.06]"><X size={16} /></button></div><h2 id="wallet-title" className="font-heading mt-4 text-lg font-bold">Wallet pass preview</h2><p className="mt-2 text-sm leading-6 text-zinc-400">This prototype does not create or add a real wallet pass. Your simulated ticket is ready to print or save as a PDF.</p><p className="mt-4 rounded-lg bg-[#0e0e0e] p-3 font-mono text-xs text-[#ffb4aa]">{reference}</p><button type="button" onClick={() => setWalletOpen(false)} className="primary-button mt-4 min-h-10 w-full text-sm">Close preview</button></section></div>}
  </>
}

function TicketDetail({ icon, label, value, helper }: { icon: React.ReactNode; label: string; value: string; helper: string }) {
  return <div className="flex gap-2 rounded-lg bg-[#0d0d0d] p-3"><span className="mt-0.5 shrink-0 text-[#ffb4aa]">{icon}</span><div><p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{label}</p><p className="mt-1 text-xs font-semibold text-white">{value}</p><p className="mt-1 text-[10px] text-zinc-500">{helper}</p></div></div>
}
