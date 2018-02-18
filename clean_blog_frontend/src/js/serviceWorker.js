importScripts("static/js/workbox-sw.prod.v2.1.2.js");
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
workboxSW.router.registerRoute(/^\/blog\/category\/.*$/, workboxSW.strategies.networkFirst({
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
// Utils functions:
function urlBase64ToUint8Array(base64String) {
    var padding = "=".repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    var rawData = self.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function loadVersionBrowser(userAgent) {
    var ua = userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name: "IE", version: (tem[1] || "")};
    }
    if (M[1] === "Chrome") {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem != null) {
            return {name: "Opera", version: tem[1]};
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return {
        name: M[0],
        version: M[1]
    };
}

// navigatorPush.service.js file
var getTitle = function (title) {
    if (title === "") {
        title = "TITLE DEFAULT";
    }
    return title;
};

var getNotificationOptions = function (message, message_tag) {
    var options = {
        body: message,
        icon: "/img/icon_120.png",
        tag: message_tag,
        vibrate: [200, 100, 200, 100, 200, 100, 200]
    };
    return options;
};
// WebPush通知許可を求める
var requestNotification = function (userAgent) {
// 許可された場合の処理
    let browser = loadVersionBrowser(userAgent);
    // サーバーの公開鍵
    const serverPublicKey = "BERtMZ5KH6OyFBX1sxjN0wYQlQL6jGdXOztsnjpxcUnHQS1voeJZ9qmmW7y7cvqHT0EnpdyyhZ9ijwyzjBUXx8k";
    // scopeを指定して、registrationを取り出す
    self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(serverPublicKey)
    }).then(sub => {
        var endpointParts = sub.endpoint.split("/");
        var registration_id = endpointParts[endpointParts.length - 1];
        let contentEncoding; // プッシュ通知の送信時に指定するContent-Encoding
        // Chrome 50以降、Firefox 48以降のみを想定
        if ("supportedContentEncodings" in PushManager) {
            contentEncoding =
                PushManager.supportedContentEncodings.includes("aes128gcm") ? "aes128gcm" : "aesgcm";
        } else {
            contentEncoding = "aesgcm";
        }
        const data = {
            "browser": browser.name.toUpperCase(),
            "p256dh": btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey("p256dh")))),
            "auth": btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey("auth")))),
            "name": browser.name.toUpperCase(),
            "active": true,
            "registration_id": registration_id,
            "contentEncoding": contentEncoding,
            "cloud_message_type": "FCM"
        };
        const method = "POST";
        const body = JSON.stringify(data);
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        fetch("./api/v2/web_push/", {
            method,
            headers,
            body
        }).then((res) => res.json()).then(console.log).catch(console.error);
    }).catch(error => {
        /* eslint-disable no-console */
        console.error("Error during service worker ready:", error);
    });

};
// -----------------------------------------------------
// Messaging.. Browser側からServiceWorkerへメッセージを送信する
self.addEventListener("message", e => {
    let command = e.data.command;
    let args = e.data.args;
    switch (command) {
        case "requestNotification":
            // 通知承認要求
            requestNotification(args.userAgent);
            break;
        default:
            return Promise.resolve();
    }
});

// Push通知
self.addEventListener("push", function (event) {
    var response_json;
    var title;
    var message;
    var message_tag;
    try {
        // Push is a JSON
        response_json = event.data.json();
        title = response_json.title;
        message = response_json.message;
        message_tag = response_json.tag;
    } catch (err) {
        // Push is a simple text
        title = "";
        message = event.data.text();
        message_tag = "";
    }
    self.registration.showNotification(getTitle(title), getNotificationOptions(message, message_tag));
    // Optional: Comunicating with our js application. Send a signal
    self.clients.matchAll({includeUncontrolled: true, type: "window"}).then(function (clients) {
        clients.forEach(function (client) {
            client.postMessage({
                "data": message_tag,
                "data_title": title,
                "data_body": message
            });
        });
    });
});

// Optional: Added to that the browser opens when you click on the notification push web.
// 通知クリック時の動作を定義
self.addEventListener("notificationclick", function (event) {
    // Android doesn't close the notification when you click it
    // See http://crbug.com/463146
    event.notification.close();
    // Check if there's already a tab open with this URL.
    // If yes: focus on the tab.
    // If no: open a tab with the URL.
    event.waitUntil(self.clients.matchAll({type: "window", includeUncontrolled: true}).then(function (windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if ("focus" in client) {
                    return client.focus();
                }
            }
        })
    );
});
