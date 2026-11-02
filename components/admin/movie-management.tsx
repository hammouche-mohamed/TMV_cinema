'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowDownWideNarrow, CalendarDays, CheckCircle2, CloudUpload, Download, Edit3, FileCheck2, Film, Gavel, MoreHorizontal, Search, ShieldCheck, Video, X } from 'lucide-react'
import { movies as initialMovies } from '@/data/movies'
import { catalogueMetrics } from '@/data/admin'
import type { Movie } from '@/types/cinema'
import { formatDzd } from '@/lib/format'

export function MovieManagement() {
  const [movieRows, setMovieRows] = useState<Movie[]>(initialMovies)
  const [query, setQuery] = useState('')
  const [runStatus, setRunStatus] = useState('All (18 Live)')
  const [format, setFormat] = useState('All Formats')
  const [language, setLanguage] = useState('All Localizations')
  const [selectedSlug, setSelectedSlug] = useState('dune-part-two')
  const [action, setAction] = useState<'ingest' | 'edit' | 'license' | ''>('')
  const [notice, setNotice] = useState('')
  const [verified, setVerified] = useState<Record<string, boolean>>(() => Object.fromEntries(initialMovies.map((movie) => [movie.slug, movie.status === 'showing'])))
  const [deactivated, setDeactivated] = useState<string[]>([])
  const [sortDescending, setSortDescending] = useState(true)
  const [titleInput, setTitleInput] = useState('')
  const [directorInput, setDirectorInput] = useState('')
  const [releaseInput, setReleaseInput] = useState('')

  const visibleMovies = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const result = movieRows.filter((movie) => {
      const meta = catalogueMetrics[movie.slug]
      const isInactive = deactivated.includes(movie.slug)
      const statusMatches = runStatus === 'All (18 Live)' || (runStatus === 'Now Showing' && movie.status === 'showing' && !isInactive) || (runStatus === 'Advance Booking' && movie.status === 'upcoming') || (runStatus === 'Archived / End of Run' && isInactive)
      const formatMatches = format === 'All Formats' || movie.format.some((value) => value.toLowerCase().includes(format.toLowerCase().split(' ')[0]))
      const languageMatches = language === 'All Localizations' || (language === 'VOSTFR (AR/FR Subs)' ? movie.language.toLowerCase().includes('vostfr') : movie.language.toLowerCase().includes(language.toLowerCase().split(' ')[0]))
      const searchMatches = !normalized || [movie.title, movie.director, movie.production, meta?.visa, ...movie.genres].join(' ').toLowerCase().includes(normalized)
      return statusMatches && formatMatches && languageMatches && searchMatches
    })
    result.sort((a, b) => {
      const difference = (catalogueMetrics[a.slug]?.gross ?? 0) - (catalogueMetrics[b.slug]?.gross ?? 0)
      return sortDescending ? -difference : difference
    })
    return result
  }, [movieRows, query, runStatus, format, language, deactivated, sortDescending])

  const selectedMovie = movieRows.find((movie) => movie.slug === selectedSlug) ?? movieRows[0]
  const selectedMeta = selectedMovie ? catalogueMetrics[selectedMovie.slug] : undefined

  function exportSheet() {
    const rows = [['Film', 'Director', 'Visa', 'Admissions', 'Gross DZD', 'Run status'], ...visibleMovies.map((movie) => {
      const meta = catalogueMetrics[movie.slug]
      return [movie.title, movie.director, meta?.visa ?? 'New demo title', String(meta?.admissions ?? 0), String(meta?.gross ?? 0), movie.status]
    })]
    const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'tmv-film-catalogue.csv'
    anchor.click()
    URL.revokeObjectURL(url)
    setNotice('Film catalogue exported as CSV.')
  }

  function submitIngest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const slug = titleInput.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-') || `demo-film-${Date.now()}`
    const prototypeMovie: Movie = {
      ...initialMovies[0], slug, title: titleInput.trim(), director: directorInput.trim(), releaseDate: releaseInput || 'Coming soon', status: 'upcoming',
      synopsis: 'Newly ingested sample title in the local TMV Cinemas catalogue prototype.', production: 'TMV Demo Distribution', rating: 0, cast: [],
    }
    setMovieRows((current) => [prototypeMovie, ...current])
    setVerified((current) => ({ ...current, [slug]: false }))
    setSelectedSlug(slug)
    setAction('')
    setTitleInput('')
    setDirectorInput('')
    setReleaseInput('')
    setNotice(`${prototypeMovie.title} was added to this local catalogue preview.`)
  }

  function submitEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedMovie) return
    setMovieRows((current) => current.map((movie) => movie.slug === selectedMovie.slug ? { ...movie, title: titleInput.trim(), director: directorInput.trim(), releaseDate: releaseInput || movie.releaseDate } : movie))
    setAction('')
    setNotice('Film metadata updated in the local preview.')
  }

  function toggleInactive(slug: string) {
    setDeactivated((current) => current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug])
    setNotice('Run status changed in the local prototype.')
  }

  function openEdit(movie: Movie) {
    setSelectedSlug(movie.slug)
    setTitleInput(movie.title)
    setDirectorInput(movie.director)
    setReleaseInput(movie.releaseDate)
    setAction('edit')
  }

  return <>
    <section className="flex flex-col gap-5 rounded-2xl border border-white/[0.06] bg-[#141414] p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between"><div className="max-w-3xl"><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-[#b80710]/15 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-[#ffb4aa]">Algerian territory theatrical operations</span><span className="size-1.5 rounded-full bg-zinc-600" /><span className="text-[10px] font-semibold text-zinc-500">GIE CNC regulated</span></div><h1 className="font-heading mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Movie &amp; Content Management</h1><p className="mt-2 text-sm text-zinc-400">Catalogue management, Algerian theatrical distribution licenses, subtitle tracks, and DCP projection packages.</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={exportSheet} className="secondary-button min-h-10 px-3 text-xs"><Download size={14} />Export Sheet</button><button type="button" onClick={() => setAction('license')} className="secondary-button min-h-10 px-3 text-xs"><ShieldCheck size={14} />Bulk License Update</button><button type="button" onClick={() => setAction('ingest')} className="primary-button min-h-10 px-4 text-xs"><CloudUpload size={15} />Ingest New Film / DCP</button></div></section>

    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{[
      { icon: Film, label: 'Active theatrical runs', value: '18', detail: 'Across 8 auditoriums in Algiers', tone: 'text-[#ffb4aa]' },
      { icon: FileCheck2, label: 'Ingested DCP releases', value: '8 upcoming', detail: 'Ready on Algiers Core SAN · 19.2 TB', tone: 'text-[#ffb4aa]' },
      { icon: Video, label: 'Dual Laser / 70mm Lic.', value: '4 active', detail: 'Auditorium 1 · Grand Palais IMAX', tone: 'text-emerald-400' },
      { icon: Gavel, label: 'Ministry of Culture compliance', value: '100% verified', detail: 'Valid Visa CNC certificates loaded', tone: 'text-emerald-400' },
    ].map(({ icon: Icon, label, value, detail, tone }) => <article key={label} className="flex items-start justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#141414] p-4"><div><p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{label}</p><p className="font-heading mt-2 text-xl font-extrabold">{value}</p><p className="mt-1 text-[10px] leading-4 text-zinc-500">{detail}</p></div><span className={`grid size-10 shrink-0 place-items-center rounded-lg bg-[#1c1c1c] ${tone}`}><Icon size={19} /></span></article>)}</section>

    <section className="rounded-xl border border-white/[0.06] bg-[#141414] p-3 sm:p-4"><div className="flex flex-col gap-3 xl:flex-row xl:items-center"><div className="relative min-w-0 flex-1"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" /><label htmlFor="catalog-search" className="sr-only">Search film catalogue</label><input id="catalog-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, director, Algerian distributor visa, or studio..." className="h-10 w-full rounded-lg border border-white/[0.06] bg-[#1c1c1c] pl-10 pr-3 text-xs text-white placeholder:text-zinc-600 focus:border-[#b80710] focus:outline-none" /></div><div className="flex flex-wrap gap-2"><label className="sr-only" htmlFor="run-filter">Run status</label><select id="run-filter" value={runStatus} onChange={(event) => setRunStatus(event.target.value)} className="h-10 rounded-lg bg-[#1c1c1c] px-3 text-xs text-zinc-200"><option>All (18 Live)</option><option>Now Showing</option><option>Advance Booking</option><option>Archived / End of Run</option></select><label className="sr-only" htmlFor="format-filter">Format</label><select id="format-filter" value={format} onChange={(event) => setFormat(event.target.value)} className="h-10 rounded-lg bg-[#1c1c1c] px-3 text-xs text-zinc-200"><option>All Formats</option><option>70mm IMAX</option><option>Dolby Atmos</option><option>4DX Laser</option><option>Standard DCI DCP</option></select><label className="sr-only" htmlFor="language-filter">Language track</label><select id="language-filter" value={language} onChange={(event) => setLanguage(event.target.value)} className="h-10 rounded-lg bg-[#1c1c1c] px-3 text-xs text-zinc-200"><option>All Localizations</option><option>VOSTFR (AR/FR Subs)</option><option>VF (French Dubbed)</option><option>Arabic Dubbed</option></select><button type="button" onClick={() => { setQuery(''); setRunStatus('All (18 Live)'); setFormat('All Formats'); setLanguage('All Localizations') }} title="Clear filters" aria-label="Clear catalogue filters" className="grid size-10 place-items-center rounded-lg bg-[#1c1c1c] text-zinc-400 hover:text-white"><X size={16} /></button></div></div></section>

    <section className="grid items-start gap-4 2xl:grid-cols-[minmax(0,1.75fr)_minmax(300px,.8fr)]">
      <article className="min-w-0 overflow-hidden rounded-xl border border-white/[0.06] bg-[#141414]"><div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5"><div className="flex items-center gap-2"><h2 className="font-heading text-base font-bold">Active Theatrical Catalogue</h2><span className="rounded bg-white/[0.06] px-2 py-1 text-[9px] font-bold text-zinc-400">{visibleMovies.length} films</span></div><div className="flex items-center gap-2 text-[10px] text-zinc-500"><span>Sort by:</span><button type="button" onClick={() => setSortDescending((current) => !current)} className="inline-flex items-center gap-1 font-bold text-white">Algerian box office <ArrowDownWideNarrow size={13} className={sortDescending ? '' : 'rotate-180'} /></button></div></div><div className="overflow-x-auto"><table className="w-full min-w-[920px] border-collapse text-left text-xs"><thead><tr className="bg-[#1c1c1c] text-[9px] font-bold uppercase tracking-wider text-zinc-500"><th className="px-4 py-3">Film title &amp; production</th><th className="px-3 py-3">Algerian visa / window</th><th className="px-3 py-3">Format &amp; localization</th><th className="px-3 py-3 text-right">Admissions &amp; gross (DZD)</th><th className="px-3 py-3 text-center">Status</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody>{visibleMovies.map((movie) => {
        const meta = catalogueMetrics[movie.slug]
        const isInactive = deactivated.includes(movie.slug)
        const isVerified = verified[movie.slug] ?? false
        return <tr key={movie.slug} tabIndex={0} onClick={() => setSelectedSlug(movie.slug)} onKeyDown={(event) => { if (event.key === 'Enter') setSelectedSlug(movie.slug) }} className={`cursor-pointer border-b border-white/[0.04] transition hover:bg-white/[0.03] ${selectedSlug === movie.slug ? 'bg-white/[0.025]' : ''}`}>
          <td className="px-4 py-3.5"><div className="flex items-center gap-3"><img src={movie.poster} alt={`${movie.title} poster`} loading="lazy" className="h-16 w-12 rounded-md object-cover" onError={(event) => { event.currentTarget.hidden = true }} /><div className="min-w-0"><p className="truncate font-heading text-sm font-bold">{movie.title}</p><p className="mt-1 truncate text-[10px] text-zinc-500">{movie.production} · {movie.director}</p><p className="mt-1 text-[9px] text-zinc-600">{movie.runtime} · {movie.ageRating}</p></div></div></td>
          <td className="px-3 py-3.5"><p className="font-mono text-[10px] font-bold">{meta?.visa ?? 'DZ-DEMO-0000'}</p><p className="mt-1 text-[10px] text-zinc-500">Exp: {meta?.expiry ?? movie.releaseDate}</p><p className={`mt-1 text-[9px] font-bold uppercase ${isVerified ? 'text-emerald-400' : 'text-amber-400'}`}>{isVerified ? 'CNC validated' : 'Visa pending'}</p></td>
          <td className="px-3 py-3.5"><div className="flex max-w-[180px] flex-wrap gap-1">{(meta?.formats ?? movie.format.slice(0, 2)).slice(0, 3).map((item) => <span key={item} className="rounded bg-[#090909] px-1.5 py-1 text-[8px] font-bold text-zinc-300">{item}</span>)}</div><p className="mt-1.5 max-w-[180px] truncate text-[10px] text-zinc-500">{meta?.localization ?? movie.language}</p></td>
          <td className="px-3 py-3.5 text-right"><p className="font-bold text-white">{formatDzd(meta?.gross ?? 0)}</p><p className="mt-1 text-[10px] text-zinc-500">{(meta?.admissions ?? 0).toLocaleString('en-US')} admissions</p><p className="mt-1 text-[9px] font-semibold text-emerald-400">{meta?.weekly ?? 'New title'}</p></td>
          <td className="px-3 py-3.5 text-center"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold ${isInactive ? 'bg-zinc-500/10 text-zinc-400' : movie.status === 'showing' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-300'}`}><span className={`size-1.5 rounded-full ${isInactive ? 'bg-zinc-500' : movie.status === 'showing' ? 'bg-emerald-500' : 'bg-amber-400'}`} />{isInactive ? 'Archived' : movie.status === 'showing' ? 'Active run' : 'Advance booking'}</span></td>
          <td className="px-4 py-3.5"><div className="flex items-center justify-end gap-1"><Link href="/admin/screenings" onClick={(event) => event.stopPropagation()} title="Schedule screenings" className="grid size-8 place-items-center rounded-md text-zinc-500 hover:bg-black/30 hover:text-white"><CalendarDays size={15} /></Link><button type="button" onClick={(event) => { event.stopPropagation(); openEdit(movie) }} title="Edit metadata" className="grid size-8 place-items-center rounded-md text-zinc-500 hover:bg-black/30 hover:text-white"><Edit3 size={15} /></button><button type="button" onClick={(event) => { event.stopPropagation(); toggleInactive(movie.slug) }} title={isInactive ? 'Restore run' : 'Archive run'} className="grid size-8 place-items-center rounded-md text-zinc-500 hover:bg-black/30 hover:text-rose-300"><MoreHorizontal size={15} /></button></div></td>
        </tr>
      })}{!visibleMovies.length && <tr><td colSpan={6} className="px-4 py-12 text-center text-sm text-zinc-500">No films match the current filters.</td></tr>}</tbody></table></div><div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-[10px] text-zinc-500"><span>Showing {visibleMovies.length} titles in the local catalogue preview</span><div className="flex gap-1"><button type="button" disabled className="rounded bg-white/[0.04] px-2.5 py-1.5 opacity-40">Previous</button><button type="button" className="rounded bg-[#b80710] px-2.5 py-1.5 text-white">1</button><button type="button" onClick={() => setNotice('All demo catalogue titles are visible on this page.')} className="rounded bg-white/[0.04] px-2.5 py-1.5">Next</button></div></div></article>

      <aside className="rounded-xl border border-white/[0.06] bg-[#141414] p-4 sm:p-5"><div className="flex items-start justify-between gap-3"><div><span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400"><span className="size-1.5 rounded-full bg-emerald-500" />DCP live &amp; projector locked</span><h2 className="font-heading mt-2 text-xl font-bold">{selectedMovie?.title ?? 'Select a title'}</h2><p className="mt-1 text-xs text-zinc-500">{selectedMovie?.production} · Algerian theatrical release</p></div><button type="button" onClick={() => setSelectedSlug('dune-part-two')} aria-label="Reset selected film" className="grid size-8 place-items-center rounded text-zinc-500 hover:bg-white/[0.06]"><X size={15} /></button></div>
        {selectedMovie && <><div className="mt-4 flex gap-3 rounded-xl bg-[#1c1c1c] p-3"><img src={selectedMovie.poster} alt={`${selectedMovie.title} poster`} className="h-20 w-14 rounded object-cover" onError={(event) => { event.currentTarget.hidden = true }} /><div className="flex flex-col justify-center"><span className="rounded bg-[#b80710] px-2 py-1 text-[8px] font-bold uppercase text-white">{isNaN(selectedMovie.rating) ? 'TMV' : `${selectedMovie.rating.toFixed(1)} IMDb`}</span><p className="mt-2 text-xs font-semibold">{selectedMovie.director}</p><p className="mt-1 text-[10px] text-zinc-500">{selectedMovie.runtime} · {selectedMovie.language}</p></div></div><div className="mt-4 rounded-xl bg-[#1c1c1c] p-4"><div className="flex items-center justify-between gap-2"><p className="inline-flex items-center gap-2 text-xs font-bold"><FileCheck2 size={15} className="text-[#ffb4aa]" />DCP Storage &amp; Integrity</p><span className="text-[9px] font-bold text-emerald-400">2.4 TB verified</span></div><div className="mt-3 flex justify-between text-[10px] text-zinc-500"><span>Storage ingestion · Algiers SAN</span><span>100% ingested</span></div><div className="mt-2 h-1 rounded-full bg-[#292929]"><span className="block h-full w-full rounded-full bg-emerald-500" /></div><div className="mt-3 grid grid-cols-2 gap-2"><div className="rounded-lg bg-[#111] p-2.5"><p className="text-[8px] uppercase text-zinc-500">KDM certificate key</p><p className="mt-1 font-mono text-[9px] font-bold">Valid → {selectedMeta?.expiry ?? selectedMovie.releaseDate}</p></div><div className="rounded-lg bg-[#111] p-2.5"><p className="text-[8px] uppercase text-zinc-500">CPL hash identity</p><p className="mt-1 font-mono text-[9px] font-bold">SHA-256 valid</p></div></div></div><div className="mt-4"><p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">Audio channels &amp; projection masters</p><div className="mt-2 flex flex-col gap-2 rounded-xl bg-[#1c1c1c] p-3 text-[10px]"><p className="flex items-center justify-between"><span className="inline-flex items-center gap-2"><Video size={13} className="text-[#ffb4aa]" />IMAX 12.1 discrete</span><span className="text-emerald-400">Hall 1 confirmed</span></p><p className="flex items-center justify-between"><span className="inline-flex items-center gap-2"><FileCheck2 size={13} className="text-[#ffb4aa]" />Dolby Atmos 64-channel</span><span className="text-emerald-400">Printmaster OK</span></p><p className="flex items-center justify-between"><span className="inline-flex items-center gap-2"><Film size={13} className="text-zinc-500" />VOSTFR subtitles</span><span className="text-zinc-400">Arabic + French</span></p></div></div><div className="mt-4 rounded-xl bg-[#1c1c1c] p-3"><p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">Algerian Ministry guidelines</p><p className="mt-2 flex items-center justify-between text-xs"><span><strong>{selectedMovie.ageRating}</strong> · Parental guidance</span><CheckCircle2 size={15} className="text-emerald-400" /></p><p className="mt-1 text-[10px] text-zinc-500">Mandatory ticket booth check is enabled.</p></div><div className="mt-4"><div className="flex items-center justify-between"><p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">Showtime pricing tiers (Algiers)</p><button type="button" onClick={() => setNotice('Pricing tier editor is available in this local mock panel.')} className="text-[10px] font-semibold text-[#ffb4aa] hover:text-white">Edit tiers</button></div><div className="mt-2 flex flex-col gap-1.5">{[['IMAX 70mm Grand Palais', '2,200 DZD'], ['Dolby Atmos Standard Hall', '1,600 DZD'], ['Matinee / Youth Tier', '1,100 DZD']].map(([tier, price]) => <div key={tier} className="flex items-center justify-between rounded-lg bg-[#1c1c1c] px-3 py-2 text-[10px]"><span className="text-zinc-400">{tier}</span><strong>{price}</strong></div>)}</div></div><Link href="/admin/screenings" className="primary-button mt-4 min-h-10 w-full px-3 text-xs"><CalendarDays size={14} />Schedule Screenings for Hall 1</Link><button type="button" onClick={() => setNotice('KDM re-generation is simulated. No keys were created.')} className="secondary-button mt-2 min-h-10 w-full px-3 text-xs"><ShieldCheck size={14} />Regenerate Server KDM Key</button></>}
      </aside>
    </section>

    {notice && <p role="status" className="rounded-lg border border-emerald-500/15 bg-emerald-500/[0.06] px-4 py-3 text-xs text-emerald-300">{notice}<button type="button" onClick={() => setNotice('')} className="ml-2 underline">Dismiss</button></p>}

    {action && <div className="fixed inset-0 z-[60] grid place-items-center bg-black/75 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setAction('') }}><section role="dialog" aria-modal="true" aria-labelledby="movie-action-title" className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#1b1b1b] p-5 shadow-2xl"><div className="flex items-center justify-between"><p className="text-[10px] font-bold uppercase tracking-wider text-[#ffb4aa]">Catalogue operations · local demo</p><button type="button" onClick={() => setAction('')} aria-label="Close catalogue dialog" className="grid size-9 place-items-center rounded-lg text-zinc-400 hover:bg-white/[0.06]"><X size={16} /></button></div><h2 id="movie-action-title" className="font-heading mt-2 text-xl font-bold">{action === 'ingest' ? 'Ingest New Film / DCP' : action === 'edit' ? 'Edit Film Metadata' : 'Bulk License Update'}</h2>{action === 'license' ? <><p className="mt-2 text-sm leading-6 text-zinc-400">Run a simulated validation pass across the sample Algerian distribution certificates. No external registry is contacted.</p><div className="mt-4 rounded-lg bg-[#0e0e0e] p-3 text-xs text-zinc-300">{movieRows.length} catalogue titles · certificate data remains local</div><div className="mt-5 flex justify-end gap-2"><button type="button" onClick={() => setAction('')} className="secondary-button min-h-10 px-4 text-xs">Cancel</button><button type="button" onClick={() => { setVerified(Object.fromEntries(movieRows.map((movie) => [movie.slug, true]))); setAction(''); setNotice('Bulk license validation completed in the local preview.') }} className="primary-button min-h-10 px-4 text-xs"><ShieldCheck size={14} />Verify sample licences</button></div></> : <form onSubmit={action === 'ingest' ? submitIngest : submitEdit} className="mt-4 flex flex-col gap-3"><label className="text-xs font-semibold text-zinc-400">Film title<input required value={titleInput} onChange={(event) => setTitleInput(event.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-white/[0.08] bg-[#0e0e0e] px-3 text-sm text-white focus:border-[#b80710] focus:outline-none" /></label><label className="text-xs font-semibold text-zinc-400">Director<input required value={directorInput} onChange={(event) => setDirectorInput(event.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-white/[0.08] bg-[#0e0e0e] px-3 text-sm text-white focus:border-[#b80710] focus:outline-none" /></label><label className="text-xs font-semibold text-zinc-400">Release date / window<input value={releaseInput} onChange={(event) => setReleaseInput(event.target.value)} placeholder="e.g. November 2024" className="mt-1.5 h-10 w-full rounded-lg border border-white/[0.08] bg-[#0e0e0e] px-3 text-sm text-white focus:border-[#b80710] focus:outline-none" /></label><p className="text-[10px] leading-4 text-zinc-500">A sample poster from the catalogue is reused for newly ingested local demo titles.</p><div className="mt-2 flex justify-end gap-2"><button type="button" onClick={() => setAction('')} className="secondary-button min-h-10 px-4 text-xs">Cancel</button><button type="submit" className="primary-button min-h-10 px-4 text-xs">{action === 'ingest' ? 'Add to catalogue' : 'Save metadata'}</button></div></form>}</section></div>}
  </>
}
