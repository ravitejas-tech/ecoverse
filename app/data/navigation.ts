export const PATHS = {
    home: '/',
    events: '/events',
    pastEvents: '/past-events',
    about: '/about',
    faqs: '/faqs',
    contact: '/contact',
    terms: '/terms',
    privacy: '/privacy',
    refundPolicy: '/refund-policy',
    myTickets: '/my-tickets',
    tickets: '/tickets',
} as const

export const PUBLIC_PAGES = [
    PATHS.home,
    PATHS.events,
    PATHS.pastEvents,
    PATHS.about,
    PATHS.faqs,
    PATHS.contact,
    PATHS.terms,
    PATHS.privacy,
    PATHS.refundPolicy,
] as const

export type PublicPage = (typeof PUBLIC_PAGES)[number]

export const eventPath = (slug: string) => `${PATHS.events}/${slug}`

export const eventBookingPath = (slug: string) => `${eventPath(slug)}/book`

export const NEW_BOOKING_PARAM = 'new'

export const ticketPath = (accessToken: string, isNew = false) =>
    `${PATHS.tickets}/${accessToken}${isNew ? `?${NEW_BOOKING_PARAM}=1` : ''}`

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
    { label: 'Events', to: PATHS.events },
    { label: 'Experiences', to: `${PATHS.home}${sectionHref(SECTION_IDS.experiences)}` },
    { label: 'Past Events', to: PATHS.pastEvents },
    { label: 'About', to: PATHS.about },
    { label: 'My Tickets', to: PATHS.myTickets },
] as const

export const PRIMARY_CTA_LABEL = 'Explore Events'
