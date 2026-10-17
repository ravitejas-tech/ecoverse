import QRCode from 'npm:qrcode@1.5.4'
import { encodeBase64 } from 'jsr:@std/encoding@1/base64'
import type { Booking } from './booking.ts'
import { QR_PREFIX } from './booking.ts'
import { CONFIG } from './config.ts'
import { directionsUrl } from './directions.ts'
import type { EmailMessage } from './email.ts'

const INK = '#1b1035'

const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] ?? char)

const formatWhen = (startsAt: string) =>
    new Intl.DateTimeFormat(CONFIG.locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: '2-digit',
        timeZone: CONFIG.timeZone,
    }).format(new Date(startsAt))

const formatRupees = (amount: number) =>
    new Intl.NumberFormat(CONFIG.locale, { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

export const ticketPageUrl = (accessToken: string) => `${CONFIG.siteUrl}/tickets/${accessToken}`

async function qrImage(token: string, index: number) {
    const png: Uint8Array = await QRCode.toBuffer(`${QR_PREFIX}${token}`, { width: 320, margin: 1, errorCorrectionLevel: 'M' })
    return { contentId: `ticket-${index + 1}`, filename: `ticket-${index + 1}.png`, base64: encodeBase64(png) }
}

const card = (inner: string, headerColour: string, header: string) => `
<div style="max-width:520px;margin:0 auto 20px;background:#ffffff;border:2px solid ${INK};border-radius:24px;box-shadow:5px 5px 0 ${INK};overflow:hidden">
  <div style="background:${headerColour};border-bottom:2px solid ${INK};padding:12px 24px;font-weight:800;letter-spacing:2px;text-transform:uppercase;font-size:12px">${header}</div>
  <div style="padding:24px">${inner}</div>
</div>`

export async function buildTicketEmail(booking: Booking, accessToken: string): Promise<EmailMessage> {
    const { order, event, tickets } = booking
    const images = await Promise.all(tickets.map((ticket, index) => qrImage(ticket.qr_token, index)))
    const link = ticketPageUrl(accessToken)
    const when = formatWhen(event.starts_at)
    const venue = [event.venue_name, event.venue_address].filter(Boolean).join(', ') || event.city

    const summary = card(
        `<h1 style="margin:0 0 8px;font-size:26px;line-height:32px">${escapeHtml(event.title)}</h1>
         <p style="margin:0 0 4px;font-size:16px;line-height:24px"><strong>${escapeHtml(when)}</strong></p>
         <p style="margin:0 0 16px;font-size:15px;line-height:22px;color:#4b3f6b">${escapeHtml(venue)}</p>
         <p style="margin:0 0 20px;font-size:14px;line-height:22px">Booking ID <strong>${order.booking_code}</strong> · ${tickets.length} ${tickets.length === 1 ? 'ticket' : 'tickets'}${order.total > 0 ? ` · ${formatRupees(order.total)} paid` : ''}</p>
         <a href="${link}" style="display:inline-block;background:#ff4f9a;color:${INK};border:2px solid ${INK};border-radius:999px;padding:12px 24px;font-weight:800;text-decoration:none">Open my tickets</a>
         <a href="${escapeHtml(directionsUrl(event))}" style="display:inline-block;margin-left:8px;color:${INK};font-weight:700">Directions</a>`,
        '#ffd43b',
        'You’re in 🎉',
    )

    const ticketCards = tickets
        .map((ticket, index) =>
            card(
                `<p style="margin:0 0 4px;font-size:18px;font-weight:800">${escapeHtml(ticket.ticket_type)}</p>
                 <p style="margin:0 0 16px;font-size:14px;color:#4b3f6b">Ticket ${index + 1} of ${tickets.length} · ${ticket.code}</p>
                 <img src="cid:ticket-${index + 1}" width="220" height="220" alt="QR code for ticket ${ticket.code}" style="display:block;border:2px solid ${INK};border-radius:16px;background:#ffffff;padding:8px" />
                 <p style="margin:16px 0 0;font-size:13px;color:#4b3f6b">Show this at the gate. Each code lets one person in once.</p>`,
                '#3ccff5',
                'Echoverse ✦ Admit one',
            ),
        )
        .join('')

    const html = `<div style="background:#fff6ea;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:${INK}">
${summary}
${ticketCards}
<p style="max-width:520px;margin:0 auto;font-size:13px;line-height:20px;color:#4b3f6b">Can’t see the QR codes? Open your tickets with the button above — they’re also in My Tickets on echoversehub.com.</p>
</div>`

    const text = [
        `You're in! ${event.title}`,
        when,
        venue,
        `Booking ID: ${order.booking_code}`,
        `Your tickets: ${link}`,
        ...tickets.map((ticket) => `${ticket.ticket_type} · ${ticket.code}`),
    ].join('\n')

    return {
        to: { email: order.email, name: order.name },
        subject: `Your tickets for ${event.title} 🎟️`,
        html,
        text,
        images,
    }
}

export function buildRefundEmail(booking: Booking, amount: number): EmailMessage {
    const { order, event } = booking
    const html = `<div style="background:#fff6ea;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:${INK}">
${card(
    `<h1 style="margin:0 0 12px;font-size:24px">Your refund is on its way</h1>
     <p style="margin:0 0 12px;font-size:16px;line-height:24px">We've refunded ${formatRupees(amount)} for booking <strong>${order.booking_code}</strong> (${escapeHtml(event.title)}). Your tickets for this booking no longer work.</p>
     <p style="margin:0;font-size:14px;line-height:22px;color:#4b3f6b">Refunds usually reach your account in 5–7 working days.</p>`,
    '#a58bff',
    'Echoverse Hub',
)}
</div>`
    return {
        to: { email: order.email, name: order.name },
        subject: `Refund for ${event.title}`,
        html,
        text: `We've refunded ${formatRupees(amount)} for booking ${order.booking_code} (${event.title}). Refunds usually reach your account in 5–7 working days.`,
    }
}
