import { ImagePlus } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'
import { CoverImage } from '~/components/events/cover-image'
import { Button } from '~/components/ui/button'
import { FileButton } from '~/components/ui/file-button'
import { Panel } from '~/components/ui/panel'
import { Text } from '~/components/ui/text'
import { TextField } from '~/components/ui/text-field'
import { COVER_COPY, EVENT_FIELDS as fields, EVENT_SECTIONS } from '~/data/events/form'
import { IMAGE_ACCEPT } from '~/data/ui/media'
import { useUploadCover } from '~/hooks/events/mutations'
import type { EventFormValues } from '~/schemas/event'

export function CoverSection({ eventId, readOnly }: { eventId: string; readOnly: boolean }) {
    const { setValue } = useFormContext<EventFormValues>()
    const [coverUrl, alt] = useWatch<EventFormValues, ['cover_url', 'cover_alt']>({ name: ['cover_url', 'cover_alt'] })
    const { mutate, isPending } = useUploadCover()
    const setCover = (url: string) => setValue('cover_url', url, { shouldDirty: true, shouldValidate: !url })

    return (
        <Panel title={EVENT_SECTIONS.cover.title}>
            <CoverImage
                src={coverUrl || null}
                alt={alt}
                emptyLabel={COVER_COPY.none}
                className='max-w-md'
            />
            {!readOnly && (
                <div className='space-y-2'>
                    <div className='flex flex-wrap gap-2'>
                        <FileButton
                            accept={IMAGE_ACCEPT}
                            variant='secondary'
                            size='sm'
                            disabled={isPending}
                            onFile={(file) => mutate({ eventId, file }, { onSuccess: setCover })}>
                            <ImagePlus />
                            {isPending ? COVER_COPY.uploading : coverUrl ? COVER_COPY.replace : COVER_COPY.upload}
                        </FileButton>
                        {coverUrl && (
                            <Button
                                type='button'
                                variant='ghost'
                                size='sm'
                                onClick={() => setCover('')}>
                                {COVER_COPY.remove}
                            </Button>
                        )}
                    </div>
                    <Text
                        variant='small'
                        tone='muted'>
                        {fields.cover.hint}
                    </Text>
                </div>
            )}
            <TextField<EventFormValues>
                name='cover_alt'
                label={fields.cover_alt.label}
                hint={fields.cover_alt.hint}
                required={Boolean(coverUrl)}
            />
            <div className='grid gap-4 sm:grid-cols-2'>
                <TextField<EventFormValues>
                    name='cover_credit'
                    label={fields.cover_credit.label}
                    hint={fields.cover_credit.hint}
                />
                <TextField<EventFormValues>
                    name='cover_source'
                    type='url'
                    inputMode='url'
                    label={fields.cover_source.label}
                    hint={fields.cover_source.hint}
                />
            </div>
        </Panel>
    )
}
