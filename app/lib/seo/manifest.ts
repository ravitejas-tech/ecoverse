import { BRAND_NAME, BRAND_TAGLINE } from '~/data/brand'
import { BRAND_ICONS, SITE, THEME_COLORS } from '~/data/seo/site'

export function buildManifest() {
    return {
        name: BRAND_NAME,
        short_name: SITE.shortName,
        description: BRAND_TAGLINE,
        lang: SITE.language,
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: THEME_COLORS.light,
        theme_color: THEME_COLORS.light,
        icons: [
            { src: BRAND_ICONS.svg, sizes: 'any', type: 'image/svg+xml' },
            ...BRAND_ICONS.any.map(({ path, size }) => ({ src: path, sizes: `${size}x${size}`, type: 'image/png' })),
            {
                src: BRAND_ICONS.maskable.path,
                sizes: `${BRAND_ICONS.maskable.size}x${BRAND_ICONS.maskable.size}`,
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
    }
}
