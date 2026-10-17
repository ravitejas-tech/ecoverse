import { Button } from '~/components/ui/button'

export interface LoadMoreButtonProps {
    hasMore: boolean
    loading: boolean
    onLoadMore: () => void
    label: string
    loadingLabel: string
}

export function LoadMoreButton({ hasMore, loading, onLoadMore, label, loadingLabel }: LoadMoreButtonProps) {
    if (!hasMore) return null
    return (
        <div className='flex justify-center pt-2'>
            <Button
                variant='secondary'
                className='w-full sm:w-auto'
                disabled={loading}
                onClick={onLoadMore}>
                {loading ? loadingLabel : label}
            </Button>
        </div>
    )
}
