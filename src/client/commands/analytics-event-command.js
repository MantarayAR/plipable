AnalyticsEventCommand = function() {
  var handle = function(eventName, name, value) {
    var campaign = 'Meteor Web';
    ga('send', 'event', eventName, name, campaign, value);
  };

  return {
    handle: handle
  }
}
