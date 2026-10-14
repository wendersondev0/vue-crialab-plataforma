import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

const CriaLab = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e7f6f6',
      100: '#c5e9ea',
      200: '#9dd9db',
      300: '#6ec4c7',
      400: '#3eafb3',
      500: '#148f93',
      600: '#10797c',
      700: '#0d6164',
      800: '#09494c',
      900: '#063234',
      950: '#031c1d',
    },
  },
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    locale: {
      startsWith: 'Começa com',
      contains: 'Contém',
      apply: 'Aplicar',
      clear: 'Limpar',
      emptyMessage: 'Nenhum registro encontrado',
      emptyFilterMessage: 'Nenhum resultado',
    },
    theme: {
      preset: CriaLab,
      options: {
        darkModeSelector: false,
      },
    },
  })
  nuxtApp.vueApp.use(ToastService)
  nuxtApp.vueApp.use(ConfirmationService)
})
