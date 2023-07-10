export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  css: [
    '@mdi/font/css/materialdesignicons.min.css',
    'vuetify/lib/styles/main.sass'
  ],
  modules: ['@pinia/nuxt'],
  buildModules: [
    '@nuxtjs/pwa',
  ],
  pwa: {
    manifest: {
      name: 'My Nuxt App',
      short_name: 'My App',
      description: 'My awesome Nuxt.js app',
      lang: 'en',
      icons: ['logo'],
      display: 'standalone',
      start_url: 'https://6478446fd4d0e4480c189141--willowy-capybara-c8d938.netlify.app/',
      useWebmanifestExtension: false
    },
    meta: {
      theme_color: '#ffffff',
      mobileAppIOS: true,
      mobileApp: true,
    },
    icon: {
      source: 'assets/img/logo.png',
      fileName: 'logo.png',
    },
    workbox: {
      enabled: true,
    },
    /* PWA options */
  }
})
