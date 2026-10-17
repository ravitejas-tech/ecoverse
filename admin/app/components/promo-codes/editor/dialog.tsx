import { PromoCodeForm } from '~/components/promo-codes/editor/form'
import { Button } from '~/components/ui/button'
import { Dialog } from '~/components/ui/dialog'
import { Spinner } from '~/components/ui/spinner'
import { PROMO_CODE_FORM_ID } from '~/data/promo-codes/defaults'
import { PROMO_FORM_COPY } from '~/data/promo-codes/form'
import { CONFIRM_DEFAULTS } from '~/data/ui/dialog'
import { LOADING_LABEL } from '~/data/ui/feedback'
import { useEvents } from '~/hooks/events/queries'
import { useSavePromoCode } from '~/hooks/promo-codes/mutations'
import { formToPromo, promoErrorMessage } from '~/lib/promo-codes'
import type { PromoCodeRow } from '~/types/promo-codes'

const copy = PROMO_FORM_COPY

export interface PromoCodeDialogProps {
    code?: PromoCodeRow
    onClose: () => void
}

export function PromoCodeDialog({ code, onClose }: PromoCodeDialogProps) {
    const { data: events = [], isPending: eventsLoading } = useEvents()
    const { mutate, isPending, error } = useSavePromoCode()
    const submitLabel = code ? copy.save : copy.create

    return (
        <Dialog
            open
            onClose={onClose}
            title={code ? copy.editTitle(code.code) : copy.newTitle}
            description={code ? undefined : copy.newDescription}
            footer={
                <>
                    <Button
                        variant='secondary'
                        onClick={onClose}>
                        {CONFIRM_DEFAULTS.cancel}
                    </Button>
                    <Button
                        type='submit'
                        form={PROMO_CODE_FORM_ID}
                        disabled={isPending || eventsLoading}>
                        {isPending ? copy.saving : submitLabel}
                    </Button>
                </>
            }>
            {eventsLoading ? (
                <Spinner label={LOADING_LABEL} />
            ) : (
                <PromoCodeForm
                    code={code}
                    events={events}
                    error={error ? promoErrorMessage(error) : undefined}
                    onSubmit={(values) => mutate({ id: code?.id, values: formToPromo(values) }, { onSuccess: onClose })}
                />
            )}
        </Dialog>
    )
}
