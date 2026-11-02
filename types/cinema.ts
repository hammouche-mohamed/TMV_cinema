export type ReleaseStatus = 'showing' | 'upcoming'
export type SeatKind = 'standard' | 'vip' | 'accessible'
export type PaymentMethod = 'edahabia' | 'cib' | 'wallet' | 'box-office'

export interface Movie {
  slug: string
  title: string
  poster: string
  backdrop: string
  genres: string[]
  runtime: string
  rating: number
  ageRating: string
  status: ReleaseStatus
  language: string
  format: string[]
  releaseDate: string
  synopsis: string
  director: string
  cast: string[]
  production: string
}

export interface Screening {
  id: string
  movieSlug: string
  date: string
  dateLabel: string
  time: string
  roomId: string
  roomName: string
  format: string
  price: number
  availableSeats: number
  totalSeats: number
  language: string
}

export interface CinemaRoom {
  id: string
  name: string
  format: string
  capacity: number
  rows: string[]
  seatsPerRow: number
  vipRows: string[]
  accessibleSeats: string[]
  occupiedSeats: string[]
}

export interface CustomerDetails {
  name: string
  email: string
  phone: string
}

export interface Reservation {
  reference: string
  movieSlug: string
  screeningId: string
  seats: string[]
  customer: CustomerDetails
  total: number
}
