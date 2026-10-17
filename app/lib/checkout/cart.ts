import type { Cart, CartLine, TicketOption } from '~/types/checkout'

export function cartLines(options: TicketOption[], cart: Cart): CartLine[] {
    return options.flatMap(({ type, max }) => {
        const quantity = Math.min(cart[type.id] ?? 0, max)
        return quantity > 0 ? [{ type, quantity, amount: quantity * type.price }] : []
    })
}

export const cartSubtotal = (lines: CartLine[]) => lines.reduce((sum, { amount }) => sum + amount, 0)

export const cartPeople = (lines: CartLine[]) =>
    lines.reduce((sum, { quantity, type }) => sum + quantity * type.admits, 0)

export function stepQuantity(current: number, delta: 1 | -1, { type, max }: TicketOption) {
    const next = current + delta
    if (delta > 0) return Math.min(Math.max(next, type.min_per_order), max)
    return next < type.min_per_order ? 0 : next
}
