<script setup>
import { reactive, ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { cookieCategories } from '../content'
import { useCookieConsent } from '../composables/useCookieConsent'

const { preferences, hasDecided, settingsOpen, acceptAll, rejectAll, save, openSettings, closeSettings } =
  useCookieConsent()

// Working copy edited in the dialog; only applied on "Save".
const draft = reactive({ ...preferences })
const dialog = ref(null)
let lastFocused = null

watch(settingsOpen, async (open) => {
  if (open) {
    Object.assign(draft, preferences)
    lastFocused = document.activeElement
    document.body.classList.add('modal-open')
    await nextTick()
    dialog.value?.focus()
  } else {
    document.body.classList.remove('modal-open')
    lastFocused?.focus?.()
  }
})

const onKey = (e) => e.key === 'Escape' && settingsOpen.value && closeSettings()
onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <!-- First-visit banner -->
    <Transition name="slide-up">
      <div
        v-if="!hasDecided && !settingsOpen"
        class="cookie-banner shadow-lg"
        role="region"
        aria-label="Cookie consent"
      >
        <div class="container py-3 py-md-4">
          <div class="row align-items-center g-3">
            <div class="col-lg-7">
              <h2 class="h6 fw-bold mb-1"><i class="bi bi-shield-lock me-2"></i>We value your privacy</h2>
              <p class="small mb-0 text-white-50">
                We use cookies to make this site work and, with your permission, to improve functionality, measure
                performance and support marketing. You can change your choice at any time via
                <em>Cookie Settings</em> in the footer. Read our
                <a href="privacy.html#cookies" class="link-light">Privacy &amp; Cookie Policy</a>.
              </p>
            </div>
            <div class="col-lg-5 d-flex flex-wrap gap-2 justify-content-lg-end">
              <button class="btn btn-outline-light btn-sm px-3" type="button" @click="openSettings">Customize</button>
              <button class="btn btn-outline-light btn-sm px-3" type="button" @click="rejectAll">Reject All</button>
              <button class="btn btn-primary btn-sm px-3" type="button" @click="acceptAll">Accept All</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Preferences dialog -->
    <template v-if="settingsOpen">
      <div
        ref="dialog"
        class="modal d-block"
        tabindex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
        @click.self="closeSettings"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div class="modal-content border-0">
            <div class="modal-header">
              <h2 id="cookie-settings-title" class="modal-title h5 fw-bold">Cookie Settings</h2>
              <button type="button" class="btn-close" aria-label="Close" @click="closeSettings"></button>
            </div>
            <div class="modal-body">
              <p class="text-secondary small">
                Choose which cookies you allow. Your choice is saved in this browser and you can change it at any time.
                See our <a href="privacy.html#cookies">Privacy &amp; Cookie Policy</a> for details.
              </p>
              <div class="d-grid gap-3">
                <div v-for="cat in cookieCategories" :key="cat.key" class="category p-3">
                  <div class="form-check form-switch d-flex justify-content-between align-items-start ps-0 gap-3 mb-0">
                    <label class="form-check-label" :for="`cookie-${cat.key}`">
                      <span class="fw-semibold d-block">
                        {{ cat.title }}
                        <span v-if="cat.required" class="badge text-bg-light border ms-1">Always on</span>
                      </span>
                      <span class="small text-secondary">{{ cat.text }}</span>
                    </label>
                    <input
                      :id="`cookie-${cat.key}`"
                      v-model="draft[cat.key]"
                      class="form-check-input flex-shrink-0 ms-0 mt-1"
                      type="checkbox"
                      role="switch"
                      :disabled="cat.required"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer flex-wrap gap-2">
              <button type="button" class="btn btn-outline-secondary me-auto" @click="rejectAll">Reject All</button>
              <button type="button" class="btn btn-outline-primary" @click="save({ ...draft })">Save My Choices</button>
              <button type="button" class="btn btn-primary" @click="acceptAll">Accept All</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop show"></div>
    </template>
  </Teleport>
</template>

<style scoped>
.cookie-banner {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1040;
  color: #fff;
  background: rgba(7, 29, 60, 0.97);
  border-top: 3px solid var(--torino-cyan);
}

.category {
  border: 1px solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
}

.form-switch .form-check-input {
  width: 2.75em;
  height: 1.4em;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
