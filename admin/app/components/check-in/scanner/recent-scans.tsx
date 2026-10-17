import { Badge } from '~/components/ui/badge'
import { DividedList } from '~/components/ui/divided-list'
import { Panel } from '~/components/ui/panel'
import { Text } from '~/components/ui/text'
import { CHECK_IN_COPY } from '~/data/check-in/copy'
import { CHECK_IN_RESULTS } from '~/data/check-in/results'
import { formatEventTime } from '~/lib/format'
import type { RecentCheckIn } from '~/types/check-in'

const { recent } = CHECK_IN_COPY

export function RecentScans({ scans }: { scans: RecentCheckIn[] }) {
    return (
        <Panel title={recent.title}>
            {scans.length === 0 ? (
                <Text tone='muted'>{recent.empty}</Text>
            ) : (
                <DividedList>
                    {scans.map(({ id, result, scanned_value, created_at, tickets }) => (
                        <li
                            key={id}
                            className='flex items-center gap-3 py-2.5'>
                            <Badge tone={CHECK_IN_RESULTS[result].tone}>{CHECK_IN_RESULTS[result].badge}</Badge>
                            <div className='min-w-0 flex-1'>
                                <Text
                                    variant='code'
                                    className='truncate'>
                                    {tickets?.code ?? scanned_value}
                                </Text>
                                {tickets?.ticket_types?.name && (
                                    <Text
                                        variant='small'
                                        tone='muted'
                                        className='truncate'>
                                        {tickets.ticket_types.name}
                                    </Text>
                                )}
                            </div>
                            <Text
                                as='span'
                                variant='small'
                                tone='secondary'
                                className='shrink-0'>
                                <time dateTime={created_at}>{formatEventTime(created_at)}</time>
                            </Text>
                        </li>
                    ))}
                </DividedList>
            )}
        </Panel>
    )
}
