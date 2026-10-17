import type { EMPTY_LIST_ITEMS } from '~/data/events/form'
import type { EVENT_FILTERS } from '~/data/events/filters'
import type { Database, Enums, Tables, TablesInsert, TablesUpdate } from '~/types/database'

export type EventRow = Tables<'events'>

export type EventInsert = TablesInsert<'events'>

export type EventUpdate = TablesUpdate<'events'>

export type EventCategory = Enums<'event_category'>

export type EventTone = Enums<'pop_tone'>

export type EventSummary = Database['public']['Functions']['event_summaries']['Returns'][number]

export type EventOverview = EventRow & { stats: EventSummary | undefined }

export type EventFilter = (typeof EVENT_FILTERS)[number]['value']

export interface CityPreset {
    name: string
    code: string
    region: string
}

export interface EventOutletContext {
    event: EventRow
}

export type TextListName = 'highlights' | 'included' | 'not_included' | 'things_to_know'

export type PairListName = keyof typeof EMPTY_LIST_ITEMS

export interface ListItemField {
    key: string
    label: string
    placeholder: string
    multiline?: boolean
}
