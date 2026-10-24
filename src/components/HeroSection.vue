<script setup>
import { hero } from '../content'
import HeroLogo from './HeroLogo.vue'
</script>

<template>
  <section id="home" class="hero text-white">
    <div class="container position-relative">
      <div class="row align-items-center g-5">
        <div class="col-lg-7 hero-text">
          <span class="section-eyebrow hero-eyebrow">{{ hero.eyebrow }}</span>
          <h1 class="hero-title">{{ hero.title }}</h1>
          <p class="lead hero-lead mt-4">{{ hero.intro }}</p>
          <p class="hero-detail">{{ hero.detail }}</p>
          <div class="d-flex flex-wrap gap-3 mt-4">
            <a href="#services" class="btn btn-primary btn-lg px-4">Explore Services</a>
            <a href="#contact" class="btn btn-outline-light btn-lg px-4">Talk to an Expert</a>
          </div>
        </div>
        <div class="col-lg-5 col-md-8 mx-auto align-self-lg-start hero-logo-col">
          <HeroLogo />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: 6.5rem 0 4.5rem;
  background:
    radial-gradient(circle at 85% 30%, rgba(0, 180, 219, 0.28), transparent 45%),
    radial-gradient(circle at 10% 90%, rgba(37, 99, 235, 0.35), transparent 50%),
    linear-gradient(135deg, var(--torino-navy-deep), var(--torino-navy) 60%, #12407e);
}

/* Faint hexagon grid echoing the logo */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.07;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='98' viewBox='0 0 56 98'%3E%3Cpath d='M28 66L0 50V17L28 1l28 16v33L28 66zm0 32V66' fill='none' stroke='%23fff' stroke-width='1.2'/%3E%3C/svg%3E");
  pointer-events: none;
}

.hero-eyebrow {
  color: var(--torino-cyan);
}

.hero-title {
  font-weight: 800;
  font-size: clamp(2.3rem, 5vw, 3.6rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.hero-lead {
  color: rgba(255, 255, 255, 0.92);
}

.hero-detail {
  color: rgba(255, 255, 255, 0.72);
  max-width: 38rem;
}

@media (min-width: 992px) {
  .hero-text {
    padding-top: 2.5rem;
  }
}

@media (max-width: 991.98px) {
  .hero {
    padding: 6.5rem 0 3.5rem;
  }
}
</style>
