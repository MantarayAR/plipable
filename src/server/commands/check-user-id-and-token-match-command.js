CheckUserIdAndTokenMatchCommand = function() {
  var handle = function(userId, token) {
    var found = AppTokens.findOne({
      userId: userId,
      token: token,
      deleted: {
        $ne: true
      }
    });

    if (found !== null) {
      return true;
    } else {
      return false;
    }
  };

  return {
    handle: handle
  };
}