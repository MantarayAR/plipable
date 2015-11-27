window.Q = require('asteroid/node_modules/q/q');
window.DDP = require('asteroid/node_modules/ddp.js/src/ddp');
var Asteroid = require('plugins/asteroid-with-twitter');
var settings = require('json!settings.json');

chrome.runtime.onMessage.addListener(function(myMessage, sender, sendResponse){
  var a = new Asteroid(settings.hostName, true);

  var promise = a.loginWithTwitter();

  promise.then(function(result) {
    console.log(result);
    sendResponse(result);
  }, function(reason) {
    console.log(reason);
  });

  // We are indicating that this request will
  // be asynchronous and we will be calling
  // sendResponse
  return true;
});
