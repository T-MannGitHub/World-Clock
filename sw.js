const CACHE_NAME = 'world-clock-cache-v1';
const URLS = ['/', '/index.html', '/styles.css', '/main.js', '/clock.js', '/city.js'];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(URLS)));
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(resp => resp || fetch(event.request)));
});
