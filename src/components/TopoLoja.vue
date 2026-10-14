<template>
  <header class="barra">
    <NuxtLink to="/" class="marca">Cria Lab DM</NuxtLink>
    <nav>
      <NuxtLink to="/">Início</NuxtLink>
      <NuxtLink v-if="!sessao.acesso" to="/conta/entrar">Entrar</NuxtLink>
      <NuxtLink v-if="!sessao.acesso" to="/conta/cadastro">Criar conta</NuxtLink>
      <NuxtLink v-if="sessao.acesso" to="/painel/plano">Minha loja</NuxtLink>
      <NuxtLink v-if="admin" to="/admin/plataforma">Administração</NuxtLink>
      <button v-if="sessao.acesso" type="button" class="sair" @click="sair">Sair</button>
    </nav>
  </header>
</template>

<script setup lang="ts">
const sessao = useSessaoStore()
const admin = computed(() => sessao.usuario?.papeis.includes('AdministradorGeral'))

function sair() {
  sessao.sair()
  navigateTo('/')
}
</script>

<style scoped>
.barra {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
}

.marca {
  color: var(--cria-teal);
  font-weight: 700;
  text-decoration: none;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1rem;
  align-items: center;
}

nav a,
.sair {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  color: var(--cria-tinta);
  text-decoration: none;
  background: none;
  border: 0;
  padding: 0;
  font: inherit;
  cursor: pointer;
}
</style>
