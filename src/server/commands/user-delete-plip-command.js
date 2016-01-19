UserDeletePlipCommand = function() {
  var handle = function(plipId, username, userId) {
    if (Roles.userIsInRole(userId, ['admin'], Roles.GLOBAL_GROUP)) {
      // Really remove the plip for admins
      return Plips.remove({
        _id: plipId
      });
    } else {
      return Plips.update({
        _id: plipId,
        username: username
      }, {
        $set: {
          deleted: true
        }
      });
    }
  }

  return {
    handle: handle
  }
};