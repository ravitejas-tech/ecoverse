import { digitsOnly } from '~/lib/digits'

export function localMobileDigits(value: string) {
    const digits = digitsOnly(value)
    if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2)
    if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1)
    return digits
}
