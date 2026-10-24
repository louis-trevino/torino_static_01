<script setup>
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
import CookieConsent from './components/CookieConsent.vue'
import { company, cookieCategories } from './content'
import { useCookieConsent } from './composables/useCookieConsent'

const { preferences, hasDecided, openSettings } = useCookieConsent()
const lastUpdated = 'October 23, 2026'
</script>

<template>
  <a class="visually-hidden-focusable position-absolute top-0 start-0 m-2 btn btn-light" style="z-index: 1100" href="#main">Skip to content</a>
  <NavBar base="./" solid />
  <main id="main" class="policy section">
    <div class="container">
      <div class="mx-auto" style="max-width: 50rem">
        <span class="section-eyebrow">Legal</span>
        <h1 class="section-title display-6">Privacy &amp; Cookie Policy</h1>
        <p class="text-secondary">Last updated: {{ lastUpdated }}</p>

        <nav class="toc p-4 my-4" aria-label="On this page">
          <ol class="mb-0">
            <li><a href="#who-we-are">Who we are</a></li>
            <li><a href="#data-we-collect">Information we collect</a></li>
            <li><a href="#how-we-use">How and why we use it</a></li>
            <li><a href="#sharing">Service providers and transfers</a></li>
            <li><a href="#retention">How long we keep it</a></li>
            <li><a href="#cookies">Cookies and similar technologies</a></li>
            <li><a href="#rights">Your rights</a></li>
            <li><a href="#changes">Changes to this policy</a></li>
          </ol>
        </nav>

        <section id="who-we-are">
          <h2>1. Who we are</h2>
          <p>
            This website is operated by {{ company.name }} ("we", "us"). We are responsible for the personal information
            collected through this site. For any privacy question or request, contact us at
            <a :href="`mailto:${company.email}`">{{ company.email }}</a>.
          </p>
        </section>

        <section id="data-we-collect">
          <h2>2. Information we collect</h2>
          <ul>
            <li>
              <strong>Information you give us.</strong> When you use the contact form or email us, we receive your
              name, email address, company (optional) and the content of your message.
            </li>
            <li>
              <strong>Technical information.</strong> Our hosting provider automatically processes basic technical data
              such as your IP address and browser type to deliver and secure the website.
            </li>
            <li>
              <strong>Cookie and analytics data.</strong> Only if you allow it, as described in
              <a href="#cookies">Cookies and similar technologies</a>.
            </li>
          </ul>
          <p>We do not knowingly collect information from children, and we do not sell personal information.</p>
        </section>

        <section id="how-we-use">
          <h2>3. How and why we use it</h2>
          <ul>
            <li>
              <strong>To answer your inquiry</strong> and, where relevant, to take steps toward a business engagement
              you have asked about.
            </li>
            <li><strong>To operate and secure the website.</strong></li>
            <li>
              <strong>To understand and improve the website and our marketing</strong>, only for the cookie categories
              you have accepted. You can withdraw that consent at any time.
            </li>
          </ul>
        </section>

        <section id="sharing">
          <h2>4. Service providers and transfers</h2>
          <p>We share information only with providers that help us run this website:</p>
          <ul>
            <li><strong>GitHub, Inc.</strong> hosts the website (GitHub Pages).</li>
            <li><strong>Formspree, Inc.</strong> receives contact form submissions and forwards them to us by email.</li>
            <li><strong>Proton AG</strong> provides our email service.</li>
            <li v-for="cat in cookieCategories.filter((c) => !c.required && c.items.length)" :key="cat.key">
              <strong>{{ cat.items.map((i) => i.provider).join(', ') }}</strong>, only if you accept
              {{ cat.title }} cookies.
            </li>
          </ul>
          <p>
            Some of these providers are located outside your country, including in the United States. Where required,
            such transfers rely on appropriate safeguards such as the European Commission's Standard Contractual
            Clauses or an adequacy decision.
          </p>
        </section>

        <section id="retention">
          <h2>5. How long we keep it</h2>
          <p>
            We keep inquiry messages only as long as needed to respond and to manage any resulting business
            relationship, unless the law requires us to keep them longer. Cookie lifetimes are listed below.
          </p>
        </section>

        <section id="cookies">
          <h2>6. Cookies and similar technologies</h2>
          <p>
            Cookies are small files stored in your browser. We also use your browser's local storage to remember your
            cookie choices. Except for strictly necessary storage, nothing is set until you give consent, and you can
            change your choice at any time.
          </p>

          <div class="d-flex flex-wrap align-items-center gap-3 my-4 p-3 consent-status">
            <div class="me-auto small">
              <strong class="d-block">Your current choice</strong>
              <span v-if="!hasDecided" class="text-secondary">You have not made a choice yet.</span>
              <span v-else>
                <span
                  v-for="cat in cookieCategories"
                  :key="cat.key"
                  class="badge me-1"
                  :class="preferences[cat.key] ? 'text-bg-primary' : 'text-bg-light border'"
                  >{{ cat.title }}: {{ preferences[cat.key] ? 'On' : 'Off' }}</span
                >
              </span>
            </div>
            <button type="button" class="btn btn-primary" @click="openSettings">
              <i class="bi bi-sliders me-2"></i>Change cookie settings
            </button>
          </div>

          <div v-for="cat in cookieCategories" :key="cat.key" class="mb-4">
            <h3 class="h6 fw-bold">{{ cat.title }}</h3>
            <p class="text-secondary small mb-2">{{ cat.text }}</p>
            <div v-if="cat.items.length" class="table-responsive">
              <table class="table table-sm small align-middle">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Provider</th>
                    <th scope="col">Purpose</th>
                    <th scope="col">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cat.items" :key="item.name">
                    <td><code>{{ item.name }}</code></td>
                    <td>{{ item.provider }}</td>
                    <td>{{ item.purpose }}</td>
                    <td>{{ item.duration }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p v-else class="small fst-italic mb-0">None in use at the moment.</p>
          </div>
        </section>

        <section id="rights">
          <h2>7. Your rights</h2>
          <p>
            Depending on where you live, you may have the right to access, correct or delete your personal information,
            to restrict or object to its use, to data portability, and to withdraw consent at any time without
            affecting earlier processing. To exercise these rights, email
            <a :href="`mailto:${company.email}`">{{ company.email }}</a>. You also have the right to lodge a
            complaint with your local data protection authority.
          </p>
        </section>

        <section id="changes">
          <h2>8. Changes to this policy</h2>
          <p class="mb-0">
            We may update this policy from time to time. The "Last updated" date above shows when it last changed. If
            we add new cookie categories or tools, we will ask for your consent again.
          </p>
        </section>
      </div>
    </div>
  </main>
  <SiteFooter base="./" />
  <CookieConsent />
</template>

<style scoped>
.policy {
  padding-top: 8rem;
}

.policy h2 {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--torino-navy);
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.policy section {
  scroll-margin-top: 90px;
}

.toc,
.consent-status {
  background: var(--torino-surface);
  border-radius: var(--bs-border-radius-lg);
}

.toc li + li {
  margin-top: 0.25rem;
}
</style>
