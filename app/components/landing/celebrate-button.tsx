import { Button, type ButtonProps } from '~/components/ui/button'
import { celebrate, originOf } from '~/lib/confetti'

export function CelebrateButton({ onClick, ...props }: ButtonProps) {
    return (
        <Button
            onClick={(event) => {
                void celebrate({ origin: originOf(event.currentTarget) })
                onClick?.(event)
            }}
            {...props}
        />
    )
}
