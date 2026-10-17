import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const SHARED_APP_MODULES =
    /[\\/]app[\\/](components[\\/](ui|layout)|data[\\/](ui|layout|seo|events|navigation|contact|brand)|lib|hooks[\\/]use-[\w-]+\.ts)/
const LAZY_ONLY_MODULES =
    /[\\/]app[\\/](lib[\\/](checkout|account|tickets|qr|event-mapping|query-client)|components[\\/]ui[\\/](qr-code|query-provider|toaster)|data[\\/]ui[\\/]toast)/
const REACT_MODULES = /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/
const ROUTER_MODULES = /[\\/]node_modules[\\/](react-router|cookie|set-cookie-parser)[\\/]/

export default defineConfig({
    plugins: [tailwindcss(), reactRouter()],
    resolve: { tsconfigPaths: true },
    server: { port: 7300, strictPort: true },
    build: {
        rolldownOptions: {
            output: {
                codeSplitting: {
                    groups: [
                        { name: 'react', test: REACT_MODULES, priority: 40 },
                        { name: 'router', test: ROUTER_MODULES, priority: 30 },
                        { name: 'icons', test: /[\\/]node_modules[\\/]lucide-react[\\/]/, priority: 20 },
                        {
                            name: 'shared',
                            priority: 10,
                            test: (id) => SHARED_APP_MODULES.test(id) && !LAZY_ONLY_MODULES.test(id),
                        },
                    ],
                },
            },
        },
    },
})
