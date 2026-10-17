import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Dialog } from '~/components/ui/dialog'
import { Field } from '~/components/ui/field'
import { Textarea } from '~/components/ui/textarea'
import { ALT_MAX_LENGTH, GALLERY_COPY } from '~/data/gallery/copy'
import { CONFIRM_DEFAULTS } from '~/data/ui/dialog'
import { useUpdatePhotoAlt } from '~/hooks/gallery/mutations'
import { altSchema, type AltValues } from '~/schemas/gallery'
import type { GalleryPhoto } from '~/types/gallery'

const { altDialog: copy } = GALLERY_COPY

export function AltDialog({ photo, onClose }: { photo: GalleryPhoto | null; onClose: () => void }) {
    const { mutate, isPending } = useUpdatePhotoAlt()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AltValues>({ resolver: zodResolver(altSchema), values: { alt: photo?.alt ?? '' } })

    return (
        <Dialog
            open={Boolean(photo)}
            onClose={onClose}
            title={copy.title}
            description={copy.description}
            footer={
                <>
                    <Button
                        variant='secondary'
                        onClick={onClose}>
                        {CONFIRM_DEFAULTS.cancel}
                    </Button>
                    <Button
                        type='submit'
                        form='alt-form'
                        disabled={isPending}>
                        {copy.save}
                    </Button>
                </>
            }>
            <form
                id='alt-form'
                noValidate
                onSubmit={handleSubmit(({ alt }) => photo && mutate({ id: photo.id, alt }, { onSuccess: onClose }))}>
                <Field
                    label={copy.label}
                    htmlFor='photo-alt'
                    error={errors.alt?.message}
                    required>
                    <Textarea
                        id='photo-alt'
                        rows={3}
                        maxLength={ALT_MAX_LENGTH}
                        aria-invalid={Boolean(errors.alt)}
                        {...register('alt')}
                    />
                </Field>
            </form>
        </Dialog>
    )
}
