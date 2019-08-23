// Make sure SW is supported.

if('serviceWorker' in navigator){
    console.log('Service worker: supported.')
    window.addEventListener('load', () => {
        navigator.serviceWorker
        .register('../sw_cached_site.js')
        .then(reg => console.log('Service worker: Registered.'))
        .catch(err => console.log('Service worker: Error: ${err}'));
    });
}