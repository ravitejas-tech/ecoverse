import { ADMIN_BRAND } from '~/data/brand'

export function Logo() {
    return (
        <span
            role='img'
            aria-label={ADMIN_BRAND.name}
            className='bg-brand-logo block h-9 w-32 shrink-0'
        />
    )
}
