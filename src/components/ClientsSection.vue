<script setup>
import { clients } from '../content'
</script>

<template>
  <section v-if="clients.length" class="clients py-5 border-bottom" aria-labelledby="clients-title">
    <div class="container">
      <h2 id="clients-title" class="section-eyebrow d-block text-center text-secondary mb-4">
        Trusted by forward-thinking organizations
      </h2>
      <ul class="list-unstyled row row-cols-2 row-cols-md-3 row-cols-lg-6 g-4 align-items-center mb-0">
        <li v-for="client in clients" :key="client.name" class="col text-center">
          <img :src="client.logo" :alt="client.name" class="client-logo" loading="lazy" width="200" height="48" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.client-logo {
  max-width: 100%;
  max-height: 44px;
  width: auto;
  height: auto;
  filter: grayscale(1);
  opacity: 0.6;
  transition:
    filter 0.25s ease,
    opacity 0.25s ease;
}

.client-logo:hover {
  filter: none;
  opacity: 1;
}
</style>
