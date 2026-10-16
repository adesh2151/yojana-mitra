import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      workbox: {
        // The full catalogue (~500 KB) is fetched on demand, not precached,
        // so first load stays light. It gets runtime-cached after first view.
        globIgnores: ['**/catalog.json'],
        runtimeCaching: [
          {
            urlPattern: /catalog\.json$/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'scheme-catalog' },
          },
        ],
      },
      manifest: {
        name: 'Yojana Mitra',
        short_name: 'Yojana Mitra',
        description:
          'Find the government schemes and benefits you qualify for, in your own language.',
        lang: 'mr',
        theme_color: '#ff7a1a',
        background_color: '#fff8f0',
        display: 'standalone',
        start_url: './',
        icons: [
          { src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        ],
      },
    }),
  ],
})
