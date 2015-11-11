AddNewPlipCommand = function() {
  var handle = function(videoId, username, thumbnail, message, videoTimestamp) {
    return Plips.insert({
      videoId: videoId,
      username: username,
      thumbnail: thumbnail,
      message: message,
      videoTimestamp: videoTimestamp
    });
  }

  return {
    handle: handle
  }
}