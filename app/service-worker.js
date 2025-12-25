// GroundUp Service Worker - For Offline Support

const CACHE_NAME = 'groundup-v1';
const STATIC_CACHE_NAME = 'groundup-static-v1';

// Files to cache for offline use
const STATIC_ASSETS = [
    '/app/',
    '/app/index.html',
    '/app/app.js',
    '/app/styles.css',
    '/app/manifest.json',
    '/README.md',
    '/docs/README.md',
    'https://cdn.jsdelivr.net/npm/marked/marked.min.js'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' })));
            })
            .then(() => self.skipWaiting())
            .catch(err => console.error('Service Worker: Cache failed:', err))
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(name => name !== STATIC_CACHE_NAME && name !== CACHE_NAME)
                        .map(name => {
                            console.log('Service Worker: Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin) &&
        !event.request.url.startsWith('https://cdn.jsdelivr.net')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                // Return cached version if available
                if (cachedResponse) {
                    console.log('Service Worker: Serving from cache:', event.request.url);
                    return cachedResponse;
                }

                // Otherwise fetch from network
                return fetch(event.request)
                    .then(response => {
                        // Don't cache if not successful
                        if (!response || response.status !== 200 || response.type === 'error') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        // Cache markdown files and static assets
                        if (event.request.url.endsWith('.md') ||
                            event.request.url.includes('/app/') ||
                            event.request.url.includes('cdn.jsdelivr.net')) {
                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    console.log('Service Worker: Caching new resource:', event.request.url);
                                    cache.put(event.request, responseToCache);
                                });
                        }

                        return response;
                    })
                    .catch(err => {
                        console.error('Service Worker: Fetch failed:', err);
                        // Return offline page if available
                        return caches.match('/app/index.html');
                    });
            })
    );
});

// Message event - for manual cache updates
self.addEventListener('message', (event) => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }

    if (event.data.action === 'clearCache') {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(name => caches.delete(name))
                );
            })
        );
    }
});
