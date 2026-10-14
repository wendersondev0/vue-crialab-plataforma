<template>
  <main class="pagina-conta">
    <h1>Criar conta</h1>
    <form v-if="!token" class="formulario" @submit.prevent="enviar">
      <Message v-if="erro" severity="error">{{ erro }}</Message>
      <label>Nome <InputText v-model="nome" autocomplete="name" required /></label>
      <label>E-mail <InputText v-model="email" type="email" autocomplete="email" required /></label>
      <label>Senha <Password v-model="senha" :feedback="false" toggle-mask autocomplete="new-password" required /></label>
      <Button class="acao" type="submit" label="Criar conta" :loading="enviando" />
      <NuxtLink to="/conta/entrar">Já tenho conta</NuxtLink>
    </form>
    <div v-else class="formulario">
      <Message severity="success">Conta criada. Confirme o e-mail para entrar.</Message>
      <NuxtLink :to="`/conta/confirmar?token=${token}`">Confirmar e-mail agora</NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ApiErro, api } from '~/http/api'

definePageMeta({ layout: 'loja' })

const nome = ref('')
const email = ref('')
const senha = ref('')
const erro = ref('')
const token = ref('')
const enviando = ref(false)

async function enviar() {
  erro.value = ''
  enviando.value = true
  try {
    const dados = await api<{ tokenConfirmacao?: string | null }>('/v1/auth/cadastro', {
      method: 'POST',
      body: { nome: nome.value, email: email.value, senha: senha.value },
    })
    token.value = dados.tokenConfirmacao || ''
    if (!token.value)
      erro.value = 'Conta criada. Abra o link enviado para o seu e-mail.'
  }
  catch (falha) {
    erro.value = falha instanceof ApiErro ? falha.message : 'Não foi possível criar a conta.'
  }
  finally {
    enviando.value = false
  }
}
</script>
