const CACHE_NAME = 'backbond-shell-v2';
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
// Fonts — goes straight to the network, untouched.
//
// NETWORK-FIRST, not cache-first. The original version tried the cache
// first and only updated it in the background — meaning a real fix could
// ship to the server and a browser would keep silently running the old
// cached JS for a while afterward. That's exactly backwards for an app
// under active development. Now: always try the network first, and only
// fall back to the cache if the network genuinely fails (offline) — so a
// real update is always seen immediately when online, and the cache only
// ever serves as an offline safety net, not a routine shortcut.
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }
  event.respondWith(
    fetch(event.request).then(response => {
      const clone = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
      return response;
    }).catch(() => caches.match(event.request))
  );
});
