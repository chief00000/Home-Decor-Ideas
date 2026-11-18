/* Home Decor Ideas service worker.
   Cache only same-origin public app files; never cache user data or third-party images. */
'use strict';
const CACHE_NAME = 'hdi-shell-v6';
const APP_SHELL = [
  './', './index.html', './style.css', './enhancements.css',
  './script.js', './engagement.js', './i18n.js', './theme.js', './manifest.json',
  './offline.html', './404.html', './robots.txt',
  './icons/icon-192.png', './icons/icon-512.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys
    .filter(key => key.startsWith('hdi-shell-') && key !== CACHE_NAME).map(key => caches.delete(key))))
    .then(() => self.clients.claim()));
});
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try { return await fetch(request); }
      catch {
        const cachedHome = await caches.match('./index.html');
        return cachedHome || (await caches.match('./offline.html')) || Response.error();
      }
    })());
    return;
  }
  if (/\.(?:css|js|json|png|svg|webp|avif|woff2?)$/i.test(url.pathname)) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response && response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
        }
        return response;
      } catch { return Response.error(); }
    })());
  }
});
