<script setup>
import { company, nav } from '../content'
import { useCookieConsent } from '../composables/useCookieConsent'
import markLight from '../assets/torino-mark-light.svg'

defineProps({
  // Prefix for section links: '' on the home page, './' on other pages.
  base: { type: String, default: '' },
})

const { openSettings } = useCookieConsent()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer text-white">
    <div class="container py-5">
      <div class="row g-4 align-items-start">
        <div class="col-lg-5">
          <div class="d-flex align-items-center gap-2 mb-3">
            <img :src="markLight" alt="" width="36" height="40" />
            <span class="fw-bold" style="letter-spacing: 0.15em">TORINO CONSULTING</span>
          </div>
          <p class="text-white-50 mb-0">{{ company.slogan }}</p>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <h2 class="h6 fw-bold text-uppercase small footer-heading">Navigate</h2>
          <ul class="list-unstyled d-grid gap-2 mb-0">
            <li v-for="item in nav" :key="item.id">
              <a :href="`${base}#${item.id}`">{{ item.label }}</a>
            </li>
          </ul>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <h2 class="h6 fw-bold text-uppercase small footer-heading">Privacy</h2>
          <ul class="list-unstyled d-grid gap-2 mb-0">
            <li><a href="privacy.html">Privacy &amp; Cookie Policy</a></li>
            <li>
              <button type="button" class="btn btn-link p-0 footer-link text-start" @click="openSettings">
                Cookie Settings
              </button>
            </li>
          </ul>
        </div>
        <div class="col-md-4 col-lg-3">
          <h2 class="h6 fw-bold text-uppercase small footer-heading">Contact</h2>
          <a :href="`mailto:${company.email}`" class="d-inline-flex align-items-center gap-2 text-break">
            <i class="bi bi-envelope" aria-hidden="true"></i>{{ company.email }}
          </a>
        </div>
      </div>
      <hr class="border-secondary my-4" />
      <p class="small text-white-50 mb-0">&copy; {{ year }} {{ company.name }}. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--torino-navy-deep);
}

.footer-heading {
  color: var(--torino-cyan);
  letter-spacing: 0.1em;
}

.site-footer a,
.footer-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
}

.site-footer a:hover,
.footer-link:hover {
  color: #fff;
}
</style>
