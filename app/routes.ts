import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'
import { SEO_FILES } from './data/seo/routes'

export default [
    layout('routes/layout.tsx', [
        index('routes/index.tsx'),
        route('events', 'routes/events/index.tsx'),
        route('events/:slug', 'routes/events/$slug.tsx'),
        route('events/:slug/book', 'routes/events/$slug.book.tsx'),
        route('tickets/:token', 'routes/tickets.$token.tsx'),
        route('my-tickets', 'routes/my-tickets.tsx'),
        route('past-events', 'routes/past-events.tsx'),
        route('about', 'routes/about.tsx'),
        route('faqs', 'routes/faqs.tsx'),
        route('contact', 'routes/contact.tsx'),
        route('terms', 'routes/terms.tsx'),
        route('privacy', 'routes/privacy.tsx'),
        route('refund-policy', 'routes/refund-policy.tsx'),
    ]),
    route(SEO_FILES.robots, 'routes/robots[.]txt.ts'),
    route(SEO_FILES.sitemap, 'routes/sitemap[.]xml.ts'),
    route(SEO_FILES.manifest, 'routes/manifest[.]webmanifest.ts'),
] satisfies RouteConfig
