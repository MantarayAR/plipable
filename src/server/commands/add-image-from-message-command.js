AddImageFromMessageCommand = function() {
  var handle = function(plipId, message) {
    if (Giphy.isGiphyMessage(message)) {
      var giphyUrl = 'https://api.giphy.com/v1/gifs/translate';
      var search = message.substr(message.indexOf(' ') + 1);

      var options = {
        params: {
          s: search,
          api_key: Meteor.settings.giphy_key,
          rating: 'pg-13'
        }
      };

      HTTP.get(giphyUrl, options, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          if (result.data &&
              result.data.data &&
              result.data.data.images) {

            var url = result.data.data.images.fixed_width.url;
            var type  = 'giphy';

            Plips.update({
              _id: plipId
            }, {
              $set: {
                image: {
                  url: url,
                  type: type
                }
              }
            });
          }
        }
      });
    }
  };

  return {
    handle: handle
  }
}