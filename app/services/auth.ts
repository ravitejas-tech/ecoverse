import { isAuthApiError, isAuthRetryableFetchError, type Session } from '@supabase/supabase-js'
import { AUTH_ERROR_CODES } from '~/data/account/auth'
import { supabase } from '~/services/supabase'
import type { LoginCodeInput } from '~/types/account'

function authErrorCode(error: unknown) {
    if (isAuthRetryableFetchError(error)) return 'network'
    return (isAuthApiError(error) && error.code && AUTH_ERROR_CODES[error.code]) || 'unknown'
}

export async function sendLoginCode(email: string) {
    const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } })
    if (error) throw new Error(authErrorCode(error))
}

export async function verifyLoginCode({ email, code }: LoginCodeInput) {
    const { data, error } = await supabase.auth.verifyOtp({ email, token: code, type: 'email' })
    if (error) throw new Error(authErrorCode(error))
    return data.session
}

export async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(authErrorCode(error))
}

export async function getSession() {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw new Error(authErrorCode(error))
    return data.session
}

export function onSessionChange(listener: (session: Session | null) => void) {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => listener(session))
    return () => data.subscription.unsubscribe()
}
