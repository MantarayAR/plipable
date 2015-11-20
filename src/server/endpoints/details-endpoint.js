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

    if (response.result) {
      if (response.result.items) {
        if (response.result.items[0]) {
          var video   = response.result.items[0];
          var videoId = video.id;
          var videoType = 'youtube';
          var title = video.snippet.title;
          var description = video.snippet.description;
          var thumbnail = video.snippet.thumbnails['default'].url;
          var tags = video.snippet.tags;

          dispatch(new UpsertVideoCommand(), videoId, videoType, title, thumbnail, description, tags);

          return video;
        }
      }
    }

    throw new Meteor.Error("video-not-found", "That youtube video could not be found");
  }
});