import { useFormContext, useWatch } from 'react-hook-form'
import { SegmentedControl } from '~/components/ui/segmented-control'
import { TextField } from '~/components/ui/text-field'
import { DISCOUNT_TYPE_OPTIONS } from '~/data/promo-codes/defaults'
import { PROMO_FORM_COPY } from '~/data/promo-codes/form'
import { PERCENT_MAX } from '~/data/promo-codes/limits'
import type { PromoCodeValues } from '~/schemas/promo-code'

export function DiscountField() {
    const {
        control,
        setValue,
        trigger,
        formState: { isSubmitted },
    } = useFormContext<PromoCodeValues>()
    const type = useWatch({ control, name: 'discount_type' })
    const { label, hint } = PROMO_FORM_COPY.discountTypes[type]

    return (
        <div className='space-y-3'>
            <SegmentedControl
                label={PROMO_FORM_COPY.discountType}
                options={DISCOUNT_TYPE_OPTIONS}
                value={type}
                onChange={(value) => {
                    setValue('discount_type', value, { shouldDirty: true })
                    if (isSubmitted) void trigger('discount_value')
                }}
            />
            <TextField<PromoCodeValues>
                name='discount_value'
                type='number'
                inputMode='numeric'
                min={1}
                max={type === 'percent' ? PERCENT_MAX : undefined}
                valueAsNumber
                label={label}
                hint={hint}
                required
            />
        </div>
    )
}
