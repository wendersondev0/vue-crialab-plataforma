<template>
  <main class="pagina-conta">
    <h1>Confirmar e-mail</h1>
    <div class="formulario">
      <Message v-if="erro" severity="error">{{ erro }}</Message>
      <Message v-if="ok" severity="success">E-mail confirmado. Já pode entrar.</Message>
      <NuxtLink v-if="ok" to="/conta/entrar">Entrar</NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ApiErro, api } from '~/http/api'

definePageMeta({ layout: 'loja' })

const rota = useRoute()
const erro = ref('')
const ok = ref(false)

onMounted(async () => {
  const token = String(rota.query.token || '')
  if (!token) {
    erro.value = 'Token de confirmação inválido.'
    return
  }
  try {
    await api('/v1/auth/confirmar-email', { method: 'POST', body: { token } })
    ok.value = true
  }
  catch (falha) {
    erro.value = falha instanceof ApiErro ? falha.message : 'Não foi possível confirmar o e-mail.'
  }
})
</script>
