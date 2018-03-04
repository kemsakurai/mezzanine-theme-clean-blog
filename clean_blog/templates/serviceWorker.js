importScripts("static/js/workbox-sw.prod.v2.1.3.js");
importScripts("static/webpack_bundles/swLibs-d8e13d479d40a7adf089.js");
/* eslint-disable no-undef */
const workboxSW = new WorkboxSW();
workboxSW.precache([
  {
    "url": "static/js/workbox-sw.prod.v2.1.3.js",
    "revision": "a9890beda9e5f17e4c68f42324217941"
  },
  {
    "url": "static/webpack_bundles/448c34a56d699c29117adc64c43affeb.woff2",
    "revision": "448c34a56d699c29117adc64c43affeb"
  },
  {
    "url": "static/webpack_bundles/65bcbc899f379216109acd0b6c494618.svg",
    "revision": "65bcbc899f379216109acd0b6c494618"
  },
  {
    "url": "static/webpack_bundles/7149833697a959306ec3012a8588dcfa.eot",
    "revision": "7149833697a959306ec3012a8588dcfa"
  },
  {
    "url": "static/webpack_bundles/89889688147bd7575d6327160d64e760.svg",
    "revision": "89889688147bd7575d6327160d64e760"
  },
  {
    "url": "static/webpack_bundles/bundle-d8e13d479d40a7adf089.css",
    "revision": "c3724018b072e4cef7cd6a7bcb5a483c"
  },
  {
    "url": "static/webpack_bundles/bundle-d8e13d479d40a7adf089.js",
    "revision": "dc916ffbc550dcef4a1fd5cc95bbf8f3"
  },
  {
    "url": "static/webpack_bundles/c4668ed2440df82d3fd2f8be9d31d07d.ttf",
    "revision": "c4668ed2440df82d3fd2f8be9d31d07d"
  },
  {
    "url": "static/webpack_bundles/d95d6f5d5ab7cfefd09651800b69bd54.woff",
    "revision": "d95d6f5d5ab7cfefd09651800b69bd54"
  },
  {
    "url": "static/webpack_bundles/e18bbf611f2a2e43afc071aa2f4e1512.ttf",
    "revision": "e18bbf611f2a2e43afc071aa2f4e1512"
  },
  {
    "url": "static/webpack_bundles/f4769f9bdb7466be65088239c12046d1.eot",
    "revision": "f4769f9bdb7466be65088239c12046d1"
  },
  {
    "url": "static/webpack_bundles/fa2772327f55d8198301fdb8bcfc8158.woff",
    "revision": "fa2772327f55d8198301fdb8bcfc8158"
  },
  {
    "url": "static/webpack_bundles/swLibs-d8e13d479d40a7adf089.js",
    "revision": "eb662c2511602d7e848e7f20a8947496"
  }
]);
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
