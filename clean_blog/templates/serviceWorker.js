importScripts("/static/webpack_bundles/precache-manifest.65814227c2b18a7a4935ee3c2351d3e9.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

self.addEventListener('install', e => {
    e.waitUntil(
       caches.open('root').then(cache => {
           return cache.addAll([
               '/',
               '/?utm_source=home_screen&utm_campaign=VisitFrom-home_screen&utm_medium=pwa'
           ]).then(() => self.skipWaiting());
       })
     )
});
self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});
// -------------------------------------------------------
// runtime cache の定義
// -------------------------------
workbox.routing.registerRoute(/(^\/$|^\/\?utm_source.+$)/, workbox.strategies.networkFirst({
    cacheName: 'root',
    plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 10,
          maxEntries: 10,
        }),
    ],
}), 'GET');
workbox.routing.registerRoute(/^\/\?page=.+$/, workbox.strategies.networkFirst({
    cacheName: 'pages',
    plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 10,
          maxEntries: 10,
        }),
    ],
}), 'GET');
workbox.routing.registerRoute(/^\/search\/\?q=.*$/, workbox.strategies.networkFirst({
    cacheName: 'search',
    plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 10,
          maxEntries: 10,
        }),
    ],
}), 'GET');
workbox.routing.registerRoute(/^\/blog\/category\/.+$/, workbox.strategies.networkFirst({
    cacheName: 'category',
    plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 10,
          maxEntries: 10,
        }),
    ],
}), 'GET');
workbox.routing.registerRoute(/^\/blog\/.+$/, workbox.strategies.cacheFirst({
    cacheName: 'entry',
    plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 30,
          maxEntries: 30,
        }),
    ],
}), 'GET');
workbox.routing.registerRoute(/^\/about\/$/, workbox.strategies.cacheFirst({
    cacheName: 'about',
    plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 30,
          maxEntries: 1,
        }),
    ],
}), 'GET');

const sendMessageToAllClients = function(msg) {
    clients.matchAll({includeUncontrolled: true, type: 'window'}).then(function(clients) {
        clients.forEach((client) => {
            sendMessageToClient(client, msg).then((m) => console.log('SW Received Message: '+ m));
        });
    });
};

const sendMessageToClient = function(client, message) {
    return new Promise(function(resolve, reject) {
        let msgChan = new MessageChannel();

        msgChan.port1.onmessage = function(event) {
            if (event.data.error) {
                reject(event.data.error);
            } else {
                resolve(event.data);
            }
        };
        client.postMessage(message, [msgChan.port2]);
    });
};
// -----------------------------------------------------
// Messaging.. Browser側からServiceWorkerへメッセージを送信する
self.addEventListener('message', (e) => {
    let command = e.data.command;
    switch (command) {
        case 'storeAccessDate':
            break;
        case 'isRepeater':
            break;
        default:
            return Promise.resolve();
    }
});

