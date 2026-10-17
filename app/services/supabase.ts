import { createClient } from '@supabase/supabase-js'
import { AUTH_STORAGE_KEY } from '~/data/account/auth'
import type { Database } from '~/types/database'

const { VITE_SUPABASE_URL: url, VITE_SUPABASE_PUBLISHABLE_KEY: key } = import.meta.env

if (!url || !key) throw new Error('Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env')

const inBrowser = typeof window !== 'undefined'

export const supabase = createClient<Database>(url, key, {
    auth: {
        persistSession: inBrowser,
        autoRefreshToken: inBrowser,
        detectSessionInUrl: false,
        storageKey: AUTH_STORAGE_KEY,
    },
})
