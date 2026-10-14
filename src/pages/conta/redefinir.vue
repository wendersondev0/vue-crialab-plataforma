<template>
  <main class="pagina-conta">
    <h1>Redefinir senha</h1>
    <form v-if="!token" class="formulario" @submit.prevent="pedir">
      <Message v-if="erro" severity="error">{{ erro }}</Message>
      <Message v-if="aviso" severity="success">{{ aviso }}</Message>
      <label>E-mail <InputText v-model="email" type="email" required /></label>
      <Button class="acao" type="submit" label="Enviar link" :loading="enviando" />
      <NuxtLink v-if="tokenDev" :to="`/conta/redefinir?token=${tokenDev}`">Abrir redefinição agora</NuxtLink>
    </form>
    <form v-else class="formulario" @submit.prevent="redefinir">
      <Message v-if="erro" severity="error">{{ erro }}</Message>
      <Message v-if="aviso" severity="success">{{ aviso }}</Message>
      <label>Nova senha <Password v-model="senha" :feedback="false" toggle-mask required /></label>
      <Button class="acao" type="submit" label="Redefinir senha" :loading="enviando" />
      <NuxtLink to="/conta/entrar">Entrar</NuxtLink>
    </form>
  </main>
</template>

<script setup lang="ts">
import { ApiErro, api } from '~/http/api'

definePageMeta({ layout: 'loja' })

const rota = useRoute()
const email = ref('')
const senha = ref('')
const erro = ref('')
const aviso = ref('')
const tokenDev = ref('')
const enviando = ref(false)
const token = computed(() => String(rota.query.token || ''))

async function pedir() {
  erro.value = ''
  aviso.value = ''
  enviando.value = true
  try {
    const dados = await api<{ tokenRedefinicao?: string | null }>('/v1/auth/esqueci-senha', { method: 'POST', body: { email: email.value } })
    tokenDev.value = dados.tokenRedefinicao || ''
    aviso.value = 'Se a conta existir, o link de redefinição foi preparado.'
  }
  catch (falha) {
    erro.value = falha instanceof ApiErro ? falha.message : 'Não foi possível enviar o link.'
  }
  finally {
    enviando.value = false
  }
}

async function redefinir() {
  erro.value = ''
  enviando.value = true
  try {
    await api('/v1/auth/redefinir-senha', { method: 'POST', body: { token: token.value, senha: senha.value } })
    aviso.value = 'Senha atualizada.'
  }
  catch (falha) {
    erro.value = falha instanceof ApiErro ? falha.message : 'Não foi possível redefinir a senha.'
  }
  finally {
    enviando.value = false
  }
}
</script>
