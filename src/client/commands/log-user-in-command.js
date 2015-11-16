LogUserInCommand = function() {
  var handle = function() {
    var options   = {};
    var callbacks = [];

    if (window.isMobile()) {
      options.loginStyle  = 'redirect';
    } else {
      callbacks.push(function() { FlowRouter.reload(); });
    }

    Meteor.loginWithTwitter(options, function () {
      _.each(callbacks, function(callback) {
        callback();
      })
    });
  };

  return {
    handle: handle
  }
};
