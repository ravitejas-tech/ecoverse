import type { DivIconOptions } from 'leaflet'

export const VENUE_PICKER_COPY = {
    label: 'Venue on the map',
    placeholder: 'Search the venue or area, like Koregaon Park',
    hint: 'Pick a result, then drag the pin or tap the map to mark the exact entrance.',
    clear: 'Clear search',
    suggestions: 'Places',
    searching: 'Searching…',
    noResults: 'Nothing found. Search the area instead, then tap the exact spot on the map.',
    searchFailed: "Search isn't working right now. You can still tap the map to drop the pin.",
    mapLabel: 'Venue map',
    mapFailed: "The map didn't load. Check the internet connection and refresh the page.",
    pinTitle: 'Venue pin',
    pinned: 'Pinned. Directions on the website open this exact spot.',
    adjust: 'Wrong spot? Drag the pin or tap the map.',
    tapExact: 'Now tap the exact spot on the map to drop the pin.',
    notPinned: 'No pin yet. Search above, or tap the map to drop one.',
    notPinnedReadOnly: 'No pin yet.',
    removePin: 'Remove pin',
} as const

export const VENUE_MAP = {
    tiles: {
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
    },
    defaultCenter: { lat: 18.5204, lng: 73.8567 },
    defaultZoom: 12,
    areaZoom: 16,
    pinnedZoom: 17,
} as const

export const VENUE_PIN_ICON: DivIconOptions = {
    className: '',
    html: '<span class="relative block size-8 -rotate-45 rounded-full rounded-bl-none border-2 border-border bg-pop-pink shadow-pop-sm"><span class="absolute inset-0 m-auto block size-3 rounded-full border-2 border-border bg-surface"></span></span>',
    iconSize: [32, 32],
    iconAnchor: [16, 39],
}

export const PLACE_SEARCH = {
    url: 'https://photon.komoot.io/api/',
    language: 'en',
    limit: 6,
    indiaBox: '68.1,6.5,97.4,35.7',
    minLength: 3,
    exactTypes: ['house'],
} as const
