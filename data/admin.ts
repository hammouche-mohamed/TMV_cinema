export interface HallSnapshot {
  id: string
  name: string
  format: string
  seats: number
  movie: string
  occupancy: number
  slot: string
  state: 'live' | 'cleaning' | 'sold-out' | 'ready'
  details: string[]
}

export const hallSnapshots: HallSnapshot[] = [
  { id: '01', name: 'Hall 01', format: 'IMAX® 70mm Laser', seats: 420, movie: 'Dune: Part Two', occupancy: 96, slot: '20:30 – 23:15', state: 'live', details: ['Dual Laser 4K · Active OK', 'Atmos 64-Ch · Calibrated', 'Gates A & B · Online / Synced'] },
  { id: '02', name: 'Hall 02', format: 'Dolby Atmos', seats: 280, movie: 'Civil War', occupancy: 82, slot: '19:30 – 21:19', state: 'live', details: ['Christie CP4430 · 9,200 Lm', 'Atmos immersive · OK (7.1 sub)', 'Cleaning squad standby 21:15'] },
  { id: '03', name: 'Hall 03', format: 'VIP Noir Recliner', seats: 64, movie: 'Dune: Part Two', occupancy: 100, slot: '21:45 · Pre-show', state: 'sold-out', details: ['In-seat dining · 64 orders sent', 'Recliners sync · All online', 'Sommelier service · Lounge active'] },
  { id: '04', name: 'Hall 04', format: '4DX & ScreenX', seats: 160, movie: 'Furiosa: A Mad Max Saga', occupancy: 91, slot: '20:00 – 22:28', state: 'live', details: ['Hydraulics · Nominal 120 bar', 'Wind & fog FX · Active', 'Safety locks · Engaged'] },
  { id: '05', name: 'Hall 05', format: 'Family Sound', seats: 190, movie: 'Oppenheimer', occupancy: 74, slot: '18:45 · Final reel', state: 'live', details: ['Barco 4K Laser · Active', '7.1 surround · Normal', 'Next slot · 22:15'] },
  { id: '06', name: 'Hall 06', format: 'Classic & Lab', seats: 180, movie: 'Intermission cleaning', occupancy: 0, slot: 'Ready in 5m', state: 'cleaning', details: ['Reset progress · 65% cleared', 'Clean team B · 4 staff inside', 'Air purge cycle · Active'] },
  { id: '07', name: 'Hall 07', format: 'Standard', seats: 210, movie: 'Inside Out 2', occupancy: 82, slot: 'Start film', state: 'live', details: ['DCP playlist · Cue ready', 'Turnstile boarding · Active', 'Kids booster · 42 issued'] },
  { id: '08', name: 'Hall 08', format: 'Standard Boutique', seats: 150, movie: 'Pre-show readiness', occupancy: 78, slot: 'Doors open in 12m', state: 'ready', details: ['Lighting automation · House preset', 'Projector status · Warmed up', 'Handheld gate · Staff assigned'] },
]

export interface ScheduledSlot {
  id: string
  movie: string
  hallId: string
  start: number
  end: number
  occupancy: number
  format: string
  status: 'standard' | 'prime' | 'sold-out'
}

export const catalogueMetrics: Record<string, { visa: string; expiry: string; formats: string[]; localization: string; admissions: number; gross: number; weekly: string }> = {
  'dune-part-two': { visa: 'DZ-2024-0842', expiry: '30 Apr 2024', formats: ['IMAX 70mm', 'Atmos', '4K DCP'], localization: 'VOSTFR (FR/AR Subs) + VF', admissions: 24180, gross: 38688000, weekly: '+18.4%' },
  oppenheimer: { visa: 'DZ-2023-1120', expiry: '15 May 2024', formats: ['70mm Film', 'Dolby 5.1'], localization: 'VOSTFR (Arabic / French Subs)', admissions: 19450, gross: 23340000, weekly: 'Extended run' },
  'gladiator-ii': { visa: 'DZ-2024-1180', expiry: '30 Nov 2024', formats: ['4K Laser', 'Dolby Atmos'], localization: 'VOSTFR & VF master', admissions: 7025, gross: 11240000, weekly: 'Advance booking' },
  furiosa: { visa: 'DZ-2024-0925', expiry: '30 Jun 2024', formats: ['4DX Laser', 'Atmos'], localization: 'VOSTFR & VF (Dual Track)', admissions: 10525, gross: 16840000, weekly: 'Sold out' },
  challengers: { visa: 'DZ-2024-0711', expiry: '15 Jun 2024', formats: ['2K DCI', '5.1 Sound'], localization: 'VOSTFR (French Subtitles)', admissions: 5260, gross: 8420000, weekly: 'Steady box office' },
  'inside-out-2': { visa: 'DZ-2024-1002', expiry: '31 Jul 2024', formats: ['3D Laser', 'Atmos'], localization: 'VF (French Dub) + Arabic Dub', admissions: 19430, gross: 29150000, weekly: 'Family leader' },
  'deadpool-and-wolverine': { visa: 'DZ-2024-PEND', expiry: '24 Jul 2024', formats: ['IMAX Dual Laser', 'Atmos 6ch'], localization: 'VOSTFR & VF packages', admissions: 0, gross: 0, weekly: 'Visa pending' },
}

