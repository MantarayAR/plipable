CreateAppTokenForUserCommand = function() {
  var _guid = function() {
    var _s4 = function() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return _s4() + _s4() + '-' + _s4() + '-' + _s4() + '-' +
      _s4() + '-' + _s4() + _s4() + _s4();
  }

  var handle = function(userId) {
    var token = _guid();

    AppTokens.insert({
      userId: userId,
      token: token
    });

    return token;
  };

  return {
    handle: handle
  }
}