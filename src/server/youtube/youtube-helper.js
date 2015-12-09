var API_URL = "https://www.googleapis.com/youtube/v3/";

youtubeApiCreateUrl = function(api, options) {

  var url = API_URL + api;

  switch((YoutubeApi.getConfig().auth || {}).type) {
    case 'key':
      options.key = (YoutubeApi.getConfig().auth || {}).key;
      break;
    case 'oauth':
      options.access_token = (YoutubeApi.getConfig().auth || {}).token;
      break;
  }


  var i = -1;
  for (var opt in options) {
    if (options[opt] === undefined) { continue; }
    var value = options[opt];
    url += (++i === 0 ? "?" : "&") + opt + "=" + value;
  }

  return url;
}