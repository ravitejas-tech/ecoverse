import type { DrakeMemeContent } from '~/types/landing'

export const VIBE_CHECK_HEADING = {
    eyebrow: 'Why Echoverse',
    title: 'The vibe check ✅',
    scrawl: 'we did the boring part so you don’t have to',
}

export const DRAKE_EMOJI = { nope: '🙅', yep: '😎' } as const

export const DRAKE_MEMES: DrakeMemeContent[] = [
    {
        nope: 'Digging through six Instagram stories to find the venue',
        yep: 'One event page with the venue, timings, FAQs and the dress code',
    },
    {
        nope: 'Paying on a random link and praying it went through',
        yep: 'UPI in two taps and a QR ticket the second it clears',
    },
    {
        nope: '“Bro, can you resend my ticket?” — at the gate, at 9 PM',
        yep: 'My Tickets. Always there. Always ready to scan.',
    },
]
