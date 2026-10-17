import { FUNCTION_ERROR_MESSAGES, FUNCTION_ERROR_CODES, UNKNOWN_FUNCTION_ERROR } from '~/data/ui/function-errors'

export function functionErrorMessage(error: unknown) {
    const message = error instanceof Error ? error.message : ''
    const code = FUNCTION_ERROR_CODES.find((known) => known === message) ?? UNKNOWN_FUNCTION_ERROR
    return FUNCTION_ERROR_MESSAGES[code]
}
