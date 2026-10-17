import { FunctionsHttpError } from '@supabase/supabase-js'
import { FUNCTION_ERROR_CODES, UNKNOWN_FUNCTION_ERROR } from '~/data/ui/function-errors'
import { supabase } from '~/services/supabase'
import type { FunctionErrorCode } from '~/types/functions'

async function readErrorCode(error: unknown): Promise<FunctionErrorCode> {
    if (!(error instanceof FunctionsHttpError)) return UNKNOWN_FUNCTION_ERROR
    const body: unknown = await (error.context as Response).json().catch(() => null)
    const code = (body as { error?: { code?: unknown } } | null)?.error?.code
    return FUNCTION_ERROR_CODES.find((known) => known === code) ?? UNKNOWN_FUNCTION_ERROR
}

export async function invokeFunction<T>(name: string, body: Record<string, unknown>) {
    const { data, error } = await supabase.functions.invoke<T>(name, { body })
    if (error) throw new Error(await readErrorCode(error))
    if (data === null) throw new Error(UNKNOWN_FUNCTION_ERROR)
    return data
}
