# 🍽️ Saffron & Spice — Premium Restaurant Website

> A production-ready, fully responsive restaurant website built with HTML5, CSS3 and Vanilla JavaScript.  
> Estimated commercial value: ₹15,000 – ₹50,000

---

## 📁 Folder Structure

```
saffron-and-spice/
│
├── index.html              ← Homepage (Hero, Dishes, Story, Menu Preview, Stats,
│                              Testimonials, Gallery, Reservation, FAQ, Contact, Newsletter)
│
├── pages/
│   ├── about.html          ← Our Story, Mission/Vision, Chef, Team, Awards, Timeline
│   ├── menu.html           ← Full menu with search, filters, all categories + combos
│   ├── gallery.html        ← Masonry gallery with category filter + lightbox
│   ├── reservation.html    ← Dedicated booking page with full form + policies
│   └── contact.html        ← Map, hours, directions, social links + contact form
│
├── css/
│   └── style.css           ← Complete design system (tokens, animations, all components)
│
├── js/
│   └── main.js             ← All interactivity (dark mode, nav, scroll reveal, counter,
│                              menu tabs, lightbox, forms, FAQ, parallax, search)
│
├── images/                 ← Place local images here (currently using Unsplash CDN)
│
├── sitemap.xml             ← XML sitemap for Google Search Console
├── robots.txt              ← Crawler instructions
├── .htaccess               ← Apache: HTTPS redirect, caching, GZIP, security headers
├── 404.html                ← Custom 404 error page
└── README.md               ← This file
```

---

## ✨ Features Implemented

### Design & UI
- [x] Glassmorphism effects on forms and overlays
- [x] Smooth scroll-reveal animations (fade up, slide left/right)
- [x] Parallax hero background
- [x] CSS counter animations on stats
- [x] Hover transitions on all cards, images, buttons
- [x] Dark mode (toggle + localStorage persistence)
- [x] Mobile-first responsive design
- [x] Sticky navigation with scroll detection
- [x] Premium typography: Playfair Display SC + Karla (Google Fonts)
- [x] Gold/charcoal/cream luxury colour palette

### Pages (6 total)
- [x] Homepage with 10 sections
- [x] About Us — story, chef, team, awards, timeline
- [x] Full Menu — search, category filters, veg/non-veg indicators
- [x] Gallery — masonry layout, category filter, lightbox
- [x] Reservation — dedicated booking form with validation
- [x] Contact — map embed, hours, directions, social links

### Functionality
- [x] Online reservation form with success state
- [x] Menu search (live filter)
- [x] Menu category tabs + filter pills
- [x] Gallery category filter
- [x] Lightbox image viewer (keyboard + click to close)
- [x] FAQ accordion
- [x] Newsletter subscription form
- [x] Contact form
- [x] WhatsApp floating button (deep link with pre-filled message)
- [x] Back-to-top button
- [x] Page loader animation
- [x] Mobile hamburger menu

### SEO
- [x] Meta title, description, keywords on every page
- [x] Open Graph tags (Facebook / WhatsApp previews)
- [x] Twitter Card tags
- [x] Schema.org JSON-LD structured data (Restaurant type)
- [x] Canonical URLs
- [x] XML sitemap
- [x] robots.txt
- [x] Semantic HTML5 (nav, main, section, article, footer, aria labels)
- [x] Image alt attributes throughout

### Performance
- [x] Lazy loading images (`loading="lazy"`)
- [x] Google Fonts with display=swap
- [x] IntersectionObserver for reveal animations (no layout thrash)
- [x] Passive scroll event listeners
- [x] CSS variables for instant theme switching
- [x] .htaccess: GZIP, browser caching, cache-control headers
- [x] No JavaScript frameworks (pure vanilla — fast load)

---

## 🚀 Deployment Instructions

### Option 1 — Netlify (Recommended, Free)

