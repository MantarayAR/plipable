AddNewPlipCommand = function() {
  var handle = function(videoId, username, message, videoTimestamp) {
    return Plips.insert({
      videoId: videoId,
      username: username,
      message: message,
      videoTimestamp: videoTimestamp
    });
  }

  return {
    handle: handle
  }
}