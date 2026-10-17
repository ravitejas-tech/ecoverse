import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router'
import { CONFETTI_WELCOME } from '~/data/ui/confetti'
import { trackPurchase } from '~/lib/analytics'
import { celebrate } from '~/lib/confetti'
import type { Booking } from '~/types/booking'
import { NEW_BOOKING_PARAM } from '~/data/navigation'

export function useNewBookingCelebration(booking: Booking | null | undefined) {
    const [searchParams, setSearchParams] = useSearchParams()
    const isNew = searchParams.has(NEW_BOOKING_PARAM)
    const celebrated = useRef(false)

    useEffect(() => {
        if (!isNew || booking?.order.status !== 'paid' || celebrated.current) return
        celebrated.current = true
        void celebrate(CONFETTI_WELCOME)
        trackPurchase({
            bookingCode: booking.order.booking_code,
            value: booking.order.total,
            eventTitle: booking.event.title,
        })
        setSearchParams(
            (params) => {
                params.delete(NEW_BOOKING_PARAM)
                return params
            },
            { replace: true },
        )
    }, [isNew, booking, setSearchParams])
}
