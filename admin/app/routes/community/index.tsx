import { Download } from 'lucide-react'
import { CommunityFilters } from '~/components/community/list/filters'
import { CommunityTable } from '~/components/community/list/table'
import { Button } from '~/components/ui/button'
import { LoadMoreButton } from '~/components/ui/load-more-button'
import { PageHeader } from '~/components/ui/page-header'
import { Spinner } from '~/components/ui/spinner'
import { StatCardGrid } from '~/components/ui/stat-card-grid'
import { Text } from '~/components/ui/text'
import { COMMUNITY_COPY } from '~/data/community/copy'
import { COMMUNITY_STAT_CARDS } from '~/data/community/stat-cards'
import { LOADING_LABEL } from '~/data/ui/feedback'
import { useDownloadCommunity } from '~/hooks/community/mutations'
import { useCommunityMembers, useCommunityStats } from '~/hooks/community/queries'
import { useCommunityFilters } from '~/hooks/community/use-community-filters'
import { requirePermission } from '~/lib/guards'

const { list } = COMMUNITY_COPY

export async function clientLoader() {
    await requirePermission('viewCommunity')
    return null
}

export default function Community() {
    const { query, searchText, setSearchText, setSegment, setSort } = useCommunityFilters()
    const { data: stats } = useCommunityStats()
    const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage } = useCommunityMembers({
        variables: query,
    })
    const { mutate: download, isPending: downloading } = useDownloadCommunity()
    const members = data?.pages.flatMap(({ rows }) => rows) ?? []
    const total = data?.pages[0]?.count ?? 0

    return (
        <>
            <PageHeader
                title={list.title}
                description={list.description}
                actions={
                    <Button
                        variant='secondary'
                        disabled={downloading || total === 0}
                        onClick={() => download(query)}>
                        <Download />
                        {downloading ? list.downloading : list.download}
                    </Button>
                }
            />
            {stats && (
                <div className='mb-6'>
                    <StatCardGrid
                        cards={COMMUNITY_STAT_CARDS}
                        source={stats}
                    />
                </div>
            )}
            <CommunityFilters
                searchText={searchText}
                onSearchText={setSearchText}
                segment={query.segment}
                onSegment={setSegment}
                sort={query.sort}
                onSort={setSort}
            />
            {isPending ? (
                <Spinner label={LOADING_LABEL} />
            ) : (
                <div className='space-y-4'>
                    {total > 0 && (
                        <Text
                            variant='small'
                            tone='muted'
                            aria-live='polite'>
                            {list.count(members.length, total)}
                        </Text>
                    )}
                    <CommunityTable members={members} />
                    <LoadMoreButton
                        hasMore={hasNextPage}
                        loading={isFetchingNextPage}
                        onLoadMore={() => void fetchNextPage()}
                        label={list.loadMore}
                        loadingLabel={list.loadingMore}
                    />
                </div>
            )}
        </>
    )
}
