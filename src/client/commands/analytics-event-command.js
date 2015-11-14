AnalyticsEventCommand = function() {
  var handle = function(eventName, name, campaign) {
    ga('send', 'event', eventName, name, campaign);
  };

  return {
    handle: handle
  }
}
