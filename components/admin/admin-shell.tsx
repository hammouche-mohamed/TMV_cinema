'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Armchair, Bell, CalendarDays, Clapperboard, Coffee, Film, LayoutDashboard, MapPin, Menu, Radio, Search, Settings, Ticket, UsersRound, X } from 'lucide-react'

const navigation = [
  { label: 'Overview & Analytics', href: '/admin', icon: LayoutDashboard },
  { label: 'Movie Management', href: '/admin/movies', icon: Film },
  { label: 'Screenings & Schedules', href: '/admin/screenings', icon: CalendarDays },
]
const modules = [
  { label: 'Halls & Auditoriums', icon: Clapperboard },
  { label: 'Seating & Tier Layouts', icon: Armchair },
  { label: 'Reservations & Box Office', icon: Ticket },
  { label: 'Customers & Loyalty', icon: UsersRound },
  { label: 'Concessions & Inventory', icon: Coffee },
  { label: 'System Settings & Roles', icon: Settings },
]

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [module, setModule] = useState('')

  function goTo(path: string) {
    setMenuOpen(false)
    router.push(path)
  }

  const sidebar = <aside className="flex h-full w-[236px] shrink-0 flex-col border-r border-white/[0.07] bg-[#141414]">
    <Link href="/admin" onClick={() => setMenuOpen(false)} className="flex h-[70px] items-center gap-3 border-b border-white/[0.06] px-5"><span className="grid size-9 place-items-center rounded-lg bg-[#b80710] text-white"><Clapperboard size={18} /></span><span><span className="font-heading block text-sm font-extrabold">TMV CINEMAS</span><span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[.14em] text-zinc-500">Backoffice / Ops</span></span></Link>
    <button type="button" className="mx-3 mt-3 flex items-center justify-between rounded-lg bg-[#1d1d1d] px-3 py-2.5 text-left" onClick={() => setModule('Cinema location')}><span className="flex items-center gap-2"><MapPin size={15} className="text-[#ffb4aa]" /><span><span className="block text-[11px] font-bold">Garden City Mall</span><span className="block text-[10px] text-zinc-500">Algiers, DZ</span></span></span><span className="text-zinc-500">⌄</span></button>
    <nav aria-label="Operations navigation" className="mt-4 flex-1 overflow-y-auto px-2.5">
      <p className="px-3 pb-2 text-[9px] font-bold uppercase tracking-[.16em] text-zinc-600">Operations</p>
      <div className="flex flex-col gap-1">{navigation.map(({ label, href, icon: Icon }) => { const active = pathname === href || (href !== '/admin' && pathname.startsWith(href)); return <Link key={href} href={href} onClick={() => setMenuOpen(false)} className={`flex min-h-10 items-center gap-3 rounded-lg px-3 text-xs font-semibold transition ${active ? 'bg-[#b80710] text-white' : 'text-zinc-400 hover:bg-white/[0.05] hover:text-white'}`}><Icon size={16} />{label}</Link> })}</div>
      <p className="px-3 pb-2 pt-6 text-[9px] font-bold uppercase tracking-[.16em] text-zinc-600">Other modules</p>
      <div className="flex flex-col gap-1">{modules.map(({ label, icon: Icon }) => <button key={label} type="button" onClick={() => setModule(label)} className="flex min-h-10 items-center gap-3 rounded-lg px-3 text-left text-xs font-semibold text-zinc-400 transition hover:bg-white/[0.05] hover:text-white"><Icon size={16} />{label}</button>)}</div>
    </nav>
    <div className="border-t border-white/[0.07] p-3"><div className="rounded-lg bg-[#1d1d1d] p-3"><p className="flex items-center justify-between text-[10px] font-semibold"><span><span className="mr-1.5 inline-block size-1.5 rounded-full bg-emerald-500" />8 Halls Online</span><span className="text-emerald-400">SATIM OK</span></p><p className="mt-1 flex justify-between text-[10px] text-zinc-500"><span>Es-Senia Synced</span><span>14ms</span></p></div><div className="mt-3 flex items-center justify-between px-1"><span className="flex items-center gap-2"><span className="grid size-8 place-items-center rounded-full bg-[#ffb4aa] text-[#421010] text-xs font-bold">KB</span><span><span className="block text-[10px] font-bold">Kamel Benali</span><span className="block text-[9px] text-zinc-500">Operations Director</span></span></span><Link href="/" aria-label="Exit operations center" className="grid size-8 place-items-center text-zinc-500 hover:text-white"><X size={15} /></Link></div></div>
  </aside>

  return <div className="min-h-screen bg-[#090909] text-white">
    <div className="fixed inset-y-0 left-0 z-30 hidden lg:block">{sidebar}</div>
    {menuOpen && <div className="fixed inset-0 z-50 bg-black/70 lg:hidden" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setMenuOpen(false) }}><div className="h-full">{sidebar}</div></div>}
    <div className="min-h-screen lg:pl-[236px]">
      <header className="sticky top-0 z-20 flex h-[54px] items-center justify-between gap-3 border-b border-white/[0.07] bg-[#111]/95 px-4 backdrop-blur-xl sm:px-6">
        <div className="flex min-w-0 items-center gap-3"><button type="button" onClick={() => setMenuOpen(true)} className="grid size-9 place-items-center rounded-lg text-zinc-300 hover:bg-white/[0.07] lg:hidden" aria-label="Open operations navigation"><Menu size={18} /></button><div className="hidden items-center gap-2 text-xs text-zinc-500 sm:flex"><span>TMV Ops</span><span>›</span></div><span className="truncate text-xs font-bold text-white">Operations Center</span><span className="hidden rounded-full bg-white/[0.05] px-2.5 py-1 text-[10px] text-zinc-400 sm:inline-flex"><span className="mr-1.5 text-[#ffb4aa]">◷</span>Algiers 20:45 (GMT+1)</span></div>
        <div className="flex shrink-0 items-center gap-2"><Link href="/admin/movies" aria-label="Search catalogue" className="hidden h-9 items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 text-xs text-zinc-500 sm:inline-flex"><Search size={14} />Search <kbd className="rounded bg-black/40 px-1.5 py-0.5 text-[9px]">⌘K</kbd></Link><Link href="/admin#gate-audit" className="hidden h-9 items-center gap-2 rounded-lg bg-white/[0.05] px-3 text-xs font-semibold sm:inline-flex"><Radio size={14} className="text-emerald-400" />Gate Monitor</Link><Link href="/admin/screenings" className="primary-button h-9 px-3 text-xs"><span className="text-base leading-none">＋</span><span className="hidden sm:inline">Screening</span></Link><button type="button" className="grid size-9 place-items-center rounded-lg text-zinc-400 hover:bg-white/[0.06] hover:text-white" aria-label="Notifications" onClick={() => setModule('Notifications')}><Bell size={16} /></button><span className="grid size-8 place-items-center rounded-full bg-[#ffb4aa] text-xs font-bold text-[#421010]">K</span></div>
      </header>
      <main className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-5 sm:px-6 sm:py-7">{children}</main>
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] bg-[#111] px-5 py-4 text-[10px] text-zinc-500 sm:px-6"><span><strong className="text-zinc-300">TMV Cinemas Algeria</strong>　© 2025 All Rights Reserved　|　GIE Monétique / SATIM Certified Gateway</span><span className="inline-flex items-center gap-2"><span className="size-1.5 rounded-full bg-emerald-500" />Latency: 14ms <span className="rounded bg-white/[0.05] px-1.5 py-0.5">v2.4.8-prod</span></span></footer>
    </div>
    {module && <div className="fixed inset-0 z-[60] grid place-items-center bg-black/75 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModule('') }}><section role="dialog" aria-modal="true" aria-labelledby="module-dialog-title" className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1b1b1b] p-5 shadow-2xl"><div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider text-[#ffb4aa]">Operations module</span><button type="button" onClick={() => setModule('')} aria-label="Close module preview" className="grid size-9 place-items-center rounded-lg text-zinc-400 hover:bg-white/[0.07]"><X size={16} /></button></div><h2 id="module-dialog-title" className="font-heading mt-2 text-xl font-bold">{module}</h2><p className="mt-2 text-sm leading-6 text-zinc-400">This module is represented by sample operational data in the prototype. The supplied designs include the overview, movie catalogue, and scheduling views.</p><div className="mt-5 grid grid-cols-3 gap-2"><button type="button" onClick={() => goTo('/admin')} className="secondary-button min-h-10 px-2 text-[10px]">Overview</button><button type="button" onClick={() => goTo('/admin/movies')} className="secondary-button min-h-10 px-2 text-[10px]">Movies</button><button type="button" onClick={() => goTo('/admin/screenings')} className="secondary-button min-h-10 px-2 text-[10px]">Schedule</button></div></section></div>}
  </div>
}
