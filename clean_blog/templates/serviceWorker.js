importScripts("/static/webpack_bundles/precache-manifest.cccebafe18b121f1e6fc0943ecbb9265.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.__precacheManifest = (self.__precacheManifest || []).concat([
    {
      "url": "/static/js/html5shiv.js"
    },
    {
      "url": "/static/js/respond.min.js"
    },
    {
      "url": "/static/img/home-bg-800.jpg"
    },
    {
      "url": "/static/img/home-bg-1600.jpg"
    }
  ]);
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
// -------------------------------------------------------
// runtime cache の定義
// -------------------------------
workbox.routing.registerRoute(new RegExp('(/$|/\?utm_source.+$)'), workbox.strategies.networkFirst({
    cacheName: 'root',
    plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 10,
          maxEntries: 10,
        }),
    ],
}), 'GET');

workbox.routing.registerRoute(new RegExp('/\?page=.+$'), workbox.strategies.networkFirst({
    cacheName: 'pages',
    plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 10,
          maxEntries: 10,
        }),
    ],
}), 'GET');
workbox.routing.registerRoute(new RegExp('/search\?q=.*$'), workbox.strategies.networkFirst({
    cacheName: 'search',
    plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 10,
          maxEntries: 10,
        }),
    ],
}), 'GET');
workbox.routing.registerRoute(new RegExp('/blog/category/.+$'), workbox.strategies.networkFirst({
    cacheName: 'category',
    plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 10,
          maxEntries: 10,
        }),
    ],
}), 'GET');
workbox.routing.registerRoute(new RegExp('/blog/.+$'), workbox.strategies.cacheFirst({
    cacheName: 'entry',
    plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 30,
          maxEntries: 30,
        }),
    ],
}), 'GET');
workbox.routing.registerRoute(new RegExp('/about.*'), workbox.strategies.cacheFirst({
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

