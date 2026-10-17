import type { ExperienceCategory } from '~/types/landing'

export const EXPERIENCES_HEADING = {
    eyebrow: 'Pick your vibe',
    title: 'One universe. Many kinds of fun.',
    scrawl: 'introverts & extroverts both welcome',
}

export const EXPERIENCES: ExperienceCategory[] = [
    { category: 'dance_night', title: 'Dance Nights', emoji: '💃', caption: 'two left feet? perfect.', tone: 'pink' },
    {
        category: 'social_mixer',
        title: 'Social Mixers',
        emoji: '🥂',
        caption: 'come solo, leave with a squad',
        tone: 'yellow',
    },
    { category: 'workshop', title: 'Workshops', emoji: '🎨', caption: 'make a thing, take it home', tone: 'cyan' },
    {
        category: 'weekend_trip',
        title: 'Weekend Trips',
        emoji: '🚐',
        caption: 'group chat → actual trip',
        tone: 'lime',
    },
    { category: 'nightlife', title: 'Nightlife', emoji: '🪩', caption: 'main character energy only', tone: 'violet' },
    { category: 'meetup', title: 'Meetups', emoji: '🤝', caption: 'your people, but IRL', tone: 'orange' },
]
