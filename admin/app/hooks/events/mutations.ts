import type { QueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createMutation } from 'react-query-kit'
import { EVENT_DB_ERRORS, EVENT_TOASTS } from '~/data/events/copy'
import { useEvents } from '~/hooks/events/queries'
import { buildEventInsert } from '~/lib/events/create'
import { errorMessage } from '~/lib/error-message'
import { createEvent, duplicateEvent, updateEvent } from '~/services/events'
import { uploadEventImage } from '~/services/storage'
import type { NewEventValues } from '~/schemas/event-create'
import type { EventUpdate } from '~/types/events'

export const refreshEvents = (client: QueryClient) => client.invalidateQueries({ queryKey: useEvents.getKey() })

const showSaveError = (error: Error) => toast.error(errorMessage(error, EVENT_DB_ERRORS, EVENT_TOASTS.failed))

export const useCreateEvent = createMutation({
    mutationFn: (values: NewEventValues) =>
        createEvent(buildEventInsert(values), values.cover && { file: values.cover, alt: values.cover_alt }),
    onSuccess: ({ coverFailed }, _variables, _result, { client }) => {
        if (coverFailed) toast.error(EVENT_TOASTS.coverFailed)
        else toast.success(EVENT_TOASTS.created)
        return refreshEvents(client)
    },
    onError: showSaveError,
})

export const useUpdateEvent = createMutation({
    mutationFn: ({ id, patch }: { id: string; patch: EventUpdate; notice: keyof typeof EVENT_TOASTS }) =>
        updateEvent({ id, patch }),
    onSuccess: (_data, { notice }, _result, { client }) => {
        toast.success(EVENT_TOASTS[notice])
        return refreshEvents(client)
    },
    onError: showSaveError,
})

export const useDuplicateEvent = createMutation({
    mutationFn: duplicateEvent,
    onSuccess: (_data, _variables, _result, { client }) => {
        toast.success(EVENT_TOASTS.duplicated)
        return refreshEvents(client)
    },
    onError: () => toast.error(EVENT_TOASTS.duplicateFailed),
})

export const useUploadCover = createMutation({
    mutationFn: ({ eventId, file }: { eventId: string; file: File }) => uploadEventImage(eventId, file, 'cover'),
    onSuccess: () => toast.success(EVENT_TOASTS.coverUploaded),
    onError: () => toast.error(EVENT_TOASTS.uploadFailed),
})
