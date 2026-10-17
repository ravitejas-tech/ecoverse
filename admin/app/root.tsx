import { useState, type ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { ErrorScreen } from '~/components/layout/error-screen'
import { Spinner } from '~/components/ui/spinner'
import { Toaster } from '~/components/ui/toaster'
import { ADMIN_BRAND } from '~/data/brand'
import { ERROR_COPY, LOADING_LABEL } from '~/data/ui/feedback'
import { ADMIN_ICONS, ADMIN_ROBOTS } from '~/data/ui/document'
import { THEME_INIT_SCRIPT } from '~/data/ui/theme'
import { createQueryClient } from '~/lib/query-client'
import type { Route } from './+types/root'
import './global.css'

export const links: Route.LinksFunction = () => [
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: ADMIN_ICONS.favicon },
    { rel: 'apple-touch-icon', href: ADMIN_ICONS.appleTouch },
]

export const meta: Route.MetaFunction = () => [{ title: ADMIN_BRAND.title }, { name: 'robots', content: ADMIN_ROBOTS }]

export function Layout({ children }: { children: ReactNode }) {
    return (
        <html
            lang='en-IN'
            suppressHydrationWarning>
            <head>
                <meta charSet='utf-8' />
                <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1, viewport-fit=cover'
                />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default function App() {
    const [queryClient] = useState(createQueryClient)

    return (
        <QueryClientProvider client={queryClient}>
            <Outlet />
            <Toaster />
        </QueryClientProvider>
    )
}

export function HydrateFallback() {
    return <Spinner label={LOADING_LABEL} />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    if (isRouteErrorResponse(error)) {
        return error.status === 404 ? (
            <ErrorScreen {...ERROR_COPY.notFound} />
        ) : (
            <ErrorScreen
                title={ERROR_COPY.failed.title}
                details={error.statusText || ERROR_COPY.failed.details}
            />
        )
    }

    const isDevError = import.meta.env.DEV && error instanceof Error
    return (
        <ErrorScreen
            title={ERROR_COPY.failed.title}
            details={isDevError ? error.message : ERROR_COPY.failed.details}
            stack={isDevError ? error.stack : undefined}
        />
    )
}
