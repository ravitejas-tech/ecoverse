import { formatCount } from '~/lib/format'

export const DASHBOARD_COPY = {
    title: 'Dashboard',
    description: 'How ticket sales, check-ins and campaigns are doing.',
    eventLabel: 'Show numbers for',
    allEvents: 'All events',
    orderCount: (count: number) => `${formatCount(count)} ${count === 1 ? 'order' : 'orders'}`,
    loadError: {
        title: "Couldn't load the numbers",
        body: 'Check your internet and try again.',
        retry: 'Try again',
    },
    stats: {
        sold: { label: 'Tickets sold', hint: (orders: string) => `From ${orders}` },
        money: { label: 'Money in', hint: (net: string) => `${net} after refunds` },
        checkedIn: { label: 'Checked in', hint: (done: string, total: string) => `${done} of ${total} people` },
        seats: { label: 'Seats left', hint: (capacity: string) => `Out of ${capacity}` },
        visitors: { label: 'Website visitors', hint: (views: string) => `${views} page views` },
        booked: { label: 'Visitors who booked', hint: 'Of all visitors' },
        repeat: { label: 'Repeat attendees', hint: (repeat: string, total: string) => `${repeat} of ${total} people` },
        average: { label: 'Average order', hint: 'Per online order' },
    },
    orders: {
        title: 'Orders',
        listLabel: 'Orders by status',
        count: (label: string, count: string) => `${label} · ${count}`,
        complimentary: 'Free tickets',
        abandoned: 'Left before paying',
        refunded: (amount: string) => `${amount} refunded so far`,
        needsRefund: {
            title: (count: number) => `${formatCount(count)} ${count === 1 ? 'order needs' : 'orders need'} a refund`,
            body: 'They paid but have no ticket. Send the money back.',
            action: 'Show these orders',
        },
    },
    tickets: {
        title: 'Sales by ticket',
        sold: (sold: string, quantity: string) => `${sold} of ${quantity} sold`,
        barLabel: (event: string, name: string) => `${event}, ${name}: tickets sold`,
        empty: 'No tickets on sale yet.',
    },
    daily: {
        title: 'Last 14 days',
        listLabel: 'Paid orders each day for the last 14 days',
        total: (orders: string, revenue: string) => `${orders} · ${revenue}`,
        bar: (day: string, orders: string, revenue: string) => `${day}: ${orders}, ${revenue}`,
        empty: 'No orders in the last 14 days.',
    },
    promos: {
        title: 'Promo codes',
        caption: 'Promo code use',
        columns: { code: 'Code', uses: 'Times used', discount: 'Discount given', revenue: 'Money in' },
        empty: 'No promo codes used yet.',
    },
    sources: {
        title: 'Where buyers came from',
        caption: 'Orders by where buyers came from',
        columns: { source: 'Came from', orders: 'Orders', revenue: 'Money in' },
        empty: 'No online orders yet.',
    },
} as const
