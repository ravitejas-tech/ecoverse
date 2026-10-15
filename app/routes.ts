import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'
import { SEO_FILES } from './data/seo/routes'

export default [
    layout('routes/layout.tsx', [index('routes/index.tsx')]),
    route(SEO_FILES.robots, 'routes/robots[.]txt.ts'),
    route(SEO_FILES.sitemap, 'routes/sitemap[.]xml.ts'),
    route(SEO_FILES.manifest, 'routes/manifest[.]webmanifest.ts'),
] satisfies RouteConfig
