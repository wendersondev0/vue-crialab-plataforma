<template>
  <main class="home">
    <header class="topo">
      <img class="logo" src="/marca/logo.png" alt="Cria Lab DM" />
    </header>
    <section class="hero">
      <img class="mascote" src="/marca/mascote.png" alt="Mascote da Cria Lab DM" />
      <div class="texto">
        <h1>Cria Lab DM</h1>
        <p>Impressão 3D personalizada, do orçamento à peça pronta.</p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'loja' })
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
  margin: 0;
  font-size: 2.25rem;
  color: var(--cria-teal);
}

p {
  margin: 0.75rem 0 0;
  max-width: 28rem;
  font-size: 1.125rem;
  line-height: 1.5;
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
}
</style>
