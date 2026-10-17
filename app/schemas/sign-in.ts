import { z } from 'zod'
import { LOGIN_CODE_LENGTH } from '~/data/account/auth'
import { SIGN_IN_COPY } from '~/data/account/sign-in'
import { digitsOnly } from '~/lib/digits'

export const emailFormSchema = z.object({
    email: z.string().trim().toLowerCase().pipe(z.email(SIGN_IN_COPY.emailError)),
})

export const codeFormSchema = z.object({
    code: z.string().transform(digitsOnly).pipe(z.string().length(LOGIN_CODE_LENGTH, SIGN_IN_COPY.codeError)),
})
