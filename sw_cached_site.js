const cacheName = 'V3';

// Call install event.
self.addEventListener('install', e => {
    console.log('Service worker: Installed.');
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
    e.respondWith(
        fetch(e.request)
        .then(res =>{
            // Make clone of response.
            const resClone = res.clone();
            // Open cache.
            caches
            .open(cacheName)
            .then(cache => {
                // Add response to cache.
                cache.put(e.request, resClone);
            });
            return res;
        }).catch(err => caches.match(e.requet).then(res => res))
    );
});