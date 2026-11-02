'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Banknote, CheckCircle2, CreditCard, Info, LockKeyhole, Smartphone, Wallet } from 'lucide-react'
import { useBooking } from '@/components/booking/booking-provider'
import type { PaymentMethod } from '@/types/cinema'

const paymentOptions: { value: PaymentMethod; title: string; subtitle: string; icon: typeof CreditCard }[] = [
  { value: 'edahabia', title: 'Edahabia Card', subtitle: 'Algérie Poste', icon: CreditCard },
  { value: 'cib', title: 'CIB Interbank Card', subtitle: 'SATIM Network', icon: Banknote },
  { value: 'wallet', title: 'Digital Wallets', subtitle: 'Apple Pay / Google Pay', icon: Wallet },
  { value: 'box-office', title: 'Reserve & Pay at TMV Box Office', subtitle: 'Demo reservation only · no payment now', icon: Smartphone },
]

export function CheckoutForm() {
  const router = useRouter()
  const { customer, updateCustomer, paymentMethod, setPaymentMethod, seats, confirmReservation, total } = useBooking()
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState('')

  function submitReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!seats.length) {
      setStatus('Choose at least one seat before continuing.')
      router.push('/booking/seats')
      return
    }
    setSubmitting(true)
    setStatus('Running a local demonstration check…')
    window.setTimeout(() => {
      confirmReservation()
      router.push('/booking/confirmation')
    }, 400)
  }

  return <section className="rounded-2xl border border-white/[0.08] bg-[#141414] p-4 sm:p-6 lg:p-7">
    <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#ffb4aa]">Section 01</p><h2 className="font-heading mt-2 text-2xl font-bold tracking-tight">Customer Information</h2><p className="mt-1 text-sm text-zinc-400">Passes are prepared for email and SMS delivery in this demo.</p></div><span className="hidden items-center gap-2 rounded-full bg-white/[0.05] px-3 py-2 text-xs font-semibold text-[#ffb4aa] sm:inline-flex"><CheckCircle2 size={15} />VIP Noir perks linked</span></div>
    <form onSubmit={submitReservation} className="mt-5 flex flex-col gap-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-zinc-400">Full name<input autoComplete="name" required minLength={2} value={customer.name} onChange={(event) => updateCustomer({ name: event.target.value })} className="h-11 rounded-lg border border-white/[0.08] bg-[#1c1c1c] px-3.5 text-sm font-normal text-white focus:border-[#b80710] focus:outline-none" /></label>
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-zinc-400">E-ticket destination<input autoComplete="email" required type="email" value={customer.email} onChange={(event) => updateCustomer({ email: event.target.value })} className="h-11 rounded-lg border border-white/[0.08] bg-[#1c1c1c] px-3.5 text-sm font-normal text-white focus:border-[#b80710] focus:outline-none" /></label>
      </div>
      <label className="flex flex-col gap-1.5 text-xs font-semibold text-zinc-400">Algerian mobile number <span className="flex gap-2"><span className="inline-flex h-11 shrink-0 items-center rounded-lg border border-white/[0.08] bg-[#1c1c1c] px-3 text-sm font-semibold text-white">DZ +213</span><input autoComplete="tel" required type="tel" inputMode="tel" pattern="[0-9+() -]{8,20}" value={customer.phone} onChange={(event) => updateCustomer({ phone: event.target.value })} className="h-11 min-w-0 flex-1 rounded-lg border border-white/[0.08] bg-[#1c1c1c] px-3.5 text-sm font-normal text-white focus:border-[#b80710] focus:outline-none" aria-describedby="phone-help" /></span><span id="phone-help" className="text-[10px] font-normal text-zinc-500">Used for the simulated gate pass and booking updates.</span></label>
      <div className="flex flex-col gap-2"><label className="flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-zinc-400"><input type="checkbox" defaultChecked className="mt-1 accent-[#b80710]" />Send pass and screening alerts by SMS and WhatsApp.</label><label className="flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-zinc-400"><input type="checkbox" defaultChecked className="mt-1 accent-[#b80710]" />Keep my contact details for a faster demo checkout next time.</label></div>

      <div className="border-t border-white/[0.08] pt-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#ffb4aa]">Section 02</p><h2 className="font-heading mt-2 text-2xl font-bold tracking-tight">Payment Gateway</h2><p className="mt-1 text-sm text-zinc-400">Select a simulated Algerian settlement method.</p></div><span className="inline-flex items-center gap-2 rounded-lg bg-white/[0.05] px-3 py-2 text-[10px] font-bold uppercase tracking-wide"><LockKeyhole size={14} className="text-[#ffb4aa]" />SATIM 256-bit sandbox</span></div>
        <div className="mt-4 flex gap-3 rounded-xl border border-amber-500/10 bg-amber-500/[0.06] p-4"><Info size={18} className="mt-0.5 shrink-0 text-amber-400" /><div><p className="text-xs font-bold text-white">Simulated sandbox environment</p><p className="mt-1 text-xs leading-5 text-zinc-400">No actual funds will be charged. This frontend demonstration does not connect to a payment gateway or reserve seats with a cinema.</p></div></div>
        <fieldset className="mt-4 flex flex-col gap-2"><legend className="sr-only">Choose a demo payment method</legend>{paymentOptions.map(({ value, title, subtitle, icon: Icon }) => <label key={value} className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-4 transition ${paymentMethod === value ? 'border-[#b80710]/60 bg-[#1c1c1c]' : 'border-white/[0.06] bg-[#1c1c1c]/65 hover:border-white/15'}`}><span className="flex min-w-0 items-center gap-3"><input type="radio" name="payment-method" value={value} checked={paymentMethod === value} onChange={() => setPaymentMethod(value)} className="size-4 accent-[#b80710]" /><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-black/20 text-zinc-300"><Icon size={17} /></span><span className="min-w-0"><span className="block text-sm font-bold text-white">{title}</span><span className="mt-0.5 block text-[10px] text-zinc-500">{subtitle}</span></span></span><span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{value === 'edahabia' ? 'Demo' : value === 'cib' ? 'CIB' : value === 'wallet' ? 'Tap' : 'Desk'}</span></label>)}</fieldset>
        {paymentMethod === 'edahabia' && <div className="mt-3 rounded-xl border border-white/[0.06] bg-[#0f0f0f] p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Demo card details</p><div className="mt-3 flex h-11 items-center justify-between rounded-lg bg-[#1c1c1c] px-3.5"><span className="font-mono text-sm tracking-[.17em] text-white">6280 4812 •••• 9410</span><CheckCircle2 size={15} className="text-emerald-400" /></div><div className="mt-3 grid grid-cols-2 gap-3"><label className="text-[10px] font-bold uppercase text-zinc-500">Expiration<input readOnly value="11 / 27" className="mt-1 h-10 w-full rounded-lg bg-[#1c1c1c] px-3 text-center font-mono text-sm text-zinc-300" /></label><label className="text-[10px] font-bold uppercase text-zinc-500">Security code<input readOnly value="•••" className="mt-1 h-10 w-full rounded-lg bg-[#1c1c1c] px-3 text-center font-mono text-sm text-zinc-300" /></label></div><p className="mt-3 inline-flex items-center gap-2 text-[10px] text-zinc-500"><LockKeyhole size={12} className="text-[#ffb4aa]" />No card information is requested or transmitted.</p></div>}
        {paymentMethod !== 'edahabia' && <div className="mt-3 rounded-lg bg-[#0f0f0f] p-4 text-xs leading-5 text-zinc-400">{paymentMethod === 'cib' ? 'A sample CIB confirmation will be displayed. No bank connection is made.' : paymentMethod === 'wallet' ? 'This demo will show a wallet-ready ticket preview without contacting Apple Pay or Google Pay.' : 'Your sample seat selection will be shown as reserved for counter payment in the ticket preview.'}</div>}
      </div>

      <div className="border-t border-white/[0.08] pt-5"><button type="submit" disabled={submitting || !seats.length} className="primary-button min-h-14 w-full px-4 text-base sm:text-lg"><span>{submitting ? 'Preparing demo ticket…' : 'Confirm & Generate E-Ticket'}</span><span className="text-xs font-medium opacity-80 sm:text-sm">({total.toLocaleString('en-US')} DZD)</span>{submitting ? <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <ArrowRight size={18} />}</button><p className="mt-3 text-center text-[10px] leading-4 text-zinc-500">By confirming, you accept the TMV Cinemas ticketing conditions. This is a simulated reservation only.</p>{status && <p role="status" className="mt-2 text-center text-xs text-amber-300">{status}</p>}
        <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-[#1c1c1c] p-3 text-center"><span className="text-[9px] font-bold text-zinc-300"><CheckCircle2 size={15} className="mx-auto mb-1 text-emerald-400" />SATIM sandbox</span><span className="text-[9px] font-bold text-zinc-300"><CheckCircle2 size={15} className="mx-auto mb-1 text-emerald-400" />Free refund window</span><span className="text-[9px] font-bold text-zinc-300"><CheckCircle2 size={15} className="mx-auto mb-1 text-emerald-400" />Instant demo pass</span></div>
      </div>
    </form>
  </section>
}
