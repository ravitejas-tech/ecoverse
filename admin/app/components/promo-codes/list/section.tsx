import { useState } from 'react'
import { NewPromoCodeButton } from '~/components/promo-codes/new-code-button'
import { PromoCodesTable } from '~/components/promo-codes/list/table'
import { Button } from '~/components/ui/button'
import { EmptyState } from '~/components/ui/empty-state'
import { Notice } from '~/components/ui/notice'
import { SearchInput } from '~/components/ui/search-input'
import { Spinner } from '~/components/ui/spinner'
import { PROMO_CODES_COPY } from '~/data/promo-codes/copy'
import { SEARCH_FROM_COUNT } from '~/data/promo-codes/limits'
import { LOADING_LABEL } from '~/data/ui/feedback'
import { usePromoCodes } from '~/hooks/promo-codes/queries'
import { matchesPromoSearch } from '~/lib/promo-codes'
import type { PromoCodeOverview } from '~/types/promo-codes'

const { empty, emptyBody, noMatch, search, loadFailed, retry } = PROMO_CODES_COPY

export interface PromoCodesSectionProps {
    canEdit: boolean
    onCreate: () => void
    onEdit: (code: PromoCodeOverview) => void
}

export function PromoCodesSection({ canEdit, onCreate, onEdit }: PromoCodesSectionProps) {
    const { data: codes, isPending, isError, refetch } = usePromoCodes()
    const [searchText, setSearchText] = useState('')

    if (isPending) return <Spinner label={LOADING_LABEL} />

    if (isError)
        return (
            <Notice
                tone='pink'
                action={
                    <Button
                        variant='secondary'
                        size='sm'
                        onClick={() => void refetch()}>
                        {retry}
                    </Button>
                }>
                {loadFailed}
            </Notice>
        )

    if (codes.length === 0)
        return (
            <EmptyState
                {...empty}
                body={canEdit ? emptyBody.editor : emptyBody.viewer}
                action={canEdit && <NewPromoCodeButton onClick={onCreate} />}
            />
        )

    return (
        <div className='space-y-4'>
            {codes.length >= SEARCH_FROM_COUNT && (
                <SearchInput
                    value={searchText}
                    onValueChange={setSearchText}
                    clearLabel={search.clear}
                    aria-label={search.label}
                    placeholder={search.placeholder}
                    autoComplete='off'
                    className='md:max-w-md'
                />
            )}
            <PromoCodesTable
                codes={codes.filter((code) => matchesPromoSearch(code, searchText))}
                onEdit={canEdit ? onEdit : undefined}
                empty={<EmptyState {...noMatch} />}
            />
        </div>
    )
}
