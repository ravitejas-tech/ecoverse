import type { Config } from '@react-router/dev/config'
import { SEO_FILES } from './app/data/seo/routes'

export default {
    appDirectory: 'app',
    ssr: false,
    prerender: ['/', ...Object.values(SEO_FILES)],
} satisfies Config
