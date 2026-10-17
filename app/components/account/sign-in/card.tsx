import { CodeForm } from '~/components/account/sign-in/code-form'
import { EmailForm } from '~/components/account/sign-in/email-form'
import { Button } from '~/components/ui/button'
import { PopCard } from '~/components/ui/pop-card'
import { Sticker } from '~/components/ui/sticker'
import { Text } from '~/components/ui/text'
import { SIGN_IN_COPY, SIGN_IN_IDS } from '~/data/account/sign-in'
import { useSignIn } from '~/hooks/account/use-sign-in'

export function SignInCard() {
    const { email, resendIn, sending, verifying, send, resend, verify, changeEmail } = useSignIn()

    return (
        <PopCard
            asChild
            className='max-w-md space-y-6 p-5 sm:p-8'>
            <section aria-labelledby={SIGN_IN_IDS.title}>
                <div className='space-y-3'>
                    <Sticker
                        tone='cyan'
                        tilt='left'>
                        {SIGN_IN_COPY.sticker}
                    </Sticker>
                    <Text
                        as='h2'
                        id={SIGN_IN_IDS.title}
                        variant='heading'>
                        {SIGN_IN_COPY.title}
                    </Text>
                    <Text
                        variant='small'
                        tone='secondary'>
                        {SIGN_IN_COPY.lead}
                    </Text>
                </div>
                {email ? (
                    <>
                        <CodeForm
                            email={email}
                            verifying={verifying}
                            onSubmit={verify}
                        />
                        <div className='-mx-3 flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between'>
                            <Button
                                type='button'
                                variant='ghost'
                                size='sm'
                                onClick={changeEmail}>
                                {SIGN_IN_COPY.changeEmail}
                            </Button>
                            <Button
                                type='button'
                                variant='ghost'
                                size='sm'
                                disabled={resendIn > 0 || sending}
                                onClick={resend}>
                                {resendIn > 0 ? SIGN_IN_COPY.resendIn(resendIn) : SIGN_IN_COPY.resend}
                            </Button>
                        </div>
                    </>
                ) : (
                    <EmailForm
                        sending={sending}
                        onSubmit={send}
                    />
                )}
            </section>
        </PopCard>
    )
}
