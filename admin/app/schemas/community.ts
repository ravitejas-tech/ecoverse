import { z } from 'zod'

const count = z.coerce.number()

export const communityMemberSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    city: z.string().nullable(),
    marketing_consent: z.boolean(),
    events_booked: count,
    events_attended: count,
    tickets: count,
    total_spent: count,
    first_booked_at: z.string(),
    last_booked_at: z.string(),
    last_event_title: z.string().nullable(),
    last_event_at: z.string().nullable(),
    next_event_title: z.string().nullable(),
    next_event_at: z.string().nullable(),
    is_new: z.boolean(),
    is_regular: z.boolean(),
    has_upcoming: z.boolean(),
})

export const communityStatsSchema = z.object({
    total: count,
    new_members: count,
    regulars: count,
    upcoming: count,
    past: count,
    updates_ok: count,
})
