Meteor.methods({
  appToken: function(userId) {
    dispatch(new CheckPlayerIsLoggedInCommand());

    if (userId !== Meteor.user()._id) {
      throw new Meteor.Error('swiper-no-swiping', 'You can\'t authenticate as a user besides your own');
    }

    var token = dispatch(new CreateAppTokenForUserCommand(), userId);

    return token;
  }
});
