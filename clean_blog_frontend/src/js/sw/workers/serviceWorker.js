importScripts("static/js/workbox-sw.prod.v2.1.3.js");
importScripts("static/js/webpack_bundles/swLibs.js");
/* eslint-disable no-undef */
const workboxSW = new WorkboxSW();
workboxSW.precache([]);
/* eslint-enable no-undef */
// -------------------------------------------------------
// runtime cache の定義
// -------------------------------
workboxSW.router.registerRoute(/^\/$|^\/\?utm_source.+$/, workboxSW.strategies.networkFirst({
    "cacheName": "root",
    "cacheExpiration": {
        "maxAgeSeconds": 60 * 60 * 24 * 10, "maxEntries": 10
    }
}), "GET");
workboxSW.router.registerRoute(/^\/\?page=.+$/, workboxSW.strategies.networkFirst({
    "cacheName": "pages",
    "cacheExpiration": {
        "maxAgeSeconds": 60 * 60 * 24 * 10, "maxEntries": 10
    }
}), "GET");
workboxSW.router.registerRoute(/^\/search\/\?q=.*$/, workboxSW.strategies.networkFirst({
    "cacheName": "search",
    "cacheExpiration": {
        "maxAgeSeconds": 60 * 60 * 24 * 10, "maxEntries": 10
    }
}), "GET");
workboxSW.router.registerRoute(/^\/blog\/category\/.+$/, workboxSW.strategies.networkFirst({
    "cacheName": "category",
    "cacheExpiration": {
        "maxAgeSeconds": 60 * 60 * 24 * 10, "maxEntries": 10
    }
}), "GET");
workboxSW.router.registerRoute(/^\/blog\/.+$/, workboxSW.strategies.cacheFirst({
    "cacheName": "entry",
    "cacheExpiration": {
        "maxAgeSeconds": 60 * 60 * 24 * 30, "maxEntries": 30
    }
}), "GET");
workboxSW.router.registerRoute(/^\/about\/$/, workboxSW.strategies.cacheFirst({
    "cacheName": "about",
    "cacheExpiration": {
        "maxAgeSeconds": 60 * 60 * 24 * 30, "maxEntries": 1
    }
}), "GET");
// -----------------------------------------------------
// Messaging.. Browser側からServiceWorkerへメッセージを送信する
self.addEventListener("message", e => {
    let command = e.data.command;
    let args = e.data.args;
    switch (command) {
        case "requestNotification":
            // 通知承認要求
            requestNotification(args.userAgent, args.blogPostId, args.gaId);
            break;
        default:
            return Promise.resolve();
    }
});
