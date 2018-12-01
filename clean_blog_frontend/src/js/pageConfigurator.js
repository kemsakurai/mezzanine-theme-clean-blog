import guess from 'guess-webpack/api';

// メッセージ送信用
function sendMessage2ServiceWorker(message) {
    return new Promise((resolve, reject) => {
        const channel = new MessageChannel();
        channel.port1.onmessage = (e) => {
            if (e.data.error) {
                reject(e.data.error);
            } else {
                resolve(e.data);
            }
        };
        // 登録時は、activateしないため、controller は nullになる
        if (navigator.serviceWorker.controller) {
             navigator.serviceWorker.controller.postMessage(message, [channel.port2]);
        }
    });
}

function prefetch(url) {
    console.log("prefetch=" + url);
    var hint = document.createElement('link');
    hint.rel = 'preconnect';
    hint.href = url;
    hint.as = 'html';
    hint.crossorigin = 'use-credentials';
    document.head.appendChild(hint);
}

function dispatchEvent(name) {
    var event;
    try {
        event = new CustomEvent(name);
    } catch (e) {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(name, false, false);
    }
    window.dispatchEvent(event);  
}

export default function configure() {
     if (typeof window !== 'undefined') {
         for (const url of Object.keys(guess())) {
             prefetch(url);
         }
     }
     if ('serviceWorker' in navigator) {
         // Setup a listener to track Add to Homescreen events.
         window.addEventListener('beforeinstallprompt', (e) => {
          e.userChoice.then((choiceResult) => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "sendEvent",
                eventName: "A2H",
                eventData:{ category : "A2H", 
                    action : choiceResult.outcome,
                    label : document.title,
                    value : "",
                    nonInteraction : true
                },
                eventCustomData : {
                    documentTitle : document.title,
                    outcome : choiceResult.outcome
                }
            });
          });
        });
         window.addEventListener('_isRepeater', () => {
              console.log('_isRepeater fired..');
              // dataLayer変数が設定されていない場合、処理を中断する
              if ( typeof window.blogPostInfo === 'undefined') {
                   return;
              }
              if ('Notification' in window) {
                  sendMessage2ServiceWorker({'command': 'isRepeater', 'args': null}).then((data) => {
                       if (data.result) {
                          dispatchEvent('_sendRequestNotification');
                       } else {
                          console.log(' _sendRequestNotification event not fired..');
                       }
                  });
              }
         });

          // 登録時は、activateしないため、controller は nullになる
        if (navigator.serviceWorker.controller) {
               window.addEventListener('load', () => {
                      // アクセス時刻を記録
                    sendMessage2ServiceWorker({'command': 'storeAccessDate', 'args': null});
              });
        }
     }
}
