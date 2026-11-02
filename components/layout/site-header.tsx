'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Bell, CalendarDays, Clapperboard, MapPin, Menu, Search, Ticket, X } from 'lucide-react'

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Movies', href: '/movies' },
  { label: 'Coming Soon', href: '/movies?status=upcoming' },
  { label: 'Experiences & Halls', href: '/#experiences' },
  { label: 'About Us', href: '/#venues' },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [venue, setVenue] = useState('Algiers — Garden City Mall')

  return (
    <header className="no-print sticky top-0 z-40 border-b border-white/10 bg-[#090909]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-[1440px] items-center gap-3 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="TMV Cinemas home">
          <span className="grid size-9 place-items-center rounded-lg bg-[#b80710] text-white"><Clapperboard size={19} strokeWidth={2.1} /></span>
          <span className="leading-none">
            <span className="font-heading block text-[15px] font-extrabold tracking-tight">TMV</span>
            <span className="font-heading block pt-1 text-[15px] font-extrabold tracking-tight text-[#e50914]">CINEMAS</span>
          </span>
        </Link>

        <button
          type="button"
          className="ml-2 hidden max-w-[185px] items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-xs text-zinc-300 transition hover:bg-white/[0.08] md:flex"
          onClick={() => setVenue((current) => current.startsWith('Algiers') ? 'Oran — Es-Senia Mall' : 'Algiers — Garden City Mall')}
          aria-label={`Change cinema location. Current location: ${venue}`}
        >
          <MapPin size={15} className="shrink-0 text-[#ffb4aa]" />
          <span className="truncate">{venue}</span>
        </button>

        <nav className="ml-auto hidden items-center gap-5 lg:flex" aria-label="Main navigation">
          <Suspense fallback={navigation.map((item) => <Link key={item.label} href={item.href} className="whitespace-nowrap text-[13px] font-semibold text-zinc-400 transition hover:text-white">{item.label}</Link>)}>
            <DesktopNavigation />
          </Suspense>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <Link href="/movies#catalog-search" className="grid size-10 place-items-center rounded-lg border border-white/10 text-zinc-300 transition hover:bg-white/[0.07] hover:text-white" aria-label="Search movies"><Search size={18} /></Link>
          <Link href="/movies" className="primary-button hidden h-10 px-4 text-sm sm:inline-flex"><Ticket size={16} />Book Tickets</Link>
          <Link href="/booking/confirmation" className="hidden h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-zinc-200 transition hover:bg-white/[0.08] md:inline-flex">
            <CalendarDays size={15} className="text-[#ffb4aa]" /> <span>My Reservations</span><span className="rounded-full bg-[#b80710] px-1.5 py-0.5 text-[10px] text-white">1</span>
          </Link>
          <div className="relative shrink-0">
            <button type="button" className="grid size-10 place-items-center rounded-full bg-[#ffb4aa] text-[#421010]" aria-label="Open demo profile" aria-expanded={profileOpen} aria-controls="demo-profile-panel" onClick={() => setProfileOpen((open) => !open)}><span className="font-heading text-sm font-extrabold">A</span></button>
            {profileOpen && <section id="demo-profile-panel" aria-label="Demo member profile" className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-white/10 bg-[#1c1c1c] p-4 shadow-2xl">
              <div className="flex items-start justify-between gap-3"><div><p className="text-[9px] font-bold uppercase tracking-[.16em] text-amber-400">VIP Noir member</p><p className="font-heading mt-1 text-sm font-bold text-white">Amine Khelifi</p><p className="mt-1 text-[10px] text-zinc-400">amine.khelifi@example.dz</p></div><button type="button" onClick={() => setProfileOpen(false)} aria-label="Close profile panel" className="grid size-8 place-items-center rounded-lg text-zinc-400 hover:bg-white/[0.06]"><X size={15} /></button></div>
              <p className="mt-3 rounded-lg bg-black/30 px-3 py-2 text-[10px] text-zinc-400">Sample account · Garden City Mall</p>
              <Link href="/booking/confirmation" onClick={() => setProfileOpen(false)} className="secondary-button mt-3 min-h-9 w-full px-3 text-[10px]">View sample reservation</Link>
            </section>}
          </div>
          <button type="button" className="grid size-10 place-items-center rounded-lg text-zinc-300 hover:bg-white/[0.07] lg:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && <div className="border-t border-white/10 bg-[#111] px-4 py-4 lg:hidden">
        <nav className="mx-auto flex max-w-[1440px] flex-col gap-1" aria-label="Mobile navigation">
          {navigation.map((item) => <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-zinc-300 hover:bg-white/[0.06] hover:text-white">{item.label}</Link>)}
          <Link href="/booking/confirmation" onClick={() => setMenuOpen(false)} className="mt-1 flex items-center gap-2 rounded-lg bg-white/[0.05] px-3 py-3 text-sm font-semibold text-zinc-200"><Bell size={16} /> My Reservations</Link>
          <Link href="/movies" onClick={() => setMenuOpen(false)} className="primary-button mt-2 h-11 text-sm"><Ticket size={16} />Browse Screenings</Link>
        </nav>
      </div>}
    </header>
  )
}

function DesktopNavigation() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  return <>{navigation.map((item) => {
    const active = item.href === '/'
      ? pathname === '/'
      : item.href === '/movies?status=upcoming'
        ? pathname === '/movies' && searchParams.get('status') === 'upcoming'
        : item.href === '/movies'
          ? pathname.startsWith('/movies') && searchParams.get('status') !== 'upcoming'
          : false
    return <Link key={item.label} href={item.href} aria-current={active ? 'page' : undefined} className={`whitespace-nowrap text-[13px] font-semibold transition ${active ? 'text-white' : 'text-zinc-400 hover:text-white'}`}>{item.label}</Link>
  })}</>
}
