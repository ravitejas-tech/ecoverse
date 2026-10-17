export const QR_PREFIX = 'ECHOVERSE:'

export const ticketQrValue = (qrToken: string) => `${QR_PREFIX}${qrToken}`

export const TICKET_CARD_COPY = {
    header: 'Echoverse ✦ Admit one',
    position: (index: number, total: number) => `${index} / ${total}`,
    scanHint: 'Scan at the gate',
    checkedIn: 'Checked in ✓',
    cancelled: 'Cancelled',
    cancelledBody: 'This ticket no longer works at the gate.',
    qrLabel: (code: string) => `QR code for ticket ${code}`,
} as const

export const TICKET_ACTIONS_COPY = {
    whatsapp: 'Send to WhatsApp',
    calendar: 'Add to calendar',
    print: 'Print',
    myTickets: 'All your tickets live in My Tickets',
    shareMessage: (title: string, when: string, url: string) => `🎟️ My tickets for ${title} (${when}): ${url}`,
} as const
