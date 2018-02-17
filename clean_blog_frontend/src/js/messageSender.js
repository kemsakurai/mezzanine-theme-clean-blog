// メッセージ送信用
function sendMessage(message) {
    return new Promise((resolve, reject) => {
        const channel = new MessageChannel();
        channel.port1.onmessage = e => {
            if (e.data.error) {
                reject(e.data.error);
            } else {
                resolve(e.data);
            }
        };
        navigator.serviceWorker.controller.postMessage(message, [channel.port2]);
    });
}

/* eslint-disable no-unused-vars */

// WebPush API の承認要求
function sendRequestNotification() {
    var args = {"userAgent": window.navigator.userAgent};
    sendMessage({"command": "requestNotification", "args": args});
    // if ("Notification" in window) {
    //     //許可を求める
    //     Notification.requestPermission()
    //         .then((permission) => {
    //             if (permission === "denied" || permission === "default") {
    //                 // 拒否 // 無視
    //                 return;
    //             } else if (permission === "granted") {
    //                 var args = {"userAgent": window.navigator.userAgent};
    //                 sendMessage({"command": "requestNotification", "args": args});
    //             } else {
    //                 /* eslint-disable no-console */
    //                 console.log("permission is illegal : %s", permission);
    //             }
    //         });
    // }
}

/* eslint-enable no-unused-vars */