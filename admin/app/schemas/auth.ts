import { z } from 'zod'
import { AUTH_COPY } from '~/data/auth/copy'

const { errors } = AUTH_COPY

export const emailSchema = z.object({
    email: z.email(errors.email),
})

export const loginSchema = emailSchema.extend({
    password: z.string().min(1, errors.password),
})

export const newPasswordSchema = z
    .object({
        password: z.string().min(8, errors.shortPassword),
        confirm: z.string(),
    })
    .refine(({ password, confirm }) => password === confirm, { message: errors.mismatch, path: ['confirm'] })

export type EmailValues = z.infer<typeof emailSchema>
export type LoginValues = z.infer<typeof loginSchema>
export type NewPasswordValues = z.infer<typeof newPasswordSchema>
