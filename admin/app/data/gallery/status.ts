import type { PopTone } from '~/data/ui/pop-tones'
import type { UploadStatus } from '~/types/gallery'

export const UPLOAD_STATUS_TONES: Record<UploadStatus, PopTone | 'muted'> = {
    waiting: 'muted',
    uploading: 'cyan',
    done: 'lime',
    failed: 'pink',
}
