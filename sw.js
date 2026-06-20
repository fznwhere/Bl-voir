const CACHE_NAME = 'bluvoir-v2';
const urlsToCache = ['./', './index.html', './manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

// Strategi: Jaringan dulu, kalau offline baru pakai Cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).then(response => {
        const resClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
        return response;
    }).catch(() => caches.match(event.request))
  );
});
