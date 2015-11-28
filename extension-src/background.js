window.Q = require('asteroid/node_modules/q/q');
window.DDP = require('asteroid/node_modules/ddp.js/src/ddp');
var Asteroid = require('plugins/asteroid-with-twitter');
var settings = require('json!settings.json');

chrome.runtime.onMessage.addListener(function(myMessage, sender, sendResponse){
  var a = new Asteroid(settings.hostName, true);

  var promise = a.loginWithTwitter();

  promise.then(function(userId) {
    // We have the user's id, time
    // to get an app token
    var appPromise = a.call('appToken', userId);

    appPromise.result.then(function(appToken) {
      console.log(appToken);
      // Here we have an app token,
      // send the userId and the appToken
      // back to the injected script
      sendResponse({
        userId: userId,
        appToken: appToken
      });
    });
  });

  // We are indicating that this request will
  // be asynchronous and we will be calling
  // sendResponse
  return true;
});
