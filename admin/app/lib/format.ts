import { EVENT_LOCALE, EVENT_TIME_ZONE, IST_OFFSET } from '~/data/ui/format'

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

const dateTime = new Intl.DateTimeFormat(EVENT_LOCALE, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: EVENT_TIME_ZONE,
})

export function formatDateTime(value: string) {
    return dateTime.format(new Date(value))
}

const date = new Intl.DateTimeFormat(EVENT_LOCALE, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: EVENT_TIME_ZONE,
})

export function formatDate(value: string) {
    return date.format(new Date(value))
}

const count = new Intl.NumberFormat(EVENT_LOCALE)

const percent = new Intl.NumberFormat(EVENT_LOCALE, { style: 'percent', maximumFractionDigits: 1 })

const shortDay = new Intl.DateTimeFormat(EVENT_LOCALE, { day: 'numeric', month: 'short', timeZone: EVENT_TIME_ZONE })

export function formatCount(value: number) {
    return count.format(value)
}

export function formatPercent(value: number, total = 100) {
    return percent.format(total > 0 ? value / total : 0)
}

export function formatShortDay(day: string) {
    return shortDay.format(new Date(`${day}T12:00:00${IST_OFFSET}`))
}
