<script setup>
import { benefits } from '../content'
</script>

<template>
  <section id="why-us" class="section bg-surface">
    <div class="container">
      <div class="row g-5 align-items-center">
        <div class="col-lg-5">
          <span class="section-eyebrow">Why Partner With Us</span>
          <h2 class="section-title display-6">Engineering that keeps you moving</h2>
          <p class="text-secondary mt-3">
            We pair deep architecture expertise with a pragmatic delivery approach, so your modernization pays off from
            day one.
          </p>
          <a href="#contact" class="btn btn-outline-primary mt-2 px-4">Start a conversation</a>
        </div>

        <div class="col-lg-7">
          <ul class="list-unstyled d-grid gap-3 mb-0">
            <li v-for="benefit in benefits" :key="benefit.title" class="benefit d-flex gap-3 p-4">
              <span class="icon-badge"><i class="bi" :class="benefit.icon" aria-hidden="true"></i></span>
              <div>
                <h3 class="h5 fw-bold mb-1">{{ benefit.title }}</h3>
                <p class="text-secondary mb-0">{{ benefit.text }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.benefit {
  background: #fff;
  border-radius: var(--bs-border-radius-lg);
  border-left: 4px solid var(--torino-blue);
  box-shadow: 0 4px 20px rgba(11, 45, 91, 0.06);
}

.benefit h3 {
  color: var(--torino-navy);
}
</style>
