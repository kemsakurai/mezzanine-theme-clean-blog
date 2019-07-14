// ES6
import Turbolinks from 'turbolinks';
import {guess} from 'guess-webpack/api';

function prefetch(url) {
  let hint = document.createElement('link');
  hint.rel = 'prefetch';
  hint.href = url;
  hint.as = 'html';
  hint.crossorigin = 'use-credentials';
  document.head.appendChild(hint);
}
// Turbolinksで遷移した場合の初期化処理
document.addEventListener('turbolinks:load', function(event) {
  let url = event.data.url;
  dataLayer.push({
    'event': 'turbolinks_load_pageView',
    'virtualUrl': url,
  });

  dataLayer.push({
    'event': 'optimize.activate',
    'virtualUrl': url,
  });
  if (typeof window !== 'undefined') {
    for (const url of Object.keys(guess())) {
      prefetch(url);
    }
  }
});
// Turbolinks処理開始
Turbolinks.start();
