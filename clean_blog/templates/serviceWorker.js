/*! For license information please see serviceWorker.js.LICENSE.txt */
(()=>{"use strict";var e={124:()=>{try{self["workbox:core:6.5.3"]&&_()}catch(e){}},515:()=>{try{self["workbox:precaching:6.5.3"]&&_()}catch(e){}},695:()=>{try{self["workbox:routing:6.5.3"]&&_()}catch(e){}},818:()=>{try{self["workbox:strategies:6.5.3"]&&_()}catch(e){}}},t={};function s(r){var a=t[r];if(void 0!==a)return a.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,s),n.exports}s(124);const r=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class a extends Error{constructor(e,t){super(r(e,t)),this.name=e,this.details=t}}const n={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},i=e=>[n.prefix,e,n.suffix].filter((e=>e&&e.length>0)).join("-"),o=e=>e||i(n.precache),c=e=>e||i(n.runtime);function h(e,t){const s=t();return e.waitUntil(s),s}s(515);function l(e){if(!e)throw new a("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:s}=e;if(!s)throw new a("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}const r=new URL(s,location.href),n=new URL(s,location.href);return r.searchParams.set("__WB_REVISION__",t),{cacheKey:r.href,url:n.href}}class u{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class d{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let f;async function g(e,t){let s=null;if(e.url){s=new URL(e.url).origin}if(s!==self.location.origin)throw new a("cross-origin-copy-response",{origin:s});const r=e.clone(),n={headers:new Headers(r.headers),status:r.status,statusText:r.statusText},i=t?t(n):n,o=function(){if(void 0===f){const e=new Response("");if("body"in e)try{new Response(e.body),f=!0}catch(e){f=!1}f=!1}return f}()?r.body:await r.blob();return new Response(o,i)}function p(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class w{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const y=new Set;s(818);function m(e){return"string"==typeof e?new Request(e):e}class R{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new w,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let s=m(e);if("navigate"===s.mode&&t instanceof FetchEvent&&t.preloadResponse){const e=await t.preloadResponse;if(e)return e}const r=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))s=await e({request:s.clone(),event:t})}catch(e){if(e instanceof Error)throw new a("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const n=s.clone();try{let e;e=await fetch(s,"navigate"===s.mode?void 0:this._strategy.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))e=await s({event:t,request:n,response:e});return e}catch(e){throw r&&await this.runCallbacks("fetchDidFail",{error:e,event:t,originalRequest:r.clone(),request:n.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=m(e);let s;const{cacheName:r,matchOptions:a}=this._strategy,n=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},a),{cacheName:r});s=await caches.match(n,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:r,matchOptions:a,cachedResponse:s,request:n,event:this.event})||void 0;return s}async cachePut(e,t){const s=m(e);var r;await(r=0,new Promise((e=>setTimeout(e,r))));const n=await this.getCacheKey(s,"write");if(!t)throw new a("cache-put-with-no-response",{url:(i=n.url,new URL(String(i),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var i;const o=await this._ensureResponseSafeToCache(t);if(!o)return!1;const{cacheName:c,matchOptions:h}=this._strategy,l=await self.caches.open(c),u=this.hasCallback("cacheDidUpdate"),d=u?await async function(e,t,s,r){const a=p(t.url,s);if(t.url===a)return e.match(t,r);const n=Object.assign(Object.assign({},r),{ignoreSearch:!0}),i=await e.keys(t,n);for(const t of i)if(a===p(t.url,s))return e.match(t,r)}(l,n.clone(),["__WB_REVISION__"],h):null;try{await l.put(n,u?o.clone():o)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of y)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:c,oldResponse:d,newResponse:o.clone(),request:n,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let r=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))r=m(await e({mode:t,request:r,event:this.event,params:this.params}));this._cacheKeys[s]=r}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),r=r=>{const a=Object.assign(Object.assign({},r),{state:s});return t[e](a)};yield r}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class b{constructor(e={}){this.cacheName=c(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,r="params"in e?e.params:void 0,a=new R(this,{event:t,request:s,params:r}),n=this._getResponse(a,s,t);return[n,this._awaitComplete(n,a,s,t)]}async _getResponse(e,t,s){let r;await e.runCallbacks("handlerWillStart",{event:s,request:t});try{if(r=await this._handle(t,e),!r||"error"===r.type)throw new a("no-response",{url:t.url})}catch(a){if(a instanceof Error)for(const n of e.iterateCallbacks("handlerDidError"))if(r=await n({error:a,event:s,request:t}),r)break;if(!r)throw a}for(const a of e.iterateCallbacks("handlerWillRespond"))r=await a({event:s,request:t,response:r});return r}async _awaitComplete(e,t,s,r){let a,n;try{a=await e}catch(n){}try{await t.runCallbacks("handlerDidRespond",{event:r,request:s,response:a}),await t.doneWaiting()}catch(e){e instanceof Error&&(n=e)}if(await t.runCallbacks("handlerDidComplete",{event:r,request:s,response:a,error:n}),t.destroy(),n)throw n}}class v extends b{constructor(e={}){e.cacheName=o(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(v.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let s;const r=t.params||{};if(!this._fallbackToNetwork)throw new a("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{0;const a=r.integrity,n=e.integrity,i=!n||n===a;if(s=await t.fetch(new Request(e,{integrity:"no-cors"!==e.mode?n||a:void 0})),a&&i&&"no-cors"!==e.mode){this._useDefaultCacheabilityPluginIfNeeded();await t.cachePut(e,s.clone());0}}return s}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const s=await t.fetch(e);if(!await t.cachePut(e,s.clone()))throw new a("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,r]of this.plugins.entries())r!==v.copyRedirectedCacheableResponsesPlugin&&(r===v.defaultPrecacheCacheabilityPlugin&&(e=s),r.cacheWillUpdate&&t++);0===t?this.plugins.push(v.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}v.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},v.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await g(e):e};class x{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new v({cacheName:o(e),plugins:[...t,new d({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const s of e){"string"==typeof s?t.push(s):s&&void 0===s.revision&&t.push(s.url);const{cacheKey:e,url:r}=l(s),n="string"!=typeof s&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(r)&&this._urlsToCacheKeys.get(r)!==e)throw new a("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(r),secondEntry:e});if("string"!=typeof s&&s.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==s.integrity)throw new a("add-to-cache-list-conflicting-integrities",{url:r});this._cacheKeysToIntegrities.set(e,s.integrity)}if(this._urlsToCacheKeys.set(r,e),this._urlsToCacheModes.set(r,n),t.length>0){t.join(", ");1}}}install(e){return h(e,(async()=>{const t=new u;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const r=this._cacheKeysToIntegrities.get(s),a=this._urlsToCacheModes.get(t),n=new Request(t,{integrity:r,cache:a,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:n,event:e}))}const{updatedURLs:s,notUpdatedURLs:r}=t;return{updatedURLs:s,notUpdatedURLs:r}}))}activate(e){return h(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),r=[];for(const a of t)s.has(a.url)||(await e.delete(a),r.push(a.url));return{deletedURLs:r}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new a("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:t},s.params),this.strategy.handle(s))}}let C;const k=()=>(C||(C=new x),C);s(695);const q=e=>e&&"object"==typeof e?e:{handle:e};class U{constructor(e,t,s="GET"){this.handler=q(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=q(e)}}class L extends U{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class E{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const r=s.origin===location.origin,{params:a,route:n}=this.findMatchingRoute({event:t,request:e,sameOrigin:r,url:s});let i=n&&n.handler;const o=e.method;if(!i&&this._defaultHandlerMap.has(o)&&(i=this._defaultHandlerMap.get(o)),!i)return void 0;let c;try{c=i.handle({url:s,request:e,event:t,params:a})}catch(e){c=Promise.reject(e)}const h=n&&n.catchHandler;return c instanceof Promise&&(this._catchHandler||h)&&(c=c.catch((async r=>{if(h){0;try{return await h.handle({url:s,request:e,event:t,params:a})}catch(e){e instanceof Error&&(r=e)}}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw r}))),c}findMatchingRoute({url:e,sameOrigin:t,request:s,event:r}){const a=this._routes.get(s.method)||[];for(const n of a){let a;const i=n.match({url:e,sameOrigin:t,request:s,event:r});if(i)return a=i,(Array.isArray(a)&&0===a.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(a=void 0),{route:n,params:a}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,q(e))}setCatchHandler(e){this._catchHandler=q(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new a("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new a("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let T;class K extends U{constructor(e,t){super((({request:s})=>{const r=e.getURLsToCacheKeys();for(const a of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:r=!0,urlManipulation:a}={}){const n=new URL(e,location.href);n.hash="",yield n.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(n,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(r){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:n});for(const t of e)yield t.href}}(s.url,t)){const t=r.get(a);if(t){return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}}),e.strategy)}}function P(e){const t=k();!function(e,t,s){let r;if("string"==typeof e){const a=new URL(e,location.href);r=new U((({url:e})=>e.href===a.href),t,s)}else if(e instanceof RegExp)r=new L(e,t,s);else if("function"==typeof e)r=new U(e,t,s);else{if(!(e instanceof U))throw new a("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});r=e}(T||(T=new E,T.addFetchListener(),T.addCacheListener()),T).registerRoute(r)}(new K(t,e))}var N;self.__precacheManifest=(self.__precacheManifest||[{'revision':'e3d2ff23d0876aedb628647e423b9ae5','url':'/static/webpack_bundles/../../templates/serviceWorker.js.LICENSE.txt'},{'revision':null,'url':'/static/webpack_bundles/0317d582b93c20f68e05.woff2?v=4.6.3'},{'revision':null,'url':'/static/webpack_bundles/09b9015b1ecaf95655b1.eot'},{'revision':null,'url':'/static/webpack_bundles/09b9015b1ecaf95655b1.eot?v=4.6.3'},{'revision':null,'url':'/static/webpack_bundles/4692b9ec53fd5972caa2.ttf'},{'revision':null,'url':'/static/webpack_bundles/5be1347c682810f199c7.eot'},{'revision':null,'url':'/static/webpack_bundles/82b1212e45a2bc35dd73.woff'},{'revision':null,'url':'/static/webpack_bundles/be810be3a3e14c682a25.woff2'},{'revision':null,'url':'/static/webpack_bundles/bundle-2a6b280e70add7e7bd68.css'},{'revision':null,'url':'/static/webpack_bundles/bundle-2a6b280e70add7e7bd68.js'},{'revision':'3b6a3931c8409ea564102f0c4ee2b6ae','url':'/static/webpack_bundles/bundle-2a6b280e70add7e7bd68.js.LICENSE.txt'},{'revision':null,'url':'/static/webpack_bundles/f0af1680f082547a7aae.ttf?v=4.6.3'},{'revision':null,'url':'/static/webpack_bundles/f7f1738ca345185e0185.woff?v=4.6.3'},{'revision':null,'url':'/static/webpack_bundles/pjax-2a6b280e70add7e7bd68.js'},{'revision':'728b11954fe828fe64cc703cd812a3d2','url':'/static/webpack_bundles/pjax-2a6b280e70add7e7bd68.js.LICENSE.txt'},{'revision':null,'url':'/static/webpack_bundles/vendor-2a6b280e70add7e7bd68.js'},{'revision':'dff942a9443f557a640873d4bae7b7c2','url':'/static/webpack_bundles/vendor-2a6b280e70add7e7bd68.js.LICENSE.txt'}]).concat([{url:"/static/js/html5shiv.js"},{url:"/static/js/respond.min.js"},{url:"/static/img/home-bg-800.jpg"},{url:"/static/img/home-bg-1600.jpg"}]),function(e){k().precache(e)}(__precacheManifest),P(N),workbox.routing.registerRoute(new RegExp("(/$|/?utm_source.+$)"),workbox.strategies.networkFirst({cacheName:"root",plugins:[new workbox.expiration.Plugin({maxAgeSeconds:864e3,maxEntries:10})]}),"GET"),workbox.routing.registerRoute(new RegExp("/?page=.+$"),workbox.strategies.networkFirst({cacheName:"pages",plugins:[new workbox.expiration.Plugin({maxAgeSeconds:864e3,maxEntries:10})]}),"GET"),workbox.routing.registerRoute(new RegExp("/search?q=.*$"),workbox.strategies.networkFirst({cacheName:"search",plugins:[new workbox.expiration.Plugin({maxAgeSeconds:864e3,maxEntries:10})]}),"GET"),workbox.routing.registerRoute(new RegExp("/blog/category/.+$"),workbox.strategies.networkFirst({cacheName:"category",plugins:[new workbox.expiration.Plugin({maxAgeSeconds:864e3,maxEntries:10})]}),"GET"),workbox.routing.registerRoute(new RegExp("/blog/.+$"),workbox.strategies.cacheFirst({cacheName:"entry",plugins:[new workbox.expiration.Plugin({maxAgeSeconds:2592e3,maxEntries:30})]}),"GET"),workbox.routing.registerRoute(new RegExp("/about.*"),workbox.strategies.cacheFirst({cacheName:"about",plugins:[new workbox.expiration.Plugin({maxAgeSeconds:2592e3,maxEntries:1})]}),"GET")})();