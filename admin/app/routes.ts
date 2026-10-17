import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
    route('login', 'routes/login.tsx'),
    route('set-password', 'routes/set-password.tsx'),
    layout('routes/layout.tsx', [
        index('routes/index.tsx'),
        route('events', 'routes/events/index.tsx'),
        route('events/new', 'routes/events/new.tsx'),
        route('events/:id', 'routes/events/$id/layout.tsx', [
            index('routes/events/$id/index.tsx'),
            route('tickets', 'routes/events/$id/tickets.tsx'),
            route('questions', 'routes/events/$id/questions.tsx'),
            route('attendees', 'routes/events/$id/attendees.tsx'),
        ]),
        route('promo-codes', 'routes/promo-codes.tsx'),
        route('orders', 'routes/orders/index.tsx'),
        route('orders/:id', 'routes/orders/$id.tsx'),
        route('community', 'routes/community/index.tsx'),
        route('community/:id', 'routes/community/$id.tsx'),
        route('check-in', 'routes/check-in/index.tsx'),
        route('check-in/:eventId', 'routes/check-in/$eventId.tsx'),
        route('team', 'routes/team.tsx'),
        route('gallery', 'routes/gallery.tsx'),
        route('activity', 'routes/activity.tsx'),
    ]),
] satisfies RouteConfig
