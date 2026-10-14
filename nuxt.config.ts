import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  srcDir: 'src/',
  dir: {
    public: '../public',
  },
  ssr: true,
  compatibilityDate: '2025-07-15',
  modules: ['@pinia/nuxt'],
  css: ['primeicons/primeicons.css', '~/assets/styles/app.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'Cria Lab DM',
      meta: [
        { name: 'description', content: 'Impressão 3D personalizada da Cria Lab DM.' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/marca/logo.png' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: 'http://localhost:5088',
    },
  },
})
