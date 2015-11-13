AnlyticsEventCommand = function() {
  var handle = function(eventName, name, value) {
    analytics.track(eventName, {
      eventName: name,
      value: value,
    });
  };

  return {
    handle: handle
  }
}