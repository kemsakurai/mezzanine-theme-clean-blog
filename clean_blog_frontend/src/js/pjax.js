import Turbo from "@hotwired/turbo"

function currentScrollPercentage() {
  return ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100);
}

function pushPageExit(url) {
  performance.mark('pageExit');
  let timeOnPage;
  try {
    timeOnPage = performance.measure('timeOnPage', 'pageStart', 'pageExit').duration / 1000;
  } catch (e) {
    timeOnPage = performance.measure('timeOnPage', undefined, 'pageExit').duration / 1000;
  }
  dataLayer.push({
    event: 'pageExit',
    exitUrl: url,
    timeOnPage: timeOnPage,
    scrollPercentage: currentScrollPercentage(),
  });
  performance.clearMarks();
  performance.clearMeasures();
}

let previousUrl;
document.addEventListener('DOMContentLoaded', function() {
  previousUrl = location.href;
  performance.mark('pageStart');
});

// Turboで遷移した場合の初期化処理
document.addEventListener('turbo:load', function(event) {
  const url = event.data.url;
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
  const ads = document.querySelectorAll('.adsbygoogle');
  if (ads.length > 0) {
    ads.forEach(function (ad) {
      if (ad.firstChild) {
        ad.removeChild(ad.firstChild);
      }
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    });
  }
});
document.addEventListener('turbo:visit', function(event) {
  const url = event.data.url;
  pushPageExit(url);
});
document.addEventListener('beforeunload', function() {
  const url = location.href;
  pushPageExit(url);
});
document.addEventListener('popstate', function(e) {
  if (previousUrl) {
    pushPageExit(previousUrl);
  }
});