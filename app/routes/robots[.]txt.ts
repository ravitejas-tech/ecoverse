import { buildRobots } from '~/lib/seo/robots'

export function loader() {
    return new Response(buildRobots(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
