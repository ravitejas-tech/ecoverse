import { useState } from 'react'
import { redirect, useSearchParams } from 'react-router'
import { AuthCard } from '~/components/auth/auth-card'
import { LoginForm } from '~/components/auth/login-form'
import { ResetRequestForm } from '~/components/auth/reset-request-form'
import { AUTH_COPY } from '~/data/auth/copy'
import { AUTH_PATHS, NOT_STAFF_REASON } from '~/data/auth/session'
import { getSessionUser, signOut } from '~/services/auth'
import { getCurrentStaff } from '~/services/staff'
import type { Route } from './+types/login'

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
    const notStaff = new URL(request.url).searchParams.get('reason') === NOT_STAFF_REASON
    const user = await getSessionUser()
    if (user && notStaff) await signOut()
    if (user && !notStaff && (await getCurrentStaff(user.id))) throw redirect(AUTH_PATHS.home)
    return null
}

export default function Login() {
    const [resetting, setResetting] = useState(false)
    const [searchParams] = useSearchParams()
    const copy = resetting ? AUTH_COPY.reset : AUTH_COPY.login

    return (
        <AuthCard
            title={copy.title}
            lead={copy.lead}
            notice={searchParams.get('reason') === NOT_STAFF_REASON ? AUTH_COPY.login.notStaff : undefined}>
            {resetting ? (
                <ResetRequestForm onBack={() => setResetting(false)} />
            ) : (
                <LoginForm onForgot={() => setResetting(true)} />
            )}
        </AuthCard>
    )
}
