import { useState } from 'react'
import { RESEND_CODE_AFTER_SECONDS } from '~/data/account/auth'
import { useSendLoginCode, useVerifyLoginCode } from '~/hooks/account/mutations'
import { useCountdown } from '~/hooks/use-countdown'

export function useSignIn() {
    const [sent, setSent] = useState<{ email: string; resendAt: number } | null>(null)
    const sendCode = useSendLoginCode()
    const verifyCode = useVerifyLoginCode()
    const resendIn = useCountdown(sent?.resendAt ?? null) ?? 0

    const send = (email: string) =>
        sendCode.mutate(email, {
            onSuccess: () => setSent({ email, resendAt: Date.now() + RESEND_CODE_AFTER_SECONDS * 1000 }),
        })

    return {
        email: sent?.email ?? null,
        resendIn,
        sending: sendCode.isPending,
        verifying: verifyCode.isPending,
        send,
        resend: () => sent && send(sent.email),
        verify: (code: string) => sent && verifyCode.mutate({ email: sent.email, code }),
        changeEmail: () => {
            setSent(null)
            verifyCode.reset()
        },
    }
}
