import { PATHS } from '~/data/navigation'

export const FOOTER_SCRAWL = 'made with 🎉 and way too much chai'

export const FOOTER_COPYRIGHT = `© ${new Date().getFullYear()} Echoverse Hub. All rights reserved.`

export const FOOTER_LINK_GROUPS = [
    {
        title: 'Explore',
        links: [
            { label: 'Events', to: PATHS.events },
            { label: 'Past events', to: PATHS.pastEvents },
            { label: 'About', to: PATHS.about },
            { label: 'FAQs', to: PATHS.faqs },
        ],
    },
    {
        title: 'Help',
        links: [
            { label: 'Contact', to: PATHS.contact },
            { label: 'My Tickets', to: PATHS.myTickets },
            { label: 'Refund policy', to: PATHS.refundPolicy },
        ],
    },
    {
        title: 'Legal',
        links: [
            { label: 'Terms', to: PATHS.terms },
            { label: 'Privacy', to: PATHS.privacy },
        ],
    },
] as const
