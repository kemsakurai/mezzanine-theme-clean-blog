import Turbolinks from 'turbolinks';

function currentScrollPercentage() {
    return ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100);
}
function pushPageExit(url) {
  performance.mark('pageExit');
  let timeOnPage = performance.measure('timeOnPage', 'pageStart', 'pageExit').duration / 1000;
  performance.clearMarks('timeOnPage');
  dataLayer.push({
    event: 'pageExit',
    exitUrl: url,
    timeOnPage: timeOnPage,
    scrollPercentage: currentScrollPercentage()
  });
}
let previousUrl;
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
  previousUrl = event.data.url;
  performance.mark('pageStart');
});

document.addEventListener("turbolinks:visit", function(event){
    var url = event.data.url;
    pushPageExit(url);
})
document.addEventListener('beforeunload', function() {
    let url = location.href;
    pushPageExit(url);
});
document.addEventListener('popstate', function(e){
    if (previousUrl) {
      pushPageExit(previousUrl);
    }
});
// Turbolinks処理開始
Turbolinks.start();
