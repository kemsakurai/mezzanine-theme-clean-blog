function prefetch(url) {
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
                    for (var i = 0; i < jsonData.length; i++) {
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

function wrapCodeHighlight () {
     // codeハイライトのの折り返し箇所に、     
     function wrap() {
        this.querySelector('pre').setAttribute("style", "overflow-x:visible; white-space:pre-wrap");
        this.querySelector('a').textContent = '［コードを折り返さないで表示］';
        this.onclick = unWrap.bind(this);
        return false;
    }

    function unWrap() {
        this.querySelector('pre').setAttribute("style", 'overflow-x:auto; white-space:pre');
        this.querySelector('a').textContent = '［コードを折り返して表示］';
        this.onclick = wrap.bind(this);
        return false;
    }

    var elems = document.querySelectorAll('pre');
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        // 実際のコンテンツが表示幅よりも大きい場合(スクロールバーが表示される場合)
        if(elem.clientWidth < elem.scrollWidth) {
            elem.tabIndex = 0;
            var parentDiv = document.createElement('div');
            parentDiv.className = "codeWrap";
            var childHref = document.createElement('a');
            childHref.href = "javascript:void(0)";
            childHref.textContent = "［コードを折り返して表示］";
            parentDiv.appendChild(childHref);
            if(elem.parentNode) {
                elem.parentNode.insertBefore(parentDiv, elem);
                elem.parentNode.onclick = wrap.bind(elem.parentNode);
            }
        }
    }
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
    wrapCodeHighlight();
    guessNextPages();
}
