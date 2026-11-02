'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Clapperboard, Mail, MapPin, Phone } from 'lucide-react'

export function SiteFooter() {
  const [joined, setJoined] = useState(false)

  return (
    <footer className="no-print border-t border-white/10 bg-[#121212]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.3fr_.7fr_.8fr_1.4fr] lg:px-10 lg:py-16">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5" aria-label="TMV Cinemas home">
            <span className="grid size-9 place-items-center rounded-lg bg-[#b80710] text-white"><Clapperboard size={18} /></span>
            <span className="font-heading text-lg font-extrabold tracking-tight">TMV <span className="text-[#e50914]">CINEMAS</span></span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-400">Algeria&apos;s premier cinema destination. State-of-the-art projection, immersive acoustic stages, and tailored VIP hospitality across major metropolitan hubs.</p>
          <div className="mt-5 flex gap-2">
            <a href="mailto:hello@tmvcinemas.example" aria-label="Email TMV Cinemas" className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white"><Mail size={15} /></a>
            <a href="tel:+21323880000" aria-label="Call TMV Cinemas" className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white"><Phone size={15} /></a>
            <a href="/#venues" aria-label="View cinema locations" className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white"><MapPin size={15} /></a>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white">Explore</h2>
          <div className="mt-4 flex flex-col gap-2.5 text-sm text-zinc-400">
            <Link href="/movies" className="hover:text-white">Now Playing</Link>
            <Link href="/movies?status=upcoming" className="hover:text-white">Coming Soon</Link>
            <Link href="/#experiences" className="hover:text-white">IMAX & 4DX Stages</Link>
            <Link href="/#experiences" className="hover:text-white">VIP Lounges</Link>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white">Locations & Info</h2>
          <div className="mt-4 flex flex-col gap-2.5 text-sm text-zinc-400">
            <Link href="/#venues" className="hover:text-white">Algiers & Oran Venues</Link>
            <Link href="/information#cinema-policies" className="hover:text-white">Cinema Policies</Link>
            <Link href="/information#gift-cards" className="hover:text-white">Gift Cards &amp; Vouchers</Link>
            <Link href="/admin" className="hover:text-white">Operations Center</Link>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white">Premiere Bulletin</h2>
          <p className="mt-4 text-sm leading-6 text-zinc-400">Receive private invitations to advance screenings, festival premieres, and curated director retrospectives.</p>
          <form className="mt-4 flex gap-2" onSubmit={(event) => { event.preventDefault(); setJoined(true) }}>
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input id="newsletter-email" type="email" required placeholder="Your email address" className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[#b80710] focus:outline-none" />
            <button type="submit" className="primary-button shrink-0 px-4 text-sm">{joined ? 'Joined' : 'Join Club'}</button>
          </form>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-zinc-300">
            <a href="tel:+21323880000" className="inline-flex items-center gap-2 hover:text-white"><Phone size={13} className="text-[#e50914]" />+213 (0) 23 88 00 00</a>
            <a href="mailto:concierge@tmvcinemas.example" className="inline-flex items-center gap-2 hover:text-white"><Mail size={13} className="text-[#e50914]" />VIP Concierge</a>
          </div>
          {joined && <p role="status" className="mt-2 text-xs text-emerald-400">You&apos;re on the premiere list.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 border-t border-white/10 px-5 py-5 text-xs text-zinc-500 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <p>© 2025 TMV Cinemas Algeria. All rights reserved. Ultra-definition projection & Dolby Atmos licensed auditoriums.</p>
        <div className="flex gap-5"><Link href="/information#privacy" className="hover:text-zinc-300">Privacy Policy</Link><Link href="/information#terms" className="hover:text-zinc-300">Terms of Ticketing</Link><Link href="/information#security" className="hover:text-zinc-300">Security &amp; Trust</Link></div>
      </div>
    </footer>
  )
}
