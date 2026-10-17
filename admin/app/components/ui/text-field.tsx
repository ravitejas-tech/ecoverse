import type { InputHTMLAttributes } from 'react'
import { useFormContext, type FieldValues, type Path } from 'react-hook-form'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { fieldError } from '~/lib/form-error'

export interface TextFieldProps<Values extends FieldValues> extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'name' | 'children'
> {
    name: Path<Values>
    label: string
    hint?: string
    multiline?: boolean
    rows?: number
    valueAsNumber?: boolean
    onValueChange?: (value: string) => void
}

export function TextField<Values extends FieldValues>({
    name,
    label,
    hint,
    required,
    multiline = false,
    rows,
    valueAsNumber = false,
    onValueChange,
    className,
    id = name,
    placeholder,
    ...props
}: TextFieldProps<Values>) {
    const {
        register,
        formState: { errors },
    } = useFormContext<Values>()
    const error = fieldError(errors, name)
    const control = { id, placeholder, 'aria-invalid': Boolean(error) }

    return (
        <Field
            label={label}
            htmlFor={id}
            hint={hint}
            error={error}
            required={required}
            className={className}>
            {multiline ? (
                <Textarea
                    rows={rows}
                    {...control}
                    {...register(name)}
                />
            ) : (
                <Input
                    {...props}
                    {...control}
                    {...register(name, {
                        valueAsNumber,
                        onChange: onValueChange && ((event) => onValueChange(event.target.value)),
                    })}
                />
            )}
        </Field>
    )
}
