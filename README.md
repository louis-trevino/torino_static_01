# Torino Consulting website

*Smart Solutions for Today and Tomorrow*

A static, single-page site built with **Vue 3 + Vite + Bootstrap 5**, deployed to **GitHub Pages**.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

## Where things live

| What | Where |
|---|---|
| All text content (services, benefits, cookie categories) | `src/content.js` |
| Formspree ID, consent version, GA4 / LinkedIn IDs | `src/config.js` |
| Privacy & Cookie Policy page | `privacy.html`, `src/PrivacyPage.vue` |
| Client logos | `public/img/clients/` + `clients` in `src/content.js` |
| Brand colors and Bootstrap overrides | `src/assets/main.css` |
| Page sections | `src/components/` |
| Cookie consent state (saved in `localStorage`) | `src/composables/useCookieConsent.js` |
| Original logo files | `torino_logo/` |

## Contact form (Formspree)

1. Create a free form at <https://formspree.io> using the address that should receive messages.
2. Copy the form ID (the part after `/f/` in its endpoint) into `FORMSPREE_ID` in `src/config.js`.

While `FORMSPREE_ID` is empty, the form opens the visitor's email app addressed to torinoconsulting@proton.me.

## Cookie consent

Visitors choose **Functionality**, **Performance** and **Marketing** cookies (Strictly Necessary is always on)
via the banner or *Cookie Settings* in the footer. The choice is stored in `localStorage` under
`torino_cookie_consent`, and a `torino:consent-changed` window event is fired with the new preferences so
analytics or marketing scripts can be loaded only when allowed.

Set `GA4_MEASUREMENT_ID` (Performance) and/or `LINKEDIN_PARTNER_ID` (Marketing) in `src/config.js`; `src/trackers.js`
loads them only after consent and removes their cookies if consent is withdrawn. The cookie table on the
Privacy page updates automatically. Increase `CONSENT_VERSION` in
`src/config.js` to ask every visitor again.

## Deploy to GitHub Pages

1. Push this project to a GitHub repository, on the `main` branch.
2. In the repository, go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which builds and publishes the site.
