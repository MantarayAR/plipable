QueueCommentsCommand = function () {
  var handle = function (videoId, nextPageToken) {
    var visited = VisitedCollection.findOne({
      nextPageToken: nextPageToken,
      type: 'comments'
    });

    if (visited == null) {
      JobCollection.insert({
        videoId: videoId,
        nextPageToken: nextPageToken,
        type: 'comments',
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
