<template>
  <main class="home">
    <header class="topo">
      <img class="logo" src="/marca/logo.png" alt="Cria Lab DM" />
    </header>
    <section class="hero">
      <img class="mascote" src="/marca/mascote.png" alt="Mascote da Cria Lab DM" />
      <div class="texto">
        <Tag v-if="oficial?.seloOficial" value="Selo oficial" severity="info" />
        <h1>{{ oficial?.nome || 'Cria Lab DM' }}</h1>
        <p>{{ oficial?.descricao || 'Impressão 3D personalizada, do orçamento à peça pronta.' }}</p>
        <p v-if="oficial" class="contato">
          <span v-if="oficial.cnpj">CNPJ {{ oficial.cnpj }}</span>
          <a v-if="oficial.email" :href="`mailto:${oficial.email}`">{{ oficial.email }}</a>
          <a v-if="oficial.telefone" :href="whatsapp(oficial.whatsapp || oficial.telefone)">{{ oficial.telefone }}</a>
        </p>
        <p class="redes">
          <a v-for="rede in oficial?.redes || []" :key="rede.rede" :href="rede.url" target="_blank" rel="noopener">{{ rede.rede }}</a>
        </p>
        <p class="vazio">A vitrine ainda não tem produtos.</p>
      </div>
    </section>
    <section class="lista">
      <h2>Vitrine</h2>
      <div v-if="vitrine.length" class="cards">
        <NuxtLink v-for="loja in vitrine" :key="loja.id" :to="loja.slug === 'crialabdm' ? '/' : `/${loja.slug}`" class="card">
          <strong>{{ loja.nome }}</strong>
          <Tag v-if="loja.seloOficial" value="Oficial" />
          <span>{{ loja.plano }}</span>
        </NuxtLink>
      </div>
      <p v-else>Nenhuma loja publicada no momento.</p>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { LojaPublica } from '~/types/loja'

definePageMeta({ layout: 'loja' })

const config = useRuntimeConfig()
const { data } = await useAsyncData('vitrine', async () => {
  try {
    return await $fetch<LojaPublica[]>(`${config.public.apiUrl}/v1/lojas/vitrine`)
  }
  catch {
    return []
  }
})

const vitrine = computed(() => data.value || [])
const oficial = computed(() => vitrine.value.find(loja => loja.seloOficial))

function whatsapp(telefone: string) {
  const digitos = telefone.replace(/\D/g, '')
  const comPais = digitos.startsWith('55') ? digitos : `55${digitos}`
  return `https://wa.me/${comPais}`
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.topo {
  display: flex;
  justify-content: center;
  padding: 1.25rem 1rem 0;
}

.logo {
  width: min(100%, 28rem);
  height: auto;
}

.hero {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 1.5rem 1rem 3rem;
  text-align: center;
}

.mascote {
  width: min(70vw, 16rem);
  height: auto;
}

h1 {
  margin: 0.5rem 0 0;
  font-size: 2.25rem;
  color: var(--cria-teal);
}

p {
  margin: 0.75rem 0 0;
  max-width: 28rem;
  font-size: 1.125rem;
  line-height: 1.5;
}

.contato,
.redes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  justify-content: center;
}

.vazio {
  color: var(--cria-tinta);
}

.lista {
  padding: 0 1rem 3rem;
}

.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem;
  background: var(--cria-branco);
  color: var(--cria-tinta);
  text-decoration: none;
  border-radius: 0.75rem;
  min-height: 44px;
}

@media (min-width: 768px) {
  .hero {
    flex-direction: row;
    text-align: left;
    gap: 3rem;
    padding: 2rem 2.5rem 4rem;
  }

  .mascote {
    width: 18rem;
  }

  h1 {
    font-size: 3rem;
  }

  .contato,
  .redes {
    justify-content: flex-start;
  }

  .cards {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1280px) {
  .hero {
    gap: 4rem;
  }

  .mascote {
    width: 22rem;
  }

  h1 {
    font-size: 3.5rem;
  }

  .cards {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
