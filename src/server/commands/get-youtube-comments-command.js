YoutubeApi.authenticate({
  type: 'key',
  key: Meteor.settings.google_key
});

GetYoutubeCommentsByVideoIdCommand = function () {
  var handle = function (videoId) {
    console.log(videoId);

    var options = {
      part: "id,snippet",
      id: videoId,
      maxResults: 100
    }

    var url = youtubeApiCreateUrl("commentThreads", options);
    var reqOptions = {
        url: url,
    };
    console.log(url);
    YoutubeApi.request(reqOptions, Meteor.bindEnvironment(function (err, data) {
      if (err) {
        throw err;  
      }
      
      console.log(data);
      // TODO

      VisitedCollection.insert({
        videoId: videoId,
        type: 'video',
        createdAt: +new Date()
      });

      if (data.nextPageToken) {
        dispatch(new QueueCommentsCommand(), data.nextPageToken);
      }
    }));
  };

  return {
    handle: handle
  };
};

GetYoutubeCommentsByNextPageTokenCommand = function () {
  var handle = function (nextPageToken) {

  };

  return {
    handle: handle
  };
};
