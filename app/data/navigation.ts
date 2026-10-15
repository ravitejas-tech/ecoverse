export const HOME_PATH = '/'

export const SECTION_IDS = {
    events: 'events',
    experiences: 'experiences',
    journey: 'how-it-works',
    vibeCheck: 'why-echoverse',
    shoutouts: 'past-events',
    join: 'join',
} as const

export const sectionHref = (id: (typeof SECTION_IDS)[keyof typeof SECTION_IDS]) => `#${id}`

export const NAV_LINKS = [
    { label: 'Events', href: sectionHref(SECTION_IDS.events) },
    { label: 'Experiences', href: sectionHref(SECTION_IDS.experiences) },
    { label: 'How it works', href: sectionHref(SECTION_IDS.journey) },
    { label: 'Past Events', href: sectionHref(SECTION_IDS.shoutouts) },
] as const

export const PRIMARY_CTA_LABEL = 'Explore Events'
