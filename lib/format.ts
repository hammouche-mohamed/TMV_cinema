export const formatDzd = (amount: number) => `${new Intl.NumberFormat('en-US').format(amount)} DZD`

export const getSeatPrice = (seatId: string, standardPrice: number) =>
  seatId.startsWith('G') || seatId.startsWith('H') ? 2500 : standardPrice

export const createReservationReference = (movieSlug: string) =>
  `TMV-ALG-${Math.floor(1000 + Math.random() * 9000)}-${movieSlug === 'dune-part-two' ? 'D2' : movieSlug.slice(0, 2).toUpperCase()}`
