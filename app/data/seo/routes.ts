export const SEO_FILES = {
    robots: '/robots.txt',
    sitemap: '/sitemap.xml',
    manifest: '/manifest.webmanifest',
} as const

export const SITEMAP_PAGES = [{ path: '/', changefreq: 'weekly', priority: '1.0' }] as const
