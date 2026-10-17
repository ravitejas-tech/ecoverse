import { readAttribution } from '~/lib/attribution'
import type { CartLine, CheckoutFormValues, CreateOrderInput } from '~/types/checkout'

export function buildOrderInput(
    eventId: string,
    lines: CartLine[],
    { name, email, phone, answers, marketingConsent }: CheckoutFormValues,
    promoCode: string | undefined,
): CreateOrderInput {
    return {
        eventId,
        items: lines.map(({ type, quantity }) => ({ ticketTypeId: type.id, quantity })),
        buyer: { name, email, phone },
        answers: Object.fromEntries(Object.entries(answers).filter(([, value]) => value !== '')),
        promoCode,
        marketingConsent,
        termsAccepted: true,
        utm: readAttribution(),
    }
}
