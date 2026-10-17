import { hasEnded } from '~/lib/event-list'
import type { Tables } from '~/types/database'
import type { PhotoUpload, UploadStatus } from '~/types/gallery'

export function pastEventsFirst<Event extends Pick<Tables<'events'>, 'starts_at' | 'ends_at'>>(
    events: readonly Event[],
    now: number,
) {
    const byStart = [...events].sort((a, b) => a.starts_at.localeCompare(b.starts_at))
    return [
        ...byStart.filter((event) => hasEnded(event, now)).reverse(),
        ...byStart.filter((event) => !hasEnded(event, now)),
    ]
}

export function isPhotoUpload(value: unknown): value is PhotoUpload {
    return (
        typeof value === 'object' &&
        value !== null &&
        'file' in value &&
        value.file instanceof File &&
        'eventId' in value
    )
}

export function uploadStatus(status: string, paused: boolean): UploadStatus {
    if (status === 'success') return 'done'
    if (status === 'error') return 'failed'
    return paused ? 'waiting' : 'uploading'
}
