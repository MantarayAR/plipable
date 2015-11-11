CheckPlayerIsLoggedInCommand = function () {
  var handle = function () {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
  }

  return {
    handle: handle
  }
}