import { useState } from 'react'
import { TicketPercent } from 'lucide-react'
import { PromoForm } from '~/components/checkout/summary/promo-form'
import { Button } from '~/components/ui/button'
import { Sticker } from '~/components/ui/sticker'
import { PROMO_COPY } from '~/data/checkout/summary'
import { checkoutErrorMessage } from '~/lib/checkout/errors'
import { formatRupees } from '~/lib/format'
import type { PromoQuote } from '~/types/checkout'

export interface PromoCodeProps {
    applied: PromoQuote | null
    checking: boolean
    error: Error | null
    onApply: (code: string) => void
    onRemove: () => void
}

export function PromoCode({ applied, checking, error, onApply, onRemove }: PromoCodeProps) {
    const [open, setOpen] = useState(false)

    if (applied) {
        return (
            <div className='flex flex-wrap items-center justify-between gap-3'>
                <Sticker
                    tone='lime'
                    tilt='left'>
                    {applied.discount > 0
                        ? PROMO_COPY.applied(applied.code, formatRupees(applied.discount))
                        : PROMO_COPY.appliedNoAmount(applied.code)}
                </Sticker>
                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={onRemove}
                    aria-label={PROMO_COPY.removeLabel(applied.code)}>
                    {PROMO_COPY.remove}
                </Button>
            </div>
        )
    }

    if (!open) {
        return (
            <Button
                type='button'
                variant='ghost'
                size='sm'
                className='-ml-3'
                onClick={() => setOpen(true)}
                aria-expanded={false}>
                <TicketPercent />
                {PROMO_COPY.toggle}
            </Button>
        )
    }

    return (
        <PromoForm
            checking={checking}
            serverError={error ? checkoutErrorMessage(error) : undefined}
            onApply={onApply}
        />
    )
}
