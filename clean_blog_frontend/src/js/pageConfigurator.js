// メッセージ送信用
function sendMessage2ServiceWorker(message) {
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

export default function configure() {
	if ("serviceWorker" in navigator) {
	    // Setup a listener to track Add to Homescreen events.
	    window.addEventListener('beforeinstallprompt', e => {
          e.userChoice.then(choiceResult => {
            console.log("beforeinstallprompt called..", choiceResult.outcome);
            if (typeof ga !== "undefined") {
	          ga('send', {
	    		hitType: 'event',
	    		eventCategory: 'A2H',
	    		eventAction: choiceResult.outcome,
	    		eventLabel: document.title,
	    		nonInteraction: true
	  			});
            }
          });
        });

        /* eslint-disable no-unused-vars */
        window.addEventListener('_sendRequestNotification', () => {
        	// WebPush API の承認要求を求める
		    var args = {"userAgent": window.navigator.userAgent};
		    sendMessage2ServiceWorker({"command": "requestNotification", "args": args});
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
	    });
	    /* eslint-enable no-unused-vars */
		}   
}
