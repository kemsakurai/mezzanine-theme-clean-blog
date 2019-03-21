// ES6
import Turbolinks from 'turbolinks';
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
});
// Turbolinks処理開始
Turbolinks.start();
