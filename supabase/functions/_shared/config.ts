const read = (name: string, fallback = '') => Deno.env.get(name)?.trim() || fallback

export const CONFIG = {
    siteUrl: read('SITE_URL', 'http://localhost:7300'),
    adminUrl: read('ADMIN_URL', 'http://localhost:7301'),
    paymentProvider: read('PAYMENT_PROVIDER', 'razorpay') === 'test' ? 'test' : 'razorpay',
    razorpay: {
        keyId: read('RAZORPAY_KEY_ID'),
        keySecret: read('RAZORPAY_KEY_SECRET'),
        webhookSecret: read('RAZORPAY_WEBHOOK_SECRET'),
        apiBase: 'https://api.razorpay.com/v1',
    },
    email: {
        provider: read('EMAIL_PROVIDER', 'mailpit') === 'resend' ? 'resend' : 'mailpit',
        from: read('EMAIL_FROM', 'Echoverse Hub <tickets@echoversehub.com>'),
        mailpitUrl: read('MAILPIT_URL', 'http://host.docker.internal:54324'),
        resendApiKey: read('RESEND_API_KEY'),
    },
    holdMinutes: 15,
    timeZone: 'Asia/Kolkata',
    locale: 'en-IN',
} as const
