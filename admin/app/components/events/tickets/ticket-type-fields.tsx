import { useFormContext } from 'react-hook-form'
import { Switch } from '~/components/ui/switch'
import { TextField } from '~/components/ui/text-field'
import { TICKETS_COPY } from '~/data/events/tickets'
import type { TicketTypeValues } from '~/schemas/ticket-type'

const { fields } = TICKETS_COPY

const numberInput = { type: 'number', inputMode: 'numeric', min: 0, step: 1, valueAsNumber: true } as const

export function TicketTypeFields() {
    const { register } = useFormContext<TicketTypeValues>()

    return (
        <div className='space-y-4'>
            <TextField<TicketTypeValues>
                name='name'
                label={fields.name.label}
                placeholder={fields.name.placeholder}
                required
            />
            <TextField<TicketTypeValues>
                name='description'
                label={fields.description.label}
                hint={fields.description.hint}
            />
            <div className='grid grid-cols-2 gap-4'>
                <TextField<TicketTypeValues>
                    name='price'
                    label={fields.price.label}
                    hint={fields.price.hint}
                    required
                    {...numberInput}
                />
                <TextField<TicketTypeValues>
                    name='quantity'
                    label={fields.quantity.label}
                    required
                    {...numberInput}
                />
            </div>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
                <TextField<TicketTypeValues>
                    name='admits'
                    label={fields.admits.label}
                    hint={fields.admits.hint}
                    className='col-span-2 sm:col-span-1'
                    {...numberInput}
                />
                <TextField<TicketTypeValues>
                    name='min_per_order'
                    label={fields.min_per_order.label}
                    {...numberInput}
                />
                <TextField<TicketTypeValues>
                    name='max_per_order'
                    label={fields.max_per_order.label}
                    {...numberInput}
                />
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
                <TextField<TicketTypeValues>
                    name='sales_start'
                    type='datetime-local'
                    label={fields.sales_start.label}
                    hint={fields.sales_start.hint}
                />
                <TextField<TicketTypeValues>
                    name='sales_end'
                    type='datetime-local'
                    label={fields.sales_end.label}
                    hint={fields.sales_end.hint}
                />
            </div>
            <Switch
                id='ticket-visible'
                {...fields.visible}
                {...register('visible')}
            />
            <Switch
                id='ticket-sold-out'
                {...fields.sold_out}
                {...register('sold_out')}
            />
        </div>
    )
}
