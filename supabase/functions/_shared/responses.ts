const KNOWN_ERRORS = new Set([
    'event_unavailable',
    'sales_paused',
    'invalid_name',
    'invalid_email',
    'invalid_phone',
    'invalid_items',
    'invalid_answers',
    'answers_missing',
    'ticket_unavailable',
    'quantity_limit',
    'sold_out',
    'too_many_holds',
    'promo_invalid',
    'promo_exhausted',
    'order_not_found',
    'order_not_refundable',
    'order_not_cancellable',
    'amount_mismatch',
    'payment_invalid',
    'payment_unavailable',
    'not_allowed',
    'bad_request',
])

export function ok(body: unknown) {
    return Response.json(body)
}

export function fail(reason: unknown, status = 400) {
    const message = reason instanceof Error ? reason.message : String((reason as { message?: string })?.message ?? reason)
    const code = KNOWN_ERRORS.has(message) ? message : 'unknown'
    if (code === 'unknown') console.error(reason)
    return Response.json({ error: { code } }, { status: code === 'not_allowed' ? 403 : code === 'unknown' ? 500 : status })
}

export async function readJson<T>(req: Request): Promise<T> {
    try {
        return (await req.json()) as T
    } catch {
        throw new Error('bad_request')
    }
}
