<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import ClientsSection from './components/ClientsSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import WhyUsSection from './components/WhyUsSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import CookieConsent from './components/CookieConsent.vue'
</script>

<template>
  <a class="visually-hidden-focusable position-absolute top-0 start-0 m-2 btn btn-light" style="z-index: 1100" href="#main">Skip to content</a>
  <NavBar />
  <main id="main">
    <HeroSection />
    <ClientsSection />
    <ServicesSection />
    <WhyUsSection />
    <ContactSection />
  </main>
  <SiteFooter />
  <CookieConsent />
</template>
