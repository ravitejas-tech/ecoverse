import { z } from 'zod'

export const eventScheduleItemSchema = z.object({ time: z.string(), title: z.string() })

export const eventHostSchema = z.object({ name: z.string(), role: z.string() })

export const eventFaqSchema = z.object({ question: z.string(), answer: z.string() })

export const eventScheduleSchema = z.array(eventScheduleItemSchema).catch([])

export const eventHostsSchema = z.array(eventHostSchema).catch([])

export const eventFaqsSchema = z.array(eventFaqSchema).catch([])

export const previewTokenSchema = z.uuid()
