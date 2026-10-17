import { useFormContext } from 'react-hook-form'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { buyerFieldId } from '~/data/checkout/ids'
import type { BuyerFieldConfig, CheckoutFormInput } from '~/types/checkout'

export interface BuyerFieldProps {
    field: BuyerFieldConfig
}

export function BuyerField({ field: { name, label, hint, prefix, ...inputProps } }: BuyerFieldProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext<CheckoutFormInput>()

    return (
        <Field
            id={buyerFieldId(name)}
            label={label}
            hint={hint}
            error={errors[name]?.message}
            required>
            {(control) => (
                <Input
                    {...control}
                    {...register(name)}
                    {...inputProps}
                    leading={prefix}
                    enterKeyHint='next'
                />
            )}
        </Field>
    )
}
