import { ArrowLeft } from 'lucide-react'
import { EventKeyFacts } from '~/components/events/detail/header/event-key-facts'
import { AnchorLink } from '~/components/ui/anchor-link'
import { FramedPhoto } from '~/components/ui/framed-photo'
import { Sticker } from '~/components/ui/sticker'
import { Text } from '~/components/ui/text'
import { EVENT_HEADER_COPY } from '~/data/events/page'
import { STATUS_STICKERS } from '~/data/events/status'
import { PATHS } from '~/data/navigation'
import { withOpeningDay } from '~/lib/events'
import type { EventDetail } from '~/types/events'

export interface EventHeroProps {
    event: EventDetail
    preview: boolean
}

export function EventHero({ event, preview }: EventHeroProps) {
    const { title, summary, photo, tone, categoryLabel, tag, status, opensAt } = event
    const statusSticker = status === 'on-sale' ? null : STATUS_STICKERS[status]

    return (
        <header className='space-y-6'>
            <AnchorLink
                to={PATHS.events}
                layout='list'
                icon={<ArrowLeft aria-hidden />}
                className='-ml-1'>
                {EVENT_HEADER_COPY.back}
            </AnchorLink>
            <FramedPhoto
                photo={photo}
                tone={tone}
                shape='cover'
                priority
            />
            <div className='flex flex-wrap items-center gap-2'>
                {preview && (
                    <Sticker
                        tone='orange'
                        tilt='left'>
                        {EVENT_HEADER_COPY.preview}
                    </Sticker>
                )}
                <Sticker tone={tone}>{categoryLabel}</Sticker>
                {statusSticker ? (
                    <Sticker
                        tone={statusSticker.tone}
                        tilt='right'>
                        {withOpeningDay(statusSticker.label, status, opensAt)}
                    </Sticker>
                ) : (
                    tag && (
                        <Sticker
                            tone='yellow'
                            tilt='right'>
                            {tag}
                        </Sticker>
                    )
                )}
            </div>
            <div className='space-y-3'>
                <Text
                    as='h1'
                    variant='display'>
                    {title}
                </Text>
                <Text
                    variant='lead'
                    tone='secondary'>
                    {summary}
                </Text>
            </div>
            <EventKeyFacts event={event} />
        </header>
    )
}
