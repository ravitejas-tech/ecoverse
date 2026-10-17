import { useMemo, type FormEvent } from 'react'
import { useRevalidator } from 'react-router'
import {
    CHECKOUT_ERROR_COPY,
    FIELD_ERROR_CODES,
    PROMO_ERROR_CODES,
    REFRESH_AVAILABILITY_ON,
} from '~/data/checkout/errors'
import { CHECKOUT_IDS } from '~/data/checkout/ids'
import { useCart } from '~/hooks/checkout/use-cart'
import { useCheckoutForm } from '~/hooks/checkout/use-checkout-form'
import { usePayment } from '~/hooks/checkout/use-payment'
import { usePromo } from '~/hooks/checkout/use-promo'
import { checkoutErrorCode } from '~/lib/checkout/errors'
import { buildOrderInput } from '~/lib/checkout/order-input'
import { parseEventQuestions } from '~/lib/checkout/questions'
import type { CheckoutErrorCode, TicketOption } from '~/types/checkout'
import type { EventWithTickets } from '~/types/events'

const includes = (codes: readonly CheckoutErrorCode[], code: CheckoutErrorCode) => codes.includes(code)

const scrollToTickets = () => document.getElementById(CHECKOUT_IDS.tickets)?.scrollIntoView({ block: 'start' })

export function useCheckout(event: EventWithTickets, options: TicketOption[]) {
    const revalidator = useRevalidator()
    const questions = useMemo(() => parseEventQuestions(event.questions), [event.questions])
    const cart = useCart(options)
    const form = useCheckoutForm(questions)
    const promo = usePromo(event.id, cart.subtotal)
    const payment = usePayment(event.title)

    const onOrderError = (error: Error) => {
        const code = checkoutErrorCode(error)
        const field = FIELD_ERROR_CODES[code]
        if (field) form.setError(field, { message: CHECKOUT_ERROR_COPY[code] }, { shouldFocus: true })
        if (includes(PROMO_ERROR_CODES, code)) promo.remove()
        if (includes(REFRESH_AVAILABILITY_ON, code)) {
            void revalidator.revalidate()
            scrollToTickets()
        }
    }

    const pay = form.handleSubmit((values) =>
        payment.pay(buildOrderInput(event.id, cart.lines, values, promo.applied?.code), onOrderError),
    )

    const submit = (formEvent: FormEvent<HTMLFormElement>) => {
        if (cart.lines.length > 0) return pay(formEvent)
        formEvent.preventDefault()
        scrollToTickets()
    }

    const changeQuantity = (option: TicketOption, delta: 1 | -1) => {
        cart.change(option, delta)
        payment.release()
    }

    return {
        questions,
        cart,
        form,
        promo,
        payment,
        submit,
        changeQuantity,
        total: Math.max(0, cart.subtotal - promo.discount),
    }
}
