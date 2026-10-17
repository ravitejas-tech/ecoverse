export interface Booking {
    order: {
        id: string
        booking_code: string
        status: string
        source: string
        name: string
        email: string
        total: number
        discount: number
    }
    event: {
        slug: string
        title: string
        starts_at: string
        ends_at: string
        city: string
        venue_name: string
        venue_address: string
        venue_lat: number | null
        venue_lng: number | null
        map_url: string | null
        dress_code: string
    }
    items: { name: string; quantity: number; unit_price: number; admits: number }[]
    tickets: { code: string; qr_token: string; ticket_type: string; status: string }[]
}

export const QR_PREFIX = 'ECHOVERSE:'
