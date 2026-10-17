import type { ToasterProps } from 'react-hot-toast'

export const TOAST_OPTIONS: ToasterProps['toastOptions'] = {
    duration: 4000,
    className: 'rounded-2xl border-2 border-border shadow-pop-sm font-sans text-sm font-semibold',
    style: { background: 'var(--surface)', color: 'var(--text-primary)', maxWidth: '26rem' },
    success: { iconTheme: { primary: 'var(--pop-lime)', secondary: 'var(--on-pop)' } },
    error: { iconTheme: { primary: 'var(--pop-pink)', secondary: 'var(--on-pop)' } },
}
