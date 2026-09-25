const CACHE='sutra-geo-v6';

const ASSETS=[
  './',
  './index.html',
  './explore.html',
  './food.html',
  './events.html',
  './map.html',
  './quest.html',
  './passport.html',
  './profile.html',
  './scrapbook.html',
  './living.html',
  './ai.html',
  './community.html',
  './ar.html',
  './impact.html',
  './store.html',
  './planner.html',
  './style.css',
  './js/app.js',
  './js/data.js',
  './js/expandedData.js',
  './js/heritageExpansion.js',
  './js/heritageData.js',
  './js/media.js',
  './js/profile.js',
  './js/passport.js',
  './js/scrapbook.js',
  './js/community.js',
  './js/impact.js',
  './js/living.js',
  './js/geofence.js',
  './js/ar.js',
  './js/ai.js',
  './js/badges.js',
  './js/leaderboard.js',
  './js/inquiry.js',
  './js/offline.js',
  './config.example.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key.startsWith('sutra-geo-') && key !== CACHE)
            .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const isHTML =
    e.request.mode === 'navigate' ||
    e.request.destination === 'document' ||
    e.request.url.endsWith('.html');

  if (isHTML) {
    e.respondWith(
      fetch(e.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, copy));
          return response;
        })
        .catch(() =>
          caches.match(e.request)
            .then(cached => cached || caches.match('./index.html'))
        )
    );
    return;
  }

  e.respondWith(
    caches.match(e.request)
      .then(cached => {
        if (cached) return cached;

        return fetch(e.request).then(response => {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, copy));
          return response;
        });
      })
      .catch(() => caches.match('./index.html'))
  );
});
