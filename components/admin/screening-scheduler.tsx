'use client'

import { FormEvent, useMemo, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, Download, PlusCircle, RefreshCw, ShieldCheck, Sparkles, TableProperties, Timer, View, X } from 'lucide-react'
import { hallSnapshots, scheduledSlots } from '@/data/admin'
import type { ScheduledSlot } from '@/data/admin'

const hours = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00']
const dayLabels = ['Fri 29 Mar', 'Today · Sat 30 Mar', 'Sun 31 Mar']

export function ScreeningScheduler() {
  const [slots, setSlots] = useState<ScheduledSlot[]>(scheduledSlots)
  const [view, setView] = useState<'matrix' | 'week' | 'list'>('matrix')
  const [hallFilter, setHallFilter] = useState('all')
  const [dateIndex, setDateIndex] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [title, setTitle] = useState('Dune: Part Two')
  const [hallId, setHallId] = useState('01')
  const [startTime, setStartTime] = useState('20:30')
  const [format, setFormat] = useState('IMAX 70mm')
  const [notice, setNotice] = useState('')
  const [selectedId, setSelectedId] = useState('slot-3')
  const [generated, setGenerated] = useState(false)

  const filteredHalls = hallFilter === 'all' ? hallSnapshots : hallSnapshots.filter((hall) => hall.id === hallFilter)
  const visibleSlots = useMemo(() => slots.filter((slot) => hallFilter === 'all' || slot.hallId === hallFilter), [slots, hallFilter])
  const selectedSlot = slots.find((slot) => slot.id === selectedId)

  function resolveConflicts() {
    const conflicts = slots.reduce((count, slot, index, all) => {
      const next = all.filter((entry) => entry.hallId === slot.hallId && entry.start >= slot.start).sort((a, b) => a.start - b.start)[1]
      return count + (next && next.start - slot.end < 1 / 3 ? 1 : 0)
    }, 0)
    setNotice(conflicts ? `${conflicts} possible buffer conflict${conflicts === 1 ? '' : 's'} found in the local schedule.` : 'No cleaning buffer conflicts found in the sample schedule.')
  }

  function autoGenerate() {
    if (generated) {
      setNotice('A weekly sample schedule has already been generated in this view.')
      return
    }
    const additions: ScheduledSlot[] = [
      { id: `auto-${Date.now()}-1`, movie: 'Inside Out 2', hallId: '05', start: 13, end: 14.75, occupancy: 65, format: 'Family', status: 'standard' },
      { id: `auto-${Date.now()}-2`, movie: 'Oppenheimer', hallId: '06', start: 17.5, end: 20.5, occupancy: 72, format: '70mm Film', status: 'standard' },
      { id: `auto-${Date.now()}-3`, movie: 'Furiosa: A Mad Max Saga', hallId: '08', start: 20, end: 22.5, occupancy: 88, format: 'VOSTFR', status: 'standard' },
    ]
    setSlots((current) => [...current, ...additions])
    setGenerated(true)
    setNotice('Three sample screening sessions were added to the local weekly projection.')
  }

  function createSession(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const [hour, minute] = startTime.split(':').map(Number)
    const start = hour + minute / 60
    const newSlot: ScheduledSlot = { id: `created-${Date.now()}`, movie: title.trim(), hallId, start, end: Math.min(25, start + 2.25), occupancy: 0, format, status: 'standard' }
    setSlots((current) => [...current, newSlot])
    setSelectedId(newSlot.id)
    setModalOpen(false)
    setNotice(`${newSlot.movie} was added to the local schedule preview.`)
  }

  function exportSchedule() {
    const rows = [['Hall', 'Title', 'Start', 'End', 'Format', 'Occupancy'], ...visibleSlots.map((slot) => [slot.hallId, slot.movie, timeLabel(slot.start), timeLabel(slot.end), slot.format, `${slot.occupancy}%`])]
    const csv = rows.map((row) => row.map((item) => `"${item.replaceAll('"', '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'tmv-screening-schedule.csv'
    anchor.click()
    URL.revokeObjectURL(url)
    setNotice('Screening schedule exported as CSV.')
  }

  return <>
    <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><p className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400"><span className="size-2 animate-pulse rounded-full bg-emerald-500" /><span className="text-white">Live backoffice engine</span><span className="text-zinc-700">/</span>Algiers — Garden City Mall<span className="text-zinc-700">/</span><span className="text-[#ffb4aa]">Scheduling grid: Saturday, 30 March 2024</span></p><h1 className="font-heading mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Screenings &amp; Showtimes Scheduler</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">Algorithmic multi-hall timeline matrix, turnstile flow balancing, KDM key decryption tracking, and SATIM-synchronized ticket inventory.</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={resolveConflicts} className="secondary-button min-h-10 px-3 text-xs"><RefreshCw size={14} className="text-amber-300" />Resolve Conflicts (0)</button><button type="button" onClick={autoGenerate} className="secondary-button min-h-10 px-3 text-xs"><Sparkles size={14} />Auto-Generate Weekly</button><button type="button" onClick={() => setModalOpen(true)} className="primary-button min-h-10 px-4 text-xs"><PlusCircle size={15} />Create Screening Session</button></div></section>

    <section aria-label="Scheduling metrics" className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">{[
      ['Total sessions', '42', '+4 VIP', '100% KDM validated'], ['Occupancy forecast', '87.4%', 'High yield', 'Peak Saturday'], ['Projected gross', '4.28M', 'DZD', '+18.2% vs last Sat'], ['Buffer violations', '0', 'Safe', '20 min cleaning clean'], ['Prime rush window', '20:15–21:00', '1,840', 'Turnstile crossings'], ['CIB / SATIM link', 'Active', '14ms', 'GIE Monétique OK'],
    ].map(([label, value, badge, detail]) => <article key={label} className="flex min-h-[122px] flex-col justify-between rounded-xl border border-white/[0.06] bg-[#141414] p-3.5"><div className="flex items-start justify-between gap-2"><p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{label}</p>{label.includes('Buffer') ? <Timer size={15} className="text-emerald-400" /> : label.includes('CIB') ? <ShieldCheck size={15} className="text-emerald-400" /> : <CalendarDays size={15} className="text-[#ffb4aa]" />}</div><div><p className={`font-heading text-lg font-extrabold ${label.includes('Buffer') ? 'text-emerald-400' : 'text-white'}`}>{value}<span className="ml-1.5 text-[9px] font-semibold text-emerald-400">{badge}</span></p><p className="mt-1 text-[9px] text-zinc-500">{detail}</p></div></article>)}</section>

    <section className="rounded-xl border border-white/[0.06] bg-[#141414] p-3 sm:p-4"><div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between"><div className="flex w-fit items-center gap-1 rounded-lg bg-[#1c1c1c] p-1"><button type="button" onClick={() => setDateIndex((current) => Math.max(0, current - 1))} className="inline-flex h-9 items-center gap-1 rounded-md px-2 text-[10px] text-zinc-400 hover:text-white"><ChevronLeft size={13} /><span className="hidden sm:inline">{dayLabels[Math.max(0, dateIndex - 1)]}</span></button><span className="inline-flex h-9 items-center gap-2 rounded-md bg-[#b80710] px-3 text-[10px] font-bold"><CalendarDays size={13} />{dayLabels[dateIndex]}</span><button type="button" onClick={() => setDateIndex((current) => Math.min(dayLabels.length - 1, current + 1))} className="inline-flex h-9 items-center gap-1 rounded-md px-2 text-[10px] text-zinc-400 hover:text-white"><span className="hidden sm:inline">{dayLabels[Math.min(dayLabels.length - 1, dateIndex + 1)]}</span><ChevronRight size={13} /></button></div><div className="flex flex-wrap items-center gap-2"><div className="flex rounded-lg bg-[#1c1c1c] p-1">{[
        { value: 'matrix', label: 'Auditorium Matrix', icon: View }, { value: 'week', label: 'Week Projection', icon: CalendarDays }, { value: 'list', label: 'Condensed List', icon: TableProperties },
      ].map(({ value, label, icon: Icon }) => <button key={value} type="button" onClick={() => setView(value as typeof view)} aria-pressed={view === value} className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[9px] font-semibold sm:px-3 sm:text-[10px] ${view === value ? 'bg-[#292929] text-white' : 'text-zinc-500 hover:text-white'}`}><Icon size={13} />{label}</button>)}</div><span className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#1c1c1c] px-3 text-[10px] text-zinc-400"><Clock3 size={13} className="text-[#ffb4aa]" />Now: <strong className="text-white">20:45</strong> Algiers</span><button type="button" onClick={exportSchedule} className="secondary-button min-h-9 px-3 text-[10px]"><Download size={13} />Export DCI Sheet</button></div></div><div className="mt-3 flex items-center gap-2 overflow-x-auto border-t border-white/[0.06] pt-3"><span className="shrink-0 pr-1 text-[9px] font-bold uppercase tracking-wider text-zinc-500">Filter hall:</span><button type="button" onClick={() => setHallFilter('all')} aria-pressed={hallFilter === 'all'} className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-semibold ${hallFilter === 'all' ? 'bg-white text-black' : 'bg-[#1c1c1c] text-zinc-400'}`}>All 8 Halls (42)</button>{hallSnapshots.map((hall) => <button key={hall.id} type="button" onClick={() => setHallFilter(hall.id)} aria-pressed={hallFilter === hall.id} className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold ${hallFilter === hall.id ? 'bg-[#b80710] text-white' : 'bg-[#1c1c1c] text-zinc-400 hover:text-white'}`}><span className={`size-1.5 rounded-full ${hall.id === '01' ? 'bg-[#e50914]' : hall.id === '04' ? 'bg-amber-400' : 'bg-emerald-500'}`} />Hall {hall.id} ({hall.format})</button>)}</div></section>

    {view === 'matrix' ? <MatrixView halls={filteredHalls} slots={visibleSlots} selectedId={selectedId} onSelect={setSelectedId} /> : view === 'week' ? <WeekView slots={visibleSlots} onSelect={setSelectedId} /> : <DispatchList slots={visibleSlots} onSelect={setSelectedId} />}

    <section className="grid gap-3 md:grid-cols-3">{[
      ['KDM Security Handshake', 'All sample screening KDMs are validated via Barco/Christie delivery servers. Expirations: 06 April 2024.'],
      ['Concourse & Turnstile Traffic Alert', 'Peak ingress between 20:00–20:30. Staggered hall door opening remains active.'],
      ['Cleaning Turnaround Enforcer', 'A 20-minute minimum buffer is maintained across all auditoriums.'],
    ].map(([title, text], index) => <article key={title} className="rounded-xl border border-white/[0.06] bg-[#141414] p-4"><p className="flex items-center gap-2 text-xs font-bold"><span className={index === 1 ? 'text-amber-400' : 'text-emerald-400'}>{index === 0 ? <ShieldCheck size={15} /> : index === 1 ? <Sparkles size={15} /> : <Timer size={15} />}</span>{title}</p><p className="mt-2 text-[10px] leading-5 text-zinc-400">{text}</p></article>)}</section>
    {selectedSlot && <p role="status" className="rounded-lg border border-white/[0.07] bg-[#141414] px-4 py-3 text-xs text-zinc-300">Selected session: <strong className="text-white">{selectedSlot.movie}</strong> · Hall {selectedSlot.hallId} · {timeLabel(selectedSlot.start)} · {selectedSlot.occupancy}% occupancy.</p>}
    {notice && <p role="status" className="rounded-lg border border-emerald-500/15 bg-emerald-500/[0.06] px-4 py-3 text-xs text-emerald-300">{notice}<button type="button" onClick={() => setNotice('')} className="ml-2 underline">Dismiss</button></p>}

    {modalOpen && <div className="fixed inset-0 z-[60] grid place-items-center bg-black/75 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false) }}><section role="dialog" aria-modal="true" aria-labelledby="create-session-title" className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#1b1b1b] p-5 shadow-2xl"><div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider text-[#ffb4aa]">New sample schedule entry</span><button type="button" onClick={() => setModalOpen(false)} aria-label="Close create screening dialog" className="grid size-9 place-items-center rounded-lg text-zinc-400 hover:bg-white/[0.06]"><X size={16} /></button></div><h2 id="create-session-title" className="font-heading mt-2 text-xl font-bold">Create Screening Session</h2><p className="mt-1 text-xs text-zinc-500">This entry only updates the current local schedule preview.</p><form onSubmit={createSession} className="mt-4 grid gap-3 sm:grid-cols-2"><label className="flex flex-col gap-1.5 text-xs font-semibold text-zinc-400 sm:col-span-2">Movie title<input required value={title} onChange={(event) => setTitle(event.target.value)} className="h-10 rounded-lg border border-white/[0.08] bg-[#0e0e0e] px-3 text-sm text-white focus:border-[#b80710] focus:outline-none" /></label><label className="flex flex-col gap-1.5 text-xs font-semibold text-zinc-400">Auditorium<select value={hallId} onChange={(event) => setHallId(event.target.value)} className="h-10 rounded-lg bg-[#0e0e0e] px-3 text-sm text-white">{hallSnapshots.map((hall) => <option key={hall.id} value={hall.id}>{hall.name} · {hall.format}</option>)}</select></label><label className="flex flex-col gap-1.5 text-xs font-semibold text-zinc-400">Start time<input required type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} className="h-10 rounded-lg bg-[#0e0e0e] px-3 text-sm text-white" /></label><label className="flex flex-col gap-1.5 text-xs font-semibold text-zinc-400 sm:col-span-2">Format<select value={format} onChange={(event) => setFormat(event.target.value)} className="h-10 rounded-lg bg-[#0e0e0e] px-3 text-sm text-white"><option>IMAX 70mm</option><option>Dolby Atmos</option><option>VIP Noir</option><option>4DX Motion</option><option>Standard DCI</option></select></label><div className="flex justify-end gap-2 pt-2 sm:col-span-2"><button type="button" onClick={() => setModalOpen(false)} className="secondary-button min-h-10 px-4 text-xs">Cancel</button><button type="submit" className="primary-button min-h-10 px-4 text-xs"><PlusCircle size={14} />Add session</button></div></form></section></div>}
  </>
}

function MatrixView({ halls, slots, selectedId, onSelect }: { halls: typeof hallSnapshots; slots: ScheduledSlot[]; selectedId: string; onSelect: (id: string) => void }) {
  return <section className="rounded-xl border border-white/[0.06] bg-[#141414] p-4 sm:p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><h2 className="font-heading text-lg font-bold">Auditorium Schedule Matrix</h2><span className="rounded bg-emerald-500/10 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-emerald-400">Live operations active</span></div><div className="flex flex-wrap gap-3 text-[9px] text-zinc-500"><span className="inline-flex items-center gap-1.5"><i className="size-2 rounded bg-[#b80710]" />Prime / sold out</span><span className="inline-flex items-center gap-1.5"><i className="size-2 rounded bg-[#292929]" />Standard</span><span className="inline-flex items-center gap-1.5"><i className="size-2 rounded bg-amber-400" />Turnover buffer</span></div></div>
    <div className="mt-4 overflow-x-auto rounded-lg bg-[#0c0c0c] p-2"><div className="min-w-[1140px]"><div className="grid grid-cols-[145px_repeat(14,minmax(62px,1fr))] rounded-t-lg bg-[#191919] py-2 text-center text-[8px] font-bold uppercase tracking-wider text-zinc-500"><div className="text-left pl-3 text-zinc-300">Hall / format</div>{hours.map((hour) => <span key={hour}>{hour}</span>)}</div><div className="mt-2 flex flex-col gap-2">{halls.map((hall) => <div key={hall.id} className="grid grid-cols-[145px_minmax(0,1fr)] items-center gap-2 rounded-lg bg-[#141414] p-2"><div><p className="font-heading text-xs font-bold">Hall {hall.id}</p><p className="mt-1 text-[8px] font-bold uppercase text-[#ffb4aa]">{hall.format}</p><p className="mt-0.5 text-[9px] text-zinc-500">{hall.seats} seats</p></div><div className="relative h-[58px] overflow-hidden rounded-md bg-[#090909]"><div className="absolute inset-0 grid grid-cols-14 opacity-35">{hours.map((hour) => <span key={hour} className="border-r border-white/[0.06]" />)}</div>{Array.from({ length: 14 }, (_, index) => index).map((index) => <span key={index} className="absolute inset-y-0 border-r border-white/[0.04]" style={{ left: `${((index + 1) / 14) * 100}%` }} />)}{slots.filter((slot) => slot.hallId === hall.id).map((slot) => { const left = Math.max(0, ((slot.start - 12) / 14) * 100); const width = Math.max(7, ((slot.end - slot.start) / 14) * 100); return <button key={slot.id} type="button" onClick={() => onSelect(slot.id)} title={`${slot.movie}, ${timeLabel(slot.start)}–${timeLabel(slot.end)} · ${slot.occupancy}%`} className={`absolute inset-y-1.5 z-10 flex min-w-0 flex-col justify-between overflow-hidden rounded-md px-2 py-1 text-left transition hover:ring-1 hover:ring-[#ffb4aa] ${slot.status === 'prime' || slot.status === 'sold-out' ? 'bg-[#b80710] text-white' : 'bg-[#292929] text-zinc-100'} ${selectedId === slot.id ? 'ring-1 ring-white/60' : ''}`} style={{ left: `${left}%`, width: `${Math.min(width, 100 - left)}%` }}><span className="flex items-center justify-between gap-1 text-[9px] font-bold"><span className="truncate">{slot.movie}</span><span className="shrink-0 text-emerald-300">{slot.occupancy}%</span></span><span className="truncate text-[8px] text-white/60">{timeLabel(slot.start)} · {slot.format}</span></button>})}</div></div>)}</div></div></div>
    <div className="mt-4 grid gap-2 sm:grid-cols-3">{[['KDM security handshake', 'Sample KDMs validated through the local delivery preview.'], ['Turnstile traffic alert', 'Peak ingress remains between 20:00 and 20:30.'], ['Cleaning turnaround', '20-minute minimum reset buffer between sample sessions.']].map(([title, text]) => <article key={title} className="rounded-lg bg-[#1c1c1c] p-3"><p className="text-[10px] font-bold">{title}</p><p className="mt-1 text-[9px] leading-4 text-zinc-500">{text}</p></article>)}</div>
  </section>
}

function WeekView({ slots, onSelect }: { slots: ScheduledSlot[]; onSelect: (id: string) => void }) {
  return <section className="rounded-xl border border-white/[0.06] bg-[#141414] p-4 sm:p-5"><div className="flex items-center justify-between gap-3"><div><h2 className="font-heading text-lg font-bold">Week Projection</h2><p className="mt-1 text-xs text-zinc-500">Sample weekly release pattern across active auditoriums.</p></div><span className="text-[10px] text-zinc-500">7 days · Algiers time</span></div><div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => <article key={day} className="rounded-xl bg-[#1c1c1c] p-3"><div className="flex items-center justify-between"><p className="text-xs font-bold">{day}</p><span className="text-[9px] text-zinc-500">{index === 0 ? 'Today' : `Apr ${String(index + 1).padStart(2, '0')}`}</span></div><div className="mt-3 flex flex-col gap-1.5">{slots.slice(index % 3, (index % 3) + 3).map((slot) => <button key={`${day}-${slot.id}`} type="button" onClick={() => onSelect(slot.id)} className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.05] bg-[#111] px-2.5 py-2 text-left"><span className="min-w-0"><span className="block truncate text-[10px] font-semibold">{slot.movie}</span><span className="mt-1 block text-[8px] text-zinc-500">Hall {slot.hallId} · {timeLabel(slot.start)}</span></span><span className="text-[9px] font-bold text-emerald-400">{slot.occupancy}%</span></button>)}</div><p className="mt-3 text-[9px] text-zinc-500">3 sample sessions</p></article>)}</div></section>
}

function DispatchList({ slots, onSelect }: { slots: ScheduledSlot[]; onSelect: (id: string) => void }) {
  return <section className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#141414]"><div className="flex items-center justify-between gap-3 p-4"><div><h2 className="font-heading text-lg font-bold">Session Dispatcher &amp; Pricing Inspector</h2><p className="mt-1 text-xs text-zinc-500">Sample screenings programmed for this date and hall filter.</p></div><span className="rounded bg-[#1c1c1c] px-2.5 py-1 text-[9px] text-zinc-400">{slots.length} sessions shown</span></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-xs"><thead><tr className="bg-[#1c1c1c] text-[9px] font-bold uppercase tracking-wider text-zinc-500"><th className="px-4 py-3">Showtime</th><th className="px-4 py-3">Movie title</th><th className="px-4 py-3">Hall &amp; audio</th><th className="px-4 py-3">Format</th><th className="px-4 py-3 text-right">Base price</th><th className="px-4 py-3 text-right">Sold / capacity</th></tr></thead><tbody>{slots.map((slot) => <tr key={slot.id} onClick={() => onSelect(slot.id)} className="cursor-pointer border-b border-white/[0.05] hover:bg-white/[0.03]"><td className="px-4 py-4 font-bold text-white"><span className="mr-2 inline-block size-1.5 rounded-full bg-emerald-500" />{timeLabel(slot.start)} — {timeLabel(slot.end)}</td><td className="px-4 py-4 font-semibold">{slot.movie}</td><td className="px-4 py-4"><span className="rounded bg-white/[0.06] px-2 py-1 text-[9px]">Hall {slot.hallId}</span></td><td className="px-4 py-4 text-zinc-300">{slot.format}</td><td className="px-4 py-4 text-right font-bold">{slot.format.includes('VIP') ? '2,500' : '1,600'} DZD</td><td className="px-4 py-4 text-right font-semibold text-emerald-400">{Math.round(slot.occupancy * 4.2)} / 420 <span className="text-[9px] text-zinc-500">({slot.occupancy}%)</span></td></tr>)}</tbody></table></div><div className="flex items-center justify-between p-4 text-[10px] text-zinc-500"><span>Showing {slots.length} sample sessions</span><span className="inline-flex items-center gap-2"><button type="button" disabled className="rounded bg-white/[0.04] px-3 py-1.5 opacity-40">Previous</button><strong className="text-zinc-300">1 / 9</strong><button type="button" onClick={() => onSelect(slots[0]?.id ?? '')} className="rounded bg-white/[0.04] px-3 py-1.5 hover:bg-white/[0.09]">Next</button></span></div></section>
}

function timeLabel(value: number) {
  const totalMinutes = Math.round(value * 60)
  const hours = Math.floor(totalMinutes / 60) % 24
  const minutes = totalMinutes % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}
