# Wingate Airport Parking — Website

A static, multi-page marketing site for a fictional premium UK airport
parking brand ("Wingate"). No build step, no framework, no dependencies —
plain HTML, one CSS file, one JS file.

## Project structure

```
.
├── index.html            # Home
├── how-it-works.html     # The journey, step by step
├── services.html         # Meet & Greet / Park & Ride / Executive Care
├── booking.html          # Book-by-phone info
├── faq.html              # Searchable FAQ with category tabs
├── contact.html          # Contact details + demo contact form
├── drop-off.html         # Per-airport drop-off guide
├── collection.html       # Per-airport collection guide
├── terms.html            # Terms & conditions
├── privacy.html          # Privacy policy
├── 404.html              # Custom not-found page
├── assets/
│   ├── css/
│   │   └── style.css     # Full design system + all component styles
│   └── js/
│       └── main.js       # Header state, mobile nav, scroll reveal,
│                         #   FAQ accordion/tabs/search, contact form, footer year
├── robots.txt            # Crawler directives
├── sitemap.xml           # XML sitemap
├── _headers              # Security headers for Netlify / Cloudflare Pages
├── .htaccess             # Equivalent security headers + HTTPS redirect for Apache
└── .nojekyll             # Serve files as-is on GitHub Pages (skip Jekyll)
```

## Running locally

It's a static site — open `index.html` directly, or serve the folder:

```bash
python -m http.server 8080
```

Then visit http://localhost:8080.

## Deploying

Publish the repository root as-is to any static host:

- **GitHub Pages** — Settings → Pages → deploy from branch, root folder.
  `.nojekyll` is included so `assets/` is served untouched.
- **Netlify / Cloudflare Pages** — no build command; publish directory is `.`.
  `_headers` is picked up automatically.
- **Apache / shared hosting** — upload the folder; `.htaccess` applies the
  security headers and forces HTTPS.

## Notes

- The contact form is a front-end demo only (`main.js` intercepts submit and
  shows a confirmation) — wire it to a real endpoint before production use.
- Phone numbers, addresses, company number and reviews are placeholder content.
