import { get, type FieldErrors } from 'react-hook-form'

export function fieldError(errors: FieldErrors, name: string) {
    const message: unknown = get(errors, name)?.message
    return typeof message === 'string' ? message : undefined
}
