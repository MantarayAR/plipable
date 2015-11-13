Meteor.methods({
  comment: function(videoId, message, videoTimestamp) {
    check(videoId, String);
    check(message, String);
    check(videoTimestamp, Number);

    dispatch(new CheckPlayerIsLoggedInCommand());

    message = message.trim();
    if (message === '') {
      throw new Meteor.Error('message-is-empty', 'Your plip can\'t be empty!');
    }

    if (message.length > 250) {
      throw new Meteor.Error('message-too-long', 'Keep your plip under 1000 characters!'); 
    }

    var username  = Meteor.user().services.twitter.screenName;
    var thumbnail = Meteor.user().services.twitter.profile_image_url_https || '';

    dispatch(new AnalyticsEventCommand(), 'plip', 'New Plip', videoId);

    dispatch(new AddNewPlipCommand(), videoId, username, thumbnail, message, videoTimestamp);
  },
  delete: function(plipId) {
    check(plipId, String);

    dispatch(new CheckPlayerIsLoggedInCommand());

    var username  = Meteor.user().services.twitter.screenName;

    dispatch(new UserDeletePlipCommand(), plipId, username);
  }
})