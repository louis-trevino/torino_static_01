<script setup>
import { services } from '../content'
</script>

<template>
  <section id="services" class="section">
    <div class="container">
      <div class="text-center mx-auto mb-5" style="max-width: 44rem">
        <span class="section-eyebrow">What We Do</span>
        <h2 class="section-title display-6">Our Services</h2>
        <p class="text-secondary mt-3">
          From autonomous AI workflows to cloud-native platforms, we engineer the systems that move your business
          forward.
        </p>
      </div>

      <div class="row g-4">
        <div v-for="service in services" :key="service.title" class="col-md-6 col-xl-3">
          <article class="card service-card h-100 border-0">
            <div class="card-body p-4">
              <span class="icon-badge mb-4"><i class="bi" :class="service.icon" aria-hidden="true"></i></span>
              <h3 class="h5 fw-bold text-navy">{{ service.title }}</h3>
              <p class="text-secondary mb-0">{{ service.text }}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.service-card {
  background: #fff;
  box-shadow: 0 4px 24px rgba(11, 45, 91, 0.07);
  border-top: 3px solid transparent !important;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

.service-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 36px rgba(11, 45, 91, 0.14);
  border-top-color: var(--torino-cyan) !important;
}

.text-navy {
  color: var(--torino-navy);
}
</style>
