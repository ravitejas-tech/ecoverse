import type { Config } from '@react-router/dev/config'
import { loadEnv } from 'vite'
import { eventPath, PUBLIC_PAGES } from './app/data/navigation'
import { SEO_FILES } from './app/data/seo/routes'

async function publishedEventPaths() {
    const { VITE_SUPABASE_URL: url, VITE_SUPABASE_PUBLISHABLE_KEY: key } = loadEnv(
        process.env.NODE_ENV ?? 'production',
        process.cwd(),
        'VITE_',
    )
    if (!url || !key) throw new Error('Prerender: set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env.')

    const response = await fetch(`${url}/rest/v1/events?select=slug&status=eq.published`, {
        headers: { apikey: key },
    }).catch((cause: unknown) => {
        throw new Error(
            `Prerender: Supabase at ${url} is unreachable, so the event pages cannot be built. Start it with \`yarn db:start\` and build again.`,
            { cause },
        )
    })
    if (!response.ok) {
        throw new Error(`Prerender: Supabase answered ${response.status} when listing published events.`)
    }

    const events = (await response.json()) as { slug: string }[]
    return events.map(({ slug }) => eventPath(slug))
}

export default {
    appDirectory: 'app',
    ssr: false,
    async prerender() {
        return [...PUBLIC_PAGES, ...(await publishedEventPaths()), ...Object.values(SEO_FILES)]
    },
} satisfies Config
