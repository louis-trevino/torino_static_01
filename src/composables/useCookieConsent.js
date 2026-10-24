import { reactive, ref, readonly } from 'vue'
import { CONSENT_VERSION } from '../config'

const STORAGE_KEY = 'torino_cookie_consent'

const defaults = () => ({ necessary: true, functionality: false, performance: false, marketing: false })

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (saved && saved.version === CONSENT_VERSION) return saved
  } catch {
    // Storage unavailable or corrupt: treat as no decision yet.
  }
  return null
}

// Module-level state so every component shares the same consent.
const saved = load()
const preferences = reactive(saved ? { ...defaults(), ...saved.preferences } : defaults())
const hasDecided = ref(Boolean(saved))
const settingsOpen = ref(false)

function save(prefs) {
  Object.assign(preferences, prefs, { necessary: true })
  hasDecided.value = true
  settingsOpen.value = false
  const record = { version: CONSENT_VERSION, savedAt: new Date().toISOString(), preferences: { ...preferences } }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  } catch {
    // Choice still applies for this visit.
  }
  // Other scripts (analytics, marketing tags) can listen for this to load conditionally.
  window.dispatchEvent(new CustomEvent('torino:consent-changed', { detail: { ...preferences } }))
}

export function useCookieConsent() {
  return {
    preferences: readonly(preferences),
    hasDecided: readonly(hasDecided),
    settingsOpen,
    acceptAll: () => save({ functionality: true, performance: true, marketing: true }),
    rejectAll: () => save({ functionality: false, performance: false, marketing: false }),
    save,
    openSettings: () => (settingsOpen.value = true),
    closeSettings: () => (settingsOpen.value = false),
  }
}
