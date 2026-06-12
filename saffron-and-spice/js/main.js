/* ============================================================
   SAFFRON & SPICE — Main JavaScript
   ============================================================ */

'use strict';

// ── PAGE LOADER ──
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) loader.classList.add('hidden');
  }, 1800);
});

// ── DARK MODE ──
const themeBtn    = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const savedTheme  = localStorage.getItem('theme') || 'light';

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  if (themeIcon) {
    themeIcon.innerHTML = t === 'dark'
      ? `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
      : `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;
  }
}
applyTheme(savedTheme);
if (themeBtn) themeBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ── STICKY NAV ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
  // Back-to-top
  const fab = document.getElementById('fab-top');
  if (fab) fab.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

// ── MOBILE MENU ──
const hamburger  = document.getElementById('hamburger');
const navMobile  = document.getElementById('nav-mobile');
const mobileLinks = navMobile ? navMobile.querySelectorAll('a') : [];

if (hamburger && navMobile) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navMobile.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileLinks.forEach(link => link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMobile.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

// ── ACTIVE NAV LINK ──
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function setActiveLink() {
  let active = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) active = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${active}`);
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Staggered delay for siblings
      const siblings = entry.target.parentElement
        ? [...entry.target.parentElement.querySelectorAll('.reveal,.reveal-left,.reveal-right')]
        : [];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, Math.min(idx * 80, 400));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ── COUNTER ANIMATION ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target || el.textContent, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObserver.observe(el));

// ── MENU TABS ──
const menuTabs    = document.querySelectorAll('.menu-tab');
const menuSections = document.querySelectorAll('.menu-category');

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    menuTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    menuSections.forEach(sec => {
      const show = sec.dataset.category === target;
      sec.style.display = show ? 'grid' : 'none';
      if (show) {
        sec.querySelectorAll('.menu-item').forEach((item, i) => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(16px)';
          setTimeout(() => {
            item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            item.style.opacity = '1';
            item.style.transform = 'none';
          }, i * 60);
        });
      }
    });
  });
});

// ── GALLERY LIGHTBOX ──
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const galleryItems  = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img').src;
    if (lightboxImg) lightboxImg.src = src;
    if (lightbox)   lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});
function closeLightbox() {
  if (lightbox) lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ── RESERVATION FORM ──
const resForm = document.getElementById('reservation-form');
if (resForm) {
  resForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = resForm.querySelector('.form-submit');
    const orig = btn.textContent;
    btn.textContent = 'Confirming…'; btn.disabled = true;

    setTimeout(() => {
      resForm.style.display = 'none';
      const success = document.getElementById('reservation-success');
      if (success) success.style.display = 'block';
    }, 1400);
  });
}

// ── CONTACT FORM ──
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    btn.textContent = 'Sending…'; btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#2D6A4F';
      contactForm.reset();
      setTimeout(() => { btn.textContent = 'Send Message'; btn.disabled = false; btn.style.background = ''; }, 3000);
    }, 1200);
  });
}

// ── NEWSLETTER ──
const newsForm = document.getElementById('newsletter-form');
if (newsForm) {
  newsForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = newsForm.querySelector('.newsletter-btn');
    btn.textContent = '✓ Subscribed!';
    btn.style.background = '#2D6A4F';
    newsForm.querySelector('.newsletter-input').value = '';
    setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; }, 3000);
  });
}

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── BACK TO TOP ──
const fabTop = document.getElementById('fab-top');
if (fabTop) fabTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── PARALLAX HERO ──
window.addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) heroBg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.25}px)`;
}, { passive: true });

// ── SMOOTH ANCHOR SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── MENU SEARCH ──
const menuSearch = document.getElementById('menu-search');
if (menuSearch) {
  menuSearch.addEventListener('input', () => {
    const q = menuSearch.value.toLowerCase().trim();
    document.querySelectorAll('.menu-item').forEach(item => {
      const name = item.querySelector('.menu-item-name')?.textContent.toLowerCase() || '';
      const desc = item.querySelector('.menu-item-desc')?.textContent.toLowerCase() || '';
      item.style.display = (!q || name.includes(q) || desc.includes(q)) ? 'flex' : 'none';
    });
    if (q) {
      document.querySelectorAll('.menu-category').forEach(c => c.style.display = 'grid');
      document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    }
  });
}

// ── DATE PICKER MIN DATE ──
const dateInput = document.getElementById('res-date');
if (dateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

console.log('%cSaffron & Spice 🍽️', 'color: #C9963A; font-size: 20px; font-weight: bold;');
console.log('%cPremium restaurant website ready.', 'color: #6B5B48;');
