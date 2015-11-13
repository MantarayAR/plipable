AnalyticsEventCommand = function() {
  var handle = function(eventName, name, value) {
    analytics.track(eventName, {
      name: name,
      value: value,
    });
  };

  return {
    handle: handle
  }
}
