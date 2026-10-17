import { DATE_INPUT_LOCALE, EVENT_TIME_ZONE, IST_OFFSET } from '~/data/ui/format'

const istParts = new Intl.DateTimeFormat(DATE_INPUT_LOCALE, {
    timeZone: EVENT_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
})

export function toIstInput(iso: string | null | undefined) {
    if (!iso) return ''
    const { year, month, day, hour, minute } = Object.fromEntries(
        istParts.formatToParts(new Date(iso)).map(({ type, value }) => [type, value]),
    )
    return `${year}-${month}-${day}T${hour}:${minute}`
}

export function fromIstInput(value: string) {
    return `${value}:00${IST_OFFSET}`
}

export function fromOptionalIstInput(value: string | undefined) {
    return value ? fromIstInput(value) : null
}

export function istToday() {
    return toIstInput(new Date().toISOString()).slice(0, 10)
}

export function addDays(date: string, days: number) {
    const next = new Date(`${date}T00:00:00Z`)
    next.setUTCDate(next.getUTCDate() + days)
    return next.toISOString().slice(0, 10)
}

export function nextWeekday(weekday: number) {
    const today = istToday()
    const current = new Date(`${today}T00:00:00Z`).getUTCDay()
    return addDays(today, (weekday - current + 7) % 7 || 7)
}

export function hasPassed(iso: string | null) {
    return iso !== null && new Date(iso).getTime() < Date.now()
}
