/**
 * Saffron & Spice — Service Worker
 * Strategy: Cache First for assets, Network First for HTML pages
 * Version bump the CACHE_NAME to force cache refresh on deploy
 */

const CACHE_NAME = 'saffron-spice-v1.0.0';
const STATIC_CACHE = 'saffron-static-v1.0.0';
const IMAGE_CACHE  = 'saffron-images-v1.0.0';

// Core assets to pre-cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/manifest.json',
  '/pages/about.html',
  '/pages/menu.html',
  '/pages/gallery.html',
  '/pages/reservation.html',
  '/pages/contact.html',
  '/404.html'
];

// ── INSTALL: pre-cache core assets ──
self.addEventListener('install', event => {
  console.log('[SW] Installing…');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Pre-caching core assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch(err => console.warn('[SW] Pre-cache failed:', err))
  );
});

// ── ACTIVATE: clean up old caches ──
self.addEventListener('activate', event => {
  console.log('[SW] Activating…');
  const VALID_CACHES = [CACHE_NAME, STATIC_CACHE, IMAGE_CACHE];
  event.waitUntil(
    caches.keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .filter(name => !VALID_CACHES.includes(name))
            .map(name => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        )
      )
      .then(() => self.clients.claim())
  );
});

// ── FETCH: routing strategy ──
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin (except Google Fonts & Unsplash)
  if (request.method !== 'GET') return;
  if (!url.origin.includes(self.location.origin) &&
      !url.origin.includes('fonts.googleapis.com') &&
      !url.origin.includes('fonts.gstatic.com') &&
      !url.origin.includes('images.unsplash.com')) return;

  // Images: Cache First with long TTL
  if (
    request.destination === 'image' ||
    url.origin.includes('images.unsplash.com') ||
    url.origin.includes('i.pravatar.cc')
  ) {
    event.respondWith(cacheFirstImage(request));
    return;
  }

  // Fonts: Cache First (they never change)
  if (
    url.origin.includes('fonts.googleapis.com') ||
    url.origin.includes('fonts.gstatic.com')
  ) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // CSS & JS: Cache First (versioned via cache name)
  if (request.destination === 'style' || request.destination === 'script') {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // HTML pages: Network First, fall back to cache, then 404
  if (request.destination === 'document' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Default: Stale-While-Revalidate
  event.respondWith(staleWhileRevalidate(request));
});

// ── STRATEGIES ──

async function cacheFirst(request, cacheName = CACHE_NAME) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline — asset not cached', { status: 503 });
  }
}

async function cacheFirstImage(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(IMAGE_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Return a 1×1 transparent placeholder SVG when offline
    return new Response(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>`,
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    // Return offline 404 page
    const offline = await caches.match('/404.html');
    return offline || new Response('<h1>You are offline</h1>', {
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => cached);
  return cached || fetchPromise;
}

// ── BACKGROUND SYNC (reservation forms) ──
self.addEventListener('sync', event => {
  if (event.tag === 'sync-reservation') {
    event.waitUntil(syncReservations());
  }
});

async function syncReservations() {
  console.log('[SW] Syncing pending reservations…');
  // In production: read from IndexedDB and POST to backend
}

// ── PUSH NOTIFICATIONS (optional) ──
self.addEventListener('push', event => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title || 'Saffron & Spice', {
      body: data.body || 'A message from Saffron & Spice',
      icon: '/images/icon-192.png',
      badge: '/images/icon-72.png',
      tag: 'saffron-spice-notification',
      data: { url: data.url || '/' }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

console.log('[SW] Service Worker loaded — Saffron & Spice v1.0.0');
