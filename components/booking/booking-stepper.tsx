import { Check } from 'lucide-react'

const labels = ['Movie', 'Date & time', 'Auditorium', 'Select seats', 'Payment & info', 'Pass & ticket']

export function BookingStepper({ activeStep }: { activeStep: number }) {
  return <nav aria-label="Reservation progress" className="overflow-x-auto border-b border-white/[0.08] bg-[#111]">
    <ol className="mx-auto flex min-w-[760px] max-w-[1440px] items-center gap-2 px-5 py-4 sm:px-8 lg:px-10">
      {labels.map((label, index) => {
        const step = index + 1
        const complete = step < activeStep
        const active = step === activeStep
        return <li key={label} className="flex min-w-0 flex-1 items-center gap-2">
          <span className={`grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-extrabold ${complete ? 'bg-emerald-500 text-[#06170d]' : active ? 'bg-[#b80710] text-white ring-4 ring-[#b80710]/20' : 'bg-[#242424] text-zinc-500'}`}>{complete ? <Check size={14} /> : step}</span>
          <span className="min-w-0"><span className={`block text-[9px] font-bold uppercase tracking-wider ${active ? 'text-[#ffb4aa]' : 'text-zinc-500'}`}>{active ? 'Current step' : `Step 0${step}`}</span><span className={`block truncate text-[11px] font-semibold ${active ? 'text-white' : 'text-zinc-400'}`}>{label}</span></span>
          {step < labels.length && <span className={`hidden h-px flex-1 sm:block ${complete ? 'bg-emerald-500/40' : 'bg-white/10'}`} />}
        </li>
      })}
    </ol>
  </nav>
}
