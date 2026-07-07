const CACHE_NAME = 'backbond-shell-v1';
const SHELL_ASSETS = ['./index.html'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

// Only ever touches same-origin GET requests for the app shell itself.
// Everything else — Supabase API calls, the Supabase JS CDN script, Google
// Fonts — goes straight to the network, untouched. This app's entire
// purpose depends on live, real-time data, so nothing real should ever be
// served from a stale cache; this only makes the shell itself load fast
// and gives a graceful fallback if the network briefly drops.
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => {
      const networkFetch = fetch(event.request).then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => cached);
      return cached || networkFetch;
    })
  );
});
