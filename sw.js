/* No Sparks Code Corrections — Service Worker v1.0 */
const CACHE = 'nosparks-v1';
const ASSETS = [
  './',
  './index.html',
  './voltguard/logo.png',
  './voltguard/manifest.json',
  './voltguard/icons/icon-192x192.png',
  './voltguard/icons/icon-512x512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
