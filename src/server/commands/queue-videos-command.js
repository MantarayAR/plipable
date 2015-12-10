QueueVideosCommand = function () {
  var handle = function (results) {
    if (results !== null && results.items.length > 0) {
      for (var i = 0; i < results.items.length; i++) {
        var videoId = results.items[i].id;

        if (typeof videoId === 'object' && videoId.videoId) {
          videoId = videoId.videoId;
        }

        dispatch(new QueueVideoCommand(), videoId);
      }
    }
  };

  return {
    handle: handle
  };
};
