import { TicketRow } from '~/components/checkout/tickets/row'
import { Text } from '~/components/ui/text'
import { MAX_PEOPLE_PER_ORDER } from '~/data/checkout/limits'
import { TICKET_ROW_COPY } from '~/data/checkout/tickets'
import type { TicketOption } from '~/types/checkout'

export interface TicketPickerProps {
    options: TicketOption[]
    people: number
    quantityOf: (option: TicketOption) => number
    canAdd: (option: TicketOption) => boolean
    onChange: (option: TicketOption, delta: 1 | -1) => void
}

export function TicketPicker({ options, people, quantityOf, canAdd, onChange }: TicketPickerProps) {
    return (
        <>
            <ul className='divide-y-2 divide-dashed divide-border'>
                {options.map((option) => (
                    <TicketRow
                        key={option.type.id}
                        option={option}
                        quantity={quantityOf(option)}
                        canAdd={canAdd(option)}
                        onChange={onChange}
                    />
                ))}
            </ul>
            {people >= MAX_PEOPLE_PER_ORDER && (
                <Text
                    variant='small'
                    tone='muted'
                    className='mt-4'>
                    {TICKET_ROW_COPY.peopleCap(MAX_PEOPLE_PER_ORDER)}
                </Text>
            )}
        </>
    )
}
