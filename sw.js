const CACHE = 'mi-world-cup-2026-v21';
const FILES = ['./', './index.html', './manifest.webmanifest', './assets/logoblancotransparente.png', './assets/icon-192.png', './assets/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting(); // toma control inmediato sin esperar a cerrar la app
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim()) // controla todas las pestañas/apps abiertas ya
  );
});

self.addEventListener('fetch', e =>
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)))
);
