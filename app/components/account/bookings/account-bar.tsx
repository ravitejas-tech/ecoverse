import { LogOut, UserRound } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Notice } from '~/components/ui/notice'
import { ACCOUNT_COPY } from '~/data/account/my-tickets'
import { useSignOut } from '~/hooks/account/mutations'

export function AccountBar({ email }: { email: string }) {
    const signOut = useSignOut()

    return (
        <Notice
            icon={UserRound}
            title={ACCOUNT_COPY.signedInAs}
            body={email}
            className='mb-8'
            action={
                <Button
                    type='button'
                    variant='secondary'
                    size='sm'
                    className='mt-3'
                    disabled={signOut.isPending}
                    onClick={() => signOut.mutate()}>
                    <LogOut aria-hidden />
                    {ACCOUNT_COPY.signOut}
                </Button>
            }
        />
    )
}
