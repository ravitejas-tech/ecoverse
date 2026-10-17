import type { z } from 'zod'
import type { codeFormSchema, emailFormSchema } from '~/schemas/sign-in'
import type { listMyBookings } from '~/services/orders'

export type MyBooking = Awaited<ReturnType<typeof listMyBookings>>[number]

export type BookingGroup = 'upcoming' | 'past' | 'cancelled'

export interface LoginCodeInput {
    email: string
    code: string
}

export type EmailFormValues = z.output<typeof emailFormSchema>

export type CodeFormInput = z.input<typeof codeFormSchema>

export type CodeFormValues = z.output<typeof codeFormSchema>
