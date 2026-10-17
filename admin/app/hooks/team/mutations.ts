import toast from 'react-hot-toast'
import { createMutation } from 'react-query-kit'
import { TEAM_COPY } from '~/data/team/copy'
import { useTeam } from '~/hooks/team/queries'
import { functionErrorMessage } from '~/lib/function-errors'
import { inviteStaff, updateStaff } from '~/services/team'

export const useInviteStaff = createMutation({
    mutationFn: inviteStaff,
    onSuccess: (_data, { email }, _result, { client }) => {
        toast.success(TEAM_COPY.inviteDialog.sent(email))
        void client.invalidateQueries({ queryKey: useTeam.getKey() })
    },
    onError: (error) => toast.error(functionErrorMessage(error)),
})

export const useUpdateStaff = createMutation({
    mutationFn: updateStaff,
    onSuccess: (_data, { changes }, _result, { client }) => {
        const message =
            changes.active === undefined
                ? TEAM_COPY.roleDialog.saved
                : changes.active
                  ? TEAM_COPY.reactivated
                  : TEAM_COPY.deactivateDialog.done
        toast.success(message)
        void client.invalidateQueries({ queryKey: useTeam.getKey() })
    },
    onError: () => toast.error(TEAM_COPY.errors.generic),
})
