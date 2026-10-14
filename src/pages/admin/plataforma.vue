<template>
  <main class="pagina-conta">
    <h1>Configuração da plataforma</h1>
    <form v-if="form" class="formulario" @submit.prevent="salvar">
      <Message v-if="erro" severity="error">{{ erro }}</Message>
      <Message v-if="ok" severity="success">Configuração salva.</Message>
      <label>Mensalidade Ateliê <InputNumber v-model="form.mensalidadeAtelie" mode="currency" currency="BRL" locale="pt-BR" :min="0" /></label>
      <label>Mensalidade Loja <InputNumber v-model="form.mensalidadeLoja" mode="currency" currency="BRL" locale="pt-BR" :min="0" /></label>
      <label>Taxa de venda (%) <InputNumber v-model="form.taxaVendaPercentual" :min="0" :max="100" :min-fraction-digits="2" /></label>
      <label>Frete grátis a partir de <InputNumber v-model="form.limiarFreteGratis" mode="currency" currency="BRL" locale="pt-BR" :min="0" /></label>
      <label>Desconto à vista (%) <InputNumber v-model="form.descontoAVistaPercentual" :min="0" :max="100" :min-fraction-digits="2" /></label>
      <label>Faturamento que dispensa a mensalidade <InputNumber v-model="form.tetoFaturamentoDispensaMensalidade" mode="currency" currency="BRL" locale="pt-BR" :min="0" /></label>
      <Button class="acao" type="submit" label="Salvar" :loading="enviando" />
    </form>
  </main>
</template>

<script setup lang="ts">
import type { ConfiguracaoPlataforma } from '~/types/loja'
import { ApiErro, api } from '~/http/api'

definePageMeta({ layout: 'loja', middleware: ['auth', 'admin'] })

const form = ref<ConfiguracaoPlataforma | null>(null)
const erro = ref('')
const ok = ref(false)
const enviando = ref(false)

onMounted(async () => {
  try {
    form.value = await api<ConfiguracaoPlataforma>('/v1/plataforma/configuracao', { autenticado: true })
  }
  catch (falha) {
    erro.value = falha instanceof ApiErro ? falha.message : 'Não foi possível carregar a configuração.'
  }
})

async function salvar() {
  if (!form.value)
    return
  enviando.value = true
  erro.value = ''
  ok.value = false
  try {
    form.value = await api<ConfiguracaoPlataforma>('/v1/plataforma/configuracao', { method: 'PUT', autenticado: true, body: form.value })
    ok.value = true
  }
  catch (falha) {
    erro.value = falha instanceof ApiErro ? falha.message : 'Não foi possível salvar.'
  }
  finally {
    enviando.value = false
  }
}
</script>

<style scoped>
label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
</style>
