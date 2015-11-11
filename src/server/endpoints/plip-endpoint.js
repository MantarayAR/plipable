Meteor.methods({
  comment: function(videoId, message, videoTimestamp) {
    check(videoId, String);
    check(message, String);
    check(videoTimestamp, Number);

    // TODO check user is logged in

    // TODO verify that the plip is not empty

    var username  = Meteor.user().services.twitter.screenName;
    var thumbnail = Meteor.user().services.twitter.profile_image_url_https || '';

    dispatch(new AddNewPlipCommand(), videoId, username, thumbnail, message, videoTimestamp);
  }
})