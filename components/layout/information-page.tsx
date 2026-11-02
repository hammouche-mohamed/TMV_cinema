import Link from 'next/link'
import { ArrowLeft, BadgeCheck, CreditCard, Gift, LockKeyhole, ScrollText, ShieldCheck } from 'lucide-react'

const informationSections = [
  {
    id: 'cinema-policies',
    title: 'Cinema policies',
    description: 'A quick guide to a comfortable visit at TMV Cinemas.',
    details: ['Arrive around 30 minutes before your screening for entry and concession pickup.', 'Age guidance and content ratings are shown on each film listing.', 'Auditorium seating and accessibility details are sample information in this prototype.'],
    icon: ScrollText,
  },
  {
    id: 'gift-cards',
    title: 'Gift cards & vouchers',
    description: 'Gift card purchase and redemption are not enabled in this demo.',
    details: ['No gift card codes are issued or accepted here.', 'The sample concession voucher on a ticket preview is not redeemable.', 'For the prototype, all listed rewards are illustrative only.'],
    icon: Gift,
  },
  {
    id: 'privacy',
    title: 'Privacy notice',
    description: 'This prototype does not submit or retain the details entered in the booking form.',
    details: ['Customer details stay in temporary React state in the current browser session.', 'No account, analytics, payment, email, SMS, or reservation service is connected.', 'Reloading or leaving the prototype may clear your sample booking details.'],
    icon: LockKeyhole,
  },
  {
    id: 'terms',
    title: 'Ticketing terms',
    description: 'Every booking and ticket shown in this experience is simulated.',
    details: ['No real seats are held, no payment is taken, and no ticket is issued.', 'Seat maps, prices, dates, and reservation references are sample content.', 'The on-screen QR pattern is decorative and cannot be used for entry.'],
    icon: CreditCard,
  },
  {
    id: 'security',
    title: 'Security & trust',
    description: 'Use only sample details while exploring this frontend demonstration.',
    details: ['Payment methods are visual previews and do not connect to a bank or wallet.', 'Do not enter real card numbers, passwords, or other sensitive information.', 'The prototype contains no authentication or external booking integrations.'],
    icon: ShieldCheck,
  },
]

export function CinemaInformationPage() {
  return (
      <div className="min-h-[60vh] bg-[#090909] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
      <div className="mx-auto max-w-[1120px]">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 transition hover:text-white"><ArrowLeft size={14} />Back to TMV Cinemas</Link>
        <section className="mt-7 rounded-2xl border border-white/[0.08] bg-[radial-gradient(ellipse_at_top_right,rgba(184,7,16,.16),transparent_55%),#141414] p-6 sm:p-9">
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#ffb4aa]">Visitor information · Prototype</p>
          <h1 className="font-heading mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Good to know before the show</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">Visitor information for this TMV Cinemas frontend demonstration. The policies below are explanatory sample content, not legal terms for a real cinema.</p>
        </section>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {informationSections.map(({ id, title, description, details, icon: Icon }) => (
            <section key={id} id={id} className="scroll-mt-24 rounded-xl border border-white/[0.07] bg-[#141414] p-5 sm:p-6">
              <div className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#b80710]/10 text-[#ffb4aa]"><Icon size={18} /></span><div><h2 className="font-heading text-lg font-bold">{title}</h2><p className="mt-1 text-xs leading-5 text-zinc-400">{description}</p></div></div>
              <ul className="mt-4 flex flex-col gap-2 border-t border-white/[0.06] pt-4">{details.map((detail) => <li key={detail} className="flex gap-2 text-xs leading-5 text-zinc-300"><BadgeCheck size={14} className="mt-0.5 shrink-0 text-emerald-400" />{detail}</li>)}</ul>
            </section>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2"><Link href="/movies" className="primary-button min-h-10 px-4 text-xs">Browse movies</Link><Link href="/booking/seats" className="secondary-button min-h-10 px-4 text-xs">Explore demo booking</Link></div>
      </div>
      </div>
  )
}
