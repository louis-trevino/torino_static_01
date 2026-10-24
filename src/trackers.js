// Loads third-party tags only when the visitor has consented to their category,
// and cleans up their cookies when consent is withdrawn.
import { GA4_MEASUREMENT_ID, LINKEDIN_PARTNER_ID } from './config'

const trackers = [
  {
    category: 'performance',
    enabled: Boolean(GA4_MEASUREMENT_ID),
    cookiePrefixes: ['_ga'],
    load() {
      window.dataLayer = window.dataLayer || []
      window.gtag = function () {
        window.dataLayer.push(arguments)
      }
      window.gtag('js', new Date())
      window.gtag('config', GA4_MEASUREMENT_ID)
      addScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`)
    },
  },
  {
    category: 'marketing',
    enabled: Boolean(LINKEDIN_PARTNER_ID),
    cookiePrefixes: ['li_fat_id', 'li_giant', '_li_dcdm_c'],
    load() {
      window._linkedin_partner_id = LINKEDIN_PARTNER_ID
      window._linkedin_data_partner_ids = [LINKEDIN_PARTNER_ID]
      addScript('https://snap.licdn.com/li.lms-analytics/insight.min.js')
    },
  },
]

const loaded = new Set()

function addScript(src) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

function deleteCookies(prefixes) {
  const host = location.hostname
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`]
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim()
    if (!prefixes.some((p) => name.startsWith(p))) return
    domains.forEach((d) => {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`
    })
  })
}

export function applyConsent(preferences) {
  let needsReload = false
  for (const t of trackers) {
    if (!t.enabled) continue
    if (preferences[t.category]) {
      if (!loaded.has(t)) {
        t.load()
        loaded.add(t)
      }
    } else {
      deleteCookies(t.cookiePrefixes)
      // A loaded script can't be unloaded; reload so it stops running.
      if (loaded.has(t)) needsReload = true
    }
  }
  if (needsReload) location.reload()
}
