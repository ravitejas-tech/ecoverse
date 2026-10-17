export function withParam(current: URLSearchParams, key: string, value: string) {
    const next = new URLSearchParams(current)
    if (value) next.set(key, value)
    else next.delete(key)
    return next
}
