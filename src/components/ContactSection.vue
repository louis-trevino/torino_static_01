<script setup>
import { reactive, ref } from 'vue'
import { contact, company } from '../content'
import { FORMSPREE_ID } from '../config'

const form = reactive({ name: '', email: '', company: '', message: '', _gotcha: '' })
const validated = ref(false)
const status = ref('idle') // idle | sending | sent | error | mailto

async function submit(event) {
  validated.value = true
  if (!event.target.checkValidity()) return

  if (!FORMSPREE_ID) {
    // No form backend yet: hand the message to the visitor's email app.
    const subject = `Website inquiry from ${form.name}${form.company ? ` (${form.company})` : ''}`
    const body = `${form.message}\n\n${form.name}\n${form.email}${form.company ? `\n${form.company}` : ''}`
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    status.value = 'mailto'
    return
  }

  status.value = 'sending'
  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) throw new Error(`Formspree responded ${res.status}`)
    status.value = 'sent'
    Object.assign(form, { name: '', email: '', company: '', message: '' })
    validated.value = false
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section id="contact" class="section">
    <div class="container">
      <div class="row g-5">
        <div class="col-lg-5">
          <span class="section-eyebrow">Get in Touch</span>
          <h2 class="section-title display-6">{{ contact.title }}</h2>
          <p class="text-secondary mt-3">{{ contact.intro }}</p>
          <a :href="`mailto:${company.email}`" class="email-link d-inline-flex align-items-center gap-2 fw-semibold">
            <i class="bi bi-envelope-fill" aria-hidden="true"></i>{{ company.email }}
          </a>

          <ul class="list-unstyled d-grid gap-3 mt-4">
            <li class="d-flex align-items-center gap-3">
              <span class="icon-badge icon-sm"><i class="bi bi-lightning-charge" aria-hidden="true"></i></span>
              <span>Free initial architecture assessment</span>
            </li>
            <li class="d-flex align-items-center gap-3">
              <span class="icon-badge icon-sm"><i class="bi bi-people" aria-hidden="true"></i></span>
              <span>Senior engineers on every engagement</span>
            </li>
            <li class="d-flex align-items-center gap-3">
              <span class="icon-badge icon-sm"><i class="bi bi-globe2" aria-hidden="true"></i></span>
              <span>AWS, Azure &amp; Google Cloud expertise</span>
            </li>
          </ul>
        </div>

        <div class="col-lg-7">
          <div class="contact-card p-4 p-md-5">
            <div v-if="status === 'sent'" class="text-center py-5" role="status">
              <i class="bi bi-check-circle-fill text-success display-4"></i>
              <h3 class="h4 fw-bold mt-3">Thank you!</h3>
              <p class="text-secondary mb-4">Your message has been sent. We'll be in touch shortly.</p>
              <button class="btn btn-outline-primary" type="button" @click="status = 'idle'">Send another message</button>
            </div>

            <form v-else novalidate :class="{ 'was-validated': validated }" @submit.prevent="submit">
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="cf-name" class="form-label">Name *</label>
                  <input id="cf-name" v-model.trim="form.name" type="text" class="form-control" required autocomplete="name" />
                  <div class="invalid-feedback">Please enter your name.</div>
                </div>
                <div class="col-md-6">
                  <label for="cf-email" class="form-label">Email *</label>
                  <input id="cf-email" v-model.trim="form.email" type="email" class="form-control" required autocomplete="email" />
                  <div class="invalid-feedback">Please enter a valid email address.</div>
                </div>
                <div class="col-12">
                  <label for="cf-company" class="form-label">Company</label>
                  <input id="cf-company" v-model.trim="form.company" type="text" class="form-control" autocomplete="organization" />
                </div>
                <div class="col-12">
                  <label for="cf-message" class="form-label">How can we help? *</label>
                  <textarea id="cf-message" v-model.trim="form.message" class="form-control" rows="5" required minlength="10"></textarea>
                  <div class="invalid-feedback">Please write a short message (at least 10 characters).</div>
                </div>
                <!-- Honeypot: hidden from people, bots fill it in and Formspree discards the submission -->
                <input v-model="form._gotcha" type="text" name="_gotcha" class="d-none" tabindex="-1" autocomplete="off" />
              </div>

              <div v-if="status === 'error'" class="alert alert-danger mt-4 mb-0" role="alert">
                Sorry, something went wrong. Please try again, or email us at
                <a :href="`mailto:${company.email}`">{{ company.email }}</a>.
              </div>
              <div v-if="status === 'mailto'" class="alert alert-info mt-4 mb-0" role="status">
                Your email app should open with your message ready to send. If it doesn't, write to us at
                <a :href="`mailto:${company.email}`">{{ company.email }}</a>.
              </div>

              <p class="small text-secondary mt-4 mb-0">
                We use your details only to reply to your inquiry. See our
                <a href="privacy.html">Privacy Policy</a>.
              </p>

              <button type="submit" class="btn btn-primary btn-lg w-100 mt-4" :disabled="status === 'sending'">
                <span v-if="status === 'sending'" class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                {{ status === 'sending' ? 'Sending…' : 'Send Message' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-card {
  background: #fff;
  border-radius: var(--bs-border-radius-lg);
  box-shadow: 0 8px 40px rgba(11, 45, 91, 0.1);
  border-top: 4px solid var(--torino-blue);
}

.icon-sm {
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.1rem;
  border-radius: 0.6rem;
}

.email-link {
  font-size: 1.1rem;
  text-decoration: none;
  word-break: break-all;
}

.form-label {
  font-weight: 500;
  color: var(--torino-navy);
}
</style>
