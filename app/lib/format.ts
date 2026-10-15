import { EVENT_LOCALE, EVENT_TIME_ZONE } from '~/data/ui/format'

const rupees = new Intl.NumberFormat(EVENT_LOCALE, { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

const eventDay = new Intl.DateTimeFormat(EVENT_LOCALE, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: EVENT_TIME_ZONE,
})

const eventTime = new Intl.DateTimeFormat(EVENT_LOCALE, {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: EVENT_TIME_ZONE,
})

export function formatRupees(amount: number) {
    return rupees.format(amount)
}

export function formatEventDay(startsAt: string) {
    return eventDay.format(new Date(startsAt))
}

export function formatEventTime(startsAt: string) {
    return eventTime.format(new Date(startsAt))
}
