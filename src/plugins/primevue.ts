import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Password from 'primevue/password'
import Tag from 'primevue/tag'
import Toast from 'primevue/toast'

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
  nuxtApp.vueApp.component('Button', Button)
  nuxtApp.vueApp.component('Checkbox', Checkbox)
  nuxtApp.vueApp.component('Column', Column)
  nuxtApp.vueApp.component('DataTable', DataTable)
  nuxtApp.vueApp.component('InputNumber', InputNumber)
  nuxtApp.vueApp.component('InputText', InputText)
  nuxtApp.vueApp.component('Message', Message)
  nuxtApp.vueApp.component('Password', Password)
  nuxtApp.vueApp.component('Tag', Tag)
  nuxtApp.vueApp.component('Toast', Toast)
})
