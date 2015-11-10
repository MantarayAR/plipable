YoutubeApi.authenticate({
  type: 'key',
  key: Meteor.settings.google_key
});

Meteor.methods({
  search: function(text) {
    var response = Async.runSync(function(done) {
      YoutubeApi.search.list({
          part: "id,snippet",
          type: "video",
          maxResults: 10,
          q: text,
      }, function (err, data) {
        if (err) {
          throw err;  
        }
        
        done(data);
      });
    });

    return response;
  }
});