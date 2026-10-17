import { Plus } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { PROMO_CODES_COPY } from '~/data/promo-codes/copy'

export function NewPromoCodeButton({ onClick }: { onClick: () => void }) {
    return (
        <Button onClick={onClick}>
            <Plus aria-hidden />
            {PROMO_CODES_COPY.newCode}
        </Button>
    )
}
