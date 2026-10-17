import { PATHS } from '~/data/navigation'
import type { PageMeta } from '~/lib/seo/meta'

export const PAST_EVENTS_PAGE: PageMeta = {
    title: 'Past Events & Photos · Echoverse Hub',
    description:
        'Photos and recaps from past Echoverse Hub dance nights, mixers and workshops in Pune & Mumbai. See what you missed and catch the next one.',
    path: PATHS.pastEvents,
}

export const PAST_EVENTS_HEADING = {
    eyebrow: 'Throwbacks 📸',
    title: 'Nights we still talk about',
    lead: 'Recaps and photo dumps from past Echoverse events. Spot yourself? Send it to the group chat.',
}

export const PAST_EVENTS_COPY = {
    recap: 'Read the recap',
    upcoming: 'See what’s coming up',
} as const

export const PAST_EVENTS_EMPTY = {
    emoji: '📸',
    title: 'The first memories are still ahead',
    body: 'Our first events haven’t happened yet. Come make some with us.',
} as const

export const PAST_GALLERY_LIMIT = 4
