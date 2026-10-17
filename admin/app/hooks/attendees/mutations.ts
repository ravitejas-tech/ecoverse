import toast from 'react-hot-toast'
import { createMutation } from 'react-query-kit'
import { COMPLIMENTARY_COPY } from '~/data/attendees/complimentary'
import { useAttendees } from '~/hooks/attendees/queries'
import { refreshEvents } from '~/hooks/events/mutations'
import { useTicketTypes } from '~/hooks/events/tickets/queries'
import { errorMessage } from '~/lib/error-message'
import { issueComplimentary } from '~/services/attendees'

const { toasts, serverErrors } = COMPLIMENTARY_COPY

export const useIssueComplimentary = createMutation({
    mutationFn: issueComplimentary,
    onSuccess: ({ order, emailed }, _variables, _result, { client }) => {
        if (emailed) toast.success(toasts.sent(order.email))
        else toast.error(toasts.notEmailed)
        return Promise.all([
            client.invalidateQueries({ queryKey: useAttendees.getKey() }),
            client.invalidateQueries({ queryKey: useTicketTypes.getKey() }),
            refreshEvents(client),
        ])
    },
    onError: (error) => toast.error(errorMessage(error, serverErrors, toasts.failed)),
})
