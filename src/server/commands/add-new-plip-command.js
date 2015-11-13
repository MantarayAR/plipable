AddNewPlipCommand = function() {
  var handle = function(videoId, username, thumbnail, message, videoTimestamp) {
    var insert = {
      videoId: videoId,
      username: username,
      thumbnail: thumbnail,
      message: message,
      videoTimestamp: videoTimestamp
    };

    var plipId = Plips.insert(insert);

    dispatch(AddImageFromMessageCommand(), plipId, message);

    return plipId;
  }

  return {
    handle: handle
  }
}