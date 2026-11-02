'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { getMovie } from '@/data/movies'
import { getScreening, screenings } from '@/data/screenings'
import type { CustomerDetails, PaymentMethod } from '@/types/cinema'

const defaultCustomer: CustomerDetails = {
  name: 'Amine Khelifi',
  email: 'amine.khelifi@example.dz',
  phone: '0555 12 34 56',
}

type Concession = 'popcorn' | 'soda'
type BookingContextValue = {
  movieSlug: string
  screeningId: string
  seats: string[]
  customer: CustomerDetails
  concessions: Record<Concession, boolean>
  paymentMethod: PaymentMethod
  reference: string | null
  movie: NonNullable<ReturnType<typeof getMovie>>
  screening: ReturnType<typeof getScreening>
  total: number
  beginBooking: (movieSlug: string, screeningId?: string) => void
  setScreening: (screeningId: string) => void
  toggleSeat: (seatId: string) => void
  updateCustomer: (details: Partial<CustomerDetails>) => void
  setConcession: (item: Concession, selected: boolean) => void
  setPaymentMethod: (method: PaymentMethod) => void
  confirmReservation: () => string
  clearReference: () => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

const seatPrice = (seatId: string, screeningPrice: number) => seatId.startsWith('G') || seatId.startsWith('H') ? 2500 : screeningPrice

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [movieSlug, setMovieSlug] = useState('dune-part-two')
  const [screeningId, setScreeningIdState] = useState('dune-imax-2030')
  const [seats, setSeats] = useState<string[]>(['E8', 'E9', 'E10'])
  const [customer, setCustomer] = useState<CustomerDetails>(defaultCustomer)
  const [concessions, setConcessions] = useState<Record<Concession, boolean>>({ popcorn: false, soda: false })
  const [paymentMethod, setPaymentMethodState] = useState<PaymentMethod>('edahabia')
  const [reference, setReference] = useState<string | null>(null)

  const movie = getMovie(movieSlug) ?? getMovie('dune-part-two')!
  const screening = getScreening(screeningId)
  const total = seats.reduce((sum, seatId) => sum + seatPrice(seatId, screening.price), 0)
    + (concessions.popcorn ? 700 : 0)
    + (concessions.soda ? 350 : 0)

  const beginBooking = useCallback((slug: string, selectedScreeningId?: string) => {
    const firstScreening = screenings.find((item) => item.movieSlug === slug)?.id ?? 'dune-imax-2030'
    setMovieSlug(slug)
    setScreeningIdState(selectedScreeningId ?? firstScreening)
    setSeats(['E8', 'E9', 'E10'])
    setConcessions({ popcorn: false, soda: false })
    setReference(null)
  }, [])

  const setScreening = useCallback((id: string) => {
    setScreeningIdState(id)
    setSeats(['E8', 'E9', 'E10'])
    setReference(null)
  }, [])

  const toggleSeat = useCallback((seatId: string) => {
    setSeats((current) => {
      if (current.includes(seatId)) return current.filter((seat) => seat !== seatId)
      return current.length < 6 ? [...current, seatId] : current
    })
    setReference(null)
  }, [])

  const updateCustomer = useCallback((details: Partial<CustomerDetails>) => {
    setCustomer((current) => ({ ...current, ...details }))
    setReference(null)
  }, [])

  const setConcession = useCallback((item: Concession, selected: boolean) => {
    setConcessions((current) => ({ ...current, [item]: selected }))
    setReference(null)
  }, [])

  const setPaymentMethod = useCallback((method: PaymentMethod) => setPaymentMethodState(method), [])

  const confirmReservation = useCallback(() => {
    const nextReference = reference ?? `TMV-ALG-${Math.floor(1000 + Math.random() * 9000)}-${movieSlug === 'dune-part-two' ? 'D2' : movieSlug.slice(0, 2).toUpperCase()}`
    setReference(nextReference)
    return nextReference
  }, [movieSlug, reference])

  const clearReference = useCallback(() => setReference(null), [])

  const value = useMemo(() => ({
    movieSlug, screeningId, seats, customer, concessions, paymentMethod, reference,
    movie, screening, total, beginBooking, setScreening, toggleSeat, updateCustomer,
    setConcession, setPaymentMethod, confirmReservation, clearReference,
  }), [movieSlug, screeningId, seats, customer, concessions, paymentMethod, reference, movie, screening, total, beginBooking, setScreening, toggleSeat, updateCustomer, setConcession, setPaymentMethod, confirmReservation, clearReference])

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) throw new Error('useBooking must be used within BookingProvider')
  return context
}
