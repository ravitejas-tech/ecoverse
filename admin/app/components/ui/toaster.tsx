import { Toaster as HotToaster } from 'react-hot-toast'
import { TOAST_OPTIONS } from '~/data/ui/toast'

export function Toaster() {
    return (
        <HotToaster
            position='top-center'
            toastOptions={TOAST_OPTIONS}
        />
    )
}
