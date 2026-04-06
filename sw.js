const cacheName = 'epi-master-v7.9.4';
const assets = [
  './index.html',
  './manifest.json',
  'https://cdn-icons-png.flaticon.com/512/1063/1063303.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});