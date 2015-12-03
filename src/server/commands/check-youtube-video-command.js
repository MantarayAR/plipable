CheckYoutubeVideoCommand = function () {
  var handle = function (videoId) {
    var videos = Videos.find({
      videoId: videoId
    }).fetch();

    if (videos.length > 0) {
      return;
    }

    YoutubeApi.authenticate({
      type: 'key',
      key: Meteor.settings.google_key
    });

    YoutubeApi.videos.list({
        part: "id,snippet,contentDetails,player",
        type: "video",
        maxResults: 1,
        'id': videoId,
    }, Meteor.bindEnvironment(function (err, response) {
      if (err) {
        return;
      }

      if (response.items) {
        if (response.items[0]) {
          var video   = response.items[0];
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
    }));
  }

  return {
    handle: handle
  }
}