import { useSearchParams } from 'react-router'
import { ActivityList } from '~/components/activity/activity-list'
import { LoadMoreButton } from '~/components/ui/load-more-button'
import { PageHeader } from '~/components/ui/page-header'
import { SegmentedControl } from '~/components/ui/segmented-control'
import { Spinner } from '~/components/ui/spinner'
import { ACTIVITY_COPY } from '~/data/activity/copy'
import { ACTIVITY_FILTER_PARAM, ACTIVITY_FILTERS } from '~/data/activity/filters'
import { LOADING_LABEL } from '~/data/ui/feedback'
import { useActivity } from '~/hooks/activity/queries'
import { requirePermission } from '~/lib/guards'
import { withParam } from '~/lib/search-params'

export async function clientLoader() {
    await requirePermission('viewActivity')
    return null
}

export default function Activity() {
    const [params, setParams] = useSearchParams()
    const filter = ACTIVITY_FILTERS.find(({ value }) => value === params.get(ACTIVITY_FILTER_PARAM))?.value ?? 'all'
    const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage } = useActivity({ variables: filter })

    return (
        <>
            <PageHeader
                title={ACTIVITY_COPY.title}
                description={ACTIVITY_COPY.description}
            />
            <SegmentedControl
                label={ACTIVITY_COPY.filterLabel}
                options={ACTIVITY_FILTERS}
                value={filter}
                onChange={(value) =>
                    setParams((current) => withParam(current, ACTIVITY_FILTER_PARAM, value === 'all' ? '' : value), {
                        replace: true,
                    })
                }
                className='mb-6'
            />
            {isPending ? (
                <Spinner label={LOADING_LABEL} />
            ) : (
                <div className='space-y-4'>
                    <ActivityList items={data?.pages.flatMap(({ items }) => items) ?? []} />
                    <LoadMoreButton
                        hasMore={hasNextPage}
                        loading={isFetchingNextPage}
                        onLoadMore={() => void fetchNextPage()}
                        label={ACTIVITY_COPY.loadMore}
                        loadingLabel={ACTIVITY_COPY.loadingMore}
                    />
                </div>
            )}
        </>
    )
}
