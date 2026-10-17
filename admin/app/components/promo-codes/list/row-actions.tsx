import { Button } from '~/components/ui/button'
import { PROMO_CODES_COPY } from '~/data/promo-codes/copy'
import { useSetPromoCodeActive } from '~/hooks/promo-codes/mutations'
import type { PromoCodeOverview } from '~/types/promo-codes'

const { actions } = PROMO_CODES_COPY

export interface PromoCodeActionsProps {
    code: PromoCodeOverview
    onEdit: (code: PromoCodeOverview) => void
}

export function PromoCodeActions({ code, onEdit }: PromoCodeActionsProps) {
    const { mutate, isPending } = useSetPromoCodeActive()

    return (
        <div className='grid grid-cols-2 gap-2 pr-0.5 pb-0.5 sm:flex sm:justify-end'>
            <Button
                size='sm'
                variant='secondary'
                aria-label={actions.editCode(code.code)}
                onClick={() => onEdit(code)}>
                {actions.edit}
            </Button>
            <Button
                size='sm'
                variant='secondary'
                disabled={isPending}
                aria-label={code.active ? actions.turnOffCode(code.code) : actions.turnOnCode(code.code)}
                onClick={() => mutate({ id: code.id, code: code.code, active: !code.active })}>
                {code.active ? actions.turnOff : actions.turnOn}
            </Button>
        </div>
    )
}
