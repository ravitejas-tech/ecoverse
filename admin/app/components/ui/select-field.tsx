import { useFormContext, type FieldValues, type Path } from 'react-hook-form'
import { Field } from '~/components/ui/field'
import { Select, type SelectOption } from '~/components/ui/select'
import { fieldError } from '~/lib/form-error'

export interface SelectFieldProps<Values extends FieldValues> {
    name: Path<Values>
    label: string
    options: readonly SelectOption[]
    hint?: string
    placeholder?: string
    required?: boolean
    className?: string
}

export function SelectField<Values extends FieldValues>({
    name,
    label,
    options,
    hint,
    placeholder,
    required,
    className,
}: SelectFieldProps<Values>) {
    const {
        register,
        formState: { errors },
    } = useFormContext<Values>()
    const error = fieldError(errors, name)

    return (
        <Field
            label={label}
            htmlFor={name}
            hint={hint}
            error={error}
            required={required}
            className={className}>
            <Select
                id={name}
                options={options}
                placeholder={placeholder}
                aria-invalid={Boolean(error)}
                {...register(name)}
            />
        </Field>
    )
}
