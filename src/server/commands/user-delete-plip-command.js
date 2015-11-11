UserDeletePlipCommand = function() {
  var handle = function(plipId, username) {
    return Plips.update({
      _id: plipId,
      username: username
    }, {
      $set: {
        deleted: true
      }
    });
  }

  return {
    handle: handle
  }
};