1. Go to [netlify.com](https://netlify.com) and sign up / log in
2. Click **"Add new site" → "Deploy manually"**
3. Drag and drop the entire `saffron-and-spice/` folder onto the deploy area
4. Your site is live instantly at a `.netlify.app` URL
5. To use a custom domain: **Site Settings → Domain Management → Add custom domain**

> ✅ Netlify automatically handles HTTPS — the `.htaccess` HTTPS redirect will work once you add a real domain.

---

### Option 2 — GitHub Pages (Free)

```bash
# Step 1: Initialise git
cd saffron-and-spice
git init
git add .
git commit -m "Initial commit — Saffron & Spice website"

# Step 2: Create repo on GitHub (github.com → New repository)
# Name it: saffron-and-spice

# Step 3: Push
git remote add origin https://github.com/YOUR_USERNAME/saffron-and-spice.git
git branch -M main
git push -u origin main

# Step 4: Enable Pages
# GitHub → repo → Settings → Pages → Source: Deploy from branch → main → / (root) → Save
# Site will be live at: https://YOUR_USERNAME.github.io/saffron-and-spice/
```

> ⚠️ Note: GitHub Pages doesn't support `.htaccess`. HTTPS is handled automatically.

---

### Option 3 — cPanel Shared Hosting

1. Log into your hosting cPanel
2. Open **File Manager** → navigate to `public_html/`
3. Upload all files (maintaining folder structure)
4. Make sure `.htaccess` is uploaded (it may be hidden — enable "Show Hidden Files")
5. Point your domain's DNS to the hosting nameservers
6. Enable SSL via **cPanel → SSL/TLS → Let's Encrypt** (free)

---

### Option 4 — Vercel

```bash
npm install -g vercel
cd saffron-and-spice
vercel
# Follow the prompts — site deploys in ~30 seconds
```

---

## ⚙️ Customisation Guide

### 🔤 Change Restaurant Name / Branding
Search and replace `Saffron &amp; Spice` and `Saffron & Spice` across all HTML files.

### 🎨 Change Colours
Edit CSS variables at the top of `css/style.css`:
```css
:root {
  --gold:       #C9963A;   /* Primary brand colour */
  --charcoal:   #1A1410;   /* Dark background */
  --cream:      #F9F4ED;   /* Light background */
}
```

### 📍 Change Address / Phone / Map
1. Update the address text in `index.html`, `pages/contact.html`, `pages/reservation.html`
2. Replace the Google Maps embed `src` URL in `index.html` and `pages/contact.html`
   - Go to [maps.google.com](https://maps.google.com) → search your address → Share → Embed a map → copy iframe src
3. Replace WhatsApp number: search `919900000000` → replace with your number (country code + number, no spaces/+)

### 📸 Use Local Images (instead of Unsplash)
Replace Unsplash URLs with local paths:
```html
<!-- Before -->
<img src="https://images.unsplash.com/photo-xxx?w=600" alt="..."/>

<!-- After -->
<img src="../images/butter-chicken.jpg" alt="..."/>
```
Place images in the `/images/` folder.

### 🍽️ Update Menu Items
In `pages/menu.html` and the menu section of `index.html`, find `.menu-full-item` blocks and update:
- `data-name` and `data-desc` attributes (used for search)
- Item name, description, price
- Image `src`
- Veg/non-veg indicator (`.menu-item-veg` or `.menu-item-nonveg`)

### 📊 Update Stats
In `index.html`, find `.stat-num` elements:
```html
<div class="stat-num" data-target="24000" data-suffix="+">24000+</div>
```
Change `data-target` to your actual number.

### 🌐 Update SEO Meta Tags
In each HTML file's `<head>`, update:
```html
<meta name="description" content="YOUR DESCRIPTION"/>
<meta name="keywords" content="YOUR KEYWORDS"/>
<meta property="og:title" content="YOUR TITLE"/>
```

### 📬 Connect a Real Form Backend
The forms currently show a success state on submit (frontend only).
To receive real submissions, replace the form submit handler in `js/main.js` with one of:
- **Formspree**: `action="https://formspree.io/f/YOUR_ID"` on the `<form>` tag
- **Netlify Forms**: Add `netlify` attribute to `<form>` (auto-detected on Netlify)
- **EmailJS**: Free JS library, no backend needed
- **Firebase**: For a full backend with database storage

---

## 🔍 Google Search Console Setup

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → enter your domain
3. Verify ownership (HTML file method or DNS TXT record)
4. Submit sitemap: **Sitemaps → Add sitemap → `sitemap.xml`**
5. Request indexing for homepage and key pages

---

## 📱 PWA Upgrade (Optional)

To make the site installable as an app, add to `index.html` `<head>`:
```html
<link rel="manifest" href="/manifest.json"/>
<meta name="theme-color" content="#C9963A"/>
```

Create `manifest.json`:
```json
{
  "name": "Saffron & Spice",
  "short_name": "Saffron & Spice",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1A1410",
  "theme_color": "#C9963A",
  "icons": [{ "src": "/images/icon-192.png", "sizes": "192x192", "type": "image/png" }]
}
```

---

## 📋 Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile Chrome | ✅ Full |
| Mobile Safari | ✅ Full |

---

## 🏆 Lighthouse Score Targets

| Metric | Target |
|--------|--------|
| Performance | 90+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 100 |

> Run audit: Chrome DevTools → Lighthouse tab → Analyse page load

---

## 📄 License & Usage

Built as a commercial portfolio/client project template.  
Images are sourced from [Unsplash](https://unsplash.com) (free for commercial use).  
Replace with your own restaurant's photography for live client delivery.

---

*Built with ❤️ using HTML5 · CSS3 · Vanilla JavaScript*  
*No frameworks. No dependencies. Just clean, fast, premium code.*
