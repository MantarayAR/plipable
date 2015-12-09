QueueVideoCommand = function () {
  var handle = function(videoId) {
    var visited = VisitedCollection.findOne({
      videoId: videoId,
      type: 'video'
    });

    if (visited == null) {
      JobCollection.insert({
        videoId: videoId,
        type: 'video',
        createdAt: +new Date()
      });
    } else {
      // TODO allow revisit after a day
    }
  };

  return {
    handle: handle
  };
};
