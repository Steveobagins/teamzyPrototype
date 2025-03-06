// service-worker.js

const CACHE_NAME = 'my-teamzy-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/scripts/app.js',
  '/scripts/api.js', // Add other script files
  '/scripts/auth.js',
  '/scripts/config.js',
  '/scripts/router.js',
  '/scripts/state.js',
  '/scripts/components/button.js',
  '/scripts/components/card.js',
  '/scripts/components/navigation.js',
  '/scripts/views/dashboard.js',
    '/scripts/views/events.js',
    '/scripts/views/login.js',
    '/scripts/views/profile.js',
    '/scripts/views/register.js',
    '/scripts/views/payments.js',
     '/scripts/views/chat.js',
    '/manifest.json',
    '/scripts/pwa.js'
	'/scripts/components/eventListItem.js',
'/scripts/components/notificationItem.js',
  // Add other assets (images, fonts, etc.) that you want to cache
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      })
  );
});