export const scheduledSlots: ScheduledSlot[] = [
  { id: 'slot-1', movie: 'Dune: Part Two', hallId: '01', start: 14.25, end: 17.08, occupancy: 84, format: 'IMAX 70mm', status: 'standard' },
  { id: 'slot-2', movie: 'Dune: Part Two', hallId: '01', start: 17.5, end: 20.33, occupancy: 92, format: 'IMAX 70mm', status: 'standard' },
  { id: 'slot-3', movie: 'Dune: Part Two', hallId: '01', start: 20.5, end: 23.25, occupancy: 96, format: 'IMAX 70mm', status: 'prime' },
  { id: 'slot-4', movie: 'Civil War', hallId: '02', start: 13.5, end: 15.33, occupancy: 78, format: 'VOSTFR', status: 'standard' },
  { id: 'slot-5', movie: 'Furiosa: A Mad Max Saga', hallId: '02', start: 16.5, end: 18.96, occupancy: 82, format: 'VOSTFR', status: 'standard' },
  { id: 'slot-6', movie: 'Civil War', hallId: '02', start: 19.5, end: 21.33, occupancy: 91, format: 'VOSTFR', status: 'prime' },
  { id: 'slot-7', movie: 'Dune: Part Two (VIP)', hallId: '03', start: 15.5, end: 18.26, occupancy: 100, format: 'VIP Dining', status: 'sold-out' },
  { id: 'slot-8', movie: 'Oppenheimer (VIP)', hallId: '03', start: 18.75, end: 21.5, occupancy: 95, format: 'VIP Dining', status: 'prime' },
  { id: 'slot-9', movie: 'Godzilla x Kong (4DX)', hallId: '04', start: 14, end: 16.5, occupancy: 90, format: '4DX Motion', status: 'standard' },
  { id: 'slot-10', movie: 'Dune: Part Two (4DX)', hallId: '04', start: 20, end: 22.5, occupancy: 100, format: '4DX Motion', status: 'sold-out' },
  { id: 'slot-11', movie: 'Kung Fu Panda 4', hallId: '05', start: 12.5, end: 14.25, occupancy: 92, format: 'Family', status: 'standard' },
  { id: 'slot-12', movie: 'Inside Out 2', hallId: '07', start: 17.5, end: 19.5, occupancy: 82, format: 'Standard', status: 'standard' },
]

export const auditEvents = [
  { reference: '#TMV-ALG-9842-D2', status: 'SCANNED 20:12', name: 'Amine Khelifi', seats: '3 seats · Row E 8, 9, 10', film: 'Dune: Part Two · IMAX', amount: '5,850 DZD', channel: 'Edahabia', tone: 'green' },
  { reference: '#TMV-ALG-9841-B8', status: 'CONFIRMED SATIM', name: 'Yacine Mansouri', seats: '2 seats · VIP recliner', film: 'Dune: Part Two · VIP Noir', amount: '5,000 DZD', channel: 'SATIM CIB', tone: 'rose' },
  { reference: '#TMV-ALG-9840-A1', status: 'CASH PRINTED', name: 'Leila Bouzid', seats: '4 family tickets', film: 'Inside Out 2 · Hall 07', amount: '4,800 DZD', channel: 'Cash counter #2', tone: 'amber' },
  { reference: '#TMV-ALG-9839-C4', status: 'SCANNED 20:06', name: 'Karim Zerrouki', seats: '2 seats · Row G 14–15', film: 'Civil War · Hall 02', amount: '2,400 DZD', channel: 'Edahabia', tone: 'green' },
]
