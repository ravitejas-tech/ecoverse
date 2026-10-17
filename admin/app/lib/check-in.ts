import { CHECK_IN_COPY } from '~/data/check-in/copy'
import { BLOCKED_CAMERA_ERRORS } from '~/data/check-in/scanner'
import { EVENT_TIME_ZONE } from '~/data/ui/format'
import { hasEnded } from '~/lib/event-list'
import { formatEventTime } from '~/lib/format'
import type { CheckInEvent, CheckInOutcome, CheckInResponse } from '~/types/check-in'

const dayKey = new Intl.DateTimeFormat('en-CA', { timeZone: EVENT_TIME_ZONE })

export function isSameDay(value: string, now: number) {
    return dayKey.format(new Date(value)) === dayKey.format(new Date(now))
}

export function splitByTime(events: CheckInEvent[], now: number) {
    return {
        upcoming: events.filter((event) => !hasEnded(event, now)),
        past: events.filter((event) => hasEnded(event, now)).reverse(),
        today: new Set(events.filter(({ starts_at }) => isSameDay(starts_at, now)).map(({ id }) => id)),
    }
}

export function isCameraBlocked(error: unknown) {
    return error instanceof DOMException && BLOCKED_CAMERA_ERRORS.some((name) => name === error.name)
}

export function vibrate(pattern: number[]) {
    if ('vibrate' in navigator && navigator.userActivation?.hasBeenActive) navigator.vibrate(pattern)
}

export function resultDetails({ result, attendee, ticket_type, event_title, checked_in_at }: CheckInResponse) {
    const { cameIn, ticketFor } = CHECK_IN_COPY.result
    const lines: Record<CheckInOutcome, (string | null | undefined)[]> = {
        valid: [ticket_type],
        override: [ticket_type],
        already_checked_in: [checked_in_at && cameIn(formatEventTime(checked_in_at)), ticket_type],
        invalid: [],
        cancelled: [ticket_type],
        wrong_event: [event_title && ticketFor(event_title)],
    }
    return { name: result === 'invalid' ? null : attendee, lines: lines[result].filter(Boolean) }
}
