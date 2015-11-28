var s = document.createElement('script');
s.src = chrome.extension.getURL('index.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);

var alreadyAttached = false;
var injectLoggedInAsUserId = function(response) {
  var userId = response.userId;
  var appToken = response.appToken;

  var actualCode = [
    '+function() {',
      'window.plipableLoginAsUser("' + userId + '", "' + appToken + '");',
    '}();'
  ].join('\n');

  var script = document.createElement('script');
  script.textContent = actualCode;
  (document.head||document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
}

var _boot = function () {
  if (!alreadyAttached) {
    alreadyAttached = true;

    document.addEventListener('plipable-login-event', function(e) {
      chrome.runtime.sendMessage(e, {}, function(response) {
        injectLoggedInAsUserId(response);
      });
    }, false);
  }
}

var observer = new MutationObserver(_boot);
var config   = { attributes: true, childList: true, characterData: true };
observer.observe(document.getElementById('content'), config);

_boot();


