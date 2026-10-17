import { Plus } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Panel } from '~/components/ui/panel'
import { Text } from '~/components/ui/text'
import { TICKET_PRESETS, TICKETS_COPY } from '~/data/events/tickets'
import { formatRupees } from '~/lib/format'
import type { TicketPreset } from '~/types/ticket-types'

export function TicketPresets({ onPick }: { onPick: (preset: TicketPreset) => void }) {
    return (
        <Panel title={TICKETS_COPY.quickStart}>
            <Text
                variant='small'
                tone='secondary'>
                {TICKETS_COPY.quickStartLead}
            </Text>
            <div className='grid gap-2 sm:flex sm:flex-wrap'>
                {TICKET_PRESETS.map((preset) => (
                    <Button
                        key={preset.name}
                        variant='secondary'
                        size='sm'
                        className='justify-start'
                        onClick={() => onPick(preset)}>
                        <Plus />
                        {`${preset.name} · ${formatRupees(preset.price)}`}
                    </Button>
                ))}
            </div>
        </Panel>
    )
}
