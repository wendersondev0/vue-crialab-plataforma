<template>
  <main class="pagina-conta">
    <h1>Entrar</h1>
    <form class="formulario" @submit.prevent="enviar">
      <Message v-if="erro" severity="error">{{ erro }}</Message>
      <label>E-mail <InputText v-model="email" type="email" autocomplete="username" required /></label>
      <label>Senha <Password v-model="senha" :feedback="false" toggle-mask autocomplete="current-password" required /></label>
      <Button class="acao" type="submit" label="Entrar" :loading="enviando" />
      <NuxtLink to="/conta/cadastro">Criar conta</NuxtLink>
      <NuxtLink to="/conta/redefinir">Esqueci minha senha</NuxtLink>
    </form>
  </main>
</template>

<script setup lang="ts">
import type { Sessao } from '~/types/loja'
import { ApiErro, api } from '~/http/api'

definePageMeta({ layout: 'loja' })

const email = ref('')
const senha = ref('')
const erro = ref('')
const enviando = ref(false)
const sessao = useSessaoStore()

async function enviar() {
  erro.value = ''
  enviando.value = true
  try {
    const dados = await api<Sessao>('/v1/auth/entrar', { method: 'POST', body: { email: email.value, senha: senha.value } })
    sessao.gravar(dados)
    await navigateTo(dados.usuario.papeis.includes('AdministradorGeral') ? '/admin/plataforma' : '/painel/plano')
  }
  catch (falha) {
    erro.value = falha instanceof ApiErro ? falha.message : 'Não foi possível entrar.'
  }
  finally {
    enviando.value = false
  }
}
</script>
