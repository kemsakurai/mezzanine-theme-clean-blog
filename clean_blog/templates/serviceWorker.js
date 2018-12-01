importScripts('static/js/workbox-sw.prod.v2.1.3.js');
importScripts('static/js/localforage.min.js');
/* eslint-disable no-undef */
const workboxSW = new WorkboxSW();
workboxSW.precache([
  {
    "url": "static/js/workbox-sw.prod.v2.1.3.js",
    "revision": "a8510ff32df85144ee72e03a02f263cd"
  },
  {
    "url": "static/webpack_bundles/41722cb225286442cf9d6f7cfbd7883d.svg",
    "revision": "41722cb225286442cf9d6f7cfbd7883d"
  },
  {
    "url": "static/webpack_bundles/448c34a56d699c29117adc64c43affeb.woff2",
    "revision": "448c34a56d699c29117adc64c43affeb"
  },
  {
    "url": "static/webpack_bundles/7149833697a959306ec3012a8588dcfa.eot",
    "revision": "7149833697a959306ec3012a8588dcfa"
  },
  {
    "url": "static/webpack_bundles/7ced3229845a5f3c7c4f4cb27fd136d8.svg",
    "revision": "7ced3229845a5f3c7c4f4cb27fd136d8"
  },
  {
    "url": "static/webpack_bundles/bundle-4d1357b62d00e8a9b37b.css",
    "revision": "f33f28b2200736556dbfab41db74110d"
  },
  {
    "url": "static/webpack_bundles/bundle-4d1357b62d00e8a9b37b.js",
    "revision": "a46779fcfa8de62d4af2bb5881d67cea"
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
  }
]);
/* eslint-enable no-undef */
// -------------------------------------------------------
// runtime cache の定義
// -------------------------------
workboxSW.router.registerRoute(/^\/$|^\/\?utm_source.+$/, workboxSW.strategies.networkFirst({
    'cacheName': 'root',
    'cacheExpiration': {
        'maxAgeSeconds': 60 * 60 * 24 * 10, 'maxEntries': 10,
    },
}), 'GET');
workboxSW.router.registerRoute(/^\/\?page=.+$/, workboxSW.strategies.networkFirst({
    'cacheName': 'pages',
    'cacheExpiration': {
        'maxAgeSeconds': 60 * 60 * 24 * 10, 'maxEntries': 10,
    },
}), 'GET');
workboxSW.router.registerRoute(/^\/search\/\?q=.*$/, workboxSW.strategies.networkFirst({
    'cacheName': 'search',
    'cacheExpiration': {
        'maxAgeSeconds': 60 * 60 * 24 * 10, 'maxEntries': 10,
    },
}), 'GET');
workboxSW.router.registerRoute(/^\/blog\/category\/.+$/, workboxSW.strategies.networkFirst({
    'cacheName': 'category',
    'cacheExpiration': {
        'maxAgeSeconds': 60 * 60 * 24 * 10, 'maxEntries': 10,
    },
}), 'GET');
workboxSW.router.registerRoute(/^\/blog\/.+$/, workboxSW.strategies.cacheFirst({
    'cacheName': 'entry',
    'cacheExpiration': {
        'maxAgeSeconds': 60 * 60 * 24 * 30, 'maxEntries': 30,
    },
}), 'GET');
workboxSW.router.registerRoute(/^\/about\/$/, workboxSW.strategies.cacheFirst({
    'cacheName': 'about',
    'cacheExpiration': {
        'maxAgeSeconds': 60 * 60 * 24 * 30, 'maxEntries': 1,
    },
}), 'GET');
const sendMessageToAllClients = function(msg) {
    clients.matchAll({includeUncontrolled: true, type: 'window'}).then(function(clients) {
        clients.forEach(client => {
            sendMessageToClient(client, msg).then(m => console.log("SW Received Message: "+ m));
        })
    })
}

const sendMessageToClient = function(client, message) {
    return new Promise(function(resolve, reject) {
        var msgChan = new MessageChannel();

        msgChan.port1.onmessage = function(event) {
            if(event.data.error){
                reject(event.data.error);
            }else{
                resolve(event.data);
            }
        };
        client.postMessage(message, [msgChan.port2]);
    });
}
// -----------------------------------------------------
// Messaging.. Browser側からServiceWorkerへメッセージを送信する
self.addEventListener('message', (e) => {
    let command = e.data.command;
    let args = e.data.args;
    switch (command) {
        case 'storeAccessDate':
            storeAccessDate();
            break;
        case 'isRepeater':
            isRepeater().then((result) => {
                e.ports[0].postMessage({'result' : result });
            });
            break;
        default:
            return Promise.resolve();
    }
});

const dateFormat = {
  fmt: {
    hh: function(date) {
 return ('0' + date.getHours()).slice(-2);
},
    h: function(date) {
 return date.getHours();
},
    mm: function(date) {
 return ('0' + date.getMinutes()).slice(-2);
},
    m: function(date) {
 return date.getMinutes();
},
    ss: function(date) {
 return ('0' + date.getSeconds()).slice(-2);
},
    dd: function(date) {
 return ('0' + date.getDate()).slice(-2);
},
    d: function(date) {
 return date.getDate();
},
    s: function(date) {
 return date.getSeconds();
},
    yyyy: function(date) {
 return date.getFullYear() + '';
},
    yy: function(date) {
 return date.getYear() + '';
},
    t: function(date) {
 return date.getDate()<=3 ? ['st', 'nd', 'rd'][date.getDate()-1]: 'th';
},
    w: function(date) {
return ['Sun', '$on', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
},
    MMMM: function(date) {
 return ['January', 'February', '$arch', 'April', '$ay', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
},
    MMM: function(date) {
return ['Jan', 'Feb', '$ar', 'Apr', '@ay', 'Jun', 'Jly', 'Aug', 'Spt', 'Oct', 'Nov', 'Dec'][date.getMonth()];
},
    MM: function(date) {
 return ('0' + (date.getMonth() + 1)).slice(-2);
},
    M: function(date) {
 return date.getMonth() + 1;
},
    $: function(date) {
return 'M';
},
  },
  format: function dateFormat(date, format) {
    let result = format;
    for (let key in this.fmt) {
        if (this.fmt.hasOwnProperty(key)) {
            result = result.replace(key, this.fmt[key](date));
        }
    }
    return result;
  },
};

const accessDate = localforage.createInstance({
    driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
    name: 'swDB',
    version: 1.0,
    size: 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName: 'accessDate', // Should be alphanumeric, with underscores.
    description: 'some description',
});
// アクセスした日付を記録する
const storeAccessDate = function() {
    let date = dateFormat.format(new Date(), 'yyyyMMdd');
    accessDate.getItem(date).then((value) => {
        let count;
        if (typeof value === 'undefined' || value === NaN) {
            count = 1;
        } else {
            count = 1 + value;
        }
        return accessDate.setItem(date, count).then(() => {
            return accessDate.length().then((length) => {
                if (length > 5) {
                    accessDate.key(0).then((key) => {
                        console.log(key);
                        accessDate.delete(key);
                    }).catch((value) => {
                    console.log('Raise error.');
                    });
                }
            });
        });
    });
};
// Repeaterユーザーか判定して返す。
const isRepeater = function() {
  return accessDate.keys().then((keys) => {
    // 日をまたいで3回以上のアクセスがあるか判断する
    if (keys.length >= 3) {
        return true;
    }
    return false;
  });
};
