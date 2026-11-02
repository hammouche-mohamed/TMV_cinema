'use client'

import { useState } from 'react'
import { Accessibility, Armchair, Check } from 'lucide-react'
import { useBooking } from '@/components/booking/booking-provider'
import { getRoom } from '@/data/screenings'

export function SeatMap() {
  const { screening, seats, toggleSeat } = useBooking()
  const room = getRoom(screening.roomId)
  const [notice, setNotice] = useState('')

  function selectSeat(seatId: string) {
    if (!seats.includes(seatId) && seats.length >= 6) {
      setNotice('A maximum of 6 seats can be selected per reservation.')
      return
    }
    setNotice('')
    toggleSeat(seatId)
  }

  return <section className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#141414] p-4 shadow-2xl sm:p-6 lg:p-8">
    <div className="pointer-events-none absolute -top-28 left-1/2 h-56 w-[70%] -translate-x-1/2 rounded-full bg-[#b80710]/10 blur-[90px]" />
    <div className="relative z-10 flex flex-col items-center">
      <div className="w-full max-w-[620px] px-3 pt-1 text-center">
        <svg aria-hidden="true" viewBox="0 0 700 48" className="h-10 w-full text-[#b80710] drop-shadow-[0_4px_24px_rgba(184,7,16,.35)]"><path d="M20 40 Q350 2 680 40" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" /><path d="M35 42 Q350 8 665 42" fill="none" stroke="white" strokeWidth="1.2" opacity=".4" /></svg>
        <p className="mt-1 flex items-center justify-center gap-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-zinc-300">{room.format} screen <span className="size-2 animate-pulse rounded-full bg-emerald-500" /></p>
        <p className="mt-1 text-[9px] uppercase tracking-widest text-zinc-600">Dolby Atmos® immersive soundstage</p>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-b border-white/[0.07] pb-5 text-[10px] text-zinc-400 sm:gap-x-7">
        <span className="inline-flex items-center gap-2"><span className="size-4 rounded border border-white/15 bg-[#1c1c1c]" />Standard · {screening.price.toLocaleString('en-US')} DZD</span>
        <span className="inline-flex items-center gap-2"><span className="size-4 rounded border border-amber-500/60 bg-[#211a10]" />VIP Noir · 2,500 DZD</span>
        <span className="inline-flex items-center gap-2"><span className="grid size-4 place-items-center rounded border border-[#b80710] bg-[#b80710] text-white"><Check size={10} /></span>Selected ({seats.length})</span>
        <span className="inline-flex items-center gap-2"><span className="size-4 rounded bg-[#292929] text-center text-zinc-600">×</span>Sold / reserved</span>
        <span className="inline-flex items-center gap-2"><Accessibility size={15} className="text-[#ffb4aa]" />Accessible</span>
      </div>

      <div role="region" aria-label="Seat map; scroll horizontally to view all seats" tabIndex={0} className="w-full overflow-x-auto pb-3 pt-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b80710]">
        <div className="mx-auto min-w-[580px] max-w-[710px]">
          <div className="mb-3 text-center text-[9px] font-bold uppercase tracking-[.18em] text-zinc-600">Front tier · Rows A–C</div>
          {room.rows.map((row, rowIndex) => <div key={row} className={`mb-2 flex items-center gap-2 ${row === 'G' ? 'mt-6 border-t border-dashed border-amber-500/20 pt-6' : ''}`}>
            <span className={`w-5 shrink-0 text-right font-mono text-xs font-bold ${room.vipRows.includes(row) ? 'text-amber-400' : 'text-zinc-500'}`}>{row}</span>
            <div className="grid flex-1 grid-cols-12 justify-items-center gap-1.5 sm:gap-2">
              {Array.from({ length: room.seatsPerRow }, (_, seatIndex) => {
                const number = seatIndex + 1
                const seatId = `${row}${number}`
                const occupied = room.occupiedSeats.includes(seatId)
                const selected = seats.includes(seatId)
                const accessible = room.accessibleSeats.includes(seatId)
                const vip = room.vipRows.includes(row)
                const aria = `${occupied ? 'Occupied' : selected ? 'Selected' : 'Available'} ${vip ? 'VIP ' : ''}seat, row ${row}, number ${number}`
                return <button key={seatId} type="button" disabled={occupied} onClick={() => selectSeat(seatId)} aria-label={aria} aria-pressed={selected} title={aria} className={`grid size-9 place-items-center rounded-md border text-[10px] font-semibold transition sm:size-10 ${occupied ? 'cursor-not-allowed border-transparent bg-[#242424] text-zinc-700' : selected ? 'border-[#ffb4aa] bg-[#e50914] text-white shadow-[0_0_14px_rgba(229,9,20,.35)]' : vip ? 'border-amber-500/40 bg-[#211a10] text-amber-300 hover:border-amber-300' : accessible ? 'border-[#b80710]/60 bg-[#1c1c1c] text-[#ffb4aa] hover:border-white' : 'border-white/[0.08] bg-[#1c1c1c] text-zinc-400 hover:border-white/60 hover:text-white'}`}>
                  {occupied ? <span aria-hidden="true">×</span> : accessible ? <Accessibility size={14} aria-hidden="true" /> : number}
                </button>
              })}
              {room.seatsPerRow < 12 && Array.from({ length: 12 - room.seatsPerRow }, (_, index) => <span key={`spacer-${index}`} className="size-9 sm:size-10" />)}
            </div>
            <span className={`w-5 shrink-0 font-mono text-xs font-bold ${room.vipRows.includes(row) ? 'text-amber-400' : 'text-zinc-500'}`}>{row}</span>
          </div>)}
          <div className="mt-4 text-center text-[9px] font-bold uppercase tracking-[.16em] text-amber-500">VIP Noir club luxury recliners · rows G–H</div>
        </div>
      </div>

      <div className="mt-2 flex w-full flex-col gap-2 border-t border-white/[0.07] pt-4 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between"><p className="inline-flex items-start gap-2"><Armchair size={15} className="mt-0.5 shrink-0 text-[#ffb4aa]" />On phones, swipe the map horizontally to view all seats. Tap any available seat to add or release it. Maximum 6 seats per transaction.</p><p className="shrink-0"><span className="mr-1.5 inline-block size-2 rounded-full bg-emerald-500" />{Math.max(0, room.capacity - room.occupiedSeats.length - seats.length)} available <span className="mx-2 text-zinc-700">·</span><span className="mr-1.5 inline-block size-2 rounded-full bg-zinc-600" />{room.occupiedSeats.length} booked</p></div>
      {notice && <p role="status" className="mt-2 w-full text-right text-xs text-amber-300">{notice}</p>}
    </div>
  </section>
}
