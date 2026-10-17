import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { DiscountField } from '~/components/promo-codes/editor/discount-field'
import { SelectField } from '~/components/ui/select-field'
import { Switch } from '~/components/ui/switch'
import { Text } from '~/components/ui/text'
import { TextField } from '~/components/ui/text-field'
import { PROMO_CODE_FORM_ID } from '~/data/promo-codes/defaults'
import { PROMO_FORM_COPY } from '~/data/promo-codes/form'
import { PROMO_CODE_MAX_LENGTH } from '~/data/promo-codes/limits'
import { eventOptions } from '~/lib/event-list'
import { promoToForm } from '~/lib/promo-codes'
import { promoCodeSchema, type PromoCodeValues } from '~/schemas/promo-code'
import type { EventRow } from '~/types/events'
import type { PromoCodeRow } from '~/types/promo-codes'

const copy = PROMO_FORM_COPY

export interface PromoCodeFormProps {
    code?: PromoCodeRow
    events: readonly EventRow[]
    error?: string
    onSubmit: (values: PromoCodeValues) => void
}

export function PromoCodeForm({ code, events, error, onSubmit }: PromoCodeFormProps) {
    const form = useForm<PromoCodeValues>({ resolver: zodResolver(promoCodeSchema), defaultValues: promoToForm(code) })

    return (
        <FormProvider {...form}>
            <form
                id={PROMO_CODE_FORM_ID}
                noValidate
                className='space-y-5'
                onSubmit={form.handleSubmit(onSubmit)}>
                <TextField<PromoCodeValues>
                    name='code'
                    label={copy.code.label}
                    placeholder={copy.code.placeholder}
                    hint={copy.code.hint}
                    maxLength={PROMO_CODE_MAX_LENGTH}
                    autoComplete='off'
                    autoCapitalize='characters'
                    spellCheck={false}
                    onInput={({ currentTarget }) => {
                        currentTarget.value = currentTarget.value.toUpperCase()
                    }}
                    required
                />
                <TextField<PromoCodeValues>
                    name='label'
                    label={copy.label.label}
                    placeholder={copy.label.placeholder}
                    hint={copy.label.hint}
                    autoComplete='off'
                />
                <DiscountField />
                <SelectField<PromoCodeValues>
                    name='event_id'
                    label={copy.event.label}
                    options={eventOptions(events)}
                    placeholder={copy.event.allEvents}
                />
                <TextField<PromoCodeValues>
                    name='max_uses'
                    type='number'
                    inputMode='numeric'
                    min={1}
                    label={copy.maxUses.label}
                    placeholder={copy.maxUses.placeholder}
                    hint={copy.maxUses.hint}
                />
                <TextField<PromoCodeValues>
                    name='starts_at'
                    type='datetime-local'
                    label={copy.startsAt.label}
                    hint={copy.startsAt.hint}
                />
                <TextField<PromoCodeValues>
                    name='expires_at'
                    type='datetime-local'
                    label={copy.expiresAt.label}
                    hint={copy.expiresAt.hint}
                />
                <Switch
                    id='promo-active'
                    label={copy.active.label}
                    description={copy.active.description}
                    {...form.register('active')}
                />
                {error && (
                    <Text
                        variant='error'
                        role='alert'>
                        {error}
                    </Text>
                )}
            </form>
        </FormProvider>
    )
}
