'use client'

import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useBooking } from '@/components/booking/booking-provider'

export function StartBookingButton({ movieSlug, screeningId, className = 'primary-button', children }: { movieSlug: string; screeningId?: string; className?: string; children: ReactNode }) {
  const router = useRouter()
  const { beginBooking } = useBooking()

  return <button type="button" className={className} onClick={() => { beginBooking(movieSlug, screeningId); router.push('/booking/seats') }}>{children}</button>
}
