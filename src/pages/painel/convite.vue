<template>
  <main class="pagina-conta">
    <h1>Aceitar convite</h1>
    <div class="formulario">
      <Message v-if="erro" severity="error">{{ erro }}</Message>
      <Message v-if="ok" severity="success">Convite aceito. As permissões já estão na sua conta.</Message>
      <Button v-if="!ok" class="acao" label="Aceitar convite" :loading="enviando" @click="aceitar" />
      <NuxtLink to="/painel/plano">Ir para a loja</NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ApiErro, api } from '~/http/api'

definePageMeta({ layout: 'loja', middleware: ['auth'] })

const rota = useRoute()
const erro = ref('')
const ok = ref(false)
const enviando = ref(false)

async function aceitar() {
  enviando.value = true
  erro.value = ''
  try {
    await api('/v1/convites/aceitar', { method: 'POST', autenticado: true, body: { token: String(rota.query.token || '') } })
    ok.value = true
  }
  catch (falha) {
    erro.value = falha instanceof ApiErro ? falha.message : 'Não foi possível aceitar o convite.'
  }
  finally {
    enviando.value = false
  }
}
</script>
