import toast from 'react-hot-toast'
import { createMutation } from 'react-query-kit'
import { AUTH_COPY } from '~/data/auth/copy'
import { sendPasswordReset, signIn, updatePassword } from '~/services/auth'

export const useSignIn = createMutation({
    mutationFn: signIn,
    onSuccess: () => toast.dismiss(),
    onError: () => toast.error(AUTH_COPY.errors.signIn),
})

export const useSendPasswordReset = createMutation({
    mutationFn: sendPasswordReset,
    onSuccess: () => toast.success(AUTH_COPY.reset.sent),
    onError: () => toast.error(AUTH_COPY.errors.generic),
})

export const useUpdatePassword = createMutation({
    mutationFn: updatePassword,
    onSuccess: () => toast.success(AUTH_COPY.setPassword.saved),
    onError: () => toast.error(AUTH_COPY.errors.generic),
})
