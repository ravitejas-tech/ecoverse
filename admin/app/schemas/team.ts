import { z } from 'zod'
import { TEAM_COPY } from '~/data/team/copy'
import { Constants } from '~/types/database'

const role = z.enum(Constants.public.Enums.staff_role)

export const inviteSchema = z.object({
    name: z.string().trim().min(2, TEAM_COPY.errors.name).max(80, TEAM_COPY.errors.name),
    email: z.email(TEAM_COPY.errors.email),
    role,
})

export const roleSchema = z.object({ role })

export type InviteValues = z.infer<typeof inviteSchema>
export type RoleValues = z.infer<typeof roleSchema>
