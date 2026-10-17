import { AUTH_PATHS } from '~/data/auth/session'
import { supabase } from '~/services/supabase'

export async function signIn({ email, password }: { email: string; password: string }) {
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password })
    if (error) throw error
}

export async function signOut() {
    await supabase.auth.signOut()
}

export async function sendPasswordReset(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: `${location.origin}${AUTH_PATHS.setPassword}`,
    })
    if (error) throw error
}

export async function updatePassword(password: string) {
    const { error } = await supabase.auth.updateUser({ password })
    if (error) throw error
}

export async function getSessionUser() {
    const { data } = await supabase.auth.getSession()
    return data.session?.user ?? null
}
