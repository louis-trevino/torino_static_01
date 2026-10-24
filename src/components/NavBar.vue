<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { nav, company } from '../content'
import markLight from '../assets/torino-mark-light.svg'
import mark from '../assets/torino-mark.svg'

const props = defineProps({
  // Prefix for section links: '' on the home page, './' on other pages so links return home.
  base: { type: String, default: '' },
  // Always use the white navbar (pages without a dark hero).
  solid: { type: Boolean, default: false },
})

const scrolled = ref(props.solid)
const menuOpen = ref(false)
const active = ref(props.base ? '' : 'home')

let observer
const onScroll = () => (scrolled.value = props.solid || window.scrollY > 40)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  // Highlight the nav link of the section currently in view.
  observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && (active.value = e.target.id)),
    { rootMargin: '-45% 0px -50% 0px' },
  )
  nav.forEach(({ id }) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<template>
  <nav
    class="navbar navbar-expand-lg fixed-top"
    :class="scrolled || menuOpen ? 'navbar-solid' : 'navbar-clear'"
    aria-label="Main navigation"
  >
    <div class="container">
      <a class="navbar-brand d-flex align-items-center gap-2" :href="`${base}#home`" @click="menuOpen = false">
        <img :src="scrolled || menuOpen ? mark : markLight" alt="" width="34" height="38" />
        <span class="brand-text">
          <span class="brand-name">TORINO</span>
          <span class="brand-sub">CONSULTING</span>
        </span>
        <span class="visually-hidden">{{ company.name }}</span>
      </a>

      <button
        class="navbar-toggler"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="mainNav"
        aria-label="Toggle navigation"
        @click="menuOpen = !menuOpen"
      >
        <i class="bi" :class="menuOpen ? 'bi-x-lg' : 'bi-list'"></i>
      </button>

      <div id="mainNav" class="collapse navbar-collapse" :class="{ show: menuOpen }">
        <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
          <li v-for="item in nav.filter((n) => n.id !== 'contact')" :key="item.id" class="nav-item">
            <a
              class="nav-link"
              :class="{ active: active === item.id }"
              :aria-current="active === item.id ? 'true' : null"
              :href="`${base}#${item.id}`"
              @click="menuOpen = false"
              >{{ item.label }}</a
            >
          </li>
          <li class="nav-item ms-lg-2 mt-2 mt-lg-0">
            <a class="btn btn-primary px-4" :href="`${base}#contact`" @click="menuOpen = false">Contact Us</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  transition:
    background-color 0.25s ease,
    box-shadow 0.25s ease;
  padding-top: 0.85rem;
  padding-bottom: 0.85rem;
}

.navbar-clear {
  background-color: transparent;
  --bs-navbar-color: rgba(255, 255, 255, 0.8);
  --bs-navbar-hover-color: #fff;
  --bs-navbar-active-color: #fff;
}

.navbar-solid {
  background-color: #fff;
  box-shadow: 0 2px 16px rgba(11, 45, 91, 0.08);
  --bs-navbar-color: var(--torino-slate);
  --bs-navbar-hover-color: var(--torino-navy);
  --bs-navbar-active-color: var(--torino-blue);
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.brand-name {
  font-weight: 800;
  font-size: 1.15rem;
  letter-spacing: 0.18em;
  color: var(--torino-navy);
}

.brand-sub {
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.32em;
  color: var(--torino-blue);
  margin-top: 0.2rem;
}

.navbar-clear .brand-name {
  color: #fff;
}

.navbar-clear .brand-sub {
  color: #7cc4ff;
}

.nav-link {
  font-weight: 500;
}

.nav-link.active {
  font-weight: 600;
}

.navbar-toggler {
  border: none;
  font-size: 1.6rem;
  color: var(--bs-navbar-hover-color);
}

.navbar-toggler:focus {
  box-shadow: 0 0 0 0.2rem rgba(37, 99, 235, 0.35);
}

@media (max-width: 991.98px) {
  .navbar-collapse {
    padding: 0.75rem 0 0.5rem;
  }
}
</style>
