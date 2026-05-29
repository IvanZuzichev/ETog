const CACHE_NAME = 'etog-pwa-v3';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/assets/logo/Logo-Normal.png',
  'https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap',
  'https://fonts.gstatic.com/s/onest/v6/92zJtBJp3aJ_AVvY6D8.ttf'
];

// Установка - кэшируем статические ресурсы
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return Promise.all(
          STATIC_ASSETS.map(url => {
            return cache.add(url).catch(err => {
              console.log(`[SW] Failed to cache ${url}:`, err);
            });
          })
        );
      })
      .then(() => {
        console.log('[SW] Installation complete');
        return self.skipWaiting();
      })
  );
});

// Активация - очистка старых кэшей
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Activation complete');
      return self.clients.claim();
    })
  );
});

// Обработка запросов
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Пропускаем не-GET запросы
  if (request.method !== 'GET') return;
  
  // Для навигационных запросов (главная страница)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Кэшируем HTML
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(request, responseClone));
          return response;
        })
        .catch(() => {
          // Офлайн: возвращаем закэшированную главную
          return caches.match('/')
            .then(cachedResponse => {
              return cachedResponse || caches.match('/index.html');
            });
        })
    );
    return;
  }

  // Для остальных запросов
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        // Если есть в кэше - возвращаем
        if (cachedResponse) {
          return cachedResponse;
        }

        // Делаем сетевой запрос
        return fetch(request)
          .then(networkResponse => {
            // Кэшируем успешные ответы
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(request, responseClone));
            }
            return networkResponse;
          })
          .catch(error => {
            console.log('[SW] Fetch failed:', error);
            // Fallback для изображений
            if (request.destination === 'image') {
              return caches.match('/src/assets/logo/Logo-Normal.png');
            }
            // Fallback для CSS/JS
            return new Response('Offline content not available', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});