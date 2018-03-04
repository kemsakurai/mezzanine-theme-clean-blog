/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ({

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);


/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(19);

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Push通知
self.addEventListener('push', function (event) {
    var response_json = void 0;
    var title = void 0;
    var message = void 0;
    var message_tag = void 0;
    try {
        // Push is a JSON
        response_json = event.data.json();
        title = response_json.title;
        message = response_json.message;
        message_tag = response_json.tag;
    } catch (err) {
        // Push is a simple text
        title = '';
        message = event.data.text();
        message_tag = '';
    }
    self.registration.showNotification(getTitle(title), getNotificationOptions(message, message_tag));
    // Optional: Comunicating with our js application. Send a signal
    self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(function (clients) {
        clients.forEach(function (client) {
            client.postMessage({
                'data': message_tag,
                'data_title': title,
                'data_body': message
            });
        });
    });
});

// Optional: Added to that the browser opens when you click on the notification push web.
// 通知クリック時の動作を定義
self.addEventListener('notificationclick', function (event) {
    // Android doesn't close the notification when you click it
    // See http://crbug.com/463146
    event.notification.close();
    // Check if there's already a tab open with this URL.
    // If yes: focus on the tab.
    // If no: open a tab with the URL.
    event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (windowClients) {
        for (var i = 0; i < windowClients.length; i++) {
            var client = windowClients[i];
            if ('focus' in client) {
                return client.focus();
            }
        }
    }));
});

// Utils functions:
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

    var rawData = self.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function loadVersionBrowser(userAgent) {
    var ua = userAgent,
        tem = void 0,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return { name: 'IE', version: tem[1] || '' };
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem != null) {
            return { name: 'Opera', version: tem[1] };
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return {
        name: M[0],
        version: M[1]
    };
}

// navigatorPush.service.js file
var getTitle = function getTitle(title) {
    if (title === '') {
        title = 'TITLE DEFAULT';
    }
    return title;
};

var getNotificationOptions = function getNotificationOptions(message, message_tag) {
    var options = {
        body: message,
        icon: '/img/icon_120.png',
        tag: message_tag,
        vibrate: [200, 100, 200, 100, 200, 100, 200]
    };
    return options;
};

// WebPush通知許可を求める
var requestNotification = function requestNotification(userAgent, blogPostId, gaId) {
    // 許可された場合の処理
    var browser = loadVersionBrowser(userAgent);
    // サーバーの公開鍵
    var serverPublicKey = 'BERtMZ5KH6OyFBX1sxjN0wYQlQL6jGdXOztsnjpxcUnHQS1voeJZ9qmmW7y7cvqHT0EnpdyyhZ9ijwyzjBUXx8k';
    // scopeを指定して、registrationを取り出す
    self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(serverPublicKey)
    }).then(function (sub) {
        var endpointParts = sub.endpoint.split('/');
        var registration_id = endpointParts[endpointParts.length - 1];
        var contentEncoding = void 0; // プッシュ通知の送信時に指定するContent-Encoding
        // Chrome 50以降、Firefox 48以降のみを想定
        if ('supportedContentEncodings' in PushManager) {
            contentEncoding = PushManager.supportedContentEncodings.includes('aes128gcm') ? 'aes128gcm' : 'aesgcm';
        } else {
            contentEncoding = 'aesgcm';
        }
        var web_push_device = {
            'browser': browser.name.toUpperCase(),
            'p256dh': btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('p256dh')))),
            'auth': btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('auth')))),
            'name': userAgent,
            'active': true,
            'registration_id': registration_id,
            'contentEncoding': contentEncoding,
            'cloud_message_type': 'FCM'
        };
        var method = 'POST';
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        if (typeof blogPostId === 'undefinded') {
            var body = JSON.stringify(web_push_device);
            fetch('./api/v2/web_push/', {
                'method': method,
                'headers': headers,
                'body': body
            }).then(function (res) {
                return res.json();
            }).then(console.log).catch(console.error);
        } else {
            var data = {
                'web_push_device': web_push_device,
                'blog_id': blogPostId,
                'ga_id': gaId
            };
            var _body = JSON.stringify(data);
            fetch('./api/v2/web_push_request/', {
                'method': method,
                'headers': headers,
                'body': _body
            }).then(function (res) {
                return res.json();
            }).then(console.log).catch(console.error);
        }
    }).catch(function (error) {
        /* eslint-disable no-console */
        console.error('Error during service worker ready:', error);
    });
};

/***/ })

/******/ });