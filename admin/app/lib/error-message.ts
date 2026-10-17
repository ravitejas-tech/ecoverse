export function errorMessage(error: unknown, messages: Readonly<Record<string, string>>, fallback: string) {
    if (typeof error !== 'object' || error === null) return fallback
    const { code, message } = error as { code?: unknown; message?: unknown }
    return (
        (typeof message === 'string' ? messages[message] : undefined) ??
        (typeof code === 'string' ? messages[code] : undefined) ??
        fallback
    )
}
