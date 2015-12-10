YoutubeApi.authenticate({
  type: 'key',
  key: Meteor.settings.google_key
});

var _getCommentThread = function (videoId, reqOptions) {
  YoutubeApi.request(reqOptions, Meteor.bindEnvironment(function (err, data) {
    if (err) {
      throw err;  
    }
    
    for (var i = 0; i < data.items.length; i++) {
      dispatch(new CheckYoutubeCommentCommand(), data.items[i]);
    }

    VisitedCollection.insert({
      videoId: videoId,
      type: 'video',
      createdAt: +new Date()
    });

    if (data.nextPageToken) {
      dispatch(new QueueCommentsCommand(), videoId, data.nextPageToken);
    } else {
      dispatch(new QueueRelatedVideosCommand(), videoId);
    }
  }));
}

GetYoutubeCommentsByVideoIdCommand = function () {
  var _getDetails = function (videoId) {
    // Make sure we have the video details
    YoutubeApi.videos.list({
        part: "id,snippet,contentDetails,player",
        type: "video",
        maxResults: 1,
        'id': videoId,
    }, Meteor.bindEnvironment(function (err, result) {
      if (err) {
        throw err;  
      }
      
      if (result.items) {
        if (result.items[0]) {
          var video   = result.items[0];
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
  };

  var handle = function (videoId) {
    var options = {
      part: "id,snippet",
      videoId: videoId,
      maxResults: 100
    }

    var url = youtubeApiCreateUrl("commentThreads", options);
    var reqOptions = {
        url: url,
    };

    _getDetails(videoId);

    _getCommentThread(videoId, reqOptions);
  };

  return {
    handle: handle
  };
};



GetYoutubeCommentsByNextPageTokenCommand = function () {
  var handle = function (videoId, nextPageToken) {
    var options = {
      part: "id,snippet",
      videoId: videoId,
      pageToken: nextPageToken,
      maxResults: 100
    }

    var url = youtubeApiCreateUrl("commentThreads", options);
    var reqOptions = {
        url: url,
    };

    _getCommentThread(videoId, reqOptions);
  };

  return {
    handle: handle
  };
};
