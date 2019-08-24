const cacheName = 'Cached-V1';
const cacheAssets = [
    "/",
    "assets/icons/face.png",
    "css/animate.css",
    "css/colors.css",
    "css/font-awesome.min.css",
    "css/icons/left.png",
    "css/icons/playpause.png",
    "css/icons/right.png",
    "css/icons/swatches/255,255,255,40.png",
    "css/lightgallery.css",
    "css/mCSB_buttons.png",
    "css/media.css",
    "css/nerveslider.css",
    "css/normalize.css",
    "css/scrollbar.css",
    "css/style.css",
    "css/tooltipster.css",
    "fonts/fontawesome-webfont-24232.woff2",
    "fonts/raleway-bold-webfont.woff",
    "fonts/raleway-regular-webfont.woff",
    "images/loading.gif",
    "images/photos/img.jpg",
    "images/photos/img2.jpg",
    "images/photos/img3-small.jpg",
    "images/photos/img3.jpg",
    "images/photos/img4-small.jpg",
    "images/photos/img4.jpg",
    "images/photos/img5-small.jpg",
    "images/photos/img5.jpg",
    "images/photos/p-6.jpg",
    "images/photos/p1-thumb.jpg",
    "images/photos/p2-thumb.jpg",
    "images/photos/p3-thumb.jpg",
    "images/photos/p4-thumb.jpg",
    "images/photos/p5-thumb.jpg",
    "index.html",
    "js/backstretch.min.js",
    "js/galleries.js",
    "js/googlemap.js",
    "js/home-custom.js",
    "js/jquery-1.11.3.min.js",
    "js/jquery-ui-custom.min.js",
    "js/jquery.ascensor.min.js",
    "js/jquery.tooltipster.min.js",
    "js/lightgallery.js",
    "js/main.js",
    "js/nerveslider.min.js",
    "js/portfolio-trigger.js",
    "js/quovolver.js"
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