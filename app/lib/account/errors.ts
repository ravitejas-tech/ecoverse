import { ACCOUNT_ERROR_COPY, type AccountErrorCodeName } from '~/data/account/auth'

const isAccountErrorCode = (code: string): code is AccountErrorCodeName => Object.hasOwn(ACCOUNT_ERROR_COPY, code)

export function accountErrorMessage(error: unknown) {
    const code = error instanceof Error ? error.message : ''
    return ACCOUNT_ERROR_COPY[isAccountErrorCode(code) ? code : 'unknown']
}
