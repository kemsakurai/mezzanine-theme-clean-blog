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
        // var event = new Event('_sendRequestNotification');
        // window.dispatchEvent(event); P
        window.addEventListener('_sendRequestNotification', () => {
        	// dataLayer変数が設定されていない場合、処理を中断する
        	if ( typeof window.blogPostInfo === "undefined") {
        		return;
        	}
		    if ("Notification" in window) {
		        //許可を求める
		        Notification.requestPermission()
		            .then((permission) => {
		                if (permission === "denied" || permission === "default") {
		                    // 拒否 // 無視
		                    return;
		                } else if (permission === "granted") {
							let args = {
								"userAgent": window.navigator.userAgent, 
								"blogPostId" : window.blogPostInfo.blogPostId ,
								"gaId" : window.blogPostInfo.gaId };
		                    sendMessage2ServiceWorker({"command": "requestNotification", "args": args});
		                } else {
		                    /* eslint-disable no-console */
		                    console.log("permission is illegal : %s", permission);
		                }
		            });
		    }
	    });
	    /* eslint-enable no-unused-vars */
	}
}
// メッセージ送信用
export function sendMessage2ServiceWorker(message) {
    return new Promise((resolve, reject) => {
        const channel = new MessageChannel();
        channel.port1.onmessage = e => {
            if (e.data.error) {
                reject(e.data.error);
            } else {
                resolve(e.data);
            }
        };
        // 登録時は、activateしないため、controller は nullになる
        if(navigator.serviceWorker.controller) {
        	navigator.serviceWorker.controller.postMessage(message, [channel.port2]);
        }
    });
}