import type { ReactNode } from 'react'
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { ErrorPage } from '~/components/layout/error-page'
import { SkipLink } from '~/components/layout/skip-link'
import { ERROR_COPY } from '~/data/ui/error'
import { SEO_FILES } from '~/data/seo/routes'
import { BRAND_ICONS, SITE, THEME_COLORS } from '~/data/seo/site'
import { FONT_PRELOADS } from '~/data/ui/fonts'
import { THEME_INIT_SCRIPT } from '~/data/ui/theme'
import type { Route } from './+types/root'
import './global.css'

export const links: Route.LinksFunction = () => [
    { rel: 'icon', type: 'image/svg+xml', href: BRAND_ICONS.svg },
    ...BRAND_ICONS.any.map(({ path, size }) => ({
        rel: 'icon',
        type: 'image/png',
        sizes: `${size}x${size}`,
        href: path,
    })),
    { rel: 'apple-touch-icon', href: BRAND_ICONS.appleTouch },
    { rel: 'manifest', href: SEO_FILES.manifest },
    ...FONT_PRELOADS.map((href) => ({
        rel: 'preload',
        href,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous' as const,
    })),
]

export function Layout({ children }: { children: ReactNode }) {
    return (
        <html
            lang={SITE.language}
            suppressHydrationWarning>
            <head>
                <meta charSet='utf-8' />
                <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1, viewport-fit=cover'
                />
                {Object.entries(THEME_COLORS).map(([scheme, color]) => (
                    <meta
                        key={scheme}
                        name='theme-color'
                        media={`(prefers-color-scheme: ${scheme})`}
                        content={color}
                    />
                ))}
                <Meta />
                <Links />
            </head>
            <body>
                <SkipLink />
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default function App() {
    return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    if (isRouteErrorResponse(error)) {
        return error.status === 404 ? (
            <ErrorPage {...ERROR_COPY.notFound} />
        ) : (
            <ErrorPage
                title={ERROR_COPY.failed.title}
                details={error.statusText || ERROR_COPY.failed.details}
            />
        )
    }

    const isDevError = import.meta.env.DEV && error instanceof Error
    return (
        <ErrorPage
            title={ERROR_COPY.failed.title}
            details={isDevError ? error.message : ERROR_COPY.failed.details}
            stack={isDevError ? error.stack : undefined}
        />
    )
}
