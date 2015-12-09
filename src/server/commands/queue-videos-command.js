QueueVideosCommand = function () {
  var handle = function (results) {
    if (results !== null && results.items.length > 0) {
      for (var i = 0; i < results.items.length; i++) {
        dispatch(new QueueVideoCommand(), results.items[i].id);
      }
    }
  };

  return {
    handle: handle
  };
};
