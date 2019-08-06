importScripts('./workbox-sw.js');

workbox.routing.registerRoute(
    /\.js$/,
    new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
    // Cache CSS files.
    /\.css$/,
    // Use cache but update in the background.
    new workbox.strategies.StaleWhileRevalidate({
        // Use a custom cache name.
        cacheName: 'css-cache',
    })
);

workbox.routing.registerRoute(
    // Cache image files.
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    // Use the cache if it's available.
    new workbox.strategies.CacheFirst({
        // Use a custom cache name.
        cacheName: 'image-cache',
        plugins: [
            new workbox.expiration.Plugin({
                // Cache only 20 images.
                maxEntries: 20,
                // Cache for a maximum of a week.
                maxAgeSeconds: 7 * 24 * 60 * 60,
            })
        ],
    })
);
// 'use strict';

// const PREFIX = 'dragball';
// const HASH = '20190802';
// const OFFLINE_CACHE = `${PREFIX}-${HASH}`;

// self.addEventListener('install', function (event) {
//     event.waitUntil(
//         caches.open(OFFLINE_CACHE).then(function (cache) {
//             return cache.addAll([
//                 '/',
//                 '/favicon.ico',
//                 '/stylesheets/normalize.css',
//                 '/stylesheets/stylesheet.css',
//                 '/stylesheets/github-light.css',
//                 // '/fonts/permanent-marker.woff',
//                 // '/fonts/permanent-marker.woff2',
//                 '/images/icon-228x228.png',
//                 '/images/icon.svg'
//             ]);
//         })
//     );
// });

// self.addEventListener('activate', function (event) {
//     // Delete old asset caches.
//     event.waitUntil(
//         caches.keys().then(function (keys) {
//             return Promise.all(
//                 keys.map(function (key) {
//                     if (
//                         key != OFFLINE_CACHE &&
//                         key.startsWith(`${PREFIX}-`)
//                     ) {
//                         return caches.delete(key);
//                     }
//                 })
//             );
//         })
//     );
// });

// self.addEventListener('fetch', function (event) {
//     if (event.request.mode == 'navigate') {
//         console.log('Handling fetch event for', event.request.url);
//         console.log(event.request);
//         event.respondWith(
//             fetch(event.request).catch(function (exception) {
//                 // The `catch` is only triggered if `fetch()` throws an exception,
//                 // which most likely happens due to the server being unreachable.
//                 console.error(
//                     'Fetch failed; returning offline page instead.',
//                     exception
//                 );
//                 return caches.open(OFFLINE_CACHE).then(function (cache) {
//                     return cache.match('/');
//                 });
//             })
//         );
//     } else {
//         // It’s not a request for an HTML document, but rather for a CSS or SVG
//         // file or whatever…
//         event.respondWith(
//             caches.match(event.request).then(function (response) {
//                 return response || fetch(event.request);
//             })
//         );
//     }

// });
