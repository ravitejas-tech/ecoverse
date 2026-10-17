import { useSearchParams } from 'react-router'
import { PhotoGrid } from '~/components/gallery/photo-grid'
import { UploadButton } from '~/components/gallery/upload-button'
import { UploadProgress } from '~/components/gallery/upload-progress'
import { EmptyState } from '~/components/ui/empty-state'
import { PageHeader } from '~/components/ui/page-header'
import { Select } from '~/components/ui/select'
import { Spinner } from '~/components/ui/spinner'
import { GALLERY_COPY, GALLERY_EVENT_PARAM } from '~/data/gallery/copy'
import { LOADING_LABEL } from '~/data/ui/feedback'
import { useEvents } from '~/hooks/events/queries'
import { useGalleryPhotos } from '~/hooks/gallery/queries'
import { eventOptions } from '~/lib/event-list'
import { pastEventsFirst } from '~/lib/gallery'
import { requirePermission } from '~/lib/guards'
import type { Route } from './+types/gallery'

export async function clientLoader() {
    await requirePermission('manageGallery')
    return { now: Date.now() }
}

export default function Gallery({ loaderData: { now } }: Route.ComponentProps) {
    const [params, setParams] = useSearchParams()
    const { data: events } = useEvents()
    const ordered = pastEventsFirst(events ?? [], now)
    const event = ordered.find(({ id }) => id === params.get(GALLERY_EVENT_PARAM)) ?? ordered[0]
    const { data: photos } = useGalleryPhotos({ variables: event?.id ?? '', enabled: Boolean(event) })

    if (!events) return <Spinner label={LOADING_LABEL} />
    if (!event) return <EmptyState {...GALLERY_COPY.noEvents} />

    return (
        <>
            <PageHeader
                title={GALLERY_COPY.title}
                description={GALLERY_COPY.description}
                actions={
                    <UploadButton
                        eventId={event.id}
                        eventTitle={event.title}
                        nextSortOrder={Math.max(-1, ...(photos ?? []).map(({ sort_order }) => sort_order)) + 1}
                    />
                }
            />
            <Select
                aria-label={GALLERY_COPY.eventLabel}
                value={event.id}
                options={eventOptions(ordered)}
                onChange={(change) => setParams({ [GALLERY_EVENT_PARAM]: change.target.value }, { replace: true })}
                className='mb-6 md:max-w-md'
            />
            <UploadProgress eventId={event.id} />
            {photos ? <PhotoGrid photos={photos} /> : <Spinner label={LOADING_LABEL} />}
        </>
    )
}
