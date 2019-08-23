const cacheName = 'V1';
const cacheAssets = [
    'index.html',
    'css/style.css',
    'js/main.js'
];

// Call install event.
self.addEventListener('install', e => {
    console.log('Service worker: Installed.');
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('Service worker: Caching Files.');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
});

// Call active event.
self.addEventListener('activate', e => {
    console.log('Service worker: Activated.');
    // Remove unwanted caches.
    e.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cache =>{
                    if (cache !== cacheName){
                        console.log('Service worker: Clearing old caches.');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Call fetch event.
self.addEventListener('fetch', e =>{
    console.log('Service worker: Fetching cahed files.');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});