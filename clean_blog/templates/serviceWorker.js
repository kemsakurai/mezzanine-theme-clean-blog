importScripts("/static/webpack_bundles/precache-manifest.4942662dbade6c3c07375de77ca564d5.js", "https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js");

importScripts('static/js/localforage.min.js');
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
    let args = e.data.args;
    switch (command) {
        case 'storeAccessDate':
            storeAccessDate();
            break;
        case 'isRepeater':
            isRepeater().then((result) => {
                e.ports[0].postMessage({'result': result});
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

