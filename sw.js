const CACHE_NAME = 'camera-aspect-v1';
const ASSETS_TO_CACHE = [
  '/camera-aspect/',
  '/camera-aspect/index.html',
  '/camera-aspect/manifest.json',
  '/camera-aspect/icon-192.png',
  '/camera-aspect/icon-512.png',
  '/camera-aspect/icon-maskable-192.png',
  '/camera-aspect/icon-maskable-512.png'
];

// Установка Service Worker: кэшируем основные файлы
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Кэширование ресурсов');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Активация Service Worker: удаляем старые кэши
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Перехват запросов: сначала кэш, потом сеть
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then(fetchResponse => {
        // Кэшируем только GET-запросы
        if (event.request.method === 'GET' && fetchResponse.status === 200) {
          const responseClone = fetchResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return fetchResponse;
      });
    }).catch(() => {
      // Если сеть недоступна и ресурса нет в кэше
      return new Response('Офлайн: ресурс недоступен', {
        status: 503,
        statusText: 'Service Unavailable'
      });
    })
  );
});
