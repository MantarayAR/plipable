QueueRelatedVideosCommand = function () {
  var handle = function(videoId) {
    YoutubeApi.search.list({
      part: "id,snippet",
      type: "video",
      maxResults: 20,
      relatedToVideoId: videoId,
      relevanceLangauge: 'en',
    }, Meteor.bindEnvironment(function (err, data) {
      if (err) {
        throw err;  
      }
      
      if (data.items) {
        dispatch(new QueueVideosCommand(), data);
      }
    }));
  };

  return {
    handle: handle
  };
};
