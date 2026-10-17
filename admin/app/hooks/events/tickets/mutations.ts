import type { QueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createMutation } from 'react-query-kit'
import { DB_ERROR_CODES } from '~/data/ui/db-errors'
import { TICKETS_COPY } from '~/data/events/tickets'
import { refreshEvents } from '~/hooks/events/mutations'
import { useTicketTypes } from '~/hooks/events/tickets/queries'
import { errorMessage } from '~/lib/error-message'
import { deleteTicketType, reorderTicketTypes, saveTicketType } from '~/services/ticket-types'

const { toasts } = TICKETS_COPY

const refreshTickets = (client: QueryClient) =>
    Promise.all([client.invalidateQueries({ queryKey: useTicketTypes.getKey() }), refreshEvents(client)])

const showError = () => toast.error(toasts.failed)

export const useSaveTicketType = createMutation({
    mutationFn: saveTicketType,
    onSuccess: (_data, _variables, _result, { client }) => {
        toast.success(toasts.saved)
        return refreshTickets(client)
    },
    onError: showError,
})

export const useDeleteTicketType = createMutation({
    mutationFn: deleteTicketType,
    onSuccess: (_data, _variables, _result, { client }) => {
        toast.success(toasts.deleted)
        return refreshTickets(client)
    },
    onError: (error) =>
        toast.error(errorMessage(error, { [DB_ERROR_CODES.foreignKeyViolation]: toasts.inUse }, toasts.failed)),
})

export const useReorderTicketTypes = createMutation({
    mutationFn: reorderTicketTypes,
    onSuccess: (_data, _variables, _result, { client }) => refreshTickets(client),
    onError: showError,
})
