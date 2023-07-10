import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                clientsClaim: true,
                skipWaiting: true,
                globPatterns: ['**/*.{js,css,html,ico,png,svg}']
            },
            devOptions: {
                enabled: true
            },
            injectRegister: 'auto'
        })
    ]
})