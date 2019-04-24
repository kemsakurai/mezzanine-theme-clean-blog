importScripts("/static/webpack_bundles/precache-manifest.5563825656033752d896b87c4529c20e.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-sw.js");

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
// -------------------------------------------------------
// runtime cache の定義
// -------------------------------
workbox.routing.registerRoute(/^\/$|^\/\?utm_source.+$/, workbox.strategies.networkFirst({
    'cacheName': 'root',
    'cacheExpiration': {
        'maxAgeSeconds': 60 * 60 * 24 * 10, 'maxEntries': 10,
    },
}), 'GET');
workbox.routing.registerRoute(/^\/\?page=.+$/, workbox.strategies.networkFirst({
    'cacheName': 'pages',
    'cacheExpiration': {
        'maxAgeSeconds': 60 * 60 * 24 * 10, 'maxEntries': 10,
    },
}), 'GET');
workbox.routing.registerRoute(/^\/search\/\?q=.*$/, workbox.strategies.networkFirst({
    'cacheName': 'search',
    'cacheExpiration': {
        'maxAgeSeconds': 60 * 60 * 24 * 10, 'maxEntries': 10,
    },
}), 'GET');
workbox.routing.registerRoute(/^\/blog\/category\/.+$/, workbox.strategies.networkFirst({
    'cacheName': 'category',
    'cacheExpiration': {
        'maxAgeSeconds': 60 * 60 * 24 * 10, 'maxEntries': 10,
    },
}), 'GET');
workbox.routing.registerRoute(/^\/blog\/.+$/, workbox.strategies.cacheFirst({
    'cacheName': 'entry',
    'cacheExpiration': {
        'maxAgeSeconds': 60 * 60 * 24 * 30, 'maxEntries': 30,
    },
}), 'GET');
workbox.routing.registerRoute(/^\/about\/$/, workbox.strategies.cacheFirst({
    'cacheName': 'about',
    'cacheExpiration': {
        'maxAgeSeconds': 60 * 60 * 24 * 30, 'maxEntries': 1,
    },
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

