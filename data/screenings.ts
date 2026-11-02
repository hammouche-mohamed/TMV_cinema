import type { CinemaRoom, Screening } from '@/types/cinema'

export const rooms: CinemaRoom[] = [
  {
    id: 'hall-01', name: 'Hall 01 — IMAX® with Laser', format: 'IMAX Laser 70mm', capacity: 420,
    rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], seatsPerRow: 12, vipRows: ['G', 'H'],
    accessibleSeats: ['C1', 'C12'], occupiedSeats: ['A3', 'A10', 'B5', 'B6', 'B7', 'D5', 'F10', 'G5', 'H6'],
  },
  {
    id: 'hall-02', name: 'Hall 02 — Dolby Atmos', format: 'Dolby Atmos 4K', capacity: 280,
    rows: ['A', 'B', 'C', 'D', 'E', 'F'], seatsPerRow: 10, vipRows: [], accessibleSeats: ['C1', 'C10'], occupiedSeats: ['A2', 'A3', 'B5', 'C8', 'D4', 'E7'],
  },
  {
    id: 'hall-03', name: 'Hall 03 — VIP Noir Lounge', format: 'VIP Noir Recliner', capacity: 64,
    rows: ['A', 'B', 'C', 'D', 'E', 'F'], seatsPerRow: 8, vipRows: ['A', 'B', 'C', 'D', 'E', 'F'],
    accessibleSeats: ['A1'], occupiedSeats: ['B3', 'D6'],
  },
  {
    id: 'hall-04', name: 'Hall 04 — 4DX Motion', format: '4DX Motion 3D', capacity: 156,
    rows: ['A', 'B', 'C', 'D', 'E', 'F'], seatsPerRow: 10, vipRows: [], accessibleSeats: ['C1'], occupiedSeats: ['A4', 'B2', 'C8', 'E5'],
  },
]

export const screenings: Screening[] = [
  { id: 'dune-imax-1415', movieSlug: 'dune-part-two', date: '2024-03-30', dateLabel: 'Today, Sat 30 Mar 2024', time: '14:15', roomId: 'hall-01', roomName: 'Hall 01 — IMAX® with Laser', format: 'IMAX 70mm', price: 1600, availableSeats: 67, totalSeats: 420, language: 'VOSTFR • French & Arabic subtitles' },
  { id: 'dune-imax-1730', movieSlug: 'dune-part-two', date: '2024-03-30', dateLabel: 'Today, Sat 30 Mar 2024', time: '17:30', roomId: 'hall-01', roomName: 'Hall 01 — IMAX® with Laser', format: 'IMAX 70mm', price: 1600, availableSeats: 34, totalSeats: 420, language: 'VOSTFR • French & Arabic subtitles' },
  { id: 'dune-imax-2030', movieSlug: 'dune-part-two', date: '2024-03-30', dateLabel: 'Today, Sat 30 Mar 2024', time: '20:30', roomId: 'hall-01', roomName: 'Hall 01 — IMAX® with Laser', format: 'IMAX 70mm', price: 1600, availableSeats: 17, totalSeats: 420, language: 'VOSTFR • French & Arabic subtitles' },
  { id: 'dune-dolby-2315', movieSlug: 'dune-part-two', date: '2024-03-30', dateLabel: 'Today, Sat 30 Mar 2024', time: '23:15', roomId: 'hall-02', roomName: 'Hall 02 — Dolby Atmos', format: 'Dolby Atmos 4K', price: 1200, availableSeats: 98, totalSeats: 280, language: 'VF • French dub' },
  { id: 'dune-vip-1845', movieSlug: 'dune-part-two', date: '2024-03-31', dateLabel: 'Tomorrow, Sun 31 Mar 2024', time: '18:45', roomId: 'hall-03', roomName: 'Hall 03 — VIP Noir Lounge', format: 'VIP Noir Recliner', price: 2500, availableSeats: 4, totalSeats: 64, language: 'VOSTFR • French & Arabic subtitles' },
  { id: 'oppenheimer-1515', movieSlug: 'oppenheimer', date: '2024-03-30', dateLabel: 'Today, Sat 30 Mar 2024', time: '15:15', roomId: 'hall-01', roomName: 'Hall 01 — IMAX® with Laser', format: '70mm Film', price: 1600, availableSeats: 42, totalSeats: 420, language: 'VOSTFR • French & Arabic subtitles' },
  { id: 'oppenheimer-1930', movieSlug: 'oppenheimer', date: '2024-03-30', dateLabel: 'Today, Sat 30 Mar 2024', time: '19:30', roomId: 'hall-02', roomName: 'Hall 02 — Dolby Atmos', format: 'Dolby Atmos 4K', price: 1500, availableSeats: 25, totalSeats: 280, language: 'VOSTFR • French & Arabic subtitles' },
  { id: 'furiosa-1700', movieSlug: 'furiosa', date: '2024-03-30', dateLabel: 'Today, Sat 30 Mar 2024', time: '17:00', roomId: 'hall-04', roomName: 'Hall 04 — 4DX Motion', format: '4DX Motion 3D', price: 2200, availableSeats: 28, totalSeats: 156, language: 'VOSTFR • French & Arabic subtitles' },
  { id: 'furiosa-2115', movieSlug: 'furiosa', date: '2024-03-30', dateLabel: 'Today, Sat 30 Mar 2024', time: '21:15', roomId: 'hall-04', roomName: 'Hall 04 — 4DX Motion', format: '4DX Motion 3D', price: 2200, availableSeats: 15, totalSeats: 156, language: 'VOSTFR • French & Arabic subtitles' },
  { id: 'challengers-1645', movieSlug: 'challengers', date: '2024-03-30', dateLabel: 'Today, Sat 30 Mar 2024', time: '16:45', roomId: 'hall-03', roomName: 'Hall 03 — VIP Noir Lounge', format: 'VIP Noir Recliner', price: 2500, availableSeats: 9, totalSeats: 64, language: 'VOSTFR • French & Arabic subtitles' },
  { id: 'inside-out-2-1330', movieSlug: 'inside-out-2', date: '2024-03-30', dateLabel: 'Today, Sat 30 Mar 2024', time: '13:30', roomId: 'hall-02', roomName: 'Hall 02 — Dolby Atmos', format: 'Family 2D', price: 1000, availableSeats: 86, totalSeats: 280, language: 'VF • French dub + Arabic subtitles' },
  { id: 'gladiator-ii-2030', movieSlug: 'gladiator-ii', date: '2024-11-15', dateLabel: 'Opening night, Fri 15 Nov 2024', time: '20:30', roomId: 'hall-01', roomName: 'Hall 01 — IMAX® with Laser', format: 'IMAX Laser', price: 1800, availableSeats: 120, totalSeats: 420, language: 'VOSTFR • French & Arabic subtitles' },
  { id: 'deadpool-2030', movieSlug: 'deadpool-and-wolverine', date: '2024-07-24', dateLabel: 'Premiere, Wed 24 Jul 2024', time: '20:30', roomId: 'hall-04', roomName: 'Hall 04 — 4DX Motion', format: '4DX Motion 3D', price: 2400, availableSeats: 36, totalSeats: 156, language: 'VOSTFR • French & Arabic subtitles' },
]

export const getRoom = (roomId: string) => rooms.find((room) => room.id === roomId) ?? rooms[0]
export const getScreening = (screeningId: string) => screenings.find((screening) => screening.id === screeningId) ?? screenings[2]
