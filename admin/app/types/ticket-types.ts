import type { TICKET_STATE_TONES } from '~/data/events/tickets'
import type { Database, Tables, TablesInsert } from '~/types/database'

export type TicketType = Tables<'ticket_types'>

export type TicketTypeInsert = TablesInsert<'ticket_types'>

export type TicketAvailability = Database['public']['Functions']['ticket_availability']['Returns'][number]

export type TicketTypeStock = TicketType & { remaining: number; booked: number }

export type TicketPreset = Pick<TicketType, 'name' | 'price' | 'quantity' | 'admits' | 'description'>

export type TicketSaleState = keyof typeof TICKET_STATE_TONES

export interface TicketDraft {
    ticket?: TicketTypeStock
    preset?: TicketPreset
}
