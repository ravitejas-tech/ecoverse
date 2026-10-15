import { useEffect } from 'react'
import { ConfettiRain } from '~/components/landing/hero/confetti-rain'
import { HeroArt } from '~/components/landing/hero/hero-art'
import { HeroActions } from '~/components/landing/hero/hero-actions'
import { HeroHeading } from '~/components/landing/hero/hero-heading'
import { Container } from '~/components/ui/container'
import { CONFETTI_WELCOME } from '~/data/ui/confetti'
import { celebrate } from '~/lib/confetti'

export function HeroSection() {
    useEffect(() => {
        void celebrate(CONFETTI_WELCOME)
    }, [])

    return (
        <section className='relative overflow-hidden bg-party-dots'>
            <ConfettiRain />
            <Container className='relative grid gap-y-10 pt-10 pb-14 md:py-24 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8'>
                <HeroHeading className='lg:self-end' />
                <HeroArt className='lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center' />
                <HeroActions className='lg:self-start' />
            </Container>
        </section>
    )
}
