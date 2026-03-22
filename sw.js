// ── Service Worker - MS Partners Manager ──────────────────────────────────────
const CACHE_NAME = 'ms-partners-v1';
const CACHE_URLS = [
  './',
  './index.html',
  './ResellersApp.jsx',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  // CDN assets (cached on first load)
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js',
];

// ── Install: pre-cache all assets ─────────────────────────────────────────────
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching app shell');
        // Cache local files strictly, CDN files with fallback
        const localFiles = CACHE_URLS.filter(u => u.startsWith('./') || u.startsWith('/'));
        const cdnFiles   = CACHE_URLS.filter(u => u.startsWith('http'));

        return Promise.all([
          cache.addAll(localFiles),
          ...cdnFiles.map(url =>
            fetch(url)
              .then(res => cache.put(url, res))
              .catch(() => console.warn('[SW] Could not cache:', url))
          )
        ]);
      })
      .then(() => self.skipWaiting())
  );
});

// ── Activate: clean old caches ────────────────────────────────────────────────
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first strategy ───────────────────────────────────────────────
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip cross-origin requests that aren't CDN assets
  const url = new URL(event.request.url);
  const isCDN = url.hostname === 'cdnjs.cloudflare.com';
  const isLocal = url.origin === self.location.origin;

  if (!isLocal && !isCDN) return;

  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) {
          // Return cached, then update in background (stale-while-revalidate)
          const fetchPromise = fetch(event.request)
            .then(fresh => {
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, fresh.clone()));
              return fresh;
            })
            .catch(() => {/* offline - cached version already returned */});

          return cached;
        }

        // Not in cache — fetch from network
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }
            const toCache = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
            return response;
          })
          .catch(() => {
            // Offline fallback for HTML navigation
            if (event.request.destination === 'document') {
              return caches.match('./index.html');
            }
          });
      })
  );
});

// ── Background sync placeholder ───────────────────────────────────────────────
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
