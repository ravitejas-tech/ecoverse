import { Link, useLoaderData } from 'react-router'
import { AuthCard } from '~/components/auth/auth-card'
import { SetPasswordForm } from '~/components/auth/set-password-form'
import { Button } from '~/components/ui/button'
import { AUTH_COPY } from '~/data/auth/copy'
import { AUTH_PATHS } from '~/data/auth/session'
import { getSessionUser } from '~/services/auth'

export async function clientLoader() {
    return { signedIn: Boolean(await getSessionUser()) }
}

const { setPassword } = AUTH_COPY

export default function SetPassword() {
    const { signedIn } = useLoaderData<typeof clientLoader>()

    return signedIn ? (
        <AuthCard
            title={setPassword.title}
            lead={setPassword.lead}>
            <SetPasswordForm />
        </AuthCard>
    ) : (
        <AuthCard
            title={setPassword.expiredTitle}
            lead={setPassword.expiredLead}>
            <Button
                asChild
                size='lg'
                className='w-full'>
                <Link to={AUTH_PATHS.login}>{setPassword.expiredAction}</Link>
            </Button>
        </AuthCard>
    )
}
