import { PATHS, type PublicPage } from '~/data/navigation'

export interface SitemapSettings {
    changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
    priority: string
}

export const SITEMAP_SETTINGS: Record<PublicPage, SitemapSettings> = {
    [PATHS.home]: { changefreq: 'weekly', priority: '1.0' },
    [PATHS.events]: { changefreq: 'daily', priority: '0.9' },
    [PATHS.pastEvents]: { changefreq: 'monthly', priority: '0.6' },
    [PATHS.about]: { changefreq: 'monthly', priority: '0.6' },
    [PATHS.faqs]: { changefreq: 'monthly', priority: '0.5' },
    [PATHS.contact]: { changefreq: 'yearly', priority: '0.5' },
    [PATHS.terms]: { changefreq: 'yearly', priority: '0.2' },
    [PATHS.privacy]: { changefreq: 'yearly', priority: '0.2' },
    [PATHS.refundPolicy]: { changefreq: 'yearly', priority: '0.2' },
}

export const EVENT_SITEMAP_SETTINGS: Record<'upcoming' | 'past', SitemapSettings> = {
    upcoming: { changefreq: 'daily', priority: '0.8' },
    past: { changefreq: 'yearly', priority: '0.4' },
}

export const ROBOTS_DISALLOW = [`${PATHS.tickets}/`, PATHS.myTickets, `${PATHS.events}/*/book`]
