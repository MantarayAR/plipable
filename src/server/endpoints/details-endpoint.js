YoutubeApi.authenticate({
  type: 'key',
  key: Meteor.settings.google_key
});

Meteor.methods({
  details: function(videoId) {
    var response = Async.runSync(function(done) {
      YoutubeApi.videos.list({
          part: "id,snippet,contentDetails,player",
          type: "video",
          maxResults: 1,
          'id': videoId,
      }, function (err, data) {
        if (err) {
          throw err;  
        }
        
        done(err, data);
      });
    });

    // TODO make sure we have the video in the mongo database

    if (response.result) {
      if (response.result.items) {
        if (response.result.items[0]) {
          return response.result.items[0];
        }
      }
    }

    throw new Meteor.Error("video-not-found", "That youtube video could not be found");
  }
});