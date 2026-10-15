import { WHATSAPP, WHATSAPP_MESSAGES } from '~/data/contact'
import { formatEventDay, formatEventTime, formatRupees } from '~/lib/format'
import type { EventPreview } from '~/types/landing'

export function whatsappUrl(message: string) {
    return `${WHATSAPP.linkBase}/${WHATSAPP.number}?text=${encodeURIComponent(message)}`
}

export function eventBookingMessage({ title, startsAt, city, priceFrom }: EventPreview) {
    return WHATSAPP_MESSAGES.booking(
        title,
        `${formatEventDay(startsAt)} at ${formatEventTime(startsAt)}`,
        city,
        formatRupees(priceFrom),
    )
}
