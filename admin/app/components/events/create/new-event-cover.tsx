import { ImagePlus } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'
import { CoverImage } from '~/components/events/cover-image'
import { Button } from '~/components/ui/button'
import { FileButton } from '~/components/ui/file-button'
import { Panel } from '~/components/ui/panel'
import { Text } from '~/components/ui/text'
import { TextField } from '~/components/ui/text-field'
import { NEW_EVENT_COPY } from '~/data/events/copy'
import { EVENT_FIELDS } from '~/data/events/form'
import { IMAGE_ACCEPT } from '~/data/ui/media'
import { useObjectUrl } from '~/hooks/use-object-url'
import type { NewEventValues } from '~/schemas/event-create'

export function NewEventCover() {
    const { setValue } = useFormContext<NewEventValues>()
    const [cover, alt] = useWatch<NewEventValues, ['cover', 'cover_alt']>({ name: ['cover', 'cover_alt'] })
    const preview = useObjectUrl(cover)

    return (
        <Panel title={NEW_EVENT_COPY.sections.cover}>
            {preview ? (
                <CoverImage
                    src={preview}
                    alt={alt}
                    emptyLabel={EVENT_FIELDS.cover.label}
                    className='max-w-md'
                />
            ) : (
                <Text
                    variant='small'
                    tone='muted'>
                    {NEW_EVENT_COPY.coverOptional}
                </Text>
            )}
            <div className='flex flex-wrap gap-2'>
                <FileButton
                    accept={IMAGE_ACCEPT}
                    variant='secondary'
                    size='sm'
                    onFile={(file) => setValue('cover', file, { shouldDirty: true })}>
                    <ImagePlus />
                    {cover ? NEW_EVENT_COPY.changePhoto : NEW_EVENT_COPY.pickPhoto}
                </FileButton>
                {cover && (
                    <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={() => setValue('cover', undefined)}>
                        {NEW_EVENT_COPY.removePhoto}
                    </Button>
                )}
            </div>
            {cover && (
                <TextField<NewEventValues>
                    name='cover_alt'
                    label={EVENT_FIELDS.cover_alt.label}
                    hint={EVENT_FIELDS.cover_alt.hint}
                    required
                />
            )}
        </Panel>
    )
}
