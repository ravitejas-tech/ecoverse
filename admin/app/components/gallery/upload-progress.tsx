import { Badge } from '~/components/ui/badge'
import { DividedList } from '~/components/ui/divided-list'
import { Panel } from '~/components/ui/panel'
import { Text } from '~/components/ui/text'
import { GALLERY_COPY } from '~/data/gallery/copy'
import { UPLOAD_STATUS_TONES } from '~/data/gallery/status'
import { useUploadQueue } from '~/hooks/gallery/use-upload-queue'

export function UploadProgress({ eventId }: { eventId: string }) {
    const uploads = useUploadQueue(eventId)
    if (uploads.length === 0) return null

    return (
        <Panel
            title={GALLERY_COPY.uploading}
            className='mb-6'>
            <DividedList aria-live='polite'>
                {uploads.map(({ id, name, status }) => (
                    <li
                        key={id}
                        className='flex items-center justify-between gap-3 py-2.5'>
                        <Text
                            variant='small'
                            className='min-w-0 truncate'>
                            {name}
                        </Text>
                        <Badge tone={UPLOAD_STATUS_TONES[status]}>{GALLERY_COPY.uploadStatus[status]}</Badge>
                    </li>
                ))}
            </DividedList>
        </Panel>
    )
}
