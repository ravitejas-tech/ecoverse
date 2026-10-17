import { useCallback, useState } from 'react'
import { PromoCodeDialog, type PromoCodeDialogProps } from '~/components/promo-codes/editor/dialog'
import { PromoCodesSection } from '~/components/promo-codes/list/section'
import { NewPromoCodeButton } from '~/components/promo-codes/new-code-button'
import { PageHeader } from '~/components/ui/page-header'
import { PROMO_CODES_COPY } from '~/data/promo-codes/copy'
import { useCan } from '~/hooks/staff/use-can'
import { requirePermission } from '~/lib/guards'
import type { PromoCodeOverview } from '~/types/promo-codes'

export async function clientLoader() {
    await requirePermission('viewPromoCodes')
    return null
}

export default function PromoCodes() {
    const canEdit = useCan('editPromoCodes')
    const [editor, setEditor] = useState<Pick<PromoCodeDialogProps, 'code'>>()
    const openNew = () => setEditor({})
    const openEdit = useCallback((code: PromoCodeOverview) => setEditor({ code }), [])

    return (
        <>
            <PageHeader
                title={PROMO_CODES_COPY.title}
                description={PROMO_CODES_COPY.description}
                actions={canEdit && <NewPromoCodeButton onClick={openNew} />}
            />
            <PromoCodesSection
                canEdit={canEdit}
                onCreate={openNew}
                onEdit={openEdit}
            />
            {editor && (
                <PromoCodeDialog
                    {...editor}
                    onClose={() => setEditor(undefined)}
                />
            )}
        </>
    )
}
