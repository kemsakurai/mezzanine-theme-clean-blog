function prefetch(url) {
    console.log(url);
    let hint = document.createElement('link');
    hint.rel = 'prefetch';
    hint.href = url;
    hint.as = 'html';
    hint.crossorigin = 'use-credentials';
    document.head.appendChild(hint);
}
function getConnection() {
    if (!window || !window.navigator || !window.navigator.connection) {
      return '3g';
    }
    return window.navigator.connection.effectiveType || '3g';
}

function guessNextPages() {
    console.log("next Page");
    var xhr = new XMLHttpRequest();
    // ハンドラの登録.
    xhr.onreadystatechange = function() {
        switch ( xhr.readyState ) {
            case 0: // 未初期化状態.
                break;
            case 1: // データ送信中.
                break;
            case 2: // 応答待ち.
                break;
            case 3: // データ受信中.
                break;
            case 4: // データ受信完了.
                if( xhr.status == 200 ) {
                    // responseXML もあり
                    var data = xhr.responseText;
                    var jsonData = JSON.parse(data);
                    console.log(jsonData);
                    for (var i = 0; i < jsonData; i++) {
                        prefetch(location.origin + jsonData[i]['page_path']);
                    }
                } else {
                    console.log("Response error! status=" + xhr.status);
                }
                break;
        }
    };
    var urlParam = encodeURIComponent(location.pathname);
    xhr.open( 'GET', '/xyz_monotalk_api/guessresult/' + urlParam + '/' + getConnection() + '/' + '?format=json', true );
    // POST 送信の場合は Content-Type は固定.
    xhr.setRequestHeader( 'Content-Type', 'application/json' );
    xhr.send(null);
}
export default function configure() {
     // Optimize.activate!!!
     window.dataLayer = window.dataLayer || [];
     dataLayer.push({
          'event': 'optimize.activate',
     });

     if ('serviceWorker' in navigator) {
         // Setup a listener to track Add to Homescreen events.
         window.addEventListener('beforeinstallprompt', (e) => {
          e.userChoice.then((choiceResult) => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'sendEvent',
                eventName: 'A2H',
                eventData: {category: 'A2H',
                    action: choiceResult.outcome,
                    label: document.title,
                    value: '',
                    nonInteraction: true,
                },
                eventCustomData: {
                    documentTitle: document.title,
                    outcome: choiceResult.outcome,
                },
            });
          });
        });
     }
     guessNextPages();   
}
