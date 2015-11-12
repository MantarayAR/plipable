YoutubeApi.authenticate({
  type: 'key',
  key: Meteor.settings.google_key
});

Meteor.methods({
  search: function(text) {
    check(text, String);
    var response = Async.runSync(function(done) {
      if (text.trim() === '') {
        YoutubeApi.videos.list({
          part: "id,snippet",
          type: "video",
          maxResults: 10,
          chart: 'mostPopular',
        }, function (err, data) {
          if (err) {
            throw err;  
          }
          
          done(err, data);
        });
      } else {
        YoutubeApi.search.list({
          part: "id,snippet",
          type: "video",
          maxResults: 10,
          q: text,
        }, function (err, data) {
          if (err) {
            throw err;  
          }
          
          done(err, data);
        });
      }

      
    });

    return response.result;
  }
});