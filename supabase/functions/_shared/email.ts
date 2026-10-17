import { CONFIG } from './config.ts'

export interface InlineImage {
    contentId: string
    filename: string
    base64: string
}

export interface EmailMessage {
    to: { email: string; name: string }
    subject: string
    html: string
    text: string
    images?: InlineImage[]
}

function parseSender(from: string) {
    const match = from.match(/^(.*)<(.+)>$/)
    return match ? { name: match[1]?.trim() ?? '', email: match[2]?.trim() ?? from } : { name: '', email: from }
}

async function sendWithMailpit({ to, subject, html, text, images = [] }: EmailMessage) {
    const sender = parseSender(CONFIG.email.from)
    const response = await fetch(`${CONFIG.email.mailpitUrl}/api/v1/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            From: { Email: sender.email, Name: sender.name },
            To: [{ Email: to.email, Name: to.name }],
            Subject: subject,
            HTML: html,
            Text: text,
            Attachments: images.map(({ contentId, filename, base64 }) => ({
                Content: base64,
                Filename: filename,
                ContentType: 'image/png',
                ContentID: contentId,
            })),
        }),
    })
    if (!response.ok) throw new Error(`Mailpit rejected the email: ${response.status} ${await response.text()}`)
}

async function sendWithResend({ to, subject, html, text, images = [] }: EmailMessage) {
    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${CONFIG.email.resendApiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: CONFIG.email.from,
            to: [to.email],
            subject,
            html,
            text,
            attachments: images.map(({ contentId, filename, base64 }) => ({
                filename,
                content: base64,
                content_id: contentId,
            })),
        }),
    })
    if (!response.ok) throw new Error(`Resend rejected the email: ${response.status} ${await response.text()}`)
}

export function sendEmail(message: EmailMessage) {
    return CONFIG.email.provider === 'resend' ? sendWithResend(message) : sendWithMailpit(message)
}
