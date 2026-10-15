import { Button } from '~/components/ui/button'
import { MAIN_CONTENT_ID, SKIP_LINK_LABEL } from '~/data/layout/landmarks'

export function SkipLink() {
    return (
        <Button
            asChild
            size='sm'
            className='fixed top-3 left-3 z-50 -translate-y-24 focus-visible:translate-y-0'>
            <a href={`#${MAIN_CONTENT_ID}`}>{SKIP_LINK_LABEL}</a>
        </Button>
    )
}
