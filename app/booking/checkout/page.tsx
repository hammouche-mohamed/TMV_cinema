import type { Metadata } from 'next'
import { PublicShell } from '@/components/layout/public-shell'
import { BookingStepper } from '@/components/booking/booking-stepper'
import { BookingSummary } from '@/components/booking/booking-summary'
import { CheckoutForm } from '@/components/booking/checkout-form'

export const metadata: Metadata = { title: 'Checkout · Demo Reservation', description: 'Enter demo contact details and select a simulated payment method for a TMV Cinemas ticket.' }

export default function CheckoutPage() {
  return <PublicShell><BookingStepper activeStep={5} /><div className="mx-auto max-w-[1440px] px-5 py-6 sm:px-8 sm:py-8 lg:px-10"><div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(340px,.9fr)] lg:gap-7"><CheckoutForm /><BookingSummary mode="checkout" /></div></div></PublicShell>
}
