export const CALENDAR_PRODUCT_ID = '-//Echoverse Hub//Tickets//EN'

export const CALENDAR_MIME_TYPE = 'text/calendar;charset=utf-8'

export const calendarFileName = (bookingCode: string) => `echoverse-${bookingCode.toLowerCase()}.ics`

export const calendarDescription = (bookingCode: string, ticketUrl: string) =>
    `Booking ID ${bookingCode}. Your tickets: ${ticketUrl}`

export const calendarUid = (orderId: string, siteUrl: string) => `${orderId}@${new URL(siteUrl).hostname}`
