import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { CLIPBOARD_TOASTS } from '~/data/ui/clipboard'

export function useCopyText() {
    return useCallback(
        (text: string) =>
            void navigator.clipboard.writeText(text).then(
                () => toast.success(CLIPBOARD_TOASTS.copied),
                () => toast.error(CLIPBOARD_TOASTS.failed),
            ),
        [],
    )
}
