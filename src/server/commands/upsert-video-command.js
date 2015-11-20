UpsertVideoCommand = function () {
  var handle = function(videoId, videoType, title, thumbnail, description, tags) {
    Videos.upsert({
      videoId: videoId
    }, {
      $set: {
        videoId: videoId,
        videoType: videoType,
        title: title,
        thumbnail: thumbnail,
        description: description,
        tags: tags
      }
    });
  }

  return {
    handle: handle
  }
};
