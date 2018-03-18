importScripts('static/js/workbox-sw.prod.v2.1.3.js');
importScripts('static/js/localforage.min.js');
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
    "url": "static/webpack_bundles/bundle-bb5d82d2b8319f08d4be.css",
    "revision": "98ace87fc89f6aee343da97c0e365eaf"
  },
  {
    "url": "static/webpack_bundles/bundle-bb5d82d2b8319f08d4be.js",
    "revision": "b610a97bced2899b034b4a7c4e4ec596"
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
/**
 * Utils functions:
 * @return urlBase64ToUint8Array
 */
const urlBase64ToUint8Array = function(base64String) {
    let padding = '='.repeat((4 - base64String.length % 4) % 4);
    let base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    let rawData = self.atob(base64);
    let outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};
const loadVersionBrowser = function(userAgent) {
    let ua = userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name: 'IE', version: (tem[1] || '')};
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem != null) {
            return {name: 'Opera', version: tem[1]};
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return {
        name: M[0],
        version: M[1],
    };
}
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
// navigatorPush.service.js file
const getTitle = function(title) {
    if (title === '') {
        title = 'TITLE DEFAULT';
    }
    return title;
};

const getNotificationOptions = function(message, messageTag) {
    let options = {
        body: message,
        icon: '/img/icon_120.png',
        tag: messageTag,
        vibrate: [200, 100, 200, 100, 200, 100, 200],
    };
    return options;
};
// -----------------------------------------------------
// Messaging.. Browser側からServiceWorkerへメッセージを送信する
self.addEventListener('message', (e) => {
    let command = e.data.command;
    let args = e.data.args;
    switch (command) {
        case 'requestNotification':
            // 通知承認要求
            requestNotification(args.userAgent, args.blogPostId, args.gaId);
            break;
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

// Push通知
self.addEventListener('push', function(event) {
    let responseJson;
    let title;
    let message;
    let messageTag;
    try {
        // Push is a JSON
        responseJson = event.data.json();
        title = responseJson.title;
        message = responseJson.message;
        messageTag = responseJson.tag;
    } catch (err) {
        // Push is a simple text
        title = '';
        message = event.data.text();
        messageTag = '';
    }
    self.registration.showNotification(getTitle(title), getNotificationOptions(message, messageTag));
    // Optional: Comunicating with our js application. Send a signal
    self.clients.matchAll({includeUncontrolled: true, type: 'window'}).then(function(clients) {
        clients.forEach(function(client) {
            client.postMessage({
                'data': messageTag,
                'data_title': title,
                'data_body': message,
            });
        });
    });
});

// Optional: Added to that the browser opens when you click on the notification push web.
// 通知クリック時の動作を定義
self.addEventListener('notificationclick', function(event) {
    // Android doesn't close the notification when you click it
    // See http://crbug.com/463146
    event.notification.close();
    // Check if there's already a tab open with this URL.
    // If yes: focus on the tab.
    // If no: open a tab with the URL.
    event.waitUntil(self.clients.matchAll({type: 'window', includeUncontrolled: true}).then(function(windowClients) {
            for (let i = 0; i < windowClients.length; i++) {
                let client = windowClients[i];
                if ('focus' in client) {
                    return client.focus();
                }
            }
        })
    );
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
// -------------------------------------
// WebPush購読処理
// --------
const requestNotification = function(userAgent, blogPostId, gaId) {
    
    self.registration.pushManager.getSubscription().then(function(existingSubscription) {
         // ---------------------------------------
         // 本来はここでFail した場合のリトライ処理を記載する    
         // ----------------
         if (existingSubscription) {
             return existingSubscription;
         }
        // 許可された場合の処理
        let browser = loadVersionBrowser(userAgent);
        // サーバーの公開鍵
        const serverPublicKey = 'BERtMZ5KH6OyFBX1sxjN0wYQlQL6jGdXOztsnjpxcUnHQS1voeJZ9qmmW7y7cvqHT0EnpdyyhZ9ijwyzjBUXx8k';
        // scopeを指定して、registrationを取り出す
        self.registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(serverPublicKey),
        }).then((sub) => {
            let endpointParts = sub.endpoint.split('/');
            let registrationId = endpointParts[endpointParts.length - 1];
            let contentEncoding; // プッシュ通知の送信時に指定するContent-Encoding
            // Chrome 50以降、Firefox 48以降のみを想定
            if ('supportedContentEncodings' in PushManager) {
                contentEncoding =
                    PushManager.supportedContentEncodings.includes('aes128gcm') ? 'aes128gcm' : 'aesgcm';
            } else {
                contentEncoding = 'aesgcm';
            }
            const webPushDevice = {
                'browser': browser.name.toUpperCase(),
                'p256dh': btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('p256dh')))),
                'auth': btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('auth')))),
                'name': userAgent,
                'active': true,
                'registration_id': registrationId,
                'contentEncoding': contentEncoding,
                'cloud_message_type': 'FCM',
            };
            const method = 'POST';
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };
            if (typeof blogPostId === 'undefinded') {
                let body = JSON.stringify(webPushDevice);
                fetch('./api/v2/web_push/', {
                    'method': method,
                    'headers': headers,
                    'body': body,
                }).then((res) => res.json()).then(console.log).catch(console.error);
            } else {
                let data = {
                    'web_push_device': webPushDevice,
                    'blog_id': blogPostId,
                    'ga_id': gaId,
                };
                let body = JSON.stringify(data);
                fetch('./api/v2/web_push_request/', {
                    'method': method,
                    'headers': headers,
                    'body': body,
                }).then((res) => res.json()).then(console.log).catch(console.error);
            }
        }).catch((error) => {
            /* eslint-disable no-console */
            console.error('Error during service worker ready:', error);
        });
    });
};

// -------------------------------------
// WebPush購読解除処理
// --------
const unsubscribe = function() {
  self.registration.pushManager.getSubscription().then(function(sub) {
    if (sub) {
      let endpointParts = sub.endpoint.split('/');
      let registrationId = endpointParts[endpointParts.length - 1];
      const method = 'POST';
      const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      };
      const webPushDevice = {
        'active': false,
        'registration_id': registrationId,
      };
      let body = JSON.stringify(webPushDevice);
      fetch('./api/v2/web_push/', {
          'method': method,
          'headers': headers,
          'body': body,
      }).then((res) => res.json()).then(console.log).catch(console.error);
      return sub.unsubscribe();
    }
  });
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
