import { DetailBlock } from '~/components/events/detail/info/detail-block'
import { Chip } from '~/components/ui/chip'
import { Text } from '~/components/ui/text'
import { EVENT_SECTIONS } from '~/data/events/page'
import type { PopTone } from '~/data/ui/pop-tones'
import type { EventHost } from '~/types/events'

export interface HostListProps {
    hosts: EventHost[]
    tone: PopTone
}

export function HostList({ hosts, tone }: HostListProps) {
    return (
        <DetailBlock title={EVENT_SECTIONS.hosts}>
            <ul className='grid gap-4 sm:grid-cols-2'>
                {hosts.map(({ name, role }) => (
                    <li
                        key={name}
                        className='flex items-center gap-4'>
                        <Chip
                            size='sm'
                            tone={tone}
                            aria-hidden>
                            <Text
                                as='span'
                                variant='subtitle'
                                tone='on-pop'>
                                {name.charAt(0)}
                            </Text>
                        </Chip>
                        <div>
                            <Text variant='subtitle'>{name}</Text>
                            <Text
                                variant='small'
                                tone='secondary'>
                                {role}
                            </Text>
                        </div>
                    </li>
                ))}
            </ul>
        </DetailBlock>
    )
}
