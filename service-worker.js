const CACHE_NAME = 'core-builder-v1';

const urlsToCache = [
  'index.html',
  'manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache and cached core files');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
