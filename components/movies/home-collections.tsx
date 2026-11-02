import Link from 'next/link'
import { ArrowRight, Coffee, Crown, MapPin, MoveUpRight, Projector, Sparkles } from 'lucide-react'
import { MovieCard } from '@/components/movies/movie-card'
import { PosterImage } from '@/components/movies/poster-image'
import { movies } from '@/data/movies'

export function HomeCollections() {
  const showing = movies.filter((movie) => movie.status === 'showing').slice(0, 4)
  const upcoming = movies.filter((movie) => movie.status === 'upcoming')

  return <>
    <section className="border-t border-white/[0.06] bg-[#0d0d0d] py-12 sm:py-16">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#ffb4aa]">In theaters</p><h2 className="font-heading mt-2 text-3xl font-bold tracking-tight">Now Showing</h2></div><Link href="/movies" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white">View all titles <ArrowRight size={15} /></Link></div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">{showing.map((movie) => <MovieCard key={movie.slug} movie={movie} />)}</div>
      </div>
    </section>

    <section className="border-t border-white/[0.06] bg-[#111] py-12 sm:py-16">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#ffb4aa]">Exclusive pre-orders</p><h2 className="font-heading mt-2 text-3xl font-bold tracking-tight">Coming Soon to TMV</h2></div><p className="max-w-md text-sm leading-6 text-zinc-400">Reserve your preferred seats in advance for Algeria&apos;s most anticipated film premieres.</p></div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{upcoming.map((movie) => <article key={movie.slug} className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-[#171717]">
          <Link href={`/movies/${movie.slug}`} className="relative block aspect-[16/8] overflow-hidden bg-gradient-to-br from-[#42241f] to-[#111]" aria-label={`Read about ${movie.title}`}><PosterImage src={movie.poster} alt={`${movie.title} film artwork`} fallbackLabel={movie.title} className="poster-image transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" /><span className="absolute left-4 top-4 rounded bg-[#b80710] px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider">Premiere release</span></Link>
          <div className="p-5"><h3 className="font-heading text-lg font-bold">{movie.title}</h3><p className="mt-1 text-xs text-zinc-400">{movie.production} · {movie.releaseDate}</p><p className="mt-3 line-clamp-2 text-sm leading-5 text-zinc-400">{movie.synopsis}</p><div className="mt-4 flex items-center justify-between gap-2"><span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">Advance booking</span><Link href={`/movies/${movie.slug}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ffb4aa] hover:text-white">Film details <MoveUpRight size={14} /></Link></div></div>
        </article>)}</div>
      </div>
    </section>

    <section id="experiences" className="border-t border-white/[0.06] bg-[#090909] py-14 sm:py-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#ffb4aa]">Unrivaled auditorium architecture</p><h2 className="font-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl">The TMV Cinema Standards</h2><p className="mt-3 text-sm leading-6 text-zinc-400">Designed from acoustic blueprints to exceed global standards. Discover how our auditoriums transform cinema into sensory reality.</p></div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">{[
          { icon: Projector, title: 'IMAX® with Laser', text: 'Next-generation 4K dual-laser projection, a 1.43:1 expanded aspect ratio, and immersive 12-channel surround sound.' },
          { icon: Crown, title: 'VIP Noir Lounge', text: 'Motorized leather recliners, dedicated butler call buttons, pre-screening lounge, and in-seat gourmet dining.' },
          { icon: Sparkles, title: 'TMV 4DX & ScreenX', text: 'Synchronized motion, atmospheric effects, and a 270-degree panoramic sightline for select releases.' },
        ].map(({ icon: Icon, title, text }) => <article key={title} className="rounded-xl border border-white/[0.07] bg-[#141414] p-5 sm:p-6"><span className="grid size-10 place-items-center rounded-lg bg-[#b80710]/15 text-[#ffb4aa]"><Icon size={19} /></span><h3 className="font-heading mt-4 text-lg font-bold">{title}</h3><p className="mt-2 min-h-[72px] text-sm leading-6 text-zinc-400">{text}</p><Link href="/movies" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#ffb4aa]">Browse experiences <ArrowRight size={14} /></Link></article>)}</div>
      </div>
    </section>

    <section className="border-t border-white/[0.06] bg-[#111] py-14 sm:py-16">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-10">
        <div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#ffb4aa]">Artisanal concessions</p><h2 className="font-heading mt-2 max-w-md text-3xl font-bold tracking-tight">Curated Bites &amp; Barista Cocktails</h2><p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">Elevate your screening with hand-crafted culinary pairings prepared fresh on site. Skip the lobby queue with in-seat VIP delivery.</p><div className="mt-5 grid grid-cols-2 gap-2">{[['Truffle & Caramel Corn', 'Signature popped kettle recipe'], ['Specialty Roasts', 'Single-origin espresso & cold brews'], ['Signature Mocktails', 'Infused botanical blends'], ['Express Mobile Pick-up', 'Ready at your arrival']].map(([title, text]) => <div key={title} className="rounded-lg border border-white/[0.07] bg-[#191919] p-3"><Coffee size={15} className="text-[#e50914]" /><p className="mt-2 text-xs font-bold">{title}</p><p className="mt-1 text-[10px] leading-4 text-zinc-500">{text}</p></div>)}</div></div>
        <div className="grid gap-3 sm:grid-cols-2"><div className="flex min-h-[210px] flex-col justify-end rounded-2xl border border-white/[0.08] bg-[radial-gradient(ellipse_at_20%_10%,rgba(227,128,29,.25),transparent_40%),linear-gradient(145deg,#312116,#171717_55%,#0c0c0c)] p-5"><span className="grid size-10 place-items-center rounded-lg bg-black/30 text-amber-300"><Coffee size={20} /></span><p className="mt-auto text-[10px] font-bold uppercase tracking-widest text-amber-200">Freshly popped before every showtime</p><h3 className="font-heading mt-2 text-xl font-bold">Artisanal Gourmet Popcorn</h3></div><div className="flex min-h-[210px] flex-col justify-end rounded-2xl border border-white/[0.08] bg-[radial-gradient(ellipse_at_70%_10%,rgba(157,29,38,.26),transparent_40%),linear-gradient(145deg,#251719,#171717_55%,#0c0c0c)] p-5"><span className="grid size-10 place-items-center rounded-lg bg-black/30 text-rose-300"><Sparkles size={20} /></span><p className="mt-auto text-[10px] font-bold uppercase tracking-widest text-rose-200">VIP noir bar</p><h3 className="font-heading mt-2 text-xl font-bold">Signature Mocktails</h3></div></div>
      </div>
    </section>

    <section id="venues" className="scroll-mt-20 border-t border-white/[0.06] bg-[#090909] py-14 sm:py-16">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#ffb4aa]">Our complexes</p><h2 className="font-heading mt-2 text-3xl font-bold tracking-tight">TMV Algeria Venues</h2></div><p className="max-w-lg text-sm leading-6 text-zinc-400">Central locations engineered for effortless transport, covered parking facilities, and proximity to luxury retail.</p></div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">{[
          { label: 'Flagship theater', title: 'TMV Algiers — Garden City Mall', place: 'Chéraga, Wilaya d’Alger', screens: '8 Screens', format: 'IMAX 70mm Laser', perks: 'Underground 3-level parking · Complimentary 3 hours for ticket holders' },
          { label: 'Metropolitan complex', title: 'TMV Oran — Es-Senia Mall', place: 'Zone industrielle Es-Senia, Oran', screens: '6 Screens', format: '4DX Motion Hall', perks: 'Mall west parking access · Direct express elevators to level 3' },
        ].map((venue) => <article key={venue.title} className="rounded-xl border border-white/[0.08] bg-[#141414] p-5 sm:p-6"><div className="flex items-center justify-between gap-4"><p className="text-[9px] font-extrabold uppercase tracking-widest text-[#ffb4aa]">{venue.label}</p><span className="rounded bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-400">Open today · 10:00–01:30</span></div><h3 className="font-heading mt-2 text-xl font-bold">{venue.title}</h3><p className="mt-1 flex items-center gap-2 text-xs text-zinc-400"><MapPin size={13} />{venue.place}</p><div className="mt-4 grid grid-cols-3 gap-2 text-center"><span className="rounded-lg bg-white/[0.04] p-3 text-xs font-semibold">{venue.screens}</span><span className="rounded-lg bg-white/[0.04] p-3 text-xs font-semibold">{venue.format}</span><span className="rounded-lg bg-white/[0.04] p-3 text-xs font-semibold">VIP Noir</span></div><p className="mt-4 text-xs text-zinc-500">{venue.perks}</p><div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4"><Link href="/movies" className="text-xs font-semibold text-zinc-300 hover:text-white">View schedule</Link><Link href="/movies" className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/[0.06]">Browse screenings <ArrowRight size={13} /></Link></div></article>)}</div>
        <div className="mt-7 flex flex-col gap-5 rounded-2xl border border-[#5c2c2c] bg-[linear-gradient(110deg,#221b1b,#191717_50%,#321416)] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"><div><p className="inline-flex items-center gap-2 rounded bg-[#b80710]/20 px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider text-[#ffb4aa]">Exclusive privilege · TMV Noir membership</p><h3 className="font-heading mt-3 text-2xl font-extrabold sm:text-3xl">Elevate Every Screening with VIP Noir Status</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">Unlock advance premieres, access complimentary seat upgrades, gourmet concessions discounts, and private screenings.</p></div><Link href="/movies" className="primary-button min-h-11 shrink-0 px-5 text-sm"><Crown size={16} />Discover VIP Noir</Link></div>
      </div>
    </section>
  </>
}
