<template>
  <main class="pagina-conta">
    <p v-if="erro">{{ erro }}</p>
    <article v-else-if="loja">
      <h1>{{ loja.nome }}</h1>
      <Tag v-if="loja.seloOficial" value="Selo oficial" />
      <p>{{ loja.descricao }}</p>
      <p class="vazio">A vitrine ainda não tem produtos.</p>
    </article>
  </main>
</template>

<script setup lang="ts">
import type { LojaPublica } from '~/types/loja'

definePageMeta({ layout: 'loja' })

const rota = useRoute()
const config = useRuntimeConfig()
const slug = computed(() => String(rota.params.slug || ''))
const reservados = ['painel', 'conta', 'carrinho', 'checkout', 'busca', 'produto', 'arquivos-3d', 'revendedor', 'contato', 'planos', 'admin', 'api']

if (slug.value === 'crialabdm')
  await navigateTo('/')

const bloqueado = reservados.includes(slug.value)
const { data, error } = await useAsyncData(`loja-${slug.value}`, async () => {
  if (bloqueado)
    return null
  return await $fetch<LojaPublica>(`${config.public.apiUrl}/v1/lojas/por-slug/${slug.value}`)
})

const loja = computed(() => data.value)
const erro = computed(() => bloqueado || error.value ? 'Loja não encontrada.' : '')
</script>

<style scoped>
article {
  width: min(100%, 40rem);
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
}

h1 {
  color: var(--cria-teal);
}

.vazio {
  margin-top: 1rem;
}
</style>
