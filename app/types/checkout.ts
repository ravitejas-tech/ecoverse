import type { InputHTMLAttributes } from 'react'
import type { z } from 'zod'
import type { CHECKOUT_ERROR_COPY } from '~/data/checkout/errors'
import type { buildCheckoutSchema } from '~/schemas/checkout'
import type { eventQuestionSchema } from '~/schemas/event-questions'
import type { createOrderResultSchema, verifyPaymentResultSchema } from '~/schemas/order'
import type { promoFormSchema } from '~/schemas/promo'
import type { Attribution } from '~/types/attribution'
import type { TicketStatus, TicketTypeRow } from '~/types/events'

export interface TicketOption {
    type: TicketTypeRow
    status: TicketStatus
    max: number
}

export type Cart = Record<string, number>

export interface CartLine {
    type: TicketTypeRow
    quantity: number
    amount: number
}

export type EventQuestion = z.infer<typeof eventQuestionSchema>

type CheckoutSchema = ReturnType<typeof buildCheckoutSchema>

export type CheckoutFormInput = z.input<CheckoutSchema>

export type CheckoutFormValues = z.output<CheckoutSchema>

export type BlockedReason = 'paused' | 'ended' | 'sold-out' | 'not-open' | 'closed'

export type CheckoutErrorCode = keyof typeof CHECKOUT_ERROR_COPY

export interface CreateOrderInput {
    eventId: string
    items: { ticketTypeId: string; quantity: number }[]
    buyer: { name: string; email: string; phone: string }
    answers: Record<string, string>
    promoCode?: string
    marketingConsent: boolean
    termsAccepted: true
    utm: Attribution
}

export type CreateOrderResult = z.infer<typeof createOrderResultSchema>

export type PendingOrder = CreateOrderResult['order']

export type RazorpayPayment = Extract<CreateOrderResult['payment'], { provider: 'razorpay' }>

export interface VerifyPaymentInput {
    orderId: string
    razorpayOrderId?: string
    razorpayPaymentId?: string
    razorpaySignature?: string
}

export type VerifyPaymentResult = z.infer<typeof verifyPaymentResultSchema>

export interface PromoQuoteInput {
    eventId: string
    code: string
    subtotal: number
}

export type PromoFormValues = z.output<typeof promoFormSchema>

export interface PromoQuote {
    code: string
    discount: number
}

export interface BuyerFieldConfig {
    name: 'name' | 'phone' | 'email'
    label: string
    hint?: string
    placeholder: string
    prefix?: string
    type: 'text' | 'tel' | 'email'
    autoComplete: string
    inputMode: InputHTMLAttributes<HTMLInputElement>['inputMode']
    autoCapitalize?: string
}

export interface QuestionInputConfig {
    control: 'text' | 'select'
    type?: 'text' | 'tel'
    inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode']
    pattern?: string
    autoComplete: string
    placeholder?: string
    options?: readonly string[]
}

export interface RazorpayCheckoutRequest {
    payment: RazorpayPayment
    description: string
    prefill: { name: string; email: string; contact: string }
}

export interface RazorpayResponse {
    razorpay_payment_id: string
    razorpay_order_id: string
    razorpay_signature: string
}

export interface RazorpayOptions {
    key: string
    order_id: string
    amount: number
    currency: string
    name: string
    description: string
    prefill: RazorpayCheckoutRequest['prefill']
    theme: { color: string }
    modal: { ondismiss: () => void }
    handler: (response: RazorpayResponse) => void
}

export interface RazorpayWindow {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void }
}
