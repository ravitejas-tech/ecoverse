import { toast } from 'react-hot-toast'
import { createMutation } from 'react-query-kit'
import { SIGN_IN_TOAST, SIGN_IN_TOASTS } from '~/data/account/sign-in'
import { RESEND_TOASTS } from '~/data/account/my-tickets'
import { useMyBookings, useSessionQuery } from '~/hooks/account/queries'
import { accountErrorMessage } from '~/lib/account/errors'
import { checkoutErrorMessage } from '~/lib/checkout/errors'
import { sendLoginCode, signOut, verifyLoginCode } from '~/services/auth'
import { sendTickets } from '~/services/orders'

const toastAccountError = (error: Error) => toast.error(accountErrorMessage(error), SIGN_IN_TOAST)

export const useSendLoginCode = createMutation({
    mutationKey: ['account', 'send-login-code'],
    mutationFn: sendLoginCode,
    onSuccess: () => toast.success(SIGN_IN_TOASTS.codeSent, SIGN_IN_TOAST),
    onError: toastAccountError,
})

export const useVerifyLoginCode = createMutation({
    mutationKey: ['account', 'verify-login-code'],
    mutationFn: verifyLoginCode,
    onSuccess: (session, _input, _result, { client }) => {
        client.setQueryData(useSessionQuery.getKey(), session)
        toast.success(SIGN_IN_TOASTS.signedIn, SIGN_IN_TOAST)
    },
    onError: toastAccountError,
})

export const useSignOut = createMutation({
    mutationKey: ['account', 'sign-out'],
    mutationFn: signOut,
    onSuccess: (_data, _input, _result, { client }) => {
        client.setQueryData(useSessionQuery.getKey(), null)
        client.removeQueries({ queryKey: useMyBookings.getKey() })
        toast.success(SIGN_IN_TOASTS.signedOut, SIGN_IN_TOAST)
    },
    onError: toastAccountError,
})

export const useResendTickets = createMutation({
    mutationKey: ['account', 'resend-tickets'],
    mutationFn: sendTickets,
    onSuccess: () => toast.success(RESEND_TOASTS.sent),
    onError: (error) => toast.error(checkoutErrorMessage(error)),
})
