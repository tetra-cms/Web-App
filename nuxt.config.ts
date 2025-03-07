// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: true,
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  tailwindcss: {
    configPath: '~/tailwind.config.ts'
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  css: [
    "~/layouts/inter/inter.css",
    "~/layouts/druk/style.css",
  ],
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-svgo-loader',
    '@vite-pwa/nuxt',
    '@pinia/nuxt'
  ]
})