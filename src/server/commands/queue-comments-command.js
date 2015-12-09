QueueCommentsCommand = function () {
  var handle = function (nextPageToken) {
    var visited = VisitedCollection.findOne({
      nextPageToken: nextPageToken,
      type: 'comments'
    });

    if (visited == null) {
      JobCollection.insert({
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
