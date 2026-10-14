<template>
  <main class="pagina-conta">
    <h1>Minha loja</h1>
    <p v-if="erro">{{ erro }}</p>
    <form v-if="carregou && !loja" class="formulario" @submit.prevent="criar">
      <Message v-if="erro" severity="error">{{ erro }}</Message>
      <p>O plano inicial é o Ateliê. Ele organiza a oficina e não entra na vitrine.</p>
      <label>Nome <InputText v-model="nome" required /></label>
      <label>Endereço <InputText v-model="slug" required /></label>
      <Button class="acao" type="submit" label="Abrir ateliê" :loading="enviando" />
    </form>
    <section v-else-if="loja" class="painel">
      <h2>{{ loja.nome }}</h2>
      <p>Plano {{ loja.plano }} · mensalidade {{ moeda(loja.mensalidade) }}</p>
      <p v-if="!loja.podePublicar">O plano Ateliê não publica produtos na vitrine.</p>
      <p v-else>O plano Loja publica produtos e vende arquivos 3D.</p>
      <Button v-if="loja.dono && loja.planoCodigo === 'Atelie'" class="acao" label="Subir para Loja" :loading="enviando" @click="subir" />
      <h3>Faturas</h3>
      <DataTable :value="loja.faturas" data-key="id">
        <Column field="competencia" header="Competência" />
        <Column field="valor" header="Valor">
          <template #body="{ data }">{{ moeda(data.valor) }}</template>
        </Column>
        <Column field="status" header="Status">
          <template #body="{ data }">{{ rotulo(data.status) }}</template>
        </Column>
      </DataTable>
      <form v-if="loja.dono" class="formulario convite" @submit.prevent="convidar">
        <h3>Convidar colaborador</h3>
        <Message v-if="tokenConvite" severity="success">Convite pronto para {{ email }}.</Message>
        <label>E-mail <InputText v-model="email" type="email" required /></label>
        <label><Checkbox v-model="permissoes.pedidos" binary /> Pedidos</label>
        <label><Checkbox v-model="permissoes.estoque" binary /> Estoque</label>
        <label><Checkbox v-model="permissoes.orcamento" binary /> Orçamento</label>
        <label><Checkbox v-model="permissoes.financeiro" binary /> Financeiro</label>
        <label><Checkbox v-model="permissoes.patrimonio" binary /> Patrimônio</label>
        <Button class="acao" type="submit" label="Convidar" :loading="enviando" />
        <NuxtLink v-if="tokenConvite" :to="`/painel/convite?token=${tokenConvite}`">Abrir aceite do convite</NuxtLink>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { MinhaLoja } from '~/types/loja'
import { ApiErro, api } from '~/http/api'

definePageMeta({ layout: 'loja', middleware: ['auth'] })

const loja = ref<MinhaLoja | null>(null)
const carregou = ref(false)
const erro = ref('')
const nome = ref('')
const slug = ref('')
const email = ref('')
const tokenConvite = ref('')
const enviando = ref(false)
const permissoes = reactive({ pedidos: true, estoque: false, orcamento: false, financeiro: false, patrimonio: false })
const sessao = useSessaoStore()

function moeda(valor: number) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function rotulo(status: string) {
  if (status === 'Dispensado')
    return 'Dispensado por faturamento'
  return status
}

async function carregar() {
  try {
    loja.value = await api<MinhaLoja | null>('/v1/lojas/minha', { autenticado: true })
  }
  catch (falha) {
    erro.value = falha instanceof ApiErro ? falha.message : 'Não foi possível abrir a loja.'
  }
  finally {
    carregou.value = true
  }
}

async function criar() {
  erro.value = ''
  enviando.value = true
  try {
    await api('/v1/lojas', { method: 'POST', autenticado: true, body: { nome: nome.value, slug: slug.value } })
    const eu = await api<NonNullable<typeof sessao.usuario>>('/v1/usuarios/eu', { autenticado: true })
    sessao.definirUsuario(eu)
    await carregar()
  }
  catch (falha) {
    erro.value = falha instanceof ApiErro ? falha.message : 'Não foi possível abrir a loja.'
  }
  finally {
    enviando.value = false
  }
}

async function subir() {
  enviando.value = true
  erro.value = ''
  try {
    await api('/v1/lojas/minha/plano', { method: 'POST', autenticado: true, body: { codigo: 'Loja' } })
    await carregar()
  }
  catch (falha) {
    erro.value = falha instanceof ApiErro ? falha.message : 'Não foi possível alterar o plano.'
  }
  finally {
    enviando.value = false
  }
}

async function convidar() {
  enviando.value = true
  erro.value = ''
  try {
    const criado = await api<{ token?: string | null }>('/v1/lojas/minha/convites', {
      method: 'POST',
      autenticado: true,
      body: { email: email.value, permissoes },
    })
    tokenConvite.value = criado.token || ''
    await carregar()
  }
  catch (falha) {
    erro.value = falha instanceof ApiErro ? falha.message : 'Não foi possível convidar.'
  }
  finally {
    enviando.value = false
  }
}

onMounted(carregar)
</script>

<style scoped>
.painel {
  width: min(100%, 48rem);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.convite {
  margin: 1rem 0 0;
}

label {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  min-height: 44px;
}
</style>
