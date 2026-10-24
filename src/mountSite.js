// Shared startup for every page (index.html, privacy.html).
import { createApp } from 'vue'
import '@fontsource-variable/inter'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import './assets/main.css'
import { useCookieConsent } from './composables/useCookieConsent'
import { applyConsent } from './trackers'

export function mountSite(Root) {
  const { preferences } = useCookieConsent()
  // Before any decision all optional categories are false, so nothing loads.
  applyConsent(preferences)
  window.addEventListener('torino:consent-changed', (e) => applyConsent(e.detail))

  createApp(Root).mount('#app')
}
