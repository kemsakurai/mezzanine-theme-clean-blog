!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=1)}([,function(t,e,r){t.exports=r(2)},function(t,e,r){"use strict";var n,o=r(3),i=(n=o)&&n.__esModule?n:{default:n};document.addEventListener("turbolinks:load",function(t){var e=t.data.url;dataLayer.push({event:"turbolinks_load_pageView",virtualUrl:e}),dataLayer.push({event:"optimize.activate",virtualUrl:e})}),i.default.start()},function(t,e,r){var n,o;(function(){(function(){(function(){this.Turbolinks={supported:null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener,visit:function(t,e){return i.controller.visit(t,e)},clearCache:function(){return i.controller.clearCache()},setProgressBarDelay:function(t){return i.controller.setProgressBarDelay(t)}}}).call(this)}).call(this);var i=this.Turbolinks;(function(){(function(){var t,e,r,n=[].slice;i.copyObject=function(t){var e,r,n;for(e in r={},t)n=t[e],r[e]=n;return r},i.closest=function(e,r){return t.call(e,r)},t=function(){var t;return null!=(t=document.documentElement.closest)?t:function(t){var r;for(r=this;r;){if(r.nodeType===Node.ELEMENT_NODE&&e.call(r,t))return r;r=r.parentNode}}}(),i.defer=function(t){return setTimeout(t,1)},i.throttle=function(t){var e;return e=null,function(){var r,o;return r=1<=arguments.length?n.call(arguments,0):[],null!=e?e:e=requestAnimationFrame((o=this,function(){return e=null,t.apply(o,r)}))}},i.dispatch=function(t,e){var n,o,i,s,a,u;return u=(a=null!=e?e:{}).target,n=a.cancelable,o=a.data,(i=document.createEvent("Events")).initEvent(t,!0,!0===n),i.data=null!=o?o:{},i.cancelable&&!r&&(s=i.preventDefault,i.preventDefault=function(){return this.defaultPrevented||Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}}),s.call(this)}),(null!=u?u:document).dispatchEvent(i),i},r=function(){var t;return(t=document.createEvent("Events")).initEvent("test",!0,!0),t.preventDefault(),t.defaultPrevented}(),i.match=function(t,r){return e.call(t,r)},e=function(){var t,e,r,n;return null!=(e=null!=(r=null!=(n=(t=document.documentElement).matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),i.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){i.Location=function(){function t(t){var e,r;null==t&&(t=""),(r=document.createElement("a")).href=t.toString(),this.absoluteURL=r.href,2>(e=r.hash.length)?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.requestURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};i.HttpRequest=function(){function e(e,r,n){this.delegate=e,this.requestCanceled=t(this.requestCanceled,this),this.requestTimedOut=t(this.requestTimedOut,this),this.requestFailed=t(this.requestFailed,this),this.requestLoaded=t(this.requestLoaded,this),this.requestProgressed=t(this.requestProgressed,this),this.url=i.Location.wrap(r).requestURL,this.referrer=i.Location.wrap(n).absoluteURL,this.createXHR()}return e.NETWORK_FAILURE=0,e.TIMEOUT_FAILURE=-1,e.timeout=60,e.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},e.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},e.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},e.prototype.requestLoaded=function(){return this.endRequest((t=this,function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}));var t},e.prototype.requestFailed=function(){return this.endRequest((t=this,function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}));var t},e.prototype.requestTimedOut=function(){return this.endRequest((t=this,function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}));var t},e.prototype.requestCanceled=function(){return this.endRequest()},e.prototype.notifyApplicationBeforeRequestStart=function(){return i.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},e.prototype.notifyApplicationAfterRequestEnd=function(){return i.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},e.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},e.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},e.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},e.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};i.ProgressBar=function(){function e(){this.trickle=t(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,e.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width 300ms ease-out, opacity 150ms 150ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",e.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},e.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement((t=this,function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}))):void 0;var t},e.prototype.setValue=function(t){return this.value=t,this.refresh()},e.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},e.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},e.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,450)},e.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},e.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},e.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},e.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},e.prototype.refresh=function(){return requestAnimationFrame((t=this,function(){return t.progressElement.style.width=10+90*t.value+"%"}));var t},e.prototype.createStylesheetElement=function(){var t;return(t=document.createElement("style")).type="text/css",t.textContent=this.constructor.defaultCSS,t},e.prototype.createProgressElement=function(){var t;return(t=document.createElement("div")).className="turbolinks-progress-bar",t},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};i.BrowserAdapter=function(){function e(e){this.controller=e,this.showProgressBar=t(this.showProgressBar,this),this.progressBar=new i.ProgressBar}var r,n,o;return o=i.HttpRequest,r=o.NETWORK_FAILURE,n=o.TIMEOUT_FAILURE,e.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},e.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},e.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},e.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},e.prototype.visitRequestCompleted=function(t){return t.loadResponse()},e.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case r:case n:return this.reload();default:return t.loadResponse()}},e.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},e.prototype.visitCompleted=function(t){return t.followRedirect()},e.prototype.pageInvalidated=function(){return this.reload()},e.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,this.controller.progressBarDelay)},e.prototype.showProgressBar=function(){return this.progressBar.show()},e.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},e.prototype.reload=function(){return window.location.reload()},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};i.History=function(){function e(e){this.delegate=e,this.onPageLoad=t(this.onPageLoad,this),this.onPopState=t(this.onPopState,this)}return e.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},e.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},e.prototype.push=function(t,e){return t=i.Location.wrap(t),this.update("push",t,e)},e.prototype.replace=function(t,e){return t=i.Location.wrap(t),this.update("replace",t,e)},e.prototype.onPopState=function(t){var e,r,n,o;return this.shouldHandlePopState()&&(o=null!=(r=t.state)?r.turbolinks:void 0)?(e=i.Location.wrap(window.location),n=o.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(e,n)):void 0},e.prototype.onPageLoad=function(t){return i.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},e.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},e.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},e.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},e}()}.call(this),function(){i.HeadDetails=function(){function t(t){var e,r,n,s,a;for(this.elements={},r=0,s=t.length;s>r;r++)(a=t[r]).nodeType===Node.ELEMENT_NODE&&(n=a.outerHTML,(null!=(e=this.elements)[n]?e[n]:e[n]={type:i(a),tracked:o(a),elements:[]}).elements.push(a))}var e,r,n,o,i;return t.fromHeadElement=function(t){var e;return new this(null!=(e=null!=t?t.childNodes:void 0)?e:[])},t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t;return function(){var e,r;for(t in r=[],e=this.elements)e[t].tracked&&r.push(t);return r}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;for(n in s=[],o=this.elements)a=(i=o[n]).type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;for(e in r=[],n=this.elements)s=(o=n[e]).type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},t.prototype.getMetaValue=function(t){var e;return null!=(e=this.findMetaElementByName(t))?e.getAttribute("content"):void 0},t.prototype.findMetaElementByName=function(t){var r,n,o,i;for(o in r=void 0,i=this.elements)n=i[o].elements,e(n[0],t)&&(r=n[0]);return r},i=function(t){return r(t)?"script":n(t)?"stylesheet":void 0},o=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},r=function(t){return"script"===t.tagName.toLowerCase()},n=function(t){var e;return"style"===(e=t.tagName.toLowerCase())||"link"===e&&"stylesheet"===t.getAttribute("rel")},e=function(t,e){return"meta"===t.tagName.toLowerCase()&&t.getAttribute("name")===e},t}()}.call(this),function(){i.Snapshot=function(){function t(t,e){this.headDetails=t,this.bodyElement=e}return t.wrap=function(t){return t instanceof this?t:"string"==typeof t?this.fromHTMLString(t):this.fromHTMLElement(t)},t.fromHTMLString=function(t){var e;return(e=document.createElement("html")).innerHTML=t,this.fromHTMLElement(e)},t.fromHTMLElement=function(t){var e,r,n;return r=t.querySelector("head"),e=null!=(n=t.querySelector("body"))?n:document.createElement("body"),new this(i.HeadDetails.fromHeadElement(r),e)},t.prototype.clone=function(){return new this.constructor(this.headDetails,this.bodyElement.cloneNode(!0))},t.prototype.getRootLocation=function(){var t,e;return e=null!=(t=this.getSetting("root"))?t:"/",new i.Location(e)},t.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},t.prototype.getElementForAnchor=function(t){try{return this.bodyElement.querySelector("[id='"+t+"'], a[name='"+t+"']")}catch(t){}},t.prototype.getPermanentElements=function(){return this.bodyElement.querySelectorAll("[id][data-turbolinks-permanent]")},t.prototype.getPermanentElementById=function(t){return this.bodyElement.querySelector("#"+t+"[data-turbolinks-permanent]")},t.prototype.getPermanentElementsPresentInSnapshot=function(t){var e,r,n,o,i;for(i=[],r=0,n=(o=this.getPermanentElements()).length;n>r;r++)e=o[r],t.getPermanentElementById(e.id)&&i.push(e);return i},t.prototype.findFirstAutofocusableElement=function(){return this.bodyElement.querySelector("[autofocus]")},t.prototype.hasAnchor=function(t){return null!=this.getElementForAnchor(t)},t.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},t.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},t.prototype.isVisitable=function(){return"reload"!==this.getSetting("visit-control")},t.prototype.getSetting=function(t){return this.headDetails.getMetaValue("turbolinks-"+t)},t}()}.call(this),function(){var t=[].slice;i.Renderer=function(){function e(){}var r;return e.render=function(){var e,r,n;return r=arguments[0],e=arguments[1],(n=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,3<=arguments.length?t.call(arguments,2):[],function(){})).delegate=r,n.render(e),n},e.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},e.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},e.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:((e=document.createElement("script")).textContent=t.textContent,e.async=!1,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(a=[],r=0,n=(i=e.attributes).length;n>r;r++)o=(s=i[r]).name,u=s.value,a.push(t.setAttribute(o,u));return a},e}()}.call(this),function(){var t,e,r=function(t,e){function r(){this.constructor=t}for(var o in e)n.call(e,o)&&(t[o]=e[o]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},n={}.hasOwnProperty;i.SnapshotRenderer=function(n){function o(t,e,r){this.currentSnapshot=t,this.newSnapshot=e,this.isPreview=r,this.currentHeadDetails=this.currentSnapshot.headDetails,this.newHeadDetails=this.newSnapshot.headDetails,this.currentBody=this.currentSnapshot.bodyElement,this.newBody=this.newSnapshot.bodyElement}return r(o,n),o.prototype.render=function(t){return this.shouldRender()?(this.mergeHead(),this.renderView((e=this,function(){return e.replaceBody(),e.isPreview||e.focusFirstAutofocusableElement(),t()}))):this.invalidateView();var e},o.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},o.prototype.replaceBody=function(){var t;return t=this.relocateCurrentBodyPermanentElements(),this.activateNewBodyScriptElements(),this.assignNewBody(),this.replacePlaceholderElementsWithClonedPermanentElements(t)},o.prototype.shouldRender=function(){return this.newSnapshot.isVisitable()&&this.trackedElementsAreIdentical()},o.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},o.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(o=[],e=0,r=(n=this.getNewHeadStylesheetElements()).length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},o.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(o=[],e=0,r=(n=this.getNewHeadScriptElements()).length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},o.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(o=[],e=0,r=(n=this.getCurrentHeadProvisionalElements()).length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},o.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(o=[],e=0,r=(n=this.getNewHeadProvisionalElements()).length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},o.prototype.relocateCurrentBodyPermanentElements=function(){var r,n,o,i,s,a,u;for(u=[],r=0,n=(a=this.getCurrentBodyPermanentElements()).length;n>r;r++)i=a[r],s=t(i),o=this.newSnapshot.getPermanentElementById(i.id),e(i,s.element),e(o,i),u.push(s);return u},o.prototype.replacePlaceholderElementsWithClonedPermanentElements=function(t){var r,n,o,i,s,a;for(a=[],o=0,i=t.length;i>o;o++)n=(s=t[o]).element,r=s.permanentElement.cloneNode(!0),a.push(e(n,r));return a},o.prototype.activateNewBodyScriptElements=function(){var t,r,n,o,i,s;for(s=[],r=0,o=(i=this.getNewBodyScriptElements()).length;o>r;r++)n=i[r],t=this.createScriptElement(n),s.push(e(n,t));return s},o.prototype.assignNewBody=function(){return document.body=this.newBody},o.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.newSnapshot.findFirstAutofocusableElement())?t.focus():void 0},o.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},o.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},o.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},o.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},o.prototype.getCurrentBodyPermanentElements=function(){return this.currentSnapshot.getPermanentElementsPresentInSnapshot(this.newSnapshot)},o.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},o}(i.Renderer),t=function(t){var e;return(e=document.createElement("meta")).setAttribute("name","turbolinks-permanent-placeholder"),e.setAttribute("content",t.id),{element:e,permanentElement:t}},e=function(t,e){var r;return(r=t.parentNode)?r.replaceChild(e,t):void 0}}.call(this),function(){var t=function(t,r){function n(){this.constructor=t}for(var o in r)e.call(r,o)&&(t[o]=r[o]);return n.prototype=r.prototype,t.prototype=new n,t.__super__=r.prototype,t},e={}.hasOwnProperty;i.ErrorRenderer=function(e){function r(t){var e;(e=document.createElement("html")).innerHTML=t,this.newHead=e.querySelector("head"),this.newBody=e.querySelector("body")}return t(r,e),r.prototype.render=function(t){return this.renderView((e=this,function(){return e.replaceHeadAndBody(),e.activateBodyScriptElements(),t()}));var e},r.prototype.replaceHeadAndBody=function(){var t,e;return e=document.head,t=document.body,e.parentNode.replaceChild(this.newHead,e),t.parentNode.replaceChild(this.newBody,t)},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(i=[],e=0,r=(n=this.getScriptElements()).length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(i.Renderer)}.call(this),function(){i.View=function(){function t(t){this.delegate=t,this.htmlElement=document.documentElement}return t.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},t.prototype.getElementForAnchor=function(t){return this.getSnapshot().getElementForAnchor(t)},t.prototype.getSnapshot=function(){return i.Snapshot.fromHTMLElement(this.htmlElement)},t.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,n,e):this.renderError(r,e)},t.prototype.markAsPreview=function(t){return t?this.htmlElement.setAttribute("data-turbolinks-preview",""):this.htmlElement.removeAttribute("data-turbolinks-preview")},t.prototype.renderSnapshot=function(t,e,r){return i.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),i.Snapshot.wrap(t),e)},t.prototype.renderError=function(t,e){return i.ErrorRenderer.render(this.delegate,e,t)},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};i.ScrollManager=function(){function e(e){this.delegate=e,this.onScroll=t(this.onScroll,this),this.onScroll=i.throttle(this.onScroll)}return e.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},e.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},e.prototype.scrollToElement=function(t){return t.scrollIntoView()},e.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},e.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},e.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},e}()}.call(this),function(){i.SnapshotCache=function(){function t(t){this.size=t,this.keys=[],this.snapshots={}}var e;return t.prototype.has=function(t){return e(t)in this.snapshots},t.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},t.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},t.prototype.read=function(t){var r;return r=e(t),this.snapshots[r]},t.prototype.write=function(t,r){var n;return n=e(t),this.snapshots[n]=r},t.prototype.touch=function(t){var r,n;return n=e(t),(r=this.keys.indexOf(n))>-1&&this.keys.splice(r,1),this.keys.unshift(n),this.trim()},t.prototype.trim=function(){var t,e,r,n,o;for(o=[],t=0,r=(n=this.keys.splice(this.size)).length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},e=function(t){return i.Location.wrap(t).toCacheKey()},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};i.Visit=function(){function e(e,r,n){this.controller=e,this.action=n,this.performScroll=t(this.performScroll,this),this.identifier=i.uuid(),this.location=i.Location.wrap(r),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var r;return e.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},e.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},e.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},e.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},e.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=r(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},e.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new i.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},e.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},e.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},e.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},e.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},e.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},e.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},e.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},e.prototype.requestCompletedWithResponse=function(t,e){return this.response=t,null!=e&&(this.redirectedToLocation=i.Location.wrap(e)),this.adapter.visitRequestCompleted(this)},e.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},e.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},e.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},e.prototype.scrollToRestoredPosition=function(){var t,e;return null!=(t=null!=(e=this.restorationData)?e.scrollPosition:void 0)?(this.controller.scrollToPosition(t),!0):void 0},e.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},e.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},e.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},e.prototype.getTimingMetrics=function(){return i.copyObject(this.timingMetrics)},r=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},e.prototype.shouldIssueRequest=function(){return"restore"!==this.action||!this.hasCachedSnapshot()},e.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},e.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame((e=this,function(){return e.frame=null,t.call(e)}));var e},e.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};i.Controller=function(){function e(){this.clickBubbled=t(this.clickBubbled,this),this.clickCaptured=t(this.clickCaptured,this),this.pageLoaded=t(this.pageLoaded,this),this.history=new i.History(this),this.view=new i.View(this),this.scrollManager=new i.ScrollManager(this),this.restorationData={},this.clearCache(),this.setProgressBarDelay(500)}return e.prototype.start=function(){return i.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},e.prototype.disable=function(){return this.enabled=!1},e.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},e.prototype.clearCache=function(){return this.cache=new i.SnapshotCache(10)},e.prototype.visit=function(t,e){var r,n;return null==e&&(e={}),t=i.Location.wrap(t),this.applicationAllowsVisitingLocation(t)?this.locationIsVisitable(t)?(r=null!=(n=e.action)?n:"advance",this.adapter.visitProposedToLocationWithAction(t,r)):window.location=t:void 0},e.prototype.startVisitToLocationWithAction=function(t,e,r){var n;return i.supported?(n=this.getRestorationDataForIdentifier(r),this.startVisit(t,e,{restorationData:n})):window.location=t},e.prototype.setProgressBarDelay=function(t){return this.progressBarDelay=t},e.prototype.startHistory=function(){return this.location=i.Location.wrap(window.location),this.restorationIdentifier=i.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},e.prototype.stopHistory=function(){return this.history.stop()},e.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(t,e){return this.restorationIdentifier=e,this.location=i.Location.wrap(t),this.history.push(this.location,this.restorationIdentifier)},e.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(t,e){return this.restorationIdentifier=e,this.location=i.Location.wrap(t),this.history.replace(this.location,this.restorationIdentifier)},e.prototype.historyPoppedToLocationWithRestorationIdentifier=function(t,e){var r;return this.restorationIdentifier=e,this.enabled?(r=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(t,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:r,historyChanged:!0}),this.location=i.Location.wrap(t)):this.adapter.pageInvalidated()},e.prototype.getCachedSnapshotForLocation=function(t){var e;return null!=(e=this.cache.get(t))?e.clone():void 0},e.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},e.prototype.cacheSnapshot=function(){var t,e;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),e=this.view.getSnapshot(),t=this.lastRenderedLocation,i.defer(function(r){return function(){return r.cache.put(t,e.clone())}}(this))):void 0},e.prototype.scrollToAnchor=function(t){var e;return(e=this.view.getElementForAnchor(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},e.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},e.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},e.prototype.scrollPositionChanged=function(t){return this.getCurrentRestorationData().scrollPosition=t},e.prototype.render=function(t,e){return this.view.render(t,e)},e.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},e.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},e.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},e.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},e.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},e.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},e.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){return!this.notifyApplicationAfterClickingLinkToLocation(t,e).defaultPrevented},e.prototype.applicationAllowsVisitingLocation=function(t){return!this.notifyApplicationBeforeVisitingLocation(t).defaultPrevented},e.prototype.notifyApplicationAfterClickingLinkToLocation=function(t,e){return i.dispatch("turbolinks:click",{target:t,data:{url:e.absoluteURL},cancelable:!0})},e.prototype.notifyApplicationBeforeVisitingLocation=function(t){return i.dispatch("turbolinks:before-visit",{data:{url:t.absoluteURL},cancelable:!0})},e.prototype.notifyApplicationAfterVisitingLocation=function(t){return i.dispatch("turbolinks:visit",{data:{url:t.absoluteURL}})},e.prototype.notifyApplicationBeforeCachingSnapshot=function(){return i.dispatch("turbolinks:before-cache")},e.prototype.notifyApplicationBeforeRender=function(t){return i.dispatch("turbolinks:before-render",{data:{newBody:t}})},e.prototype.notifyApplicationAfterRender=function(){return i.dispatch("turbolinks:render")},e.prototype.notifyApplicationAfterPageLoad=function(t){return null==t&&(t={}),i.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:t}})},e.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},e.prototype.createVisit=function(t,e,r){var n,o,s,a,u;return a=(o=null!=r?r:{}).restorationIdentifier,s=o.restorationData,n=o.historyChanged,(u=new i.Visit(this,t,e)).restorationIdentifier=null!=a?a:i.uuid(),u.restorationData=i.copyObject(s),u.historyChanged=n,u.referrer=this.location,u},e.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},e.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},e.prototype.getVisitableLinkForNode=function(t){return this.nodeIsVisitable(t)?i.closest(t,"a[href]:not([target]):not([download])"):void 0},e.prototype.getVisitableLocationForLink=function(t){var e;return e=new i.Location(t.getAttribute("href")),this.locationIsVisitable(e)?e:void 0},e.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},e.prototype.nodeIsVisitable=function(t){var e;return!(e=i.closest(t,"[data-turbolinks]"))||"false"!==e.getAttribute("data-turbolinks")},e.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},e.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},e.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},e}()}.call(this),function(){!function(){var t,e;if((t=e=document.currentScript)&&!e.hasAttribute("data-turbolinks-suppress-warning"))for(;t=t.parentNode;)if(t===document.body)return console.warn("You are loading Turbolinks from a <script> element inside the <body> element. This is probably not what you meant to do!\n\nLoad your application’s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.\n\nFor more information, see: https://github.com/turbolinks/turbolinks#working-with-script-elements\n\n——\nSuppress this warning by adding a `data-turbolinks-suppress-warning` attribute to: %s",e.outerHTML)}()}.call(this),function(){var t,e,r;i.start=function(){return e()?(null==i.controller&&(i.controller=t()),i.controller.start()):void 0},e=function(){return null==window.Turbolinks&&(window.Turbolinks=i),r()},t=function(){var t;return(t=new i.Controller).adapter=new i.BrowserAdapter(t),t},(r=function(){return window.Turbolinks===i})()&&i.start()}.call(this)}).call(this),t.exports?t.exports=i:void 0===(o="function"==typeof(n=i)?n.call(e,r,e,t):n)||(t.exports=o)}).call(this)}]);