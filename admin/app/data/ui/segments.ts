export const SEGMENT_SCROLLER_CLASS = '-mx-4 overflow-x-auto px-4 scrollbar-none sm:mx-0 sm:px-0'

export const SEGMENT_TRACK_CLASS = 'flex w-max gap-2 rounded-full border-2 border-border bg-surface p-1'

export const SEGMENT_ITEM_CLASS = 'block cursor-pointer rounded-full px-4 py-2 transition'

export const SEGMENT_STATE_CLASSES = {
    active: 'bg-pop-yellow text-on-pop',
    idle: 'hover:bg-surface-muted',
} as const

export const TABS_TRACK_CLASS =
    'grid grid-cols-2 gap-1 rounded-2xl border-2 border-border bg-surface p-1 sm:flex sm:w-max sm:rounded-full'

export const TABS_ITEM_CLASS = 'block cursor-pointer rounded-xl px-4 py-2 text-center transition sm:rounded-full'
