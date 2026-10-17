import { CONFIG } from './config.ts'

const encoder = new TextEncoder()

async function hmacHex(secret: string, payload: string) {
    const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
        'sign',
    ])
    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload))
    return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function safeEqual(a: string, b: string) {
    if (a.length !== b.length) return false
    let diff = 0
    for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
    return diff === 0
}

async function razorpayRequest<T>(path: string, body: Record<string, unknown>) {
    const { keyId, keySecret, apiBase } = CONFIG.razorpay
    if (!keyId || !keySecret) throw new Error('payment_unavailable')
    const response = await fetch(`${apiBase}${path}`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${btoa(`${keyId}:${keySecret}`)}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
    if (!response.ok) {
        console.error('Razorpay request failed', path, response.status, await response.text())
        throw new Error('payment_unavailable')
    }
    return (await response.json()) as T
}

export function createRazorpayOrder(amountPaise: number, receipt: string, orderId: string) {
    return razorpayRequest<{ id: string; amount: number }>('/orders', {
        amount: amountPaise,
        currency: 'INR',
        receipt,
        notes: { order_id: orderId },
    })
}

export function refundRazorpayPayment(paymentId: string, amountPaise: number, reason: string) {
    return razorpayRequest<{ id: string }>(`/payments/${paymentId}/refund`, {
        amount: amountPaise,
        notes: { reason },
    })
}

export async function isValidPaymentSignature(razorpayOrderId: string, paymentId: string, signature: string) {
    const expected = await hmacHex(CONFIG.razorpay.keySecret, `${razorpayOrderId}|${paymentId}`)
    return safeEqual(expected, signature)
}

export async function isValidWebhookSignature(rawBody: string, signature: string) {
    if (!CONFIG.razorpay.webhookSecret) return false
    const expected = await hmacHex(CONFIG.razorpay.webhookSecret, rawBody)
    return safeEqual(expected, signature)
}
