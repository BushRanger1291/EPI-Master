const cacheName = 'epi-master-v1';
const assets = [
  './index.html',
  './manifest.json',
  'https://cdn-icons-png.flaticon.com/512/785/785116.png'
];

// Installation : mise en cache des ressources
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Nettoyage des anciens caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(key => key !== cacheName).map(key => caches.delete(key)));
    })
  );
});

// Stratégie Cache-first : on cherche dans le cache, sinon on va sur le réseau
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});