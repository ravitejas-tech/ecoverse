import { z } from 'zod'

export const scheduleItemSchema = z.object({ time: z.string(), title: z.string() })

export const hostSchema = z.object({ name: z.string(), role: z.string() })

export const faqSchema = z.object({ question: z.string(), answer: z.string() })

export const scheduleListSchema = z.array(scheduleItemSchema).catch([])

export const hostListSchema = z.array(hostSchema).catch([])

export const faqListSchema = z.array(faqSchema).catch([])
