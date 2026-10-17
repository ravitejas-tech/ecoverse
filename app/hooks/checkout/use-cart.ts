import { useMemo, useState } from 'react'
import { MAX_PEOPLE_PER_ORDER } from '~/data/checkout/limits'
import { cartLines, cartPeople, cartSubtotal, stepQuantity } from '~/lib/checkout/cart'
import type { Cart, TicketOption } from '~/types/checkout'

export function useCart(options: TicketOption[]) {
    const [cart, setCart] = useState<Cart>({})
    const lines = useMemo(() => cartLines(options, cart), [options, cart])
    const people = cartPeople(lines)

    const quantityOf = (option: TicketOption) => Math.min(cart[option.type.id] ?? 0, option.max)

    const canAdd = (option: TicketOption) => {
        const current = quantityOf(option)
        const next = stepQuantity(current, 1, option)
        return next > current && people + (next - current) * option.type.admits <= MAX_PEOPLE_PER_ORDER
    }

    const change = (option: TicketOption, delta: 1 | -1) =>
        setCart((previous) => ({
            ...previous,
            [option.type.id]: stepQuantity(Math.min(previous[option.type.id] ?? 0, option.max), delta, option),
        }))

    return { lines, people, subtotal: cartSubtotal(lines), quantityOf, canAdd, change }
}
