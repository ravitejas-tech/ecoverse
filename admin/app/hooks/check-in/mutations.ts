import toast from 'react-hot-toast'
import { createMutation } from 'react-query-kit'
import { CHECK_IN_COPY } from '~/data/check-in/copy'
import { CHECK_IN_RESULTS } from '~/data/check-in/results'
import { useCheckInStats, useRecentCheckIns } from '~/hooks/check-in/queries'
import { vibrate } from '~/lib/check-in'
import { checkIn } from '~/services/check-in'

export const useCheckIn = createMutation({
    mutationFn: checkIn,
    onSuccess: ({ result }, { eventId }, _result, { client }) => {
        vibrate(CHECK_IN_RESULTS[result].vibrate)
        void client.invalidateQueries({ queryKey: useCheckInStats.getKey(eventId) })
        void client.invalidateQueries({ queryKey: useRecentCheckIns.getKey(eventId) })
    },
    onError: () => toast.error(CHECK_IN_COPY.errors.failed),
})
