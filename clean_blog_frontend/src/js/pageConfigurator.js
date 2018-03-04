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

export default function configure() {
     if ('serviceWorker' in navigator) {
         // Setup a listener to track Add to Homescreen events.
         window.addEventListener('beforeinstallprompt', (e) => {
          e.userChoice.then((choiceResult) => {
            console.log('beforeinstallprompt called..', choiceResult.outcome);
            if (typeof ga !== 'undefined') {
               ga('send', {
                   hitType: 'event',
                   eventCategory: 'A2H',
                   eventAction: choiceResult.outcome,
                   eventLabel: document.title,
                   nonInteraction: true,
                      });
            }
          });
        });
        /* eslint-disable no-unused-vars */
        // var event = new Event('_sendRequestNotification');
        // window.dispatchEvent(event);
         window.addEventListener('_sendRequestNotification', () => {
              // dataLayer変数が設定されていない場合、処理を中断する
              if ( typeof window.blogPostInfo === 'undefined') {
                   return;
              }
               if ('Notification' in window) {
                  // 許可を求める
                  Notification.requestPermission().then((permission) => {
                     if (permission === 'denied' || permission === 'default') {
                         // 拒否 // 無視
                         return;
                     } else if (permission === 'granted') {
                              let args = {
                                   'userAgent': window.navigator.userAgent,
                                   'blogPostId': window.blogPostInfo.blogPostId,
                                   'gaId': window.blogPostInfo.gaId};
                         sendMessage2ServiceWorker({'command': 'requestNotification', 'args': args});
                     } else {
                         /* eslint-disable no-console */
                         console.log('permission is illegal : %s', permission);
                     }
                 });
              }
         });
         window.addEventListener('_isRepeater', () => {
              console.log('_isRepeater fired..');
              // dataLayer変数が設定されていない場合、処理を中断する
              if ( typeof window.blogPostInfo === 'undefined') {
                   return;
              }
               if ('Notification' in window) {
                  console.log('sentRequest to ServiceWorker...');
                  sendMessage2ServiceWorker({'command': 'isRepeater', 'args': null});
               }
         });
         // メッセージ受信イベント
          window.addEventListener('message', function(e) {
              let command = e.data.command;
              let args = e.data.args;
              switch (command) {
                  case 'handleIsRepeaterResult':
                       if (e.data.args.result) {
                            let event = new Event('_sendRequestNotification');
                            window.dispatchEvent(event);
                       } else {
                          console.log(' _sendRequestNotification event not fired..');
                       }
                      break;
                  default:
                      break;
              }
          }, false);

          // 登録時は、activateしないため、controller は nullになる
        if (navigator.serviceWorker.controller) {
               window.addEventListener('load', () => {
                      // アクセス時刻を記録
                    sendMessage2ServiceWorker({'command': 'storeAccessDate', 'args': null});
              });
        }
     }
